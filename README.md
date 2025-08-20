# 🏠 Mi Página de Inicio JAMstack

Una página de inicio moderna y atractiva para tu navegador con arquitectura JAMstack. Ahora puedes gestionar fácilmente todos tus enlaces favoritos desde un archivo de configuración JSON y generar páginas estáticas completamente funcionales.

## ✨ Características

- 🎨 **Diseño moderno** con tema oscuro y efectos visuales
- 🔗 **Enlaces organizados** por categorías (Noticias, Redes Sociales, Streaming)
- 🔍 **Barra de búsqueda** integrada con Google
- ⏰ **Reloj en tiempo real** 
- 📱 **Diseño responsive** para todos los dispositivos
- ✨ **Efectos hover** en las tarjetas
- 🎭 **Partículas animadas** de fondo
- 🚀 **Arquitectura JAMstack** para fácil gestión
- 🔨 **Build estático** - HTML completamente pre-renderizado

## 🏗️ Arquitectura JAMstack

### 📁 Estructura de Archivos

```
start-page/
├── index.html          # Template HTML (estructura básica)
├── config.json         # Configuración de sitios y ajustes
├── styles.css          # Estilos CSS
├── build.js            # Script de build para generar HTML estático
├── package.json        # Dependencias y scripts de Node.js
├── .gitignore          # Archivos a excluir del repositorio
├── dist/               # Directorio de salida (generado automáticamente)
│   ├── index.html      # HTML estático final
│   └── config.json     # Configuración copiada
└── README.md           # Este archivo
```

### 🔧 Archivo de Configuración

El archivo `config.json` contiene toda la configuración de tu página:

```json
{
  "categories": [
    {
      "id": "news",
      "title": "Noticias",
      "icon": "fas fa-newspaper",
      "sites": [
        {
          "name": "El País",
          "url": "https://www.elpais.com",
          "icon": "fas fa-newspaper",
          "color": "#00d4ff"
        }
      ]
    }
  ],
  "settings": {
    "title": "Nueva pestaña",
    "searchEngine": "https://www.google.com/search?q=",
    "particles": true
  }
}
```

## 🚀 Flujo de Trabajo

### 1. **Desarrollo** (Archivos fuente)
- Edita `config.json` para añadir/quitar sitios
- Modifica `styles.css` para cambiar estilos
- Ajusta `index.html` si necesitas cambiar la estructura

### 2. **Build** (Generación estática)
- Ejecuta `npm run build` para generar HTML estático
- Se crea el directorio `dist/` con la página final
- Todo el JavaScript y CSS se incluye inline

### 3. **Despliegue** (Página estática)
- El directorio `dist/` contiene solo archivos estáticos
- Puedes subirlo a cualquier hosting estático
- No necesita servidor ni Node.js en producción

## 🔨 Comandos de Build

### Instalación
```bash
npm install
```

### Build de producción
```bash
npm run build
```

### Desarrollo con auto-reload
```bash
npm run dev
```

### Watch mode (auto-build al cambiar archivos)
```bash
npm run watch
```

### Limpiar archivos de build
```bash
npm run clean
```

## 🌐 Enlaces Incluidos

### 📰 Noticias
- **El País** - Periódico de referencia
- **El Mundo** - Noticias nacionales e internacionales
- **ABC** - Diario español

### 📱 Redes Sociales
- **Reddit** - Comunidades y discusiones
- **YouTube** - Videos y contenido multimedia

### 🎬 Streaming
- **Prime Video** - Películas y series de Amazon
- **Disney+** - Contenido de Disney, Marvel, Star Wars

## 🚀 Cómo Usar

### 1. **Configurar como Página de Inicio**

#### Chrome/Edge:
1. Ejecuta `npm run build`
2. Abre `dist/index.html` en tu navegador
3. Ve a Configuración → Al abrir Chrome → Establecer páginas
4. Añade la ruta completa a `dist/index.html`

#### Firefox:
1. Ejecuta `npm run build`
2. Abre `dist/index.html` en tu navegador
3. Ve a Opciones → General → Página de inicio
4. Pega la ruta completa a `dist/index.html`

