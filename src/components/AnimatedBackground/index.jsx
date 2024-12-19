import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

export const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Configuração das partículas
    const particleCount = 100;
    const particleBaseRadius = 2;
    const connectionDistance = 150;
    const moveSpeed = 0.5;
    const mouseRadius = 100;
    const mouseForce = 0.05;

    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * particleBaseRadius + 0.7;
        this.vx = (Math.random() - 0.5) * moveSpeed;
        this.vy = (Math.random() - 0.5) * moveSpeed;
        this.originalVx = this.vx;
        this.originalVy = this.vy;
      }

      update() {
        // Movimento base
        this.x += this.vx;
        this.y += this.vy;

        // Interação com o mouse apenas se ele estiver na tela
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            // Calcula vetor de repulsão
            const angle = Math.atan2(dy, dx);
            const force = (mouseRadius - distance) / mouseRadius;

            // Aplica força de repulsão
            this.vx = this.originalVx - Math.cos(angle) * force * mouseForce;
            this.vy = this.originalVy - Math.sin(angle) * force * mouseForce;
          } else {
            // Retorna gradualmente à velocidade original
            this.vx = this.vx * 0.98 + this.originalVx * 0.02;
            this.vy = this.vy * 0.98 + this.originalVy * 0.02;
          }
        }

        // Mantém partículas dentro da tela
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -1;
          this.originalVx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -1;
          this.originalVy *= -1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 136, 0.5)";
        ctx.fill();
      }
    }

    // Inicializa partículas
    particlesRef.current = Array(particleCount)
      .fill()
      .map(() => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Atualiza e desenha partículas
      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw();

        // Conecta partículas próximas
        particlesRef.current.forEach((otherParticle) => {
          if (particle === otherParticle) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(0, 255, 136, ${opacity * 0.2})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event listeners para o mouse
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.background} aria-hidden="true" />;
};
