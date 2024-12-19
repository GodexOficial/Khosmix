import { motion } from 'framer-motion';
import { FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './styles.module.css';

export const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer id="footer" className={styles.footer}>
      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className={styles.content} variants={itemVariants}>
          <div className={styles.info}>
            <h2>KHOSMIX</h2>
            <p>
              Transformando ideias em realidade digital.
              Entre em contato e vamos criar algo incrível juntos.
            </p>
          </div>

          <div className={styles.social}>
            <a 
              href="https://instagram.com/khosmix" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Siga-nos no Instagram"
            >
              <FiInstagram />
            </a>
            <a 
              href="https://linkedin.com/company/khosmix" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Siga-nos no LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a 
              href="mailto:contato@khosmix.com"
              aria-label="Envie-nos um email"
            >
              <FiMail />
            </a>
          </div>
        </motion.div>

        <motion.div className={styles.bottom} variants={itemVariants}>
          <p>
            © {new Date().getFullYear()} Khosmix. 
            Todos os direitos reservados.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};
