//------------------------ CONFIGURAÇÕES GLOBAIS ------------------------//
document.addEventListener("DOMContentLoaded", () => {
  jobs[0].classList.add("selected");
  updateContent(jobs[0].dataset.key);
});

let isDragging = false;
let startX;
let scrollStart;
let lastSelectedIndex = -1;
let currentSelectedItem = null;
let isAnimating = false;
let currentIndex = 0;
let autoScrollInterval;
let inactivityTimer;
let debounceTimer;
let lastTimestamp;
//------------------------ FIM CONFIGURAÇÕES GLOBAIS ------------------------//

//------------------------ SCROLL SUAVE ------------------------//
function smoothScrollTo(targetSelector) {
  const targetElement = document.querySelector(targetSelector);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
//------------------------ FIM SCROLL SUAVE ------------------------//

//------------------------ SEÇÃO NETFLIX ------------------------//
const netFlixButton00 = document.getElementsByClassName("job");
const trabalho = document.getElementById("Trabalhos");
const netFlixBackground = document.getElementById("netFlixBackground");

/* Eventos de clique nos botões */
Array.from(netFlixButton00).forEach((element, index) => {
  element.addEventListener("click", () => {
    if (isAnimating) return;
    scrollToJob(index);

    if (currentSelectedItem !== element) {
      isAnimating = true;
      if (netFlixBackground.classList.contains("animateBackground")) {
        netFlixBackground.classList.remove("animateBackground");
      } else {
        netFlixBackground.classList.add("animateBackground");
      }
      currentSelectedItem = element;
      setTimeout(() => {
        isAnimating = false;
      }, 1000);
    }
  });
});

/* Eventos de scroll e arraste */
trabalho.addEventListener("wheel", (event) => {
  event.preventDefault();
  trabalho.scrollLeft += event.deltaY;
});

trabalho.addEventListener("mousedown", (event) => {
  isDragging = true;
  startX = event.pageX;
  scrollStart = trabalho.scrollLeft;
  trabalho.classList.add("dragging");
});

// ... outros eventos de mouse e touch ...

/* Funções auxiliares */
function stopDragging() {
  isDragging = false;
  trabalho.classList.remove("dragging");
}

function scrollToJob(index) {
  const jobWidth = netFlixButton00[0].offsetWidth;
  const scrollPosition = jobWidth * index + 2 * index - 100;
  trabalho.scrollTo({
    top: 0,
    left: scrollPosition,
    behavior: "smooth",
  });
}

/* Observer para mudanças na classe 'selected' */
const observer = new MutationObserver(() => {
  const selectedJob = Array.from(netFlixButton00).find((job) => job.classList.contains("selected"));
  const selectedIndex = Array.from(netFlixButton00).indexOf(selectedJob);
  if (selectedIndex !== -1) {
    scrollToJob(selectedIndex);
  }
});

observer.observe(trabalho, {
  attributes: true,
  subtree: true,
  attributeFilter: ["class"],
});

/* Dados e conteúdo */
const data = {
  design: {
    // ... dados dos projetos ...
  },
  // ... outros projetos ...
};

function updateContent(selectedKey) {
  // ... lógica de atualização de conteúdo ...
}

function selectJob(index) {
  // ... lógica de seleção de job ...
}
//------------------------ FIM SEÇÃO NETFLIX ------------------------//

//------------------------ MODAL DE DETALHES ------------------------//
function openDetails(id) {
  const cardsContainer = document.querySelector(".cards-container");
  const modal = document.getElementById(id);
  // ... lógica de abertura do modal ...
}

function closeDetails() {
  // ... lógica de fechamento do modal ...
}

// Eventos de clique fora do modal
document.addEventListener("click", function (event) {
  // ... lógica de clique fora ...
});
//------------------------ FIM MODAL DE DETALHES ------------------------//

//------------------------ BOTÃO VOLTAR AO TOPO ------------------------//
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
//------------------------ FIM BOTÃO VOLTAR AO TOPO ------------------------//

//------------------------ FORMULÁRIO DE CONTATO ------------------------//
document.getElementById("openForm").addEventListener("click", function () {
  // ... lógica de abertura do formulário ...
});

document.getElementById("contractForm").addEventListener("submit", function (event) {
  // ... lógica de envio do formulário ...
});

// ... outros eventos do formulário ...
//------------------------ FIM FORMULÁRIO DE CONTATO ------------------------//

//------------------------ NAVEGAÇÃO POR PONTOS ------------------------//
const dots = document.querySelectorAll(".dot");
const sections = [
  document.querySelector("#sectionsobre"),
  document.querySelector("#trabalhos"),
  document.querySelector("#nossotime"),
  document.querySelector("#rodape"),
];

function activateDot(index) {
  // ... lógica de ativação dos pontos ...
}

// ... eventos dos pontos de navegação ...
//------------------------ FIM NAVEGAÇÃO POR PONTOS ------------------------//
