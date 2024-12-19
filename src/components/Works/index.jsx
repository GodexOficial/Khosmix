import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

export const Works = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'web', label: 'Web' },
    { id: 'motion', label: 'Motion' },
    { id: 'music', label: 'Música' },
    { id: 'design', label: 'Design' }
  ];

  const works = [
    {
      id: 1,
      title: "Website Corporativo",
      category: "web",
      image: "/images/works/web1.jpg",
      link: "#"
    },
    {
      id: 2,
      title: "Animação 3D",
      category: "motion",
      image: "/images/works/motion1.jpg",
      link: "#"
    },
    {
      id: 3,
      title: "Trilha Sonora",
      category: "music",
      image: "/images/works/music1.jpg",
      link: "#"
    },
    {
      id: 4,
      title: "Identidade Visual",
      category: "design",
      image: "/images/works/design1.jpg",
      link: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const filteredWorks = activeFilter === 'all' 
    ? works 
    : works.filter(work => work.category === activeFilter);

  return (
    <section id="works" className={styles.works}>
      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 variants={itemVariants}>
          Nossos Trabalhos
        </motion.h2>

        <motion.div className={styles.filters} variants={itemVariants}>
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`${styles.filterButton} ${activeFilter === filter.id ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
        >
          {filteredWorks.map(work => (
            <motion.a
              key={work.id}
              href={work.link}
              className={styles.work}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={styles.imageWrapper}>
                <img src={work.image} alt={work.title} />
              </div>
              <h3>{work.title}</h3>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}; 