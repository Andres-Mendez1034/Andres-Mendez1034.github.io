import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState([]);

  // Simular avance de construcción
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + Math.random() * 8));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Inicializar partículas
  useEffect(() => {
    const initialParticles = Array.from({ length: 18 }).map(() => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
    }));
    setParticles(initialParticles);
  }, []);

  // Capturar posición del mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setParticles((prev) =>
        prev.map((p, i) => ({
          ...p,
          targetX: e.clientX + Math.cos(i) * 30, // dispersión ligera
          targetY: e.clientY + Math.sin(i) * 30,
        }))
      );
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animación suave de partículas
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + (p.targetX - p.x) * 0.1,
          y: p.y + (p.targetY - p.y) * 0.1,
        }))
      );
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <main className="construction-root" aria-label="Página en construcción">
      {/* Fondos animados */}
      <div className="bg-gradient" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      {/* Partículas cohesionadas */}
      <div className="particles" aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{ left: p.x, top: p.y }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <section className="content">
        <div className="badge">OLA</div>

        <h1 className="title">
          <span className="typewriter">Página en construcción</span>
          <span className="cursor">|</span>
        </h1>

        <p className="subtitle">
          ola
        </p>

        {/* Barra de progreso */}
        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${Math.min(progress, 100)}%` }}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.floor(progress)}
            role="progressbar"
          />
        </div>

        {/* Íconos de herramientas */}
        <div className="tools">
          <Tool icon="hammer" label="Martillo" />
          <Tool icon="wrench" label="Llave" />
          <Tool icon="gear" label="Engranaje" />
          <Tool icon="cone" label="Cono" />
        </div>

        {/* Marquee de mensajes */}
        <div className="marquee" aria-hidden="true">
          <div className="track">
            <span>particulas mal hechas</span>
            <span>ola</span>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="footer">
        <span>© {new Date().getFullYear()} OLA</span>
        <span className="dot">•</span>
        <span>...</span>
      </footer>
    </main>
  );
}

// Íconos SVG animados
function Tool({ icon, label }) {
  const icons = {
    hammer: (
      <svg viewBox="0 0 64 64" className="svg swing">
        <path d="M40 8l8 8-8 8-6-6-18 18-6-6 18-18-6-6 8-8 10 10z" fill="currentColor" />
        <rect x="12" y="34" width="8" height="18" rx="4" fill="currentColor" />
      </svg>
    ),
    wrench: (
      <svg viewBox="0 0 64 64" className="svg floaty">
        <path d="M56 20a12 12 0 0 1-16 11L24 47l-7-7 16-16A12 12 0 1 1 56 20z" fill="currentColor" />
      </svg>
    ),
    gear: (
      <svg viewBox="0 0 64 64" className="svg spin">
        <g fill="none" stroke="currentColor" strokeWidth="4">
          <circle cx="32" cy="32" r="8" />
          <path d="M32 6v8M32 50v8M6 32h8M50 32h8M12 12l6 6M46 46l6 6M12 52l6-6M46 18l6-6" />
        </g>
      </svg>
    ),
    cone: (
      <svg viewBox="0 0 64 64" className="svg bounce">
        <rect x="18" y="40" width="28" height="12" rx="2" fill="currentColor" />
        <path d="M32 10l12 30H20L32 10z" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <div className={`tool tool-${icon}`} aria-label={label} title={label}>
      {icons[icon]}
    </div>
  );
}
