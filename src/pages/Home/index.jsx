import { useState } from 'react';
import { Header } from '../../components/Header';
import { Hero } from '../../components/Hero';
import { About } from '../../components/About';
import { Netflix } from '../../components/Netflix';
import { Team } from '../../components/Team';
import { Footer } from '../../components/Footer';
import { ContactForm } from '../../components/ContactForm';
import { BackToTop } from '../../components/BackToTop';
import { DotNavigation } from '../../components/DotNavigation';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import styles from './styles.module.css';

export const Home = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleContactClick = () => {
    setIsContactOpen(true);
  };

  const handleContactClose = () => {
    setIsContactOpen(false);
  };

  return (
    <div className={styles.home}>
      <AnimatedBackground />
      <Header />
      <main>
        <Hero />
        <About onContactClick={handleContactClick} />
        <Netflix />
        <Team />
      </main>
      <Footer />
      <BackToTop />
      <DotNavigation />
      <ContactForm 
        isOpen={isContactOpen} 
        onClose={handleContactClose} 
      />
    </div>
  );
}; 