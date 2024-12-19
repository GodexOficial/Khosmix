import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';
import styles from './styles.module.css';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className={styles.toggle}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <FiSun /> : <FiMoon />}
    </button>
  );
}; 