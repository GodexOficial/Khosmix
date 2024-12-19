import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import images from '../../constants/images';
import styles from './styles.module.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'trabalhos', label: 'Trabalhos' },
    { id: 'team', label: 'Time' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src={images.khosmix} 
            alt="Khosmix Logo" 
            onClick={() => scrollToSection('inicio')}
          />
        </motion.div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
          {menuItems.map(item => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <button 
          className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.header>
  );
};
