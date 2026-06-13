/**
 * Funciones de Utilidad (Utils)
 */

/**
 * Crea una función con retraso (debounce) para no sobrecargar el navegador de eventos.
 * @param {Function} func - Función a ejecutar.
 * @param {number} delay - Retraso en milisegundos.
 * @returns {Function} - Función envuelta con soporte de retraso.
 */
function debounce(func, delay) {
    let debounceTimer;
    return function (...args) {
        const context = this;
        // Limpiamos el temporizador anterior si la función se llama de nuevo antes de 'delay' ms
        clearTimeout(debounceTimer);
        // Establecemos un nuevo temporizador que ejecutará la función principal después de 'delay' ms
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

/**
 * Escapa caracteres especiales para evitar XSS al insertar texto en innerHTML.
 * @param {string} str
 * @returns {string}
 */
function escapeHTML(str) {
    return String(str || '').replace(/[&<>\"']/g, function (s) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s];
    });
}

function sanitizeURL(url) {
    if (!url) return '#';
    try {
        const trimmed = String(url).trim();
        if (/^\s*(javascript:|data:)/i.test(trimmed)) return '#';
        return escapeHTML(trimmed);
    } catch (e) {
        return '#';
    }
}

/**
 * Inicialización de Scripts Principales
 */
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initStickyNavbar();
    initMobileMenu();
    initSearchInput();
    initFeaturedProducts();
    initMapToggle();
    initProductShareButtons();
    initImageBackgroundMatcher();
});

/**
 * Inicializa el desplazamiento suave en toda la página para enlaces internos.
 */
function initSmoothScroll() {
    // Seleccionamos todos los enlaces que apuntan a un ancla (#) dentro de la página
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evitamos el salto brusco predeterminado del navegador
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            // Buscamos el elemento destino por su ID y realizamos el scroll suave
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Agrega sombra y transparencia al navbar cuando se realiza scroll hacia abajo.
 */
function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Usamos debounce para no sobrecargar el hilo principal durante el evento de scroll continuo
    window.addEventListener('scroll', debounce(() => {
        // Agregamos la clase 'scrolled' cuando el usuario baja más de 50px
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 15)); // 15ms es suficiente para sincronizarse con los frames de renderizado (aprox 60fps)
}

/**
 * Configura la funcionalidad del menú hamburguesa para dispositivos móviles.
 */
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('primary-navigation');

    if (mobileBtn && navLinks) {
        const setMenuState = (expanded) => {
            navLinks.classList.toggle('active', expanded);
            mobileBtn.classList.toggle('active', expanded);
            mobileBtn.setAttribute('aria-expanded', String(expanded));
            navLinks.setAttribute('aria-hidden', String(!expanded));
        };

        setMenuState(false);

        mobileBtn.addEventListener('click', () => {
            const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            setMenuState(!expanded);
        });

        const closeMenu = () => setMenuState(false);

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (event) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(event.target) && !mobileBtn.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }
}

function initMapToggle() {
    const btn = document.getElementById('btnToggleMap');
    const collapse = document.getElementById('mapCollapse');
    if (!btn || !collapse) return;

    btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        collapse.classList.toggle('open');
        btn.classList.toggle('active');
        btn.setAttribute('aria-expanded', String(!isExpanded));
        collapse.setAttribute('aria-hidden', String(isExpanded));
    });
}

function initProductShareButtons() {
    const shareContainer = document.querySelector('.share-buttons-container');
    if (!shareContainer) return;

    shareContainer.addEventListener('click', (event) => {
        const button = event.target.closest('[data-action]');
        if (!button) return;
        event.preventDefault();

        const currentUrl = window.location.href;
        const action = button.dataset.action;

        if (action === 'share-whatsapp') {
            window.open(
                'https://api.whatsapp.com/send?text=' + encodeURIComponent('Mira este increíble producto de Darolec Comercial: ' + currentUrl),
                '_blank'
            );
        }

        if (action === 'copy-link') {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(currentUrl)
                    .then(() => alert('Enlace del producto copiado al portapapeles'))
                    .catch(() => alert('No se pudo copiar el enlace. Intenta nuevamente.'));
            } else {
                alert('Tu navegador no soporta la copia automática. Copia el enlace manualmente.');
            }
        }
    });
}


/**
 * Control del Dropdown y lógica de la barra de búsqueda en el Inicio.
 */
