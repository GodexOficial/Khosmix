import styles from './styles.module.css';

export const MenuButton = ({ isOpen, onClick }) => (
  <button 
    onClick={onClick} 
    className={`${styles.button} ${isOpen ? styles.open : ''}`}
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
  >
    <span className={styles.line} />
    <span className={styles.line} />
    <span className={styles.line} />
  </button>
); 