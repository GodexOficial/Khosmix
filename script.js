//--------------------------------------------------------------------------//
function smoothScrollTo(targetSelector) {
  const targetElement = document.querySelector(targetSelector);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth", // Força o scroll suave
      block: "start", // Alinha o topo do elemento
    });
  }
}
//--------------------------------------------------------------------------//

document.addEventListener("DOMContentLoaded", () => {
  jobs[0].classList.add("selected"); // Adiciona a classe 'selected' ao primeiro item
  updateContent(jobs[0].dataset.key); // Atualiza o conteúdo com base no primeiro item
});

const netFlixButton00 = document.getElementsByClassName("job");
const trabalho = document.getElementById("Trabalhos");
const netFlixBackground = document.getElementById("netFlixBackground");

let isDragging = false; // Flag para identificar o estado de arraste
let startX; // Coordenada inicial do mouse
let scrollStart; // Posição inicial do scroll no container

// Adicionar uma variável para controlar o último índice selecionado
let lastSelectedIndex = -1; // Inicializa com -1 para garantir que a primeira seleção sempre anime

// Adicionar uma variável para controlar o item atualmente selecionado
let currentSelectedItem = null;

// Adicionar variável para controlar se uma animação está em andamento
let isAnimating = false;

// Adicionar suporte ao clique em botões
Array.from(netFlixButton00).forEach((element, index) =>
  element.addEventListener("click", () => {
    // Se uma animação estiver em andamento, ignora o clique
    if (isAnimating) return;

    // Atualizar posição do carrossel ao selecionar um item
    scrollToJob(index);

    // Animação de fundo - só ocorre se o item clicado for diferente do atual
    if (currentSelectedItem !== element) {
      isAnimating = true; // Marca que uma animação está começando

      if (netFlixBackground.classList.contains("animateBackground"))
        netFlixBackground.classList.remove("animateBackground");
      else netFlixBackground.classList.add("animateBackground");

      // Atualiza o item atualmente selecionado
      currentSelectedItem = element;

      // Após 1 segundo (duração da animação), permite nova animação
      setTimeout(() => {
        isAnimating = false;
      }, 1000); // 1000ms = 1s (mesmo tempo da sua transição CSS)
    }
  })
);

// Adicionar suporte ao scroll com a roda do mouse
trabalho.addEventListener("wheel", (event) => {
  event.preventDefault();
  trabalho.scrollLeft += event.deltaY; // Deslocamento com base na roda do mouse
});

// Eventos para clique e arraste
trabalho.addEventListener("mousedown", (event) => {
  isDragging = true;
  startX = event.pageX; // Coordenada inicial do mouse
  scrollStart = trabalho.scrollLeft; // Posição inicial do scroll
  trabalho.classList.add("dragging"); // Classe para indicar estado de arraste
});

trabalho.addEventListener("mousemove", (event) => {
  if (!isDragging) return; // Não faz nada se não estiver arrastando
  const x = event.pageX; // Posição atual do mouse
  const walk = startX - x; // Diferença entre a posição inicial e atual
  trabalho.scrollLeft = scrollStart + walk; // Atualiza o scroll com base no deslocamento
});

trabalho.addEventListener("mouseup", () => {
  stopDragging();
});

trabalho.addEventListener("mouseleave", () => {
  if (isDragging) stopDragging();
});

// Função para parar o arraste
function stopDragging() {
  isDragging = false;
  trabalho.classList.remove("dragging");
}

// Função para alinhar o carrossel ao item selecionado
function scrollToJob(index) {
  const jobWidth = netFlixButton00[0].offsetWidth; // Largura de um item
  const scrollPosition = jobWidth * index + 2 * index - 100; // Calcula a posição de scroll

  trabalho.scrollTo({
    top: 0,
    left: scrollPosition,
    behavior: "smooth",
  });
}

// Monitorar mudanças na classe 'selected' e atualizar o carrossel
const observer = new MutationObserver(() => {
  const selectedJob = Array.from(netFlixButton00).find((job) => job.classList.contains("selected"));
  const selectedIndex = Array.from(netFlixButton00).indexOf(selectedJob);
  if (selectedIndex !== -1) {
    scrollToJob(selectedIndex);
  }
});

// Configurar o observer para monitorar a adição/remoção da classe 'selected'
observer.observe(trabalho, {
  attributes: true,
  subtree: true,
  attributeFilter: ["class"],
});

