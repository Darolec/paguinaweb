Preparación para desplegar Darolec-Website

Resumen
- Hemos aplicado saneamiento en JavaScript para reducir XSS (escapeHTML, sanitizeURL).
- Se eliminaron handlers inline `onerror` y se añadieron listeners JS.
- Se añadió una meta-CSP provisional en `index.html` y bloques de cabeceras para Nginx/Apache/Netlify.
- Se agregaron archivos de despliegue: `_headers` (Netlify) y `nginx_example.conf`.

Pasos recomendados antes de subir
1. Verifica que el dominio esté configurado y que tengas certificado SSL (Let’s Encrypt o similar).
2. Reemplaza los orígenes de ejemplo en `nginx_example.conf` (dominio y rutas de certificados).
3. Si usas Netlify, deja `_headers` en la raíz del sitio (ya creado).
4. Prueba el sitio localmente con un servidor estático (ej. `npx http-server` o `python -m http.server`) y navega por varias páginas.

Comprobaciones post-despliegue
- Ejecuta https://securityheaders.com y revisa la puntuación. Ajusta `Content-Security-Policy` según recursos bloqueados.
- Revisa la consola del navegador por errores y recursos bloqueados por CSP.
- Verifica que las páginas carguen correctamente en móviles y tablets.

Comandos útiles (desde la carpeta del proyecto)
- Servir localmente (npm):
  ```bash
  npx http-server -c-1
  ```
- Servir localmente (Python 3):
  ```bash
  python -m http.server 8000
  ```

¿Deseas que también:
- A) Cree un archivo `.htaccess` con reglas para Apache basadas en los encabezados anteriores, o
- B) automatice la generación de un certificado Let's Encrypt en un ejemplo de script para tu servidor? 

Responde A o B o dime si quieres que haga ambos.

Automatizar Let's Encrypt (script)
---------------------------------
Se incluye un script de ejemplo `setup_certbot.sh` que instala `snapd` y `certbot` (vía snap) y solicita/instala certificados para Nginx.

Uso básico (en servidor Ubuntu/Debian con Nginx):

```bash
sudo ./setup_certbot.sh ejemplo.com www.ejemplo.com admin@ejemplo.com
```

Notas importantes:
- Asegúrate de que el dominio apunte al servidor y que el puerto 80 esté accesible (Let's Encrypt usa HTTP-01 challenge).
- Antes de ejecutar en producción puedes probar con `--staging` (modifica el script para descomentar la línea de `--staging`) para evitar límites de rate.
- El script intenta recargar Nginx y mostrará los certificados instalados al terminar.
- El sistema `snap` de `certbot` suele crear timers para renovación; comprueba con `systemctl list-timers | grep certbot`.

Si quieres, puedo también crear `.htaccess` para Apache o adaptar el script para usar `certbot --apache` o DNS challenges si tu proveedor requiere verificación DNS.