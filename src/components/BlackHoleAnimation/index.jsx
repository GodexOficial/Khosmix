import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

const BlackHoleAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let startTime = Date.now();
    const ANIMATION_DURATION = 60000; // 60 segundos

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * Math.min(canvas.width, canvas.height) * 0.8;
        
        this.x = canvas.width / 2 + Math.cos(angle) * distance;
        this.y = canvas.height / 2 + Math.sin(angle) * distance;
        this.size = Math.random() * 3 + 1;
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        this.speedMultiplier = Math.random() * 0.3 + 0.1;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.angle = angle;
        this.distance = distance;
        this.rotationSpeed = (Math.random() * 0.01 + 0.005) * this.speedMultiplier;
        this.radialSpeed = (Math.random() * 0.2 + 0.1) * this.speedMultiplier;
      }

      update(progress) {
        const speedIncrease = 1 + (progress * 1.5);
        
        this.angle += this.rotationSpeed * speedIncrease;
        this.distance -= this.radialSpeed * speedIncrease * (progress * 0.05);

        this.x = this.centerX + Math.cos(this.angle) * this.distance;
        this.y = this.centerY + Math.sin(this.angle) * this.distance;

        if (progress > 0.8) {
          this.distance -= this.radialSpeed * 2;
        }

        if (this.distance < 2) {
          this.reset();
        }
      }

      draw(ctx, progress) {
        const distanceFromCenter = Math.sqrt(
          Math.pow(this.x - this.centerX, 2) + 
          Math.pow(this.y - this.centerY, 2)
        );

        const maxDistance = Math.min(canvas.width, canvas.height) * 0.5;
        const distanceRatio = distanceFromCenter / maxDistance;
        
        const green = Math.floor(255 * (1 - distanceRatio));
        const opacity = this.opacity * (1 - progress * 0.3);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, ${green}, 136, ${opacity})`;
        ctx.fill();
      }
    }

    const particles = Array(300).fill().map(() => new Particle());

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

      ctx.fillStyle = `rgba(0, 0, 0, ${0.1})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerSize = 30 + progress * 100;
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, centerSize
      );
      gradient.addColorStop(0, 'rgba(0, 255, 136, 0.3)');
      gradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, centerSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      particles.forEach(particle => {
        particle.update(progress);
        particle.draw(ctx, progress);
      });

      if (progress >= 1) {
        startTime = Date.now();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.blackHole} />;
};

export default BlackHoleAnimation; 