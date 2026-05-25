// Filter & Pagination state
let currentMarca = [];
let currentUso = [];
let currentCalibre = [];
let currentLongitud = [];
let currentSearchQuery = "";
let currentPage = 1;
const itemsPerPage = 9;


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

/**
 * Sanitiza URLs básicas, rechazando esquemas peligrosos como javascript: o data:
 * Devuelve '#' si la URL no es segura.
 */
function sanitizeURL(url) {
    if (!url) return '#';
    try {
        const trimmed = String(url).trim();
        // Bloquea esquemas no seguros
        if (/^\s*(javascript:|data:)/i.test(trimmed)) return '#';
        return escapeHTML(trimmed);
    } catch (e) {
        return '#';
    }
}


/**
 * Calcula la distancia de Levenshtein entre dos cadenas de texto.
 * Ayuda al buscador a encontrar productos incluso si hay pequeños errores ortográficos.
 * @param {string} a - Primera cadena a comparar.
 * @param {string} b - Segunda cadena a comparar.
 * @returns {number} La distancia de edición (cambios necesarios para igualarlas).
 */
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    let matrix = [];
    // Inicialización de la primera fila y columna de la matriz
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    // Rellenamos la matriz calculando el mínimo costo de inserción, eliminación o sustitución
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1]; // No hay costo si los caracteres coinciden
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}

/**
 * Verifica si una consulta de búsqueda coincide parcial o difusamente con un texto destino.
 * @param {string} query - Lo que el usuario escribió.
 * @param {string} text - El texto del producto a analizar.
 * @returns {boolean} Verdadero si hay coincidencias razonables.
 */
function wordFuzzyMatch(query, text) {
    // Dividimos la consulta en palabras de más de 2 letras para ignorar artículos/preposiciones cortos
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    // Dividimos el texto del producto eliminando espacios y signos de puntuación comunes
    const textWords = text.toLowerCase().split(/[\s,.-]+/);
    if (queryWords.length === 0) return false;
    for (let q of queryWords) {
        let matched = false;
        for (let t of textWords) {
            // Se considera coincidencia si la palabra está contenida o si la distancia de Levenshtein es muy baja (máximo 2 errores)
            if (t.includes(q) || levenshteinDistance(q, t) <= 2) {
                matched = true;
                break;
            }
        }
        if (!matched) return false; // Todas las palabras de la consulta deben encontrar al menos una coincidencia
    }
    return true;
}

/**
 * Filtra los productos según las categorías, uso, calibre y longitud seleccionados.
 * @param {Array} products - Lista de productos a filtrar.
 * @returns {Array} Productos filtrados.
 */
function filterByCategories(products) {
    let filtered = products;

    if (currentMarca.length > 0) {
        filtered = filtered.filter(p => currentMarca.includes(p.cat));
    }

    const hasSpec = (specs, labelKeywords, valKeyword) => {
        if (!specs) return false;
        return specs.some(s =>
            labelKeywords.some(lk => s.label.toLowerCase().includes(lk.toLowerCase())) &&
            s.val.toLowerCase().includes(valKeyword.toLowerCase())
        );
    };

    if (currentUso.length > 0) {
        filtered = filtered.filter(p => currentUso.some(uso => hasSpec(p.specs, ["uso"], uso)));
    }

    if (currentCalibre.length > 0) {
        filtered = filtered.filter(p => currentCalibre.some(calibre => hasSpec(p.specs, ["calibre"], calibre)));
    }

    if (currentLongitud.length > 0) {
        filtered = filtered.filter(p => currentLongitud.some(long => checkLongitud(p, long, hasSpec)));
    }

    return filtered;
}

/**
 * Valida si un producto cumple con el filtro de longitud especificado.
 */
function checkLongitud(product, longitudType, hasSpecFn) {
    if (longitudType === "Cateter") return hasSpecFn(product.specs, ["longitud"], "cm");

    const match = product.specs && product.specs.find(s => s.label.toLowerCase().includes("longitud"));
    if (!match || !match.val.includes("mm")) return false;

    const num = parseInt(match.val.replace(/^\D+/g, '').replace(/[^\d].*/g, ''), 10);
    if (isNaN(num)) return false;

    if (longitudType === "Corta") return num >= 40 && num < 100;
    if (longitudType === "Media") return num >= 100 && num < 150;
    if (longitudType === "Larga") return num >= 150;

    return false;
}

/**
 * Aplica la búsqueda de texto sobre la lista de productos (Exacta y luego Difusa).
 * @param {Array} products - Productos donde buscar.
 * @returns {Object} { results: Array, isFuzzy: boolean }
 */
