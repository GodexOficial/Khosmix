import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Toast } from "../Toast";
import styles from "./styles.module.css";

export const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    description: "",
  });
  const [showToast, setShowToast] = useState(false);

  const categories = [
    { id: "design", label: "Design UI/UX" },
    { id: "motion", label: "Motion Design" },
    { id: "dev", label: "Desenvolvimento Web" },
    { id: "3d", label: "Modelagem 3D" },
    { id: "audio", label: "Produção Musical" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envio do formulário
    console.log(formData);

    // Limpa o formulário
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      description: "",
    });

    // Mostra o toast e fecha o modal
    setShowToast(true);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
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

              <div className={styles.container}>
                <div className={styles.imageSection}>
                  <img src="/images/Khosmix.jpg" alt="Contato" />
                </div>

                <div className={styles.formSection}>
                  <h2>Entre em Contato</h2>
                  <p>Conte-nos sobre seu projeto</p>

                  <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Nome completo"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Telefone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Selecione uma categoria</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.inputGroup}>
                      <textarea
                        name="description"
                        placeholder="Descreva seu projeto"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                      />
                    </div>

                    <button type="submit" className={styles.submitButton}>
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast
        message="Mensagem enviada com sucesso!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};
