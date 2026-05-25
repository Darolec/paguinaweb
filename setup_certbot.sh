#!/usr/bin/env bash
# setup_certbot.sh
# Ejemplo: automatiza la instalación de Certbot (snap) y la obtención de certificados Let's Encrypt para Nginx
# USO: sudo ./setup_certbot.sh example.com www.example.com admin@example.com

set -euo pipefail

if [ "$#" -lt 3 ]; then
  echo "Uso: sudo $0 <dominio1> [<dominioN>...] <correo_admin>"
  echo "Ejemplo: sudo $0 example.com www.example.com admin@example.com"
  exit 1
fi

# Extraer parámetros
EMAIL=${@: -1} # último argumento es el email
DOMAINS=("${@:1:$(($#-1))}")
DOMAINS_ARGS=""
for d in "${DOMAINS[@]}"; do
  DOMAINS_ARGS+=" -d $d"
done

if [ "$(id -u)" -ne 0 ]; then
  echo "Este script requiere privilegios de root. Ejecuta: sudo $0 ..."
  exit 1
fi

# Instalar snapd si no existe (Ubuntu/Debian)
if ! command -v snap >/dev/null 2>&1; then
  echo "Instalando snapd..."
  apt update
  apt install -y snapd
  systemctl enable --now snapd.socket
fi

# Asegurar que snap está actualizado
snap install core && snap refresh core || true

# Instalar certbot
if ! command -v certbot >/dev/null 2>&1; then
  echo "Instalando certbot..."
  snap install --classic certbot
  ln -sf /snap/bin/certbot /usr/bin/certbot || true
fi

# Hacer prueba de renovación (opcional) y obtener certificado
# Requiere que el puerto 80 esté abierto y que Nginx esté corriendo
echo "Obteniendo/renovando certificado para: ${DOMAINS[*]}"

# Opción: probar en staging primero para evitar límites
# certbot --nginx --staging --non-interactive --agree-tos --email "$EMAIL" $DOMAINS_ARGS

certbot --nginx --non-interactive --agree-tos --email "$EMAIL" $DOMAINS_ARGS --redirect

# Forzar reload de nginx
echo "Recargando Nginx..."
systemctl reload nginx || nginx -s reload || true

# Mostrar estado
echo "Certificados instalados con éxito para: ${DOMAINS[*]}"
certbot certificates

# Recordatorio sobre renovación (certbot instala timer automático en snap)
echo "Let's Encrypt renueva automáticamente; puedes verificar status con: systemctl list-timers | grep certbot"

echo "Hecho." 
