import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobexd,
  SiFigma,
  SiAdobeaftereffects,
  SiBlender,
  SiUnrealengine,
  SiAdobepremierepro,
  SiAdobeaudition,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiAdobeindesign,
} from "react-icons/si";
import images from "../../constants/images";
import styles from "./styles.module.css";
import { JobDetails } from "../JobDetails";

export const Netflix = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimerRef = useRef(null);
  const pauseTimerRef = useRef(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const AUTOPLAY_DELAY = 20000; // 20 segundos
  const PAUSE_DURATION = 20000; // 20 segundos de pausa após interação

  const startAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    autoplayTimerRef.current = setInterval(() => {
      if (!isPaused && !isHovered) {
        setActiveIndex((prev) => (prev + 1) % jobs.length);
      }
    }, AUTOPLAY_DELAY);
  }, [isPaused, isHovered]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  // Inicia o autoplay quando o componente monta
  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, [startAutoplay]);

  // Gerencia o autoplay baseado na interação do usuário
  useEffect(() => {
    if (isHovered) {
      stopAutoplay();
    } else if (!isPaused) {
      startAutoplay();
    }
  }, [isHovered, isPaused, startAutoplay, stopAutoplay]);

  const handlePreviewClick = (index) => {
    setActiveIndex(index);
    setIsPaused(true);

    // Limpa qualquer timer de pausa existente
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }

    // Define um novo timer para retomar o autoplay após 20 segundos
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      startAutoplay();
    }, PAUSE_DURATION);
  };

  const jobs = [
    {
      id: "design",
      title: "Design",
      subtitle: "UI/UX Design",
      description:
        "Criação de interfaces intuitivas e atraentes para web e mobile, com foco na experiência do usuário.",
      tools: [SiFigma, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign],
      background: images.design,
      miniatura: images.miniaturasDesign,
    },
    {
      id: "motion",
      title: "Motion",
      subtitle: "Motion Design",
      description:
        "Animações e efeitos visuais para vídeos e interfaces, trazendo vida e dinamismo aos projetos.",
      tools: [SiAdobeaftereffects, SiBlender, SiUnrealengine, SiAdobepremierepro, SiAdobeaudition],
      background: images.motion,
      miniatura: images.miniaturasMotion,
    },
    {
      id: "dev",
      title: "Desenvolvimento",
      subtitle: "Web Development",
      description:
        "Desenvolvimento de aplicações web modernas e responsivas, com as melhores tecnologias do mercado.",
      tools: [SiReact, SiNodedotjs, SiTypescript, SiJavascript],
      background: images.prog,
      miniatura: images.miniaturasProg,
    },
    {
      id: "modelagem",
      title: "Modelagem",
      subtitle: "Modelagem 3D",
      description:
        "Criação de modelos 3D realistas e estilizados para games, animação e visualização.",
      tools: [SiBlender, SiUnrealengine, SiAdobephotoshop, SiAdobeaftereffects],
      background: images.modelagem,
      miniatura: images.miniaturasModelagem,
    },
    {
      id: "producao",
      title: "Produção Musical",
      subtitle: "Sound Design & Mixing",
      description:
        "Composição e produção de trilhas sonoras, sound design e mixagem para projetos audiovisuais.",
      tools: [SiAdobeaudition, SiAdobepremierepro],
      background: images.prod,
      miniatura: images.miniaturasProd,
    },
    {
      id: "identidade",
      title: "Identidade Visual",
      subtitle: "Branding & Logo",
      description:
        "Desenvolvimento de identidades visuais completas, logos e materiais gráficos para sua marca.",
      tools: [SiAdobeillustrator, SiAdobephotoshop, SiAdobeindesign],
      background: images.idv,
      miniatura: images.miniaturasIdv,
    },
  ];

  const activeJob = jobs[activeIndex];

  return (
    <section
      id="trabalhos"
      className={styles.netflix}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeJob.id}
          className={styles.background}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={activeJob.background}
            alt=""
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className={styles.overlay} />
        </motion.div>
      </AnimatePresence>

      <div className={styles.content}>
        <div className={styles.info}>
          <motion.h2
            key={`title-${activeJob.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeJob.title}
          </motion.h2>

          <motion.h3
            key={`subtitle-${activeJob.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {activeJob.subtitle}
          </motion.h3>

          <div className={styles.tools}>
            {activeJob.tools.map((Icon, index) => (
              <motion.div
                key={index}
                className={styles.tool}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={24} />
              </motion.div>
            ))}
          </div>

          <motion.p
            key={`desc-${activeJob.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {activeJob.description}
          </motion.p>

          <motion.button
            className={styles.moreInfoButton}
            onClick={() => setIsDetailsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mais Informações
          </motion.button>
        </div>

        <div className={styles.previews}>
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              className={`${styles.preview} ${index === activeIndex ? styles.active : ""}`}
              onClick={() => handlePreviewClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <img src={job.miniatura} alt={job.title} />
            </motion.div>
          ))}
        </div>
      </div>

      <JobDetails job={activeJob} isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
    </section>
  );
};