function applySearch(products) {
    if (currentSearchQuery.trim() === "") return { results: products, isFuzzy: false };

    const query = currentSearchQuery.toLowerCase().trim();
    let exactMatches = products.filter(p => {
        const inTitle = p.title.toLowerCase().includes(query);
        const inDesc = p.desc.toLowerCase().includes(query);
        const inCat = p.cat && p.cat.toLowerCase().includes(query);
        const inSpecs = p.specs && p.specs.some(s =>
            (s.label && s.label.toLowerCase().includes(query)) ||
            (s.val && s.val.toLowerCase().includes(query))
        );
        return inTitle || inDesc || inCat || inSpecs;
    });

    if (exactMatches.length > 0) return { results: exactMatches, isFuzzy: false };

    let fuzzyMatches = products.filter(p => {
        const fTitle = wordFuzzyMatch(query, p.title || "");
        const fDesc = wordFuzzyMatch(query, p.desc || "");
        const fCat = wordFuzzyMatch(query, p.cat || "");
        const fSpecs = p.specs && p.specs.some(s =>
            wordFuzzyMatch(query, s.label || "") ||
            wordFuzzyMatch(query, s.val || "")
        );
        return fTitle || fDesc || fCat || fSpecs;
    });

    return { results: fuzzyMatches, isFuzzy: fuzzyMatches.length > 0 };
}

/**
 * Renderiza la cuadrícula de productos, integrando los filtros, búsqueda y paginación.
 * (Punto de entrada principal para actualizar la vista de productos)
 */
function renderProducts() {
    const grid = document.getElementById("productGrid");
    const pagination = document.getElementById("pagination");
    if (!grid || !pagination) return;

    let filtered = filterByCategories(allProducts);
    const searchOutcome = applySearch(filtered);
    filtered = searchOutcome.results;

    const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
    if (currentPage > totalPages) currentPage = 1;

    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

    renderGridElements(paginated, grid, searchOutcome.isFuzzy);
    renderPaginationElements(totalPages, pagination);
}

/**
 * Inserta las tarjetas HTML de los productos en el DOM.
 */
function renderGridElements(products, grid, isFuzzy) {
    grid.innerHTML = "";

    if (products.length === 0) {
        const escapedQuery = escapeHTML(currentSearchQuery);
        grid.innerHTML = `
            <div class="no-results-container">
                <svg class="no-results-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h3>No encontramos resultados exactos para "${escapedQuery}"</h3>
                <p class="mt-4"><a href="index.html#contact" class="no-results-link">¡Upps! Parece que eso se nos escapó. Pregúntanos si podemos conseguirlo.</a></p>
            </div>`;
        return;
    }

    if (isFuzzy) {
        const msg = document.createElement("div");
        msg.className = "fuzzy-feedback-msg";
        const escapedQuery = escapeHTML(currentSearchQuery);
        msg.innerHTML = `No encontramos coincidencias exactas para "<em>${escapedQuery}</em>". <a href="index.html#contact">¡Upps! Parece que eso se nos escapó. Pregúntanos si podemos conseguirlo.</a>`;
        grid.appendChild(msg);
    }

    const fragment = document.createDocumentFragment();
    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
            card.innerHTML = generateProductCardHTML(p, false);
            // Attach error handler to product image (avoid inline handlers)
            const imgEl = card.querySelector('.product-image img');
            if (imgEl) {
                const ph = card.querySelector('.placeholder-icon');
                imgEl.addEventListener('error', () => {
                    imgEl.style.display = 'none';
                    if (ph) ph.style.display = 'flex';
                });
            }
        fragment.appendChild(card);
    });
    grid.appendChild(fragment);
}

/**
 * Inserta los controles de paginación en el DOM.
 */
function renderPaginationElements(totalPages, pagination) {
    pagination.innerHTML = "";
    if (totalPages <= 1) return;

    // Helper para cambiar de página
    const navigateTo = (pageIndex) => {
        currentPage = pageIndex;
        renderProducts();
        window.scrollTo({ top: document.getElementById('productGrid').offsetTop - 120, behavior: 'smooth' });
    };

    const frag = document.createDocumentFragment();

    // Botón Anterior
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '&laquo;';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => navigateTo(currentPage - 1);
    frag.appendChild(prevBtn);

    // Botones de Páginas Numéricas
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = `page-btn ${currentPage === i ? 'active' : ''}`;
        btn.innerText = i;
        btn.onclick = () => navigateTo(i);
        frag.appendChild(btn);
    }

    // Botón Siguiente
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = '&raquo;';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => navigateTo(currentPage + 1);
    frag.appendChild(nextBtn);

    pagination.appendChild(frag);
}