### 2. **Usar Localmente**
- Ejecuta `npm run build`
- Abre `dist/index.html` en tu navegador
- Todos los enlaces se abrirán en la misma pestaña

## 🛠️ Personalización

### Añadir Nuevos Sitios

Para añadir un nuevo sitio, edita `config.json`:

```json
{
  "name": "Netflix",
  "url": "https://www.netflix.com",
  "icon": "fas fa-film",
  "color": "#e50914"
}
```

### Añadir Nuevas Categorías

```json
{
  "id": "nueva-categoria",
  "title": "Nueva Categoría",
  "icon": "fas fa-icono",
  "color": "#00d4ff",
  "sites": [
    // Lista de sitios...
  ]
}
```

### Cambiar Configuración

En la sección `settings` puedes modificar:

- **title**: Título de la página
- **searchEngine**: Motor de búsqueda
- **searchPlaceholder**: Texto del placeholder de búsqueda
- **particles**: Habilitar/deshabilitar partículas
- **particleCount**: Número de partículas

### Cambiar Colores

Edita `styles.css` para personalizar:
- Colores de fondo
- Colores de las tarjetas
- Colores específicos de cada plataforma

## 🎨 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Flexbox y Grid
- **JavaScript ES6+** - Generación dinámica del contenido
- **Font Awesome** - Iconos vectoriales
- **JAMstack** - Arquitectura moderna y escalable
- **Node.js** - Sistema de build y herramientas de desarrollo

## 🔧 Requisitos

### Desarrollo
- Node.js 14.0.0 o superior
- npm o yarn

### Producción
- Navegador web moderno (Chrome 60+, Firefox 55+, Safari 12+)
- Conexión a internet para cargar iconos y fuentes
- Cualquier hosting estático (GitHub Pages, Netlify, Vercel, etc.)

## 📱 Compatibilidad

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Móvil (iOS, Android)
- ✅ Tablet
- ✅ Todos los navegadores modernos

## 🚀 Ventajas de JAMstack + Build

- **Fácil mantenimiento**: Solo edita `config.json` para cambiar enlaces
- **Escalable**: Añade tantas categorías y sitios como quieras
- **Rápido**: Página completamente estática, sin JavaScript de carga
- **Portable**: Funciona en cualquier hosting estático
- **Versionable**: Control de versiones con Git
- **SEO-friendly**: HTML completamente renderizado
- **Sin dependencias**: No necesita Node.js en producción

## 🔍 Desarrollo Local

### Desarrollo con auto-reload:
```bash
npm run dev
```

### Watch mode para desarrollo:
```bash
npm run watch
```

### Build manual:
```bash
npm run build
```

## 🌐 Despliegue

### GitHub Pages
1. Sube el directorio `dist/` a tu repositorio
2. Activa GitHub Pages en la configuración del repositorio

### Netlify
1. Conecta tu repositorio a Netlify
2. Configura el directorio de build como `dist/`
3. Netlify se construirá automáticamente

### Vercel
1. Conecta tu repositorio a Vercel
2. Configura el directorio de salida como `dist/`
3. Vercel detectará automáticamente que es un sitio estático

## 🤝 Contribuir

Si quieres mejorar esta página de inicio:
1. Haz un fork del proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

¡Disfruta de tu nueva página de inicio JAMstack completamente estática! 🎉

## 💡 Ejemplos de Uso

### Añadir un nuevo sitio de noticias:

```json
{
  "name": "La Vanguardia",
  "url": "https://www.lavanguardia.com",
  "icon": "fas fa-newspaper",
  "color": "#00d4ff"
}
```

### Cambiar el motor de búsqueda a Bing:

```json
{
  "searchEngine": "https://www.bing.com/search?q=",
  "searchPlaceholder": "Buscar en Bing..."
}
```

### Deshabilitar partículas:

```json
{
  "particles": false
}
```

### Flujo de trabajo típico:

```bash
# 1. Editar configuración
# Edita config.json para añadir/quitar sitios

# 2. Generar build
npm run build

# 3. Probar localmente
# Abre dist/index.html en tu navegador

# 4. Desplegar
# Sube el directorio dist/ a tu hosting
```
