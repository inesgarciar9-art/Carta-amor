// ==========================================
// CONFIGURACIÓN DE FECHA: 14 DE JUNIO DE 2025
// ==========================================
// Año, Mes (Junio es 5), Día, Hora, Minuto, Segundo
const startDate = new Date(2025, 5, 14, 0, 0, 0); 


// --- Variables del Sistema ---
const canvas = document.getElementById('tree-canvas');
const ctx = canvas.getContext('2d');
const music = document.getElementById('bg-music');
const clickHint = document.querySelector('.click-hint');

let width, height;
let treeImage = new Image();
let assetsLoaded = false;
let animationStarted = false;

// Paleta de colores de corazones (rojos, rosados, vinos)
const heartColors = ['#D32F2F', '#C2185B', '#E91E63', '#FF5252', '#F48FB1', '#FFCDD2', '#AD1457'];
let leaves = [];

// --- Carga de Recursos ---
treeImage.src = trunkImageSrc; // Usamos la variable definida en el HTML
treeImage.onload = () => {
    assetsLoaded = true;
};

// --- Funciones de Ayuda ---

// Ajustar canvas al tamaño del contenedor
function resize() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width * window.devicePixelRatio; // Mayor resolución
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
resize();
window.addEventListener('resize', resize);

// Función para dibujar un corazón en una posición (x,y)
function drawHeart(x, y, size, color, opacity) {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    ctx.fill();
    ctx.globalAlpha = 1;
}

// Clase para cada "hoja" (corazón pequeño)
class HeartLeaf {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.targetSize = Math.random() * 12 + 6; // Tamaño final variado
        this.currentSize = 0;
        this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        this.opacity = 0;
        this.bloomDelay = Math.random() * 2000; // Retraso aleatorio para que no salgan todos a la vez
        this.blooming = false;
    }

    startBloom(startTime) {
        if (Date.now() - startTime > this.bloomDelay) {
            this.blooming = true;
        }
    }

    update() {
        if (this.blooming) {
            if (this.opacity < 1) this.opacity += 0.02;
            if (this.currentSize < this.targetSize) this.currentSize += 0.3;
        }
    }

    draw() {
        if (this.opacity > 0) {
             // Un pequeño offset aleatorio para que no se vea tan perfecto
             const flutterX = Math.sin(Date.now() / 500 + this.x) * 2;
            drawHeart(this.x + flutterX, this.y, this.currentSize, this.color, this.opacity);
        }
    }
}

// Generar los puntos en forma de corazón gigante para la copa del árbol
function generateHeartCrownPoints() {
    leaves = [];
    const centerX = width / 2;
    // El centro del corazón estará más arriba del tronco
    const centerY = height - (height * 0.6); 
    const scale = width / 35; // Escala basada en el ancho de la tarjeta

    // Usamos una fórmula matemática para generar puntos dentro de un corazón
    for (let i = 0; i < 400; i++) { // 400 hojas
        const t = Math.random() * Math.PI * 2;
        // Fórmula paramétrica del corazón + un poco de aleatoriedad (r) para rellenarlo
        const r = Math.sqrt(Math.random());
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        
        // Posición final escalada y centrada
        const finalX = centerX + x * scale * r;
        const finalY = centerY + y * scale * r;
        
        leaves.push(new HeartLeaf(finalX, finalY));
    }
}


// --- Bucle de Animación Principal ---
let startTime = null;
function animateLoop() {
    if (!startTime) startTime = Date.now();
    ctx.clearRect(0, 0, width, height);

    // 1. Dibujar el tronco (si cargó la imagen)
    if (assetsLoaded) {
        // Calcular tamaño para mantener proporción
        const trunkWidth = width * 0.4; // El tronco ocupa el 40% del ancho
        const trunkHeight = trunkWidth * (treeImage.height / treeImage.width);
        // Dibujarlo centrado en la parte inferior
        ctx.drawImage(treeImage, (width - trunkWidth) / 2, height - trunkHeight + 10, trunkWidth, trunkHeight);
    }

    // 2. Dibujar y actualizar las hojas
    leaves.forEach(leaf => {
        leaf.startBloom(startTime);
        leaf.update();
        leaf.draw();
    });

    requestAnimationFrame(animateLoop);
}

// --- Lógica del Contador ---
function updateCounter() {
    const now = new Date();
    // Calcular diferencia en milisegundos
    let diff = now.getTime() - startDate.getTime();

    // Asegurar que no muestre negativos si la fecha es futura (por si acaso)
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = mins.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = secs.toString().padStart(2, '0');
}

// --- Iniciar la Secuencia ---
function startExperience() {
    if (animationStarted || !assetsLoaded) return;
    animationStarted = true;
    clickHint.style.display = 'none';
    music.play().catch(e => console.log("Audio requiere interacción"));

    // Preparar puntos y arrancar animación visual
    generateHeartCrownPoints();
    animateLoop();

    // Secuencia de textos (tiempos en milisegundos)
    // La frase 1 aparece rápido mientras el árbol florece
    setTimeout(() => document.getElementById('line1').classList.replace('hidden', 'visible'), 500);
    setTimeout(() => document.getElementById('line2').classList.replace('hidden', 'visible'), 3500);
    setTimeout(() => document.getElementById('line3').classList.replace('hidden', 'visible'), 6500);
    
    // Mostrar contador al final
    setTimeout(() => {
        document.getElementById('counter-box').classList.replace('hidden', 'visible');
        updateCounter(); // Primera actualización inmediata
        setInterval(updateCounter, 1000); // Iniciar intervalo
    }, 9000);
}

// Esperar clic para iniciar (necesario para audio y cargar recursos)
clickHint.addEventListener('click', startExperience);
// También intentar iniciar si hacen clic en cualquier lado de la tarjeta
document.querySelector('.main-card').addEventListener('click', startExperience);