// Função para atualizar o carrossel e animar o background
const updateCarousel = (key) => {
  netFlixBackground.classList.add("hidden"); // Inicia a transição suave

  setTimeout(() => {
    // Atualiza o conteúdo do background após a opacidade zerar
    netFlixBackground.style.backgroundImage = data[key].background;
    netFlixBackground.classList.remove("hidden"); // Mostra novamente com nova imagem
  }, 500); // Tempo da transição (mesmo valor do CSS)

  // Atualiza o background com animação
  updateCarousel(element.dataset.key);
};

//-------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------//
const data = {
  design: {
    title: "Design",
    subtitle: "Social Media, Identidade Visual",
    text: "Aqui você encontra nossos projetos de design, incluindo branding, layouts para redes sociais, e muito mais.",
    background: "url('images/design.jpg')", // Caminho para o fundo do Design
  },
  modelagem: {
    title: "Modelagem 3D",
    subtitle: "Criação de Personagens, Cenários",
    text: "Projetos em 3D que englobam modelagem, texturização e animações incríveis para jogos e vídeos.",
    background: "url('images/3d.jpg')", // Caminho para o fundo da Modelagem 3D
  },
  musica: {
    title: "Produção Musical",
    subtitle: "Composições, Mixagens",
    text: "Descubra trilhas sonoras exclusivas e designs de som criados por nossa equipe talentosa.",
    background: "url('images/producer.jpg')", // Caminho para o fundo da Música
  },
  identidade: {
    title: "Identidade Visual",
    subtitle: "Criação de Logotipos, Branding",
    text: "Transformamos ideias em identidades visuais marcantes que se destacam no mercado.",
    background: "url('images/idv.jpg')", // Caminho para o fundo da Identidade Visual
  },
  programacao: {
    title: "Programação",
    subtitle: "Desenvolvimento Web, Automação",
    text: "Explore nossos projetos de programação, incluindo sites dinâmicos, sistemas personalizados e soluções automatizadas.",
    background: "url('images/prog.jpg')", // Caminho para o fundo de Programação
  },
  animacao: {
    title: "Motion Design",
    subtitle: "Motion Graphics, Animação 2D e 3D",
    text: "Dê vida às suas ideias com animações impactantes, desde motion graphics até narrativas completas em 2D e 3D.",
    background: "url('images/blackhole.jpg')", // Caminho para o fundo de Animação
  },
};

const title = document.querySelector(".netflix h1");
const subtitle = document.querySelector(".netflix h2");
const text = document.querySelector(".netflix p");
const netflixSection = document.querySelector(".netflix");
const jobs = document.querySelectorAll(".job");

let currentIndex = 0;
let autoScrollInterval;
let inactivityTimer;
let debounceTimer;
let lastTimestamp;
//----------------- FUNÇÃO SELECTED --------------------------//
function updateContent(selectedKey) {
  const selected = data[selectedKey];

  if (selected) {
    // Atualiza o conteúdo do texto
    title.textContent = selected.title;
    subtitle.textContent = selected.subtitle;
    text.textContent = selected.text;

    // Atualiza o background da seção "netflix"
    netflixSection.style.backgroundImage = selected.background;

    // Adiciona a classe de animação

    // Animação de fundo
    if (netFlixBackground.classList.contains("animateBackground")) {
      netFlixBackground.classList.remove("animateBackground");
      netflixSection.style.backgroundImage = selected.background;
    } else {
      netflixSection.style.backgroundImage = selected.background;
      netFlixBackground.classList.add("animateBackground");
    }
  }
}

function selectJob(index) {
  jobs.forEach((job, i) => {
    if (i === index) {
      job.classList.add("selected");
      updateContent(job.dataset.key);
    } else {
      job.classList.remove("selected");
    }
  });
}

function autoScroll(timestamp) {
  if (!lastTimestamp || timestamp - lastTimestamp >= 6000) {
    // 6 segundos
    currentIndex = (currentIndex + 1) % jobs.length;
    selectJob(currentIndex);
    lastTimestamp = timestamp;
  }
  autoScrollInterval = requestAnimationFrame(autoScroll);
}

function startAutoScroll() {
  stopAutoScroll(); // Garante que não há múltiplos loops ativos
  lastTimestamp = performance.now();
  autoScrollInterval = requestAnimationFrame(autoScroll);
}

