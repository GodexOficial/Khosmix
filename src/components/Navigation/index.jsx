import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const sections = ['inicio', 'sobre', 'trabalhos', 'team', 'footer'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      let currentSection = sections[0];
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            currentSection = section;
          }
        }
      });
      
      const footer = document.getElementById('footer');
      if (footer) {
        const footerTop = footer.offsetTop;
        const windowBottom = window.scrollY + window.innerHeight;
        
        if (windowBottom >= footerTop || 
            windowBottom >= document.documentElement.scrollHeight - 10) {
          currentSection = 'footer';
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.dots}>
        <a 
          href="#inicio" 
          className={`${styles.dot} ${activeSection === 'inicio' ? styles.active : ''}`}
          aria-label="Ir para Início"
          onClick={(e) => handleClick(e, 'inicio')}
        >
          <span>Início</span>
        </a>
        <a 
          href="#sobre" 
          className={`${styles.dot} ${activeSection === 'sobre' ? styles.active : ''}`}
          aria-label="Ir para Sobre"
          onClick={(e) => handleClick(e, 'sobre')}
        >
          <span>Sobre</span>
        </a>
        <a 
          href="#trabalhos" 
          className={`${styles.dot} ${activeSection === 'trabalhos' ? styles.active : ''}`}
          aria-label="Ir para Trabalhos"
          onClick={(e) => handleClick(e, 'trabalhos')}
        >
          <span>Trabalhos</span>
        </a>
        <a 
          href="#team" 
          className={`${styles.dot} ${activeSection === 'team' ? styles.active : ''}`}
          aria-label="Ir para Time"
          onClick={(e) => handleClick(e, 'team')}
        >
          <span>Time</span>
        </a>
        <a 
          href="#footer" 
          className={`${styles.dot} ${activeSection === 'footer' ? styles.active : ''}`}
          aria-label="Ir para Contato"
          onClick={(e) => handleClick(e, 'footer')}
        >
          <span>Contato</span>
        </a>
      </div>
    </nav>
  );
}; 