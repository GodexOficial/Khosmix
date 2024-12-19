import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import styles from "./styles.module.css";

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const scrollToNext = () => {
    const aboutSection = document.getElementById("sobre");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className={styles.hero}>
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.title} variants={itemVariants}>
          <br />
          <br />
          Transformando <br />
          <span>Ideias</span> em <br />
          Realidade Digital
        </motion.h1>

        <motion.p className={styles.subtitle} variants={itemVariants}>
          Somos uma agência criativa especializada em soluções digitais inovadoras para sua marca.
        </motion.p>

        <motion.div className={styles.cta} variants={itemVariants}>
          <motion.button
            className={styles.scrollButton}
            onClick={scrollToNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FiArrowDown />
            <span className="sr-only">Rolar para baixo</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <div className={styles.overlay}></div>
    </section>
  );
};