// Setup Filters tracking with Debounce
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');

    // Auto-collapse filters on mobile/tablet screens
    if (window.innerWidth <= 992) {
        document.querySelectorAll('.filter-section').forEach(section => {
            section.classList.add('collapsed');
        });
    }

    // Toggle de secciones de filtro con un solo listener
    document.addEventListener('click', (event) => {
        const header = event.target.closest('.filter-header');
        if (header) {
            header.parentElement.classList.toggle('collapsed');
        }
    });

    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');

    // Mapeo unificador
    const triggerFilters = () => {
        currentMarca = Array.from(document.querySelectorAll('.marca-cb:checked')).map(cb => cb.value);
        currentUso = Array.from(document.querySelectorAll('.uso-cb:checked')).map(cb => cb.value);
        currentCalibre = Array.from(document.querySelectorAll('.calibre-cb:checked')).map(cb => cb.value);
        currentLongitud = Array.from(document.querySelectorAll('.longitud-cb:checked')).map(cb => cb.value);

        if (searchInput) currentSearchQuery = searchInput.value;

        currentPage = 1;
        renderProducts();
    };

    // Aplicar Debounce para un Instant Loading suave sin saturar (250ms)
    let filterTimeout;
    const debouncedFilter = () => {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(triggerFilters, 250);
    };

    filterCheckboxes.forEach(cb => {
        cb.addEventListener('change', debouncedFilter);
    });

    if (searchInput) {
        searchInput.addEventListener('input', debouncedFilter);
    }

    // Apply URL filter if exists
    const urlParams = new URLSearchParams(window.location.search);
    const urlCat = urlParams.get('cat');
    const urlQ = urlParams.get('q');

    if (urlCat) {
        const matchingCb = document.querySelector(`.marca-cb[value="${urlCat}"]`);
        if (matchingCb) {
            matchingCb.checked = true;
            currentMarca = [urlCat];
        }
    }

    if (urlQ && searchInput) {
        searchInput.value = urlQ;
        currentSearchQuery = urlQ;
    }

    // Render inicial
    if (document.getElementById('productGrid')) {
        renderProducts();
    }
});

