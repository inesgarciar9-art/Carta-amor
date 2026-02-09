// CONFIGURACIÓN DE LA FECHA: 14 DE JUNIO DE 2025
const anniversaryDate = new Date(2025, 5, 14, 0, 0, 0); 

const fileScreen = document.getElementById('file-screen');
const mainContent = document.getElementById('main-content');
const music = document.getElementById('bg-music');
const canvas = document.getElementById('tree');
const ctx = canvas.getContext('2d');

// Frases a escribir
const phrases = [
    "Para el hombre que se robó mi corazón:",
    "Si pudiera elegir un lugar seguro, sería a tu lado.",
    "Cuanto más tiempo estoy contigo, más te quiero.",
    "- I Love You! _"
];

function typeWriter(text, elementId, delay = 50) {
    return new Promise(resolve => {
        let i = 0;
        const element = document.getElementById(elementId);
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

function startExperience() {
    fileScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    music.play();
    
    // Iniciar el árbol y luego los textos
    initTree();
    runTextSequence();
}

async function runTextSequence() {
    await typeWriter(phrases[0], 'line1');
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter(phrases[1], 'line2');
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter(phrases[2], 'line3');
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter(phrases[3], 'final-line');
    
    document.getElementById('counter').classList.add('fade-in');
    setInterval(updateCounter, 1000);
}

function initTree() {
    const w = canvas.width = 300;
    const h = canvas.height = 300;
    
    // Dibujar Tronco
    ctx.strokeStyle = '#5d4037';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(w/2, h);
    ctx.quadraticCurveTo(w/2, h-80, w/2, h-100);
    ctx.stroke();

    // Animación de hojas (corazones)
    let count = 0;
    const maxHearts = 150;
    
    function addLeaf() {
        if (count < maxHearts) {
            const t = Math.random() * Math.PI * 2;
            const r = Math.sqrt(Math.random());
            // Fórmula del corazón
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            const finalX = (w/2) + x * 6 * r;
            const finalY = (h-180) + y * 6 * r;
            
            drawMiniHeart(finalX, finalY);
            count++;
            setTimeout(addLeaf, 50);
        }
    }
    addLeaf();
}

function drawMiniHeart(x, y) {
    const size = Math.random() * 5 + 3;
    ctx.fillStyle = `hsl(${Math.random() * 20 + 340}, 80%, 60%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size, y - size, x - size * 1.5, y + size, x, y + size * 2);
    ctx.bezierCurveTo(x + size * 1.5, y + size, x + size, y - size, x, y);
    ctx.fill();
}

function updateCounter() {
    const now = new Date();
    const diff = now - anniversaryDate;
    
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = d;
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}

fileScreen.addEventListener('click', startExperience);
