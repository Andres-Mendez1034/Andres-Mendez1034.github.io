import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";

export default function Navbar({ currentPath }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const drawerRef = useRef(null);

  const activePath =
    typeof window !== "undefined" && !currentPath
      ? window.location.pathname
      : currentPath || "/";

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboards", label: "Dashboards" },
    { href: "/chatbot", label: "Chatbot" },

  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setScrolled(y > 8);

      const h =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setProgress(h > 0 ? Math.min(1, y / h) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onKeyDown = (e) => {
      if (e.key === "Escape" && open) setOpen(false);

      if (open && e.key === "Tab") {
        const focusables = getFocusables(drawerRef.current);
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);

      setTimeout(() => {
        const first = getFocusables(drawerRef.current)[0];
        first?.focus();
      }, 0);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const onSkip = (e) => {
    e.preventDefault();

    const main =
      typeof document !== "undefined"
        ? document.querySelector("main, #main")
        : null;

    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus();
      window.scrollTo({
        top: main.offsetTop - 16,
        behavior: "smooth",
      });
    }
  };

  const isActive = (href) => {
    if (!href || href.startsWith("#")) return false;

    try {
      const base =
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost";

      return activePath === new URL(href, base).pathname;
    } catch {
      return activePath === href;
    }
  };

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <nav
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        role="navigation"
        aria-label="Barra de navegación principal"
      >
        <a href="#main" className="skip-link" onClick={onSkip}>
          Saltar al contenido
        </a>

        <div className="navbar__left">
          <a href="/" className="brand">
            <span className="brand__text">AndresMendez.studio (Probablemente nunca la termine)</span>
          </a>
        </div>

        <div className="navbar__center">
          <ul className="navlinks" role="menubar" aria-label="Secciones">
            {links.map(({ href, label }) => (
              <li key={href} role="none">
                <a
                  role="menuitem"
                  href={href}
                  className={`navlink ${isActive(href) ? "navlink--active" : ""}`}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  <span className="navlink__label">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar__right">
          <a href="/login" className="btn btn--ghost">
            Iniciar sesión
          </a>

          <a href="/register" className="btn btn--primary">
            Crear cuenta
          </a>

          <button
            className="hamburger"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-controls="mobile-drawer"
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d={
                  open
                    ? "M6 6l12 12M18 6l-12 12"
                    : "M3 6h18M3 12h18M3 18h18"
                }
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`drawer-overlay ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div className="scrim" />

        <aside
          id="mobile-drawer"
          ref={drawerRef}
          className={`drawer ${open ? "is-open" : ""}`}
          role="dialog"
          aria-label="Menú de navegación"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="drawer__header">
            <a href="/" aria-label="Inicio">
              <span className="brand__text">AndresMendez.studio</span>
            </a>

            <button
              className="icon-btn"
              onClick={() => setOpen(false)}
              type="button"
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>

          <nav className="drawer__nav" aria-label="Secciones móviles">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`drawer__link ${isActive(href) ? "is-active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="drawer__actions">
            <a
              href="/login"
              className="btn btn--ghost"
              onClick={() => setOpen(false)}
            >
              Iniciar sesión
            </a>

            <a
              href="/register"
              className="btn btn--primary"
              onClick={() => setOpen(false)}
            >
              Crear cuenta
            </a>
          </div>

          <footer className="drawer__footer">
            <small className="drawer__hint">
              Hecho con 💙 por AndresMendez.studio
            </small>
          </footer>
        </aside>
      </div>
    </>
  );
}

function getFocusables(root) {
  if (!root) return [];

  const selector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  return Array.from(root.querySelectorAll(selector)).filter(
    (el) => !el.hasAttribute("disabled")
  );
}
