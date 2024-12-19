import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./styles.module.css";

export const Toast = ({ message, isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.toast}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onAnimationComplete={() => {
            setTimeout(onClose, 3000); // Fecha automaticamente após 3 segundos
          }}
        >
          <FaCheckCircle className={styles.icon} />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 