// Dynamic page hydration logic
// Esta lógica se encarga de rellenar los datos de 'producto.html' basado en el parámetro ?id= de la URL
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('producto.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (productId) {
            // Simulamos una consulta a la base de datos buscando por ID en la memoria (allProducts)
            const p = allProducts.find(item => item.id == productId);
            if (p) {
                // Inyectamos los datos del producto en el DOM
                document.getElementById('detailTitle').innerHTML = formatTitleHTML(p.title);
                document.getElementById('detailDesc').innerText = p.desc;
                document.getElementById('detailBreadcrumbName').innerText = p.title;
                document.getElementById('detailBreadcrumbCat').innerText = p.cat;

                const mainImg = document.getElementById('detailImage');
                mainImg.src = sanitizeURL(p.img);
                mainImg.alt = p.title;
                mainImg.style.display = 'inline-block';
                const ph = document.getElementById('mainPlaceholder');
                if (ph) ph.style.display = 'none';

                // Setup thumbnails
                const thumbList = document.getElementById('thumbnailList');
                let currentGalleryIndex = 0;
                const galleryImages = p.gallery && p.gallery.length > 0 ? p.gallery.map(g => sanitizeURL(g)) : [sanitizeURL(p.img)];
                let autoSlideInterval;

                function startAutoSlide() {
                    clearInterval(autoSlideInterval); // Limpiamos el intervalo previo para evitar duplicaciones
                    autoSlideInterval = setInterval(() => {
                        if (galleryImages.length <= 1) return;
                        let newIdx = currentGalleryIndex + 1;
                        // Si llegamos al final, volvemos a la primera imagen
                        if (newIdx >= galleryImages.length) newIdx = 0;
                        updateGallery(newIdx);
                    }, 10000); // Cambio automático cada 10 segundos
                }

                function updateGallery(index) {
                    if (currentGalleryIndex === index && mainImg.src && mainImg.src.includes(galleryImages[index])) return;

                    const thumbs = document.querySelectorAll('.thumbnail-item');
                    if (thumbs.length > 0) {
                        thumbs.forEach(el => el.classList.remove('active'));
                        if (thumbs[index]) thumbs[index].classList.add('active');
                    }

                    mainImg.style.opacity = '0.4';

                    setTimeout(() => {
                        mainImg.src = galleryImages[index];
                        mainImg.style.transform = 'scale(1)';
                        mainImg.style.transformOrigin = 'center center';

                        setTimeout(() => {
                            mainImg.style.opacity = '1';
                        }, 50);
                    }, 150);

                    currentGalleryIndex = index;
                    startAutoSlide();
                }

                if (galleryImages.length > 1) {
                    startAutoSlide(); // Iniciar cambio automático
                }

                if (thumbList) {
                    thumbList.innerHTML = '';
                    if (galleryImages.length > 1) {
                        // Create thumbnails for gallery if more than 1 image (create elements safely)
                        for (let i = 0; i < galleryImages.length; i++) {
                            const thumb = document.createElement('div');
                            thumb.className = `thumbnail-item ${i === 0 ? 'active' : ''}`;
                            const img = document.createElement('img');
                            img.src = sanitizeURL(galleryImages[i]);
                            img.alt = `${escapeHTML(p.title)} Vista ${i + 1}`;
                            img.onload = () => { /* good */ };
                            img.onerror = () => { thumb.style.display = 'none'; };
                            thumb.appendChild(img);
                            thumb.onclick = () => updateGallery(i);
                            thumbList.appendChild(thumb);
                        }
                    } else {
                        // No thumbs needed for single image
                        thumbList.style.display = 'none';
                    }
                }

                // Setup Prev/Next buttons
                const prevBtn = document.getElementById('prevBtn');
                const nextBtn = document.getElementById('nextBtn');
                if (prevBtn && nextBtn) {
                    if (galleryImages.length > 1) {
                        prevBtn.style.display = 'flex';
                        nextBtn.style.display = 'flex';
                        prevBtn.onclick = () => {
                            let newIdx = currentGalleryIndex - 1;
                            if (newIdx < 0) newIdx = galleryImages.length - 1;
                            updateGallery(newIdx);
                        };
                        nextBtn.onclick = () => {
                            let newIdx = currentGalleryIndex + 1;
                            if (newIdx >= galleryImages.length) newIdx = 0;
                            updateGallery(newIdx);
                        };
                    } else {
                        prevBtn.style.display = 'none';
                        nextBtn.style.display = 'none';
                    }
                }

                // Setup Zoom effect
                const mainContainer = document.getElementById('mainImageContainer');
                if (mainContainer) {
                    let currentZoom = 2; // Nivel de zoom inicial

                    mainContainer.addEventListener('mouseenter', () => {
                        clearInterval(autoSlideInterval); // Pausar al hacer zoom
                    });

                    mainContainer.addEventListener('mousemove', (e) => {
                        const rect = mainContainer.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;

                        const xPercent = (x / rect.width) * 100;
                        const yPercent = (y / rect.height) * 100;

                        mainImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                        mainImg.style.transform = `scale(${currentZoom})`;
                    });

                    mainContainer.addEventListener('wheel', (e) => {
                        e.preventDefault(); // Evitar scroll de la página

                        // Ajustar el nivel de zoom
                        if (e.deltaY < 0) {
                            currentZoom += 0.2; // Zoom in
                        } else {
                            currentZoom -= 0.2; // Zoom out
                        }

                        // Limitar el zoom (min 1.2x, max 5x)
                        currentZoom = Math.min(Math.max(1.2, currentZoom), 5);

                        mainImg.style.transform = `scale(${currentZoom})`;
                    });

                    mainContainer.addEventListener('mouseleave', () => {
                        mainImg.style.transform = 'scale(1)';
                        mainImg.style.transformOrigin = 'center center';
                        currentZoom = 2; // Resetear zoom
                        startAutoSlide(); // Reanudar al quitar mouse
                    });
                }

                const tbody = document.getElementById('detailTableBody');
                tbody.innerHTML = '';
                p.specs.forEach(s => {
                    const tr = document.createElement('tr');
                    const th = document.createElement('th');
                    th.textContent = escapeHTML(s.label);
                    const td = document.createElement('td');
                    td.textContent = escapeHTML(s.val);
                    tr.appendChild(th);
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                });

                // Lógica de Productos Similares
                const similarGrid = document.getElementById('similarProductsGrid');
                if (similarGrid) {
                    // Buscar productos en la misma categoría, excluyendo el actual
                    let similar = allProducts.filter(item => item.cat === p.cat && item.id !== p.id);

                    // Si no hay suficientes en la categoría, buscar por "uso"
                    if (similar.length < 4 && p.specs) {
                        const pUsoSpec = p.specs.find(s => s.label.toLowerCase().includes('uso'));
                        if (pUsoSpec) {
                            const pUso = pUsoSpec.val.toLowerCase();
                            // Tomar las palabras clave principales del uso (más de 3 letras)
                            const usoKeywords = pUso.split(/[\s,.-]+/).filter(w => w.length > 3);

                            const extra = allProducts.filter(item => {
                                if (item.id === p.id || similar.includes(item)) return false;
                                if (!item.specs) return false;

                                const itemUsoSpec = item.specs.find(s => s.label.toLowerCase().includes('uso'));
                                if (!itemUsoSpec) return false;

                                const itemUso = itemUsoSpec.val.toLowerCase();
                                // Checar si hay coincidencia de palabras clave
                                return usoKeywords.some(kw => itemUso.includes(kw));
                            });
                            similar = similar.concat(extra);
                        }
                    }

                    // Mezclar aleatoriamente y tomar 4
                    similar = similar.sort(() => 0.5 - Math.random()).slice(0, 4);

                    similarGrid.innerHTML = '';
                    if (similar.length > 0) {
                        const section = document.getElementById('similarProductsSection');
                        if (section) section.style.display = 'block';
                        const similarFrag = document.createDocumentFragment();
                        similar.forEach(sp => {
                            const card = document.createElement("div");
                            card.className = "product-card similar-product-card";

                            card.innerHTML = generateProductCardHTML(sp, true);
                            const imgEl = card.querySelector('.product-image img');
                            if (imgEl) {
                                const ph = card.querySelector('.placeholder-icon');
                                imgEl.addEventListener('error', () => {
                                    imgEl.style.display = 'none';
                                    if (ph) ph.style.display = 'flex';
                                });
                            }
                            similarFrag.appendChild(card);
                        });
                        similarGrid.appendChild(similarFrag);
                    } else {
                        // Ocultar la sección si no hay productos similares
                        similarGrid.parentElement.parentElement.style.display = 'none';
                    }
                }
            } else {
                document.getElementById('detailTitle').innerText = "Producto No Encontrado";
                document.getElementById('detailDesc').innerText = "Verifique la dirección web o regrese al catálogo.";
            }
        }
    }
});

