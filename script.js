const painels = document.querySelector(".painels");
let isDragging = false;
let startX, scrollLeft;

// Quando o botão do mouse é pressionado
painels.addEventListener("mousedown", (e) => {
  isDragging = true;
  painels.classList.add("active"); // Para efeitos visuais (opcional)
  startX = e.pageX - painels.offsetLeft;
  scrollLeft = painels.scrollLeft;
});

painels.addEventListener("mouseleave", () => {
  isDragging = false;
  painels.classList.remove("active");
});

painels.addEventListener("mouseup", () => {
  isDragging = false;
  painels.classList.remove("active");
});

// Quando o mouse se move
painels.addEventListener("mousemove", (e) => {
  if (!isDragging) return; // Se não estiver arrastando, sai
  e.preventDefault();
  const x = e.pageX - painels.offsetLeft;
  const walk = (x - startX) * 2; // Multiplica para maior sensibilidade
  painels.scrollLeft = scrollLeft - walk;
});
