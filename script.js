// ====================================================
// CONFIGURACIÓN DE LA FECHA: 14 DE JUNIO DE 2025
// Meses en JS: 0=Enero, ... 5=Junio
// ====================================================
const anniversaryDate = new Date(2025, 5, 14, 0, 0, 0); 


const fileScreen = document.getElementById('file-screen');
const mainContent = document.getElementById('main-content');
const music = document.getElementById('bg-music');
const canvas = document.getElementById('tree');
const ctx = canvas.getContext('2d');

// Frases a escribir
const phrases = [
    "Para el amor de mi vida:",
    "Si pudiera elegir un lugar seguro, sería a tu lado.",
    "Cuanto más tiempo estoy contigo, más te amo.",
    "— I Love You! ❤️"
];

// Función efecto máquina de escribir
function typeWriter(text, elementId, delay = 55) {
    return new Promise(resolve => {
        let i = 0;
        const element = document.getElementById(elementId);
        element.innerHTML = ""; // Limpiar antes de escribir
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, delay);
            } else {
                resolve();
            }
        }
        type();
    });
}

// --- FUNCIÓN PRINCIPAL CORREGIDA ---
function startExperience() {
    // 1. Evitar múltiples clics
    fileScreen.removeEventListener('click', startExperience);
    
    // 2. Iniciar transición visual inmediatamente
    fileScreen.classList.remove('active');
    fileScreen.classList.add('hidden');
    
    // 3. Mostrar contenido principal
    mainContent.classList.remove('hidden');
    mainContent.classList.add('active');

    // 4. Intentar reproducir música suavemente (sin bloquear si falla)
    music.volume = 0.7; // Volumen inicial
    music.play().then(() => {
        console.log("Música iniciada correctamente");
    }).catch(error => {
        console.warn("El navegador bloqueó el autoplay de audio. La experiencia continuará sin música inicial.", error);
        // No pasa nada, el resto sigue funcionando
    });
    
    // 5. Iniciar animaciones después de un breve retraso para que la transición se vea bien
    setTimeout(() => {
        initTree();
        runTextSequence();
    }, 800);
}

// Secuencia de textos y contador
async function runTextSequence() {
    await new Promise(r => setTimeout(r, 500)); // Pausa inicial
    await typeWriter(phrases[0], 'line1');
    await new Promise(r => setTimeout(r, 1200));
    await typeWriter(phrases[1], 'line2');
    await new Promise(r => setTimeout(r, 1200));
    await typeWriter(phrases[2], 'line3');
    await new Promise(r => setTimeout(r, 1200));
    await typeWriter(phrases[3], 'final-line', 100); // Última línea más lento
    
    // Mostrar contador al terminar
    const counter = document.getElementById('counter');
    counter.classList.add('fade-in-visible');
    updateCounter();
    setInterval(updateCounter, 1000);
}

// --- Lógica del Árbol (sin cambios mayores) ---
function initTree() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const w = canvas.width;
    const h = canvas.height;
    
    // Tronco
    ctx.strokeStyle = '#795548';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(w/2, h);
    ctx.quadraticCurveTo(w/2, h-100, w/2, h-130);
    ctx.stroke();

    let count = 0;
    const maxHearts = 200; // Más corazones
    
    function addLeaf() {
        if (count < maxHearts) {
            const t = Math.random() * Math.PI * 2;
            const r = Math.sqrt(Math.random());
            // Fórmula del corazón para la copa
            const scaleX = w / 40;
            const scaleY = h / 40;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            const finalX = (w/2) + x * scaleX * r;
            const finalY = (h-180) + y * scaleY * r;
            
            drawMiniHeart(finalX, finalY);
            count++;
            // Velocidad de aparición variable
            setTimeout(addLeaf, Math.random() * 50 + 20);
        }
    }
    addLeaf();
}

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

function drawMiniHeart(x, y) {
    const size = Math.random() * 6 + 4;
    // Paleta de colores rojos/rosas variados
    const hues = [340, 350, 360, 10, 330];
    const hue = hues[Math.floor(Math.random() * hues.length)];
    const saturation = Math.random() * 20 + 70; // 70-90%
    const lightness = Math.random() * 30 + 50; // 50-80%
    
    ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    ctx.beginPath();
    // Dibujar un corazón simple
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
}

// --- Lógica del Contador ---
function updateCounter() {
    const now = new Date();
    let diff = now - anniversaryDate;
    if (diff < 0) diff = 0; // Evitar negativos si es fecha futura
    
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = d;
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}

// Esperar el primer clic
fileScreen.addEventListener('click', startExperience, { once: true });    