function stopAutoScroll() {
  cancelAnimationFrame(autoScrollInterval);
}
//----------------- FUNÇÃO RETORNA ROTAÇAO AUTO --------------------------//
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    startAutoScroll();
  }, 20000); // Retorna à rotação automática após 20 segundos de inatividade
}

function debounceResetInactivity() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(resetInactivityTimer, 100); // Limita a frequência com debounce
}

// Adicionar eventos aos itens
jobs.forEach((job, index) => {
  const keys = Object.keys(data); // ["design", "modelagem", "musica", "identidade"]
  job.dataset.key = keys[index % keys.length];

  // Adiciona o evento de clique
  job.addEventListener("click", () => {
    stopAutoScroll();
    currentIndex = index;
    selectJob(currentIndex);
    resetInactivityTimer();
  });

  // Adiciona o evento de passar o mouse
  job.addEventListener("click", (event) => {
    stopAutoScroll();
    selectJob(index);
    resetInactivityTimer();
  });
});

// Iniciar rotação automática
startAutoScroll();

// Resetar o temporizador ao interagir com qualquer parte da página
document.addEventListener("click", debounceResetInactivity);
document.addEventListener("keydown", debounceResetInactivity);
//--------------------------------------------------------------------------//

//--------------------------------------------------------------------------//
// Iniciando evento de clique no botão veja mais

function openDetails(id) {
  const cardsContainer = document.querySelector(".cards-container");
  const modal = document.getElementById(id);

  if (modal) {
    // Previne a propagação do evento de clique
    event.stopPropagation();

    cardsContainer.style.display = "none";
    modal.classList.remove("closing");
    modal.classList.remove("hidden");
    modal.classList.add("active");
  }
}

function closeDetails() {
  const cardsContainer = document.querySelector(".cards-container");
  const modals = document.querySelectorAll(".details-modal");

  modals.forEach((modal) => {
    if (modal.classList.contains("active")) {
      modal.classList.remove("active");
      modal.classList.add("closing");

      // Aguarda a animação terminar
      setTimeout(() => {
        modal.classList.add("hidden");
        modal.classList.remove("closing");
        cardsContainer.style.display = "flex";
      }, 500);
    }
  });
}

// Fechar modal ao clicar fora
document.addEventListener("click", function (event) {
  const modals = document.querySelectorAll(".details-modal");
  const cards = document.querySelectorAll(".glass-card");

  // Verifica se o clique foi em um card ou no botão de fechar
  const isCard = Array.from(cards).some((card) => card.contains(event.target));
  const isCloseButton = event.target.classList.contains("back-button");

  // Se não for um card e não for o botão de fechar, então verifica se deve fechar o modal
  if (!isCard && !isCloseButton) {
    modals.forEach((modal) => {
      if (modal.classList.contains("active") && !modal.contains(event.target)) {
        closeDetails();
      }
    });
  }
});
//--------------------------------------------------------------------------//

//--------------------------------------------------------------------------//
const backToTopButton = document.getElementById("backToTop");

// Mostra o botão ao rolar para baixo
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});
//--------------------------------------------------------------------------//

//--------------------------------------------------------------------------//
// Função para rolar suavemente ao topo
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const sections = document.querySelectorAll(".section");

  // Escuta o evento de rolagem
  let isScrolling;

  container.addEventListener("scroll", () => {
    window.clearTimeout(isScrolling);

    // Aguarda um pequeno intervalo para evitar repetição contínua
    isScrolling = setTimeout(() => {
      const scrollPosition = container.scrollTop;
      let closestSection = sections[0];
      let closestDistance = Math.abs(scrollPosition - sections[0].offsetTop);

      // Encontra a seção mais próxima
      sections.forEach((section) => {
        const distance = Math.abs(scrollPosition - section.offsetTop);
        if (distance < closestDistance) {
          closestSection = section;
          closestDistance = distance;
        }
      });

      // Alinha o scroll à seção mais próxima
      closestSection.scrollIntoView({ behavior: "smooth" });
    }, 150); // Tempo em ms para detectar "parada" no scroll
  });
});
//--------------------------------------------------------------------------//

//--------------------------------------------------------------------------//
// Evento para mostrar/esconder o formulário
document.getElementById("openForm").addEventListener("click", function () {
  var formContainer = document.getElementById("formContainer");
  formContainer.style.display = "flex"; // Garante que o formulário está visível
  formContainer.classList.remove("closing"); // Remove classe de fechamento se existir
  formContainer.classList.add("active");
});

