import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobexd,
  SiFigma,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiAdobeaftereffects,
  SiBlender,
  SiAudacity,
  SiProtools,
} from "react-icons/si";
import images from "../../constants/images";
import styles from "./styles.module.css";
import { throttle } from "lodash";

const skillIcons = {
  Figma: SiFigma,
  Photoshop: SiAdobephotoshop,
  Illustrator: SiAdobeillustrator,
  "After Effects": SiAdobeaftereffects,
  "Pro Tools": SiProtools,
  Audacity: SiAudacity,
  Blender: SiBlender,
  React: SiReact,
  "Node.js": SiNodedotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const socialVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  hover: { y: -3 },
};

const TeamMember = React.memo(({ member, onCardClick }) => {
  return (
    <motion.div
      key={member.id}
      className={styles.member}
      variants={itemVariants}
      onClick={() => onCardClick(member)}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.memberContent}>
        <div className={styles.imageWrapper}>
          <img src={member.image} alt={member.name} loading="lazy" width="150" height="150" />
          <div className={styles.social}>
            <motion.a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              variants={socialVariants}
              whileHover="hover"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variants={socialVariants}
              whileHover="hover"
            >
              <FaLinkedin />
            </motion.a>
          </div>
        </div>

        <div className={styles.info}>
          <motion.h3 variants={itemVariants}>{member.name}</motion.h3>
          <motion.p className={styles.role} variants={itemVariants}>
            {member.role}
          </motion.p>
        </div>
      </div>

      <motion.div className={styles.skills} variants={itemVariants}>
        {member.skills.map((skill, index) => {
          const Icon = skillIcons[skill];
          return (
            <motion.div key={index} className={styles.skill} whileHover={{ scale: 1.1 }}>
              {Icon ? <Icon /> : skill}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
});

export const Team = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Matheus da Costa",
      role: "Designer Editor and Producer",
      image: images.matheus,
      skills: [
        "Figma",
        "Photoshop",
        "Illustrator",
        "After Effects",
        "Pro Tools",
        "Audacity",
        "Blender",
      ],
      bio: "Uma breve biografia do funcionário descrevendo sua experiência e conquistas...",
      social: {
        github: "https://github.com/matheusscode",
        linkedin: "https://linkedin.com/in/matheusscode",
      },
    },
    {
      id: 2,
      name: "Julio Caetano",
      role: "Designer editor and illustrator",
      image: images.julio,
      skills: ["Figma", "After Effects", "Photoshop", "Illustrator"],
      bio: "Uma breve biografia do funcionário descrevendo sua experiência e conquistas...",
      social: {
        github: "https://github.com/juliocaetano",
        linkedin: "https://linkedin.com/in/juliocaetano",
      },
    },
    {
      id: 3,
      name: "Eliaabe Santos",
      role: "Desenvolvedor Full Stack",
      image: images.eliaabe,
      skills: ["React", "Node.js", "TypeScript", "JavaScript"],
      bio: "Uma breve biografia do funcionário descrevendo sua experiência e conquistas...",
      social: {
        github: "https://github.com/eliaabe",
        linkedin: "https://linkedin.com/in/eliaabe",
      },
    },
    {
      id: 4,
      name: "Luan Lopes",
      role: "Desenvolvedor Full Stack",
      image: images.luan,
      skills: ["React", "Node.js", "TypeScript", "JavaScript"],
      bio: "Uma breve biografia do funcionário descrevendo sua experiência e conquistas...",
      social: {
        github: "https://github.com/luanlopes",
        linkedin: "https://linkedin.com/in/luanlopes",
      },
    },
  ];

  function handleCardClick(employee) {
    setSelectedEmployee(employee);
  }

  function handleCloseModal() {
    setSelectedEmployee(null);
  }

  useEffect(() => {
    const handleScroll = throttle(() => {
      // Lógica de scroll aqui
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="team" className={styles.team}>
      <div className={styles.backgroundAnimation} />
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className={styles.title} variants={itemVariants}>
          Nosso Time
        </motion.h2>

        <div className={styles.members}>
          {teamMembers.map((member) => (
            <TeamMember key={member.id} member={member} onCardClick={handleCardClick} />
          ))}
        </div>
      </motion.div>

      {selectedEmployee && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <div className={styles.modalContent}>
              <img src={selectedEmployee.image} alt={selectedEmployee.name} />
              <h3>{selectedEmployee.name}</h3>
              <p>{selectedEmployee.role}</p>
              <div className={styles.skills}>
                <h4>Habilidades:</h4>
                <ul>
                  {selectedEmployee.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <p className={styles.bio}>{selectedEmployee.bio}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
