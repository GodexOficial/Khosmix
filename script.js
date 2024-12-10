document.addEventListener("DOMContentLoaded", () => {
  jobs[0].classList.add("selected"); // Adiciona a classe 'selected' ao primeiro item
  updateContent(jobs[0].dataset.key); // Atualiza o conteúdo com base no primeiro item
});

const netFlixBackground = document.getElementById("netFlixBackground");
netFlixButton00 = document.getElementsByClassName("job");
const trabalho = document.getElementById("Trabalhos");
if (netFlixButton00) {
  Array.from(netFlixButton00).map((element, index) =>
    element.addEventListener("click", (event) => {
      console.log(element.offsetWidth);
      trabalho.scrollTo({
        top: 0,
        left: element.offsetWidth * index + 2 * index - 100,
        behavior: "smooth",
      });
      if (netFlixBackground.classList.contains("animateBackground"))
        netFlixBackground.classList.remove("animateBackground");
      else netFlixBackground.classList.add("animateBackground");
      console.log(netFlixBackground.classList.contains("animateBackground"));
    })
  );
}

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
    netflixSection.classList.add("background-animate");

    // Remove a classe após o tempo necessário para reiniciar a animação
    setTimeout(() => {
      netflixSection.classList.remove("background-animate");
    }, 5000); // Tempo de animação (sincronizado com o CSS)
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

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    startAutoScroll(); // Retorna à rotação automática após 20 segundos de inatividade
  }, 20000);
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

//--------------------------------------------------------------------------//
// Evento para mostrar/esconder o formulário
document.getElementById("openForm").addEventListener("click", function () {
  var formContainer = document.getElementById("formContainer");
  if (
    formContainer.style.display === "none" ||
    formContainer.style.display === ""
  ) {
    formContainer.style.display = "flex";
  } else {
    formContainer.style.display = "none";
  }
});
document.getElementById("closeForm").addEventListener("click", function () {
  var formContainer = document.getElementById("formContainer");
  if (
    formContainer.style.display === "none" ||
    formContainer.style.display === ""
  ) {
    formContainer.style.display = "flex";
  } else {
    formContainer.style.display = "none";
  }
});

// Evento de submissão do formulário
document
  .getElementById("contractForm")
  .addEventListener("submit", function (event) {
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
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `clientes/formulario_${new Date().toISOString()}.txt`;
    link.click();

    // Mostrando a mensagem de confirmação
    document.getElementById("confirmationMessage").style.display = "block";

    // Limpar o formulário após o envio
    document.getElementById("contractForm").reset();
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