function initSearchInput() {
    const indexSearchInput = document.getElementById('indexSearchInput');
    if (!indexSearchInput) return;

    const searchContainer = indexSearchInput.parentElement;
    const dropdown = createDropdownContainer(searchContainer);

    // Escuchamos la escritura del usuario usando debounce para evitar múltiples búsquedas innecesarias
    indexSearchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase().trim();
        dropdown.innerHTML = '';

        // Si no hay texto, ocultamos el dropdown
        if (query.length === 0) {
            dropdown.style.display = 'none';
            return;
        }

        // Buscamos coincidencias en la "base de datos" local (allProducts)
        if (typeof allProducts !== 'undefined') {
            const results = allProducts.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.desc.toLowerCase().includes(query) ||
                p.cat.toLowerCase().includes(query)
            ).slice(0, 5); // Limitamos a 5 resultados para no saturar la vista

            if (results.length > 0) {
                renderDropdownResults(results, dropdown);
            } else {
                renderDropdownEmpty(dropdown);
            }
        }
    }, 200)); // debounce de 200ms espera a que el usuario termine de escribir rápidamente

    indexSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value.trim();
            if (query) {
                window.location.href = `productos.html?q=${encodeURIComponent(query)}`;
            }
        }
    });

    indexSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.style.display = 'none';
        }
    });

    // Support for button click
    const searchBtn = searchContainer.querySelector('.search-glass-btn, .search-icon');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const query = indexSearchInput.value.trim();
            if (query) {
                window.location.href = `productos.html?q=${encodeURIComponent(query)}`;
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

/**
 * Helper para renderizar los items coincidentes del Search.
 */
function renderDropdownResults(results, dropdown) {
    results.forEach(p => {
        const item = document.createElement('a');
        item.href = p.url ? sanitizeURL(p.url) : `productos.html?q=${encodeURIComponent(p.title)}`;
        item.className = 'search-result-item';

        const img = document.createElement('img');
        img.className = 'search-result-img';
        img.src = sanitizeURL(p.img);
        img.alt = escapeHTML(p.title);
        img.addEventListener('error', () => { img.style.display = 'none'; });

        const info = document.createElement('div');
        info.className = 'search-result-info';
        const strong = document.createElement('strong');
        // formatTitleHTML returns safe HTML (escapes internally)
        strong.innerHTML = formatTitleHTML(p.title);
        const span = document.createElement('span');
        span.textContent = escapeHTML(p.cat);

        info.appendChild(strong);
        info.appendChild(span);

        item.appendChild(img);
        item.appendChild(info);
        dropdown.appendChild(item);
    });
    dropdown.style.display = 'block';
}

function renderDropdownEmpty(dropdown) {
    const item = document.createElement('div');
    item.className = 'search-empty';
    item.innerText = 'No se encontraron resultados.';
    dropdown.appendChild(item);
    dropdown.style.display = 'block';
}

function createDropdownContainer(parent) {
    const dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    dropdown.style.display = 'none';
    parent.appendChild(dropdown);
    return dropdown;
}

/**
 * Inicializa y renderiza las fichas de Productos Destacados en el Inicio.
 */
function initFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredProductGrid');

    if (featuredGrid && typeof allProducts !== 'undefined') {
        // Aquí defines los IDs exactos de los 4 productos que deseas destacar
        // (Encuentras los IDs en el archivo js/data.js)
        const featuredIds = [
            "prod-fushan-biovacacanalado",
            "prod-curaway-agujaparasistemamagnum",
            "prod-zhongshan-balonbacky",
            "prod-kindly-huber"
        ];

        // Filtramos los productos según los IDs definidos, respetando el orden
        let itemsToShow = featuredIds
            .map(id => allProducts.find(p => p.id === id))
            .filter(p => p !== undefined);

        // Si la lista quedara vacía por accidente, mostrará los primeros 4 por defecto
        if (itemsToShow.length === 0) {
            itemsToShow = allProducts.slice(0, 4);
        }
        featuredGrid.innerHTML = '';

        const frag = document.createDocumentFragment();

        itemsToShow.forEach(p => {
            const calibre = p.specs.find(s => s.label === "Calibre")?.val || "N/A";
            const longitud = p.specs.find(s => s.label === "Longitud")?.val || "N/A";

            const card = document.createElement("div");
            card.className = "featured-card";
            card.style.animation = "fadeUp 0.5s ease forwards";

            // Build featured card DOM safely
            const fcImage = document.createElement('div');
            fcImage.className = 'fc-image';
            const fcImg = document.createElement('img');
            fcImg.src = sanitizeURL(p.img);
            fcImg.alt = escapeHTML(p.title);
            fcImg.addEventListener('error', () => { fcImg.style.display = 'none'; });
            fcImage.appendChild(fcImg);

            const fcDetails = document.createElement('div');
            fcDetails.className = 'fc-details';
            const fcCat = document.createElement('div');
            fcCat.className = 'fc-cat';
            fcCat.textContent = p.cat || 'Equipamiento';
            const fcTitle = document.createElement('div');
            fcTitle.className = 'fc-title';
            fcTitle.title = escapeHTML(p.title);
            fcTitle.innerHTML = formatTitleHTML(p.title);
            const fcDesc = document.createElement('p');
            fcDesc.className = 'fc-desc';
            fcDesc.textContent = escapeHTML(p.desc);
            fcDetails.appendChild(fcCat);
            fcDetails.appendChild(fcTitle);
            fcDetails.appendChild(fcDesc);

            const fcDrawer = document.createElement('div');
            fcDrawer.className = 'fc-drawer';
            const specRow = document.createElement('div');
            specRow.className = 'fc-spec-row';
            const specLeft = document.createElement('div');
            const specTitleLeft = document.createElement('div');
            specTitleLeft.className = 'fc-spec-title';
            specTitleLeft.textContent = 'Calibre';
            const specValLeft = document.createElement('div');
            specValLeft.className = 'fc-spec-val';
            specValLeft.textContent = calibre;
            specLeft.appendChild(specTitleLeft);
            specLeft.appendChild(specValLeft);
            const specRightWrap = document.createElement('div');
            specRightWrap.className = 'text-right';
            const specTitleRight = document.createElement('div');
            specTitleRight.className = 'fc-spec-title';
            specTitleRight.textContent = 'Longitud';
            const specValRight = document.createElement('div');
            specValRight.className = 'fc-spec-val';
            specValRight.textContent = longitud;
            specRightWrap.appendChild(specTitleRight);
            specRightWrap.appendChild(specValRight);
            specRow.appendChild(specLeft);
            specRow.appendChild(specRightWrap);
            const actionLink = document.createElement('a');
            actionLink.className = 'btn btn-primary btn-block btn-sm';
            actionLink.href = sanitizeURL(p.url || 'index.html#contact');
            actionLink.textContent = 'Ver Detalles';
            fcDrawer.appendChild(specRow);
            fcDrawer.appendChild(actionLink);

            card.appendChild(fcImage);
            card.appendChild(fcDetails);
            card.appendChild(fcDrawer);
            frag.appendChild(card);
        });
        featuredGrid.appendChild(frag);
    }
}

