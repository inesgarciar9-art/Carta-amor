const inicio = new Date(2025, 1, 14);

const textos = [
  "Para el hombre que se robó mi corazón",
  "Nuestro primer 14 de febrero de muchos más 🫶",
  "Te quiero 💖"
];

function abrir() {
  document.getElementById("inicio").style.display = "none";
  const cont = document.getElementById("contenido");
  cont.style.display = "flex";

  escribirTexto();
  dibujarCorazon();
  setTimeout(() => {
    document.getElementById("contador").style.opacity = 1;
    actualizar();
    setInterval(actualizar, 1000);
  }, 2000);
}

async function escribirTexto() {
  for (let i = 0; i < textos.length; i++) {
    const el = document.getElementById("t" + (i + 1));
    for (let letra of textos[i]) {
      el.innerHTML += letra;
      await new Promise(r => setTimeout(r, 70));
    }
    await new Promise(r => setTimeout(r, 400));
  }
}

function dibujarCorazon() {
  const c = document.getElementById("corazon");
  const ctx = c.getContext("2d");

  c.width = c.offsetWidth;
  c.height = c.offsetHeight;

  const scale = c.width / 40;

  for (let i = 0; i < 300; i++) {
    const t = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random());

    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

    const px = c.width/2 + x * scale * r;
    const py = c.height/2 + y * scale * r;

    ctx.fillStyle = "rgba(216,27,96,0.85)";
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function actualizar() {
  const ahora = new Date();
  let dif = ahora - inicio;

  const d = Math.floor(dif / (1000*60*60*24));
  const h = Math.floor(dif / (1000*60*60) % 24);
  const m = Math.floor(dif / (1000*60) % 60);
  const s = Math.floor(dif / 1000 % 60);

  document.getElementById("d").innerText = d;
  document.getElementById("h").innerText = h.toString().padStart(2,"0");
  document.getElementById("m").innerText = m.toString().padStart(2,"0");
  document.getElementById("s").innerText = s.toString().padStart(2,"0");
}
