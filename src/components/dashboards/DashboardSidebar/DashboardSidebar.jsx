import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom"; // <-- para navegar programáticamente
import "./DashboardSidebar.css";

export default function DashboardSidebar({
  title = "Dashboards",
  links = [
    { href: "/dashboards", label: "Proyecto" },
    { href: "/dashboards?view=personal", label: "Personal" },
  ],
}) {
  const navigate = useNavigate();

  // Ruta activa (pathname + search)
  const activeUrl = useMemo(() => {
    if (typeof window === "undefined") return "/dashboards";
    const { pathname, search } = window.location;
    return `${pathname}${search || ""}`;
  }, []);

  const isActive = (href) => {
    if (!href) return false;
    try {
      if (typeof window === "undefined") return false;
      const base = window.location.origin;
      const full = new URL(href, base);
      const curr = new URL(activeUrl, base);
      return full.pathname === curr.pathname && full.search === curr.search;
    } catch {
      return activeUrl === href;
    }
  };

  // Botón volver a home
  const handleBack = () => {
    navigate("/"); // siempre va a la página principal
  };

  return (
    <aside className="sidebar" aria-label="Sidebar de dashboards">
      {/* Encabezado */}
      <div className="sidebar__header">
        <div className="sidebar__marker" aria-hidden="true" />
        <h2 className="sidebar__title">{title}</h2>
      </div>

      <div className="sidebar__separator" aria-hidden="true" />

      <nav className="sidebar__nav" role="navigation" aria-label="Secciones de dashboards">
        <ul className="sidebar__list">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <li key={href} className="sidebar__item">
                <a
                  href={href}
                  className={`sidebar__link ${active ? "sidebar__link--active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="sidebar__indicator" aria-hidden="true" />
                  <span className="sidebar__text">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <footer className="sidebar__footer">
        <small className="sidebar__hint">AndresMendez.studio</small>
        <button className="sidebar__back" onClick={handleBack} type="button">
          Volver a Home
        </button>
      </footer>
    </aside>
  );
}
