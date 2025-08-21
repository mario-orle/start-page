// JAMstack Start Page - Generación dinámica del contenido

class StartPage {
    constructor() {
        this.config = null;
        this.mainContent = document.getElementById('main-content');
        this.init();
    }

    async init() {
        try {
            // Cargar configuración
            await this.loadConfig();
            
            // Generar página
            this.generatePage();
            
            // Inicializar funcionalidades
            this.initFeatures();
            
        } catch (error) {
            console.error('Error al cargar la configuración:', error);
            this.showError();
        }
    }

    async loadConfig() {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.config = await response.json();
        
        // Actualizar título de la página
        document.title = this.config.settings.title;
    }

    generatePage() {
        // Generar barra de búsqueda
        this.generateSearchBox();
        
        // Generar categorías
        this.generateCategories();
        
        // Generar reloj
        this.generateClock();
        
        // Generar partículas si están habilitadas
        if (this.config.settings.particles) {
            this.createParticles();
        }
    }

    generateSearchBox() {
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box';
        searchBox.innerHTML = `
            <div class="search-container">
                <input type="text" placeholder="${this.config.settings.searchPlaceholder}" id="search-input">
                <button id="search-btn"><i class="fas fa-search"></i></button>
                <div class="autocomplete-dropdown" id="autocomplete-dropdown"></div>
            </div>
        `;
        
        this.mainContent.insertBefore(searchBox, this.mainContent.firstChild);
        
        // Funcionalidad de búsqueda
        this.initSearch(searchBox);
    }

    generateCategories() {
        this.config.categories.forEach(category => {
            const section = document.createElement('section');
            section.className = 'category';
            section.id = `category-${category.id}`;
            
            section.innerHTML = `
                <h2><i class="${category.icon}"></i> ${category.title}</h2>
                <div class="links-grid" id="grid-${category.id}">
                    ${this.generateSiteLinks(category.sites)}
                </div>
            `;
            
            this.mainContent.appendChild(section);
        });
        
        // Inicializar efectos en las tarjetas
        this.initLinkCards();
    }

    generateSiteLinks(sites) {
        return sites.map(site => `
            <a href="${site.url}" class="link-card" data-site="${site.name.toLowerCase().replace(/\s+/g, '-')}">
                <i class="${site.icon}" style="color: ${site.color}"></i>
                <span>${site.name}</span>
            </a>
        `).join('');
    }

    generateClock() {
        const clock = document.createElement('div');
        clock.className = 'clock';
        clock.innerHTML = '<i class="fas fa-clock"></i> <span id="time"></span>';
        
        document.body.insertBefore(clock, document.body.firstChild);
        
        // Funcionalidad del reloj
        this.initClock();
    }

