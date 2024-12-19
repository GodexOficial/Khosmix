import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

export const DotNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'works', label: 'Trabalhos' },
    { id: 'team', label: 'Time' }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.dotNav}>
      {sections.map(section => (
        <motion.button
          key={section.id}
          className={`${styles.dot} ${activeSection === section.id ? styles.active : ''}`}
          onClick={() => scrollToSection(section.id)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Ir para seção ${section.label}`}
        >
          <span className={styles.label}>{section.label}</span>
        </motion.button>
      ))}
    </nav>
  );
};