// Função para fechar a mensagem de confirmação
function closeConfirmationMessage() {
  const confirmationMessage = document.getElementById("confirmationMessage");
  confirmationMessage.classList.add("closing");

  // Aguarda a animação terminar antes de esconder
  setTimeout(() => {
    confirmationMessage.classList.remove("show");
    confirmationMessage.classList.remove("closing");
    confirmationMessage.classList.add("hidden");
  }, 800); // Aumentando o tempo da animação de fechamento
}

// Evento para fechar o formulário
document.getElementById("closeForm").addEventListener("click", function () {
  var formContainer = document.getElementById("formContainer");
  formContainer.classList.remove("active");
  formContainer.classList.add("closing");

  // Fecha a mensagem de confirmação também
  closeConfirmationMessage();

  setTimeout(() => {
    formContainer.style.display = "none";
    formContainer.classList.remove("closing");
  }, 500);
});

// Fechar o formulário e a mensagem quando clicar fora
document.addEventListener("click", function (event) {
  var formContainer = document.getElementById("formContainer");
  var openFormButton = document.getElementById("openForm");
  var confirmationMessage = document.getElementById("confirmationMessage");

  if (
    !formContainer.contains(event.target) &&
    event.target !== openFormButton &&
    formContainer.classList.contains("active")
  ) {
    formContainer.classList.remove("active");
    formContainer.classList.add("closing");

    // Fecha a mensagem de confirmação
    closeConfirmationMessage();

    setTimeout(() => {
      formContainer.style.display = "none";
      formContainer.classList.remove("closing");
    }, 500);
  }
});

// Evento de submissão do formulário
document.getElementById("contractForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtendo os dados do formulário
  const name = document.getElementById("nameform").value;
  const email = document.getElementById("emailform").value;
  const service = document.getElementById("service").value;

  // Criando o objeto de dados a serem armazenados
  const formData = {
    nameform,
    emailform,
    service,
  };

  // Convertendo o objeto para uma string JSON
  const jsonData = JSON.stringify(formData);

  // Armazenando os dados em um arquivo no diretório "clientes"
  const blob = new Blob([jsonData], { type: "application/txt" });
  const link = document.Element("a");
  link.href = URL.createObjectURL(blob);
  link.download = `clientes/formulario_${new Date().toISOString()}.txt`;
  link.click();

  // Mostra a mensagem de confirmação com animação
  const confirmationMessage = document.getElementById("confirmationMessage");
  confirmationMessage.classList.remove("hidden");
  confirmationMessage.classList.remove("closing");
  confirmationMessage.classList.add("show");

  // Limpar o formulário após o envio
  document.getElementById("contractForm").reset();
});

// Adicionar evento de clique para fechar a mensagem
document.addEventListener("click", function (event) {
  const confirmationMessage = document.getElementById("confirmationMessage");
  const formContainer = document.getElementById("formContainer");

  // Se a mensagem estiver visível e o clique for fora dela ou no botão de fechar
  if (
    !confirmationMessage.classList.contains("hidden") &&
    (!confirmationMessage.contains(event.target) || event.target.classList.contains("close-btn"))
  ) {
    closeConfirmationMessage();
  }
});
//--------------------------------------------------------------------------//

//--------------------------------------------------------------------------//
const dots = document.querySelectorAll(".dot");
const sections = [
  document.querySelector("#sectionsobre"), // Sessão Sobre
  document.querySelector("#trabalhos"), // Sessão Trabalhos
  document.querySelector("#nossotime"), // Sessão Nosso Time
  document.querySelector("#rodape"), // Sessão Rodapé
];

// Função para ativar o ponto correspondente
function activateDot(index) {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// Adicionar evento de clique aos pontos
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const targetSection = sections[index];

    // Rola suavemente até a seção correspondente
    if (index == 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }

    // Atualiza o estado ativo manualmente
    activateDot(index);
  });
});

// Detectar a seção visível ao rolar
window.addEventListener("scroll", () => {
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    // Verifica se a seção está visível na tela (mais de 50% dela)
    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
      activateDot(index);
    }
  });
});

// Inicializa a ativação do primeiro dot quando a página carregar
window.addEventListener("DOMContentLoaded", () => {
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
      activateDot(index);
    }
  });
});

