// Funcionalidades interactivas para la página de inicio

document.addEventListener('DOMContentLoaded', function() {
    // Añadir efecto de escritura solo al texto del título (no al icono)
    const titleText = document.querySelector('.title-text');
    const originalText = titleText.textContent;
    titleText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            titleText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Iniciar la animación después de un pequeño delay
    setTimeout(typeWriter, 500);

    // Añadir efecto de hover mejorado a las tarjetas
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Añadir efecto de click
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Añadir funcionalidad de búsqueda rápida
    const searchBox = document.createElement('div');
    searchBox.className = 'search-box';
    searchBox.innerHTML = `
        <input type="text" placeholder="Buscar en Google..." id="search-input">
        <button id="search-btn"><i class="fas fa-search"></i></button>
    `;
    
    // Insertar después del header
    document.querySelector('header').after(searchBox);
    
    // Funcionalidad de búsqueda
    document.getElementById('search-btn').addEventListener('click', performSearch);
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const query = document.getElementById('search-input').value.trim();
        if (query) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        }
    }

    // Añadir reloj en tiempo real
    const clock = document.createElement('div');
    clock.className = 'clock';
    clock.innerHTML = '<i class="fas fa-clock"></i> <span id="time"></span>';
    
    // Insertar en el header
    document.querySelector('header').appendChild(clock);
    
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('time').textContent = timeString;
    }
    
    updateClock();
    setInterval(updateClock, 1000);

    // Añadir efecto de partículas de fondo
    createParticles();
});

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Añadir estilos CSS adicionales para las nuevas funcionalidades
const additionalStyles = `
    .search-box {
        text-align: center;
        margin: 15px 0 20px 0;
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    
    .search-box input {
        padding: 10px 18px;
        border: none;
        border-radius: 25px;
        width: 280px;
        font-size: 14px;
        background: rgba(255,255,255,0.1);
        color: #e0e0e0;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        outline: none;
        border: 1px solid rgba(255,255,255,0.2);
        backdrop-filter: blur(10px);
    }
    
    .search-box input::placeholder {
        color: rgba(255,255,255,0.6);
    }
    
    .search-box button {
        padding: 10px 18px;
        border: none;
        border-radius: 25px;
        background: linear-gradient(45deg, #00d4ff, #0099cc);
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,212,255,0.3);
        border: 1px solid rgba(0,212,255,0.3);
    }
    
    .search-box button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0,212,255,0.4);
        background: linear-gradient(45deg, #00e6ff, #00b3e6);
    }
    
    .clock {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(0,212,255,0.1);
        padding: 8px 16px;
        border-radius: 20px;
        color: #00d4ff;
        font-size: 0.9rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(0,212,255,0.3);
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }
    
    .clock i {
        margin-right: 6px;
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
        width: 3px;
        height: 3px;
        background: rgba(0,212,255,0.4);
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
    
    @media (max-width: 768px) {
        .search-box input {
            width: 200px;
        }
        
        .clock {
            position: static;
            margin-top: 15px;
            display: inline-block;
        }
    }
    
    @media (max-height: 800px) {
        .search-box {
            margin: 10px 0 15px 0;
        }
        
        .search-box input {
            padding: 8px 15px;
            font-size: 13px;
        }
        
        .search-box button {
            padding: 8px 15px;
        }
    }
`;

// Insertar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
