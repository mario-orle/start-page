const fs = require('fs');
const path = require('path');

// Configuración
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const distDir = 'dist';

// Crear directorio dist si no existe
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Función para generar el HTML
function generateHTML() {
    const template = fs.readFileSync('index.html', 'utf8');
    
    // Generar contenido de categorías
    let categoriesHTML = '';
    config.categories.forEach(category => {
        let sitesHTML = '';
        category.sites.forEach(site => {
            sitesHTML += `
                <a href="${site.url}" class="site-card" target="_blank" rel="noopener">
                    <i class="${site.icon}" style="color: ${site.color}"></i>
                    <span>${site.name}</span>
                </a>
            `;
        });
        
        categoriesHTML += `
            <section class="category">
                <h2 class="category-title">
                    <i class="${category.icon}" style="color: ${category.color}"></i>
                    ${category.title}
                </h2>
                <div class="sites-grid">
                    ${sitesHTML}
                </div>
            </section>
        `;
    });
    
    // Generar barra de búsqueda
    const searchHTML = `
        <div class="search-container">
            <form action="${config.settings.searchEngine}" method="get" target="_blank">
                <input 
                    type="text" 
                    name="q" 
                    placeholder="${config.settings.searchPlaceholder}"
                    class="search-input"
                    autocomplete="off"
                >
                <button type="submit" class="search-button">
                    <i class="fas fa-search"></i>
                </button>
            </form>
        </div>
    `;
    
    // Generar título personalizado
    const titleHTML = `
        <h1 class="main-title">${config.settings.title}</h1>
    `;
    
    // Reemplazar marcadores en el template
    let finalHTML = template
        .replace('<!-- El contenido se generará dinámicamente desde JavaScript -->', 
                titleHTML + searchHTML + categoriesHTML);
    
    // Añadir configuración de tema y partículas
    const themeClass = config.settings.theme === 'dark' ? 'dark-theme' : 'light-theme';
    finalHTML = finalHTML.replace('<body>', `<body class="${themeClass}">`);
    
    // Añadir configuración de partículas si está habilitado
    if (config.settings.particles) {
        const particlesScript = `
            <script>
                window.particleConfig = {
                    count: ${config.settings.particleCount},
                    enabled: true
                };
            </script>
        `;
        finalHTML = finalHTML.replace('</body>', particlesScript + '</body>');
    }
    
    return finalHTML;
}

// Función para copiar archivos estáticos
function copyStaticFiles() {
    const staticFiles = ['styles.css', 'script.js'];
    
    staticFiles.forEach(file => {
        if (fs.existsSync(file)) {
            fs.copyFileSync(file, path.join(distDir, file));
        }
    });
}

// Función principal de build
function build() {
    console.log('🚀 Iniciando build JAMstack...');
    
    try {
        // Generar HTML
        const html = generateHTML();
        fs.writeFileSync(path.join(distDir, 'index.html'), html);
        console.log('✅ HTML generado correctamente');
        
        // Copiar archivos estáticos
        copyStaticFiles();
        console.log('✅ Archivos estáticos copiados');
        
        console.log('🎉 Build completado en la carpeta dist/');
        
    } catch (error) {
        console.error('❌ Error durante el build:', error);
        process.exit(1);
    }
}

// Ejecutar build si se llama directamente
if (require.main === module) {
    build();
}

module.exports = { build };