//--------------------------------------------------------------------------//
/* Lock Scroll
  document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(
      ".background, .backgroundnet, .timesection, .footerpro"
    );
  
    let isScrolling = false; // Evita conflitos de múltiplas rolagens
  
    window.addEventListener("wheel", (event) => {
      if (isScrolling) return; // Ignora eventos de rolagem durante o ajuste
      isScrolling = true;
  
      // Impede o comportamento padrão
      event.preventDefault();
  
      // Determina a direção do scroll
      const scrollDirection = event.deltaY > 0 ? "down" : "up";
  
      // Calcula a seção atual com base na posição de rolagem da página
      const currentSectionIndex = [...sections].findIndex((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollTop = window.scrollY;
        return scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight;
      });
  
      // Determina a próxima seção com base na direção
      let nextSectionIndex =
        scrollDirection === "down"
          ? Math.min(currentSectionIndex + 1, sections.length - 1)
          : Math.max(currentSectionIndex - 1, 0);
  
      // Rola suavemente para a próxima seção
      sections[nextSectionIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  
      // Aguarda a animação para liberar o scroll
      setTimeout(() => {
        isScrolling = false;
      }, 800); // O tempo aqui deve coincidir com a suavidade desejada
  
      // Ajuste o limite aqui
      const limit = window.innerHeight * 0.4; // 40% da altura da janela
  
      if (scrollDelta > limit && currentSectionIndex < sections.length - 1) {
        nextSectionIndex = currentSectionIndex + 1; // Próxima seção
      } else if (scrollDelta < -limit && currentSectionIndex > 0) {
        nextSectionIndex = currentSectionIndex - 1; // Seção anterior
      }
    });
  });*/

function openForm(event, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}

document.getElementById("phone").addEventListener("input", function () {
  var phoneInput = this.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico
  this.value = phoneInput; // Atualiza o valor do input sem caracteres não numéricos
});

// Adicione suporte a eventos touch
trabalho.addEventListener(
  "touchstart",
  (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollStart = trabalho.scrollLeft;
  },
  { passive: true }
);

trabalho.addEventListener(
  "touchmove",
  (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = startX - x;
    trabalho.scrollLeft = scrollStart + walk;
  },
  { passive: true }
);

trabalho.addEventListener("touchend", () => {
  stopDragging();
});

// Adicione este código junto com os outros eventos do formulário
document.getElementById("openFormFooter")?.addEventListener("click", function (e) {
  e.preventDefault(); // Previne qualquer comportamento padrão

  var formContainer = document.getElementById("formContainer");

  // Primeiro abrimos o formulário
  formContainer.style.display = "flex";
  formContainer.classList.remove("closing");
  formContainer.classList.add("active");

  // Depois de um pequeno delay, fazemos o scroll
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 100); // Pequeno delay para garantir que o formulário esteja visível
});

document.querySelector(".close-info-btn")?.addEventListener("click", function () {
  const modal = document.querySelector(".info-modal");
  const overlay = document.querySelector(".modal-overlay");

  modal.classList.remove("active");
  overlay.classList.remove("active");
});

