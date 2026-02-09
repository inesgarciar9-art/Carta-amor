const fechaInicio = new Date(2025, 1, 14);

const frases = [
  "Para el hombre que se robó mi corazón",
  "Nuestro primer 14 de febrero de muchos más 🫶",
  "Te quiero 💖"
];

let iniciado = false;

async function escribir(texto, id, vel = 70) {
  const el = document.getElementById(id);
  el.innerHTML = "";
  for (let letra of texto) {
    el.innerHTML += letra;
    await new Promise(r => setTimeout(r, vel));
  }
}

function comenzar() {
  if (iniciado) return;
  iniciado = true;

  document.getElementById("pantalla-inicio").style.display = "none";
  document.getElementById("contenido-regalo").style.display = "block";

  animarCorazon();
  iniciarTexto();
}

async function iniciarTexto() {
  await escribir(frases[0], "L1");
  await escribir(frases[1], "L2");
  await escribir(frases[2], "L3");

  document.getElementById("contador").style.opacity = 1;
  actualizarContador();
  setInterval(actualizarContador, 1000);
}

function animarCorazon() {
  const canvas = document.getElementById("corazonCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  const scale = canvas.width / 40;

  for (let i = 0; i < 300; i++) {
    const t = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random());

    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

    const px = canvas.width/2 + x * scale * r;
    const py = canvas.height/2 + y * scale * r;

    ctx.fillStyle = "rgba(216,27,96,0.8)";
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI*2);
    ctx.fill();
  }
}

function actualizarContador() {
  const ahora = new Date();
  let dif = ahora - fechaInicio;

  const d = Math.floor(dif / (1000*60*60*24));
  const h = Math.floor(dif / (1000*60*60) % 24);
  const m = Math.floor(dif / (1000*60) % 60);
  const s = Math.floor(dif / 1000 % 60);

  document.getElementById("d").innerText = d;
  document.getElementById("h").innerText = h.toString().padStart(2,"0");
  document.getElementById("m").innerText = m.toString().padStart(2,"0");
  document.getElementById("s").innerText = s.toString().padStart(2,"0");
}
