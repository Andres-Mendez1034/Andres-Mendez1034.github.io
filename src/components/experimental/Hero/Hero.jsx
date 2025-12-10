import React from "react";
import bgDefault from "../../../assets/hero.png"; // <-- ruta correcta según tu estructura
import "./hero.css";

/**
 * Hero con fondo de imagen + overlay de gradiente.
 * - Permite pasar bgSrc como prop para customizar el fondo.
 * - Mantiene la paleta (#020617 / #0f172a / #38bdf8).
 * - Incluye un <img> de fondo con loading="lazy" para mejor performance.
 */
export default function Hero({
  title = "Consumo Responsable",
  subtitle = "Plataforma experimental para hábitos sostenibles y dashboards",
  bgSrc = bgDefault,
  height = "60vh",
}) {
  return (
    <section
      id="hero"
      role="banner"
      aria-label="Sección de portada"
      style={{ ...styles.hero, minHeight: height }}
    >
      {/* Fondo: usa <img> para que el navegador gestione carga/caché */}
      <img
        src={bgSrc}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={styles.bgImage}
      />

      {/* Overlay para legibilidad del texto sobre la imagen */}
      <div style={styles.overlay} />

      {/* Contenido centrado */}
      <div style={styles.content}>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    position: "relative",
    display: "grid",
    placeItems: "center",
    padding: "60px 20px",
    backgroundColor: "#0f172a",
    color: "#e5e7eb",
    textAlign: "center",
    overflow: "hidden",
    borderBottom: "1px solid rgba(148,163,184,0.12)",
  },

  bgImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    filter: "saturate(1.05) contrast(1.05)",
    transform: "scale(1.02)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(120% 100% at 50% 0%, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.85) 60%, rgba(2,6,23,0.95) 100%)",
    boxShadow: "inset 0 1px 0 rgba(148,163,184,0.08)",
  },

  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 12px",
  },

  title: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    marginBottom: "12px",
    fontWeight: 800,
    letterSpacing: "0.2px",
    lineHeight: 1.15,
    background:
      "linear-gradient(135deg, #e5e7eb 0%, #e5e7eb 60%, #38bdf8 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },

  subtitle: {
    fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
    color: "#94a3b8",
    opacity: 0.95,
    maxWidth: 800,
    margin: "0 auto",
  },
};
