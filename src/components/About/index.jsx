import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedBackground } from "../AnimatedBackground";
import { ContactForm } from "../ContactForm";
import styles from "./styles.module.css";

export const About = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("trabalhos"); // ID da seção Netflix
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="sobre" className={styles.about}>
      <AnimatedBackground />
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div className={styles.content}>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Sobre Nós
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Somos uma agência especializada em gestão de mídias e talentos, oferecendo soluções
            criativas e inovadoras para nossos clientes. Nossa equipe é formada por profissionais
            apaixonados por tecnologia e arte, sempre buscando entregar resultados excepcionais.
          </motion.p>
        </motion.div>
        <button className={styles.button} onClick={() => setIsFormOpen(true)}>
          Contrato
        </button>
      </motion.div>

      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
};
