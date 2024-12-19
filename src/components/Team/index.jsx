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

export const Team = () => {
  const team = [
    {
      name: "Matheus da Costa",
      role: "Designer Editor and Producer",
      image: images.matheus,
      skills: [
        SiFigma,
        SiAdobephotoshop,
        SiAdobeillustrator,
        SiAdobeaftereffects,
        SiProtools,
        SiAudacity,
        SiBlender,
      ],
      social: {
        github: "https://github.com/matheusscode",
        linkedin: "https://linkedin.com/in/matheusscode",
      },
    },
    {
      name: "Julio Caetano",
      role: "Designer editor and illustrator",
      image: images.julio,
      skills: [SiFigma, SiAdobeaftereffects, SiAdobephotoshop, SiAdobeillustrator],
      social: {
        github: "https://github.com/juliocaetano",
        linkedin: "https://linkedin.com/in/juliocaetano",
      },
    },
    {
      name: "Eliaabe Santos",
      role: "Desenvolvedor Full Stack",
      image: images.eliaabe,
      skills: [SiReact, SiNodedotjs, SiTypescript, SiJavascript],
      social: {
        github: "https://github.com/eliaabe",
        linkedin: "https://linkedin.com/in/eliaabe",
      },
    },
    {
      name: "Luan Lopes",
      role: "Desenvolvedor Full Stack",
      image: images.luan,
      skills: [SiReact, SiNodedotjs, SiTypescript, SiJavascript],
      social: {
        github: "https://github.com/luanlopes",
        linkedin: "https://linkedin.com/in/luanlopes",
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
          {team.map((member) => (
            <motion.div key={member.name} className={styles.member} variants={itemVariants}>
              <div className={styles.memberContent}>
                <div className={styles.imageWrapper}>
                  <img src={member.image} alt={member.name} />
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
                {member.skills.map((Icon, index) => (
                  <motion.div key={index} className={styles.skill} whileHover={{ scale: 1.1 }}>
                    <Icon />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