// Funcionalidade de pesquisa
document.querySelector(".search-input").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item) => {
    const title = item.querySelector("h3").textContent.toLowerCase();
    const desc = item.querySelector("p").textContent.toLowerCase();

    if (title.includes(searchTerm) || desc.includes(searchTerm)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

// Fechar modal ao clicar fora
window.addEventListener("click", function (event) {
  const modal = document.querySelector(".info-modal");
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});

// Prevenir que cliques dentro do modal fechem ele
document.querySelector(".info-modal").addEventListener("click", function (e) {
  e.stopPropagation();
});

// Atualizar os dados dos projetos
const projectData = {
  design: {
    title: "Design",
    subtitle: "Social Media, Identidade Visual",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    projects: [
      {
        title: "Bells Beach",
        desc: "Social Media, Identidade Visual, 3D",
        image: "images/Miniatura Design.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        title: "Hero Burger",
        desc: "Branding, Social Media",
        image: "images/Miniaturas IDV.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
  modelagem: {
    title: "Modelagem 3D",
    subtitle: "Personagens, Cenários, Objetos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    projects: [
      {
        title: "Projeto Personagem",
        desc: "Modelagem de Personagem, Texturização",
        image: "images/Miniaturas Modelagem.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        title: "Cenário Fantasy",
        desc: "Modelagem de Ambiente, Iluminação",
        image: "images/Blender.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
  musica: {
    title: "Produção Musical",
    subtitle: "Composição, Mixagem, Masterização",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    projects: [
      {
        title: "Album Projeto",
        desc: "Produção Musical, Mixagem",
        image: "images/Miniaturas PROD.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
  identidade: {
    title: "Identidade Visual",
    subtitle: "Branding, Logo Design, Guidelines",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    projects: [
      {
        title: "Projeto Branding",
        desc: "Logo Design, Brand Guidelines",
        image: "images/Miniaturas IDV.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        title: "Identidade Corporativa",
        desc: "Visual Identity, Stationery",
        image: "images/idv.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
  programacao: {
    title: "Programação",
    subtitle: "Web Development, Apps, Sistemas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    projects: [
      {
        title: "Website Responsivo",
        desc: "Frontend, UI/UX, Development",
        image: "images/Miniaturas prog.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        title: "Sistema Web",
        desc: "Full Stack Development",
        image: "images/prog.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
  animacao: {
    title: "Motion Design",
    subtitle: "Animação 2D/3D, VFX, Motion Graphics",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    projects: [
      {
        title: "Motion Graphics",
        desc: "Animação 2D, Visual Effects",
        image: "images/Miniaturas Motion.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        title: "VFX Project",
        desc: "Visual Effects, Compositing",
        image: "images/blackhole.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
};

// Atualizar função de criação de projeto
function createProjectElement(project) {
  const div = document.createElement("div");
  div.className = "project-item";
  div.innerHTML = `
    <div class="project-thumb" style="background-image: url('${project.image}')"></div>
    <div class="project-item-content">
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
      <p class="project-description">${project.description}</p>
    </div>
  `;

  return div;
}

// Atualizar função de conteúdo do modal
function updateModalContent(key) {
  const content = projectData[key];
  if (!content) return;

  // Atualiza título e subtítulo
  const titleElement = modal.querySelector(".info-title h2");
  const subtitleElement = modal.querySelector(".info-title p");

  if (titleElement && subtitleElement) {
    titleElement.textContent = content.title;
    subtitleElement.textContent = content.subtitle;
  }

  // Atualiza descrição do projeto
  const descriptionElement = modal.querySelector(".project-details-description");
  if (descriptionElement) {
    descriptionElement.textContent = content.description;
  }

  // Atualiza lista de projetos
  const projectList = modal.querySelector(".project-list");
  if (projectList && content.projects) {
    projectList.innerHTML = "";
    content.projects.forEach((project) => {
      const projectElement = createProjectElement(project);
      projectList.appendChild(projectElement);
    });
  }
}

// Seleção de elementos
const modal = document.querySelector(".info-modal");
const overlay = document.querySelector(".modal-overlay");
const maisInfoBtn = document.querySelector(".maisinfo");
const closeModalBtn = document.querySelector(".close-modal-btn");

// Abrir modal
maisInfoBtn?.addEventListener("click", () => {
  const selectedJob = document.querySelector(".job.selected");
  if (selectedJob) {
    updateModalContent(selectedJob.dataset.key);
  }
  modal.classList.add("active");
  overlay.classList.add("active");
});

// Fechar modal
closeModalBtn?.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

// Fechar ao clicar no overlay
overlay?.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

// Prevenir que cliques dentro do modal o fechem
modal?.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Event listeners
maisInfoBtn?.addEventListener("click", () => {
  const selectedJob = document.querySelector(".job.selected");
  if (selectedJob) {
    updateModalContent(selectedJob.dataset.key);
  }
  modal.classList.add("active");
});

// Adiciona evento de clique no botão fechar
document.querySelector(".close-modal-btn")?.addEventListener("click", () => {
  closeModal();
});

// Fechar modal ao clicar fora
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Atualizar conteúdo do modal quando um job for selecionado
document.querySelectorAll(".job").forEach((job) => {
  job.addEventListener("click", () => {
    updateModalContent(job.dataset.key);
    if (modal.classList.contains("active")) {
      updateModalContent(job.dataset.key);
    }
  });
});

// Funcionalidade de pesquisa
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item) => {
    const title = item.querySelector("h3").textContent.toLowerCase();
    const desc = item.querySelector("p").textContent.toLowerCase();

    if (title.includes(searchTerm) || desc.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  const selectedJob = document.querySelector(".job.selected");
  if (selectedJob) {
    updateModalContent(selectedJob.dataset.key);
  }
});
