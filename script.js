// Funcionalidades interactivas para la página de inicio

document.addEventListener('DOMContentLoaded', function() {
    // Añadir efecto de escritura al título
    const title = document.querySelector('header h1');
    const originalText = title.innerHTML;
    title.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.innerHTML += originalText.charAt(i);
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
            this.style.transform = 'translateY(-8px) scale(1.02)';
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
    
    for (let i = 0; i < 50; i++) {
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
        margin: 20px 0 30px 0;
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    
    .search-box input {
        padding: 12px 20px;
        border: none;
        border-radius: 25px;
        width: 300px;
        font-size: 16px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        outline: none;
    }
    
    .search-box button {
        padding: 12px 20px;
        border: none;
        border-radius: 25px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    .search-box button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
    }
    
    .clock {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255,255,255,0.2);
        padding: 10px 20px;
        border-radius: 25px;
        color: white;
        font-size: 1.1rem;
        backdrop-filter: blur(10px);
    }
    
    .clock i {
        margin-right: 8px;
        color: #ffd700;
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
        width: 4px;
        height: 4px;
        background: rgba(255,255,255,0.3);
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
            margin-top: 20px;
            display: inline-block;
        }
    }
`;

// Insertar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