/**
 * Helper to generate HTML for product cards following DRY principles.
 * @param {Object} p - Product data object
 * @param {boolean} isSimilar - If true, generates the compact version for "Similar Products"
 * @returns {string} HTML string
 */
function generateProductCardHTML(p, isSimilar = false) {
    const url = p.url ? p.url : 'index.html#contact';
    const safeUrl = sanitizeURL(url);
    const actionBtnHTML = p.url
            ? `<a href="${safeUrl}" class="btn btn-primary btn-block ${isSimilar ? 'btn-sm' : ''}">Ver Detalles${!isSimilar ? ' de Producto' : ''}</a>`
        : `<a href="${safeUrl}" class="btn btn-outline btn-block btn-secondary-outline ${isSimilar ? 'btn-sm' : ''}">${isSimilar ? 'Cotizar' : 'Solicitar Cotización'}</a>`;

    const specsHTML = p.specs 
        ? (isSimilar ? p.specs.slice(0, 2) : p.specs).map(s => 
            `<div class="spec-item"><span class="spec-label">${escapeHTML(s.label)}:</span> <span ${!isSimilar ? `title="${escapeHTML(s.val)}"` : ''}>${escapeHTML(s.val)}</span></div>`
          ).join('') 
        : '';

    return `
        <a href="${safeUrl}" class="product-image">
                <img src="${sanitizeURL(p.img)}" alt="${escapeHTML(p.title)}"/>
            <div class="placeholder-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
            </div>
            <div class="image-overlay"></div>
        </a>
        <div class="product-info ${isSimilar ? 'similar-product-card-body' : ''}">
            <h3 class="product-title ${isSimilar ? 'line-clamp-2' : ''}">${formatTitleHTML(p.title)}</h3>
            <div class="mb-2">
                <p class="product-desc ${isSimilar ? 'line-clamp-2' : 'line-clamp-3'}" ${!isSimilar ? `id="desc-${escapeHTML(p.id)}"` : ''}>${escapeHTML(p.desc)}</p>
                ${!isSimilar ? `<a href="${safeUrl}" class="product-see-more">Ver más</a>` : ''}
            </div>
            <div class="product-specs">
                ${specsHTML}
            </div>
            <div class="card-action ${isSimilar ? 'similar-btn-container' : ''}">
                ${actionBtnHTML}
            </div>
        </div>
    `;
}
