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
  
  // Adicionar suporte ao clique em botões
  Array.from(netFlixButton00).forEach((element, index) =>
    element.addEventListener("click", () => {
      // Atualizar posição do carrossel ao selecionar um item
      scrollToJob(index);
  
      // Animação de fundo
      if (netFlixBackground.classList.contains("animateBackground"))
        netFlixBackground.classList.remove("animateBackground");
      else netFlixBackground.classList.add("animateBackground");
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
    const selectedJob = Array.from(netFlixButton00).find((job) =>
      job.classList.contains("selected")
    );
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

  document.getElementById('phone').addEventListener('input', function() {
    var phoneInput = this.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    this.value = phoneInput; // Atualiza o valor do input sem caracteres não numéricos
});