    initSearch(searchBox) {
        const searchInput = searchBox.querySelector('#search-input');
        const searchBtn = searchBox.querySelector('#search-btn');
        const autocompleteDropdown = searchBox.querySelector('#autocomplete-dropdown');
        
        // Foco automático al cargar la página
        searchInput.focus();
        
        // Variables para el autocompletado
        let autocompleteTimeout;
        let currentSuggestions = [];
        let selectedIndex = -1;
        
        const performSearch = (query = null) => {
            const searchQuery = query || searchInput.value.trim();
            if (searchQuery) {
                // Detectar si es una URL
                if (this.isValidUrl(searchQuery)) {
                    // Si es una URL válida, navegar directamente
                    window.location.href = this.normalizeUrl(searchQuery);
                } else {
                    // Buscar si coincide con algún sitio configurado
                    const matchingSite = this.findMatchingSite(searchQuery);
                    if (matchingSite) {
                        window.location.href = matchingSite.url;
                        return;
                    }
                    
                    // Si no es URL ni sitio configurado, buscar en Google
                    const searchUrl = `${this.config.settings.searchEngine}${encodeURIComponent(searchQuery)}`;
                    window.location.href = searchUrl;
                }
            }
        };
        
        // Función para obtener sugerencias locales basadas en la configuración
        const getAutocompleteSuggestions = (query) => {
            if (query.length < 2) {
                hideAutocomplete();
                return;
            }
            
            const queryLower = query.toLowerCase();
            const suggestions = [];
            
            // Buscar en categorías
            this.config.categories.forEach(category => {
                if (category.title.toLowerCase().includes(queryLower)) {
                    suggestions.push(`${category.title} (categoría)`);
                }
                
                // Buscar en sitios de cada categoría
                category.sites.forEach(site => {
                    if (site.name.toLowerCase().includes(queryLower)) {
                        suggestions.push(site.name);
                    }
                });
            });
            
            // Añadir sugerencias comunes de búsqueda
            const commonSuggestions = [
                'google', 'youtube', 'reddit', 'twitter', 'facebook', 'instagram',
                'netflix', 'spotify', 'amazon', 'wikipedia', 'maps', 'traductor',
                'clima', 'tiempo', 'noticias', 'deportes', 'música', 'películas'
            ];
            
            commonSuggestions.forEach(suggestion => {
                if (suggestion.includes(queryLower) && !suggestions.includes(suggestion)) {
                    suggestions.push(suggestion);
                }
            });
            
            // Limitar a 8 sugerencias y eliminar duplicados
            const uniqueSuggestions = [...new Set(suggestions)].slice(0, 8);
            
            if (uniqueSuggestions.length > 0) {
                currentSuggestions = uniqueSuggestions;
                showAutocomplete(currentSuggestions);
            } else {
                hideAutocomplete();
            }
        };
        
        // Función para mostrar el autocompletado
        const showAutocomplete = (suggestions) => {
            autocompleteDropdown.innerHTML = suggestions.map((suggestion, index) => {
                const matchingSite = this.findMatchingSite(suggestion);
                const siteInfo = matchingSite ? ` - ${matchingSite.url}` : '';
                return `<div class="autocomplete-item" data-index="${index}">
                    <span class="suggestion-text">${suggestion}</span>
                    ${siteInfo ? `<span class="site-url">${siteInfo}</span>` : ''}
                </div>`;
            }).join('');
            autocompleteDropdown.style.display = 'block';
            selectedIndex = -1;
        };
        
        // Función para ocultar el autocompletado
        const hideAutocomplete = () => {
            autocompleteDropdown.style.display = 'none';
            currentSuggestions = [];
            selectedIndex = -1;
        };
        
        // Función para seleccionar elemento del autocompletado
        const selectAutocompleteItem = (index) => {
            if (index >= 0 && index < currentSuggestions.length) {
                searchInput.value = currentSuggestions[index];
                hideAutocomplete();
                searchInput.focus();
            }
        };
        
        // Event listeners para el input
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            // Limpiar timeout anterior
            clearTimeout(autocompleteTimeout);
            
            // Ocultar autocompletado si no hay texto
            if (query.length < 2) {
                hideAutocomplete();
                return;
            }
            
            // Mostrar indicador de carga
            autocompleteDropdown.innerHTML = '<div class="autocomplete-item loading">Buscando...</div>';
            autocompleteDropdown.style.display = 'block';
            
            // Debounce para evitar muchas peticiones
            autocompleteTimeout = setTimeout(() => {
                getAutocompleteSuggestions(query);
            }, 300);
        });
        
        // Event listeners para el teclado
        searchInput.addEventListener('keydown', (e) => {
            if (autocompleteDropdown.style.display === 'block') {
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        selectedIndex = Math.min(selectedIndex + 1, currentSuggestions.length - 1);
                        updateAutocompleteSelection();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        selectedIndex = Math.max(selectedIndex - 1, -1);
                        updateAutocompleteSelection();
                        break;
                    case 'Enter':
                        e.preventDefault();
                        if (selectedIndex >= 0) {
                            selectAutocompleteItem(selectedIndex);
                        } else {
                            performSearch();
                        }
                        break;
                    case 'Escape':
                        hideAutocomplete();
                        searchInput.focus();
                        break;
                }
            } else if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Función para actualizar la selección visual
        const updateAutocompleteSelection = () => {
            const items = autocompleteDropdown.querySelectorAll('.autocomplete-item');
            items.forEach((item, index) => {
                item.classList.toggle('selected', index === selectedIndex);
            });
        };
        
        // Event listeners para el botón
        searchBtn.addEventListener('click', () => performSearch());
        
        // Event listeners para el autocompletado
        autocompleteDropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('autocomplete-item')) {
                const index = parseInt(e.target.dataset.index);
                selectAutocompleteItem(index);
            }
        });
        
        // Ocultar autocompletado al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!searchBox.contains(e.target)) {
                hideAutocomplete();
            }
        });
        
        // Ocultar autocompletado al perder el foco del input
        searchInput.addEventListener('blur', () => {
            // Pequeño delay para permitir clics en las sugerencias
            setTimeout(() => {
                if (!autocompleteDropdown.contains(document.activeElement)) {
                    hideAutocomplete();
                }
            }, 150);
        });
    }

    // Método para detectar si el texto es una URL válida
    isValidUrl(text) {
        // Patrones para detectar URLs
        const urlPatterns = [
            /^https?:\/\/.+/i,           // http:// o https://
            /^www\..+/i,                  // www.
            /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/i,  // dominio.com
            /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}\/.*/i  // dominio.com/ruta
        ];
        
        return urlPatterns.some(pattern => pattern.test(text));
    }

    // Método para normalizar URLs (añadir https:// si no lo tiene)
    normalizeUrl(url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            if (url.startsWith('www.')) {
                return 'https://' + url;
            } else {
                return 'https://' + url;
            }
        }
        return url;
    }

    // Método para encontrar sitios que coincidan con la búsqueda
    findMatchingSite(query) {
        const queryLower = query.toLowerCase().trim();
        
        // Limpiar el query de indicadores de categoría
        const cleanQuery = queryLower.replace(/\s*\(categoría\)$/, '');
        
        // Buscar coincidencias exactas primero
        for (const category of this.config.categories) {
            for (const site of category.sites) {
                if (site.name.toLowerCase() === cleanQuery) {
                    return site;
                }
            }
        }
        
        // Buscar coincidencias parciales
        for (const category of this.config.categories) {
            for (const site of category.sites) {
                if (site.name.toLowerCase().includes(cleanQuery)) {
                    return site;
                }
            }
        }
        
        return null;
    }

    initLinkCards() {
        const linkCards = document.querySelectorAll('.link-card');
        
        linkCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            card.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    initClock() {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            document.getElementById('time').textContent = timeString;
        };
        
        updateClock();
        setInterval(updateClock, 1000);
    }

    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);
        
        const particleCount = this.config.settings.particleCount || 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    initFeatures() {
        // Aquí puedes añadir funcionalidades adicionales
        console.log('Página de inicio JAMstack cargada correctamente');
    }

    showError() {
        this.mainContent.innerHTML = `
            <div class="error-message">
                <h2>Error al cargar la configuración</h2>
                <p>No se pudo cargar el archivo config.json</p>
                <button onclick="location.reload()">Reintentar</button>
            </div>
        `;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new StartPage();
});

