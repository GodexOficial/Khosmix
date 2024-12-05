// Dados que serão exibidos
const data = {
  design: {
    title: "Design",
    subtitle: "Social Media, Identidade Visual",
    text: "Aqui você encontra nossos projetos de design, incluindo branding, layouts para redes sociais, e muito mais.",
  },
  modelagem: {
    title: "Modelagem 3D",
    subtitle: "Criação de Personagens, Cenários",
    text: "Projetos em 3D que englobam modelagem, texturização e animações incríveis para jogos e vídeos.",
  },
  musica: {
    title: "Produção Musical",
    subtitle: "Composições, Mixagens",
    text: "Descubra trilhas sonoras exclusivas e designs de som criados por nossa equipe talentosa.",
  },
  identidade: {
    title: "Identidade Visual",
    subtitle: "Criação de Logotipos, Branding",
    text: "Transformamos ideias em identidades visuais marcantes que se destacam no mercado.",
  },
};

// Referências dos elementos que serão alterados
const title = document.querySelector(".netflix h1");
const subtitle = document.querySelector(".netflix h2");
const text = document.querySelector(".netflix p");

// Função para aplicar a transição
function updateContent(selected) {
  // Adiciona a classe fade-out para o conteúdo atual
  title.classList.add("fade-out");
  subtitle.classList.add("fade-out");
  text.classList.add("fade-out");

  // Aguarda o tempo da transição de saída antes de atualizar o conteúdo
  setTimeout(() => {
    // Atualiza o conteúdo
    title.textContent = selected.title;
    subtitle.textContent = selected.subtitle;
    text.textContent = selected.text;

    // Remove fade-out e aplica fade-in para o novo conteúdo
    title.classList.remove("fade-out");
    subtitle.classList.remove("fade-out");
    text.classList.remove("fade-out");

    title.classList.add("fade-in");
    subtitle.classList.add("fade-in");
    text.classList.add("fade-in");
  }, 500); // Tempo em ms (sincronizado com o CSS)
}

// Adicionando evento de clique aos itens do carrossel
document.querySelectorAll(".job").forEach((item, index) => {
  item.addEventListener("click", () => {
    const keys = Object.keys(data); // ["design", "modelagem", "musica", "identidade"]
    const selected = data[keys[index % keys.length]];

    if (selected) updateContent(selected);
  });
});

// Iniciando evento de clique no botão veja mais

function openDetails(id) {
  // Ocultar os cards
  document.querySelector(".cards-container").style.display = "none";

  // Mostrar o modal de detalhes
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeDetails() {
  // Ocultar os modais de detalhes
  document.querySelectorAll(".details-modal").forEach((modal) => {
    modal.classList.add("hidden");
  });

  // Mostrar os cards novamente
  document.querySelector(".cards-container").style.display = "flex";
}

/*
function openDetails(id) {
  // Ocultar todos os modais de detalhes
  document.querySelectorAll(".details-card").forEach((card) => {
    card.style.display = "none";
  });

  // Mostrar o modal do membro selecionado
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "flex";
  }

  // Mostrar a seção de detalhes
  document.getElementById("details-section").style.display = "flex";
}

function closeDetails() {
  // Ocultar a seção de detalhes
  document.getElementById("details-section").style.display = "none";

  // Mostrar todos os cards novamente
  document.querySelectorAll(".cards-container").forEach((card) => {
    card.style.display = "flex";
  });
}*/
