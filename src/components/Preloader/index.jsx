import { motion } from 'framer-motion';
import styles from './styles.module.css';

export const Preloader = () => {
  const dotVariants = {
    start: {
      y: 0
    },
    end: {
      y: -20,
      transition: {
        duration: 0.5,
        yoyo: Infinity
      }
    }
  };

  return (
    <div className={styles.preloader}>
      <div className={styles.content}>
        <h1>KHOSMIX</h1>
        <div className={styles.dots}>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={styles.dot}
              variants={dotVariants}
              initial="start"
              animate="end"
              transition={{
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
