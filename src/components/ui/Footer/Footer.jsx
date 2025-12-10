import React from "react";

export default function Footer() {
  return (
    <footer
      style={styles.footer}
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div style={styles.container}>
        <p style={styles.copy}>
          © 2025 <span style={styles.brand}>AndresMendez.studio</span>
        </p>

        <nav aria-label="Enlaces del pie" style={styles.nav}>
          <a href="/privacidad" style={styles.link}>
            Privacidad
          </a>

          <span style={styles.sep}>•</span>

          <a href="/terminos" style={styles.link}>
            Términos
          </a>

          <span style={styles.sep}>•</span>

          <a href="/contacto" style={styles.link}>
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#020617",
    color: "#aaa",
    padding: "20px",
    textAlign: "center",
    borderTop: "1px solid rgba(148,163,184,0.15)",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  copy: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.6,
  },
  brand: {
    fontWeight: 700,
    color: "#38bdf8",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  link: {
    color: "#aaa",
    textDecoration: "none",
    fontSize: 13,
    transition: "color .25s ease",
  },
  sep: {
    color: "#334155",
  },
};
