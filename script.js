// CONFIGURACIÓN DE LA FECHA: 14 de Junio de 2025
// (Mes 5 porque Enero es 0)
const startDate = new Date(2025, 5, 14, 0, 0, 0);

const canvas = document.getElementById('heart-tree');
const ctx = canvas.getContext('2d');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const counterBox = document.getElementById('counter-box');
const clickHint = document.querySelector('.click-hint');
const music = document.getElementById('bg-music');

let width, height;
const hearts = [];
let treeBuilt = false;

function resize() {
width = canvas.parentElement.offsetWidth;
height = canvas.parentElement.offsetHeight;
canvas.width = width;
canvas.height = height;
}
resize();

class Heart {
constructor(tx, ty) {
this.x = width / 2;
this.y = height;
this.tx = tx;
this.ty = ty;
this.size = Math.random() * 8 + 4;
this.color = `hsl(${Math.random() * 40 + 340}, 80%, 60%)`;
this.stuck = false;
this.vx = (Math.random() - 0.5) * 4;
this.vy = Math.random() * -3 - 2;
}
update() {
if (this.stuck) return;
this.x += this.vx; this.y += this.vy;
this.vx += (this.tx - this.x) * 0.003;
this.vy += (this.ty - this.y) * 0.003;
this.vx *= 0.97; this.vy *= 0.97;
if (Math.abs(this.x - this.tx) < 2 && Math.abs(this.y - this.ty) < 2) {
this.stuck = true; this.x = this.tx; this.y = this.ty;
}
}
draw() {
ctx.fillStyle = this.color;
ctx.beginPath();
ctx.arc(this.x, this.y, this.size/2, 0, Math.PI*2);
ctx.fill();
}
}

function animate() {
ctx.clearRect(0, 0, width, height);
// Tronco
ctx.fillStyle = '#5d4037';
ctx.fillRect(width/2 - 5, height - 100, 10, 100);

hearts.forEach(h => { h.update(); h.draw(); });
requestAnimationFrame(animate);
}

function updateCounter() {
const now = new Date();
const diff = now - startDate;
const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
const mins = Math.floor((diff / 1000 / 60) % 60);
const secs = Math.floor((diff / 1000) % 60);

document.getElementById('days').innerText = days;
document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
document.getElementById('minutes').innerText = mins.toString().padStart(2, '0');
document.getElementById('seconds').innerText = secs.toString().padStart(2, '0');
}

function start() {
clickHint.style.display = 'none';
music.play().catch(() => {});

// Generar hojas del árbol
for (let i = 0; i < 150; i++) {
const a = Math.random() * Math.PI * 2;
const r = Math.sqrt(Math.random()) * 80;
hearts.push(new Heart(width/2 + r*Math.cos(a), height - 150 + r*Math.sin(a)));
}
animate();

// Tiempos de las frases
setTimeout(() => line1.classList.replace('hidden', 'visible'), 1000);
setTimeout(() => line2.classList.replace('hidden', 'visible'), 4000);
setTimeout(() => line3.classList.replace('hidden', 'visible'), 7000);
setTimeout(() => {
counterBox.classList.replace('hidden', 'visible');
setInterval(updateCounter, 1000);
}, 9000);
}

document.addEventListener('click', start, { once: true });
