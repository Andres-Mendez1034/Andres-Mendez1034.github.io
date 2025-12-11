import React from "react";

export default function NotFound() {
  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) window.history.back();
      else window.location.href = "/";
    }
  };

  return (
    <main
      style={styles.main}
      role="main"
      aria-label="Página no encontrada"
      id="main"
    >
      <section style={styles.card} aria-live="polite">
        {/* Badge 404 */}
        <div style={styles.badge} aria-hidden="true">
          <span style={styles.badgeText}>404</span>
        </div>

        {/* Título */}
        <h1 style={styles.title}>
          Página no encontrada
          <span style={styles.accent}>.</span>
        </h1>

        {/* Descripción */}
        <p style={styles.desc}>
          Lo sentimos, no pudimos encontrar la página que buscas. Puede que el
          enlace esté roto o la URL haya cambiado.
        </p>

        {/* Acciones */}
        <div style={styles.actions}>
          <a
            href="/"
            style={{ ...styles.btn, ...styles.btnPrimary }}
          >
            Ir al inicio
          </a>

          <button
            type="button"
            onClick={handleBack}
            style={{ ...styles.btn, ...styles.btnGhost }}
          >
            Volver atrás
          </button>
        </div>

        {/* Sugerencias */}
        <nav aria-label="Sugerencias" style={styles.suggestions}>
          <a
            href="/dashboards"
            style={styles.suggestionLink}
          >
            Ver dashboards
          </a>

          <a
            href="#chatbot"
            style={styles.suggestionLink}
          >
            Abrir chatbot
          </a>

          <a
            href="/contacto"
            style={styles.suggestionLink}
          >
            Contacto
          </a>
        </nav>
      </section>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "80vh",
    display: "grid",
    placeItems: "center",
    padding: "32px 20px",
    background: "#020617",
    color: "#e5e7eb",
  },
  card: {
    width: "100%",
    maxWidth: 720,
    background:
      "linear-gradient(180deg, rgba(2,6,23,0.8) 0%, rgba(2,6,23,0.95) 100%)",
    border: "1px solid rgba(148,163,184,0.15)",
    borderRadius: 16,
    padding: 28,
    boxShadow:
      "0 10px 30px rgba(2, 6, 23, 0.55), inset 0 1px 0 rgba(148,163,184,0.08)",
    backdropFilter: "blur(4px)",
    textAlign: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 84,
    height: 84,
    borderRadius: 16,
    marginBottom: 16,
    background:
      "linear-gradient(135deg, #22c55e 0%, #38bdf8 100%)",
    boxShadow: "0 6px 18px rgba(56, 189, 248, 0.25)",
  },
  badgeText: {
    fontWeight: 800,
    fontSize: 28,
    color: "#020617",
  },
  title: {
    margin: "8px 0 8px",
    fontSize: 28,
    fontWeight: 700,
  },
  accent: {
    background:
      "linear-gradient(135deg, #22c55e 0%, #38bdf8 60%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },
  desc: {
    margin: "0 0 18px",
    fontSize: 16,
    lineHeight: 1.6,
    color: "#cbd5e1",
  },
  actions: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  btn: {
    cursor: "pointer",
    padding: "10px 16px",
    borderRadius: 10,
    fontSize: 14,
    border: "1px solid transparent",
    textDecoration: "none",
  },
  btnPrimary: {
    background:
      "linear-gradient(135deg, #22c55e 0%, #38bdf8 100%)",
    color: "#020617",
    fontWeight: 700,
  },
  btnGhost: {
    background: "transparent",
    color: "#e5e7eb",
    border: "1px solid rgba(148,163,184,0.25)",
  },
  suggestions: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
    marginTop: 10,
    borderTop: "1px solid rgba(148,163,184,0.12)",
    paddingTop: 14,
  },
  suggestionLink: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: 13,
  },
};
