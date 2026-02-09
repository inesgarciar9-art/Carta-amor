// 💖 CONTADOR DESDE 14 DE JUNIO 2025
const startDate = new Date("2025-06-14T00:00:00");

function updateCounter() {
  const now = new Date();
  let diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff %= (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff %= (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  document.getElementById("counter").innerHTML =
    `Mi amor por ti comenzó hace…<br>
     ${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`;
}

setInterval(updateCounter, 1000);
updateCounter();

// 🌸 CORAZONES DEL ÁRBOL
const heartsContainer = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 160 + "px";
  heart.style.fontSize = Math.random() * 20 + 14 + "px";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 600);

// 🎁 BOTÓN SORPRESA
document.getElementById("surpriseBtn").addEventListener("click", () => {
  alert("Sabía que llegarías hasta aquí 💖");
});