// Añadir estilos CSS adicionales para las nuevas funcionalidades
const additionalStyles = `
    .search-box {
        text-align: center;
        margin: 0 0 15px 0;
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    
    .search-container {
        position: relative;
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    
    .search-box input {
        padding: 8px 15px;
        border: none;
        border-radius: 20px;
        width: 250px;
        font-size: 13px;
        background: rgba(255,255,255,0.1);
        color: #e0e0e0;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        outline: none;
        border: 1px solid rgba(255,255,255,0.2);
        backdrop-filter: blur(10px);
    }
    
    .search-box input::placeholder {
        color: rgba(255,255,255,0.6);
    }
    
    .search-box button {
        padding: 8px 15px;
        border: none;
        border-radius: 20px;
        background: linear-gradient(45deg, #00d4ff, #0099cc);
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 3px 10px rgba(0,212,255,0.3);
        border: 1px solid rgba(0,212,255,0.3);
    }
    
    .search-box button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(0,212,255,0.4);
        background: linear-gradient(45deg, #00e6ff, #00b3e6);
    }
    
    .autocomplete-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(30, 30, 30, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        margin-top: 5px;
        max-height: 200px;
        overflow-y: auto;
        backdrop-filter: blur(15px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: none;
    }
    
    .autocomplete-item {
        padding: 10px 15px;
        cursor: pointer;
        color: #e0e0e0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.2s ease;
        font-size: 13px;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    
    .suggestion-text {
        font-weight: 500;
    }
    
    .site-url {
        font-size: 11px;
        color: rgba(0, 212, 255, 0.7);
        font-family: monospace;
    }
    
    .autocomplete-item.loading {
        color: rgba(255, 255, 255, 0.6);
        font-style: italic;
        text-align: center;
        cursor: default;
    }
    
    .autocomplete-item:last-child {
        border-bottom: none;
    }
    
    .autocomplete-item:hover {
        background: rgba(0, 212, 255, 0.1);
        color: #00d4ff;
    }
    
    .autocomplete-item.selected {
        background: rgba(0, 212, 255, 0.2);
        color: #00d4ff;
    }
    
    .autocomplete-dropdown::-webkit-scrollbar {
        width: 6px;
    }
    
    .autocomplete-dropdown::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }
    
    .autocomplete-dropdown::-webkit-scrollbar-thumb {
        background: rgba(0, 212, 255, 0.5);
        border-radius: 3px;
    }
    
    .autocomplete-dropdown::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 212, 255, 0.7);
    }
    
    .clock {
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0,212,255,0.1);
        padding: 6px 12px;
        border-radius: 15px;
        color: #00d4ff;
        font-size: 0.8rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(0,212,255,0.3);
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        z-index: 1000;
    }
    
    .clock i {
        margin-right: 5px;
        color: #00d4ff;
    }
    
    .particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    }
    
    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(0,212,255,0.3);
        border-radius: 50%;
        animation: float linear infinite;
    }
    
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .error-message {
        text-align: center;
        padding: 40px;
        color: #e0e0e0;
    }
    
    .error-message h2 {
        color: #ff6b6b;
        margin-bottom: 20px;
    }
    
    .error-message button {
        background: #00d4ff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
        margin-top: 20px;
    }
    
    @media (max-width: 768px) {
        .search-box input {
            width: 180px;
        }
        
        .autocomplete-dropdown {
            left: 0;
            right: 0;
            width: 100%;
        }
        
        .clock {
            position: static;
            margin: 10px auto;
            display: inline-block;
            width: fit-content;
        }
    }
    
    @media (max-height: 720px) {
        .search-box {
            margin: 0 0 10px 0;
        }
        
        .search-box input {
            padding: 6px 12px;
            font-size: 12px;
            width: 200px;
        }
        
        .search-box button {
            padding: 6px 12px;
        }
        
        .clock {
            font-size: 0.7rem;
            padding: 4px 10px;
        }
    }
`;

// Insertar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
