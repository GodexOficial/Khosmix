import { motion } from 'framer-motion';
import styles from './styles.module.css';

export const Loading = () => {
  const circleVariants = {
    start: {
      y: "0%"
    },
    bounce: {
      y: ["0%", "-50%", "0%"],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2
      }
    },
    bounce: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className={styles.loadingContainer}>
      <motion.div
        className={styles.loading}
        variants={containerVariants}
        initial="start"
        animate="bounce"
      >
        <motion.span 
          className={styles.circle}
          variants={circleVariants}
        />
        <motion.span 
          className={styles.circle}
          variants={circleVariants}
        />
        <motion.span 
          className={styles.circle}
          variants={circleVariants}
        />
      </motion.div>
      <p className={styles.text}>Carregando...</p>
    </div>
  );
};
