import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSearch } from 'react-icons/fa';
import styles from './styles.module.css';

export const JobDetails = ({ job, isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const projects = {
    design: [
      { name: 'Redesign App Banco', client: 'Banco XYZ', year: '2023' },
      { name: 'E-commerce UI/UX', client: 'Loja ABC', year: '2023' },
      { name: 'Dashboard Analytics', client: 'Tech Corp', year: '2022' },
      { name: 'App de Delivery', client: 'Food Express', year: '2023' },
      { name: 'Rede Social Mobile', client: 'Social Connect', year: '2022' }
    ],
    motion: [
      { name: 'Animação Institucional', client: 'Empresa XYZ', year: '2023' },
      { name: 'Motion Graphics', client: 'Startup ABC', year: '2023' },
      { name: 'VFX para Comercial', client: 'Marca XYZ', year: '2022' },
      { name: 'Intro para YouTube', client: 'Canal Tech', year: '2023' },
      { name: 'Vinheta para TV', client: 'Emissora Local', year: '2022' }
    ],
    dev: [
      { name: 'Plataforma EAD', client: 'Escola Online', year: '2023' },
      { name: 'Sistema de Gestão', client: 'Empresa ABC', year: '2023' },
      { name: 'App de Finanças', client: 'Fintech XYZ', year: '2022' },
      { name: 'E-commerce React', client: 'Shop Digital', year: '2023' },
      { name: 'Dashboard Admin', client: 'Tech Solutions', year: '2022' }
    ],
    modelagem: [
      { name: 'Personagem 3D', client: 'Game Studio', year: '2023' },
      { name: 'Cenário para Filme', client: 'Produtora ABC', year: '2023' },
      { name: 'Assets para Game', client: 'Game Dev XYZ', year: '2022' },
      { name: 'Visualização Arquitetônica', client: 'Construtora', year: '2023' },
      { name: 'Modelagem de Produto', client: 'Design Corp', year: '2022' }
    ],
    producao: [
      { name: 'Trilha para Comercial', client: 'Agência ABC', year: '2023' },
      { name: 'Sound Design Game', client: 'Game Studio', year: '2023' },
      { name: 'Podcast Corporativo', client: 'Empresa XYZ', year: '2022' },
      { name: 'Mixagem de Álbum', client: 'Banda Local', year: '2023' },
      { name: 'Áudio para App', client: 'Tech Startup', year: '2022' }
    ],
    identidade: [
      { name: 'Branding Completo', client: 'Startup Tech', year: '2023' },
      { name: 'Redesign de Marca', client: 'Empresa ABC', year: '2023' },
      { name: 'Manual de Identidade', client: 'Corp XYZ', year: '2022' },
      { name: 'Papelaria Corporativa', client: 'Escritório Law', year: '2023' },
      { name: 'Social Media Kit', client: 'Influencer', year: '2022' }
    ]
  };

  const services = {
    design: [
      'Design de Interfaces (UI)',
      'Experiência do Usuário (UX)',
      'Wireframing e Prototipagem',
      'Design System',
      'Design Responsivo',
      'Mobile First Design'
    ],
    motion: [
      'Animação 2D/3D',
      'Motion Graphics',
      'VFX',
      'Composição Visual',
      'Edição de Vídeo',
      'Storyboard'
    ],
    dev: [
      'Desenvolvimento Frontend',
      'Desenvolvimento Backend',
      'APIs RESTful',
      'Aplicações React',
      'Banco de Dados',
      'DevOps'
    ],
    modelagem: [
      'Modelagem 3D Orgânica',
      'Modelagem Hard Surface',
      'Texturização',
      'Rigging e Animação',
      'Renderização',
      'Otimização de Assets'
    ],
    producao: [
      'Composição Musical',
      'Sound Design',
      'Mixagem e Masterização',
      'Produção de Podcasts',
      'Áudio para Games',
      'Sonorização de Vídeos'
    ],
    identidade: [
      'Design de Logos',
      'Branding Completo',
      'Manual de Marca',
      'Papelaria Corporativa',
      'Social Media Design',
      'Marketing Visual'
    ]
  };

  const filteredProjects = projects[job?.id]?.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modal}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <FaTimes />
            </button>

            <div className={styles.header}>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {job?.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {job?.description}
              </motion.p>
            </div>

            <div className={styles.search}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Pesquisar projetos ou empresas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className={styles.content}>
              <div className={styles.services}>
                <h3>Nossos Serviços</h3>
                <ul>
                  {services[job?.id]?.map((service, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {service}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className={styles.projects}>
                <h3>Projetos Recentes</h3>
                {filteredProjects.length > 0 ? (
                  <div className={styles.projectGrid}>
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={index}
                        className={styles.projectCard}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <h4>{project.name}</h4>
                        <p>{project.client}</p>
                        <span>{project.year}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.noResults}>Nenhum projeto encontrado</p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 