/**
 * Adapta el color de fondo de los contenedores de imágenes al color de fondo de las propias imágenes.
 * Detecta dinámicamente el color de fondo (usando un pixel de la esquina) y lo aplica al contenedor.
 * Soporta elementos dinámicos mediante observación de mutaciones en el DOM.
 */
function initImageBackgroundMatcher() {
    const selectors = [
        { img: '.product-cards-grid .image', container: '.image-link' },
        { img: '.fc-image img', container: '.fc-image' },
        { img: '.product-image img', container: '.product-image' },
        { img: '.main-image-container img', container: '.main-image-container' },
        { img: '.thumbnail-item img', container: '.thumbnail-item' }
    ];

    function matchImage(img, containerSelector) {
        if (img.dataset.bgMatched) return;

        const updateBackground = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = 10;
                canvas.height = 10;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                
                // Dibujamos la esquina superior izquierda de la imagen
                ctx.drawImage(img, 0, 0);
                const data = ctx.getImageData(5, 5, 1, 1).data;
                const r = data[0];
                const g = data[1];
                const b = data[2];
                const a = data[3];

                // Si la esquina no es transparente, aplicamos el color de fondo extraído
                if (a > 200) {
                    const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
                    img.style.backgroundColor = hex;
                    const container = img.closest(containerSelector);
                    if (container) {
                        container.style.backgroundColor = hex;
                    }
                    img.dataset.bgMatched = 'true';
                }
            } catch (e) {
                // Silenciamos posibles excepciones de origen cruzado (CORS) en local
                console.warn('No se pudo extraer el color de fondo para la imagen: ' + img.src, e);
            }
        };

        if (img.complete) {
            updateBackground();
        } else {
            img.addEventListener('load', updateBackground);
        }
    }

    function scanAndMatch() {
        selectors.forEach(item => {
            document.querySelectorAll(item.img).forEach(img => {
                matchImage(img, item.container);
            });
        });
    }

    // Escaneo inicial
    scanAndMatch();

    // Observador para detectar elementos que se cargan dinámicamente en el DOM (filtros, paginación, etc.)
    const observer = new MutationObserver((mutations) => {
        let shouldScan = false;
        for (let mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                shouldScan = true;
                break;
            }
        }
        if (shouldScan) {
            scanAndMatch();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
