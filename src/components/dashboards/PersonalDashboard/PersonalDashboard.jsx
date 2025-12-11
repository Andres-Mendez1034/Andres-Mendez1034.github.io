import React from "react";
import "./PersonalDashboard.css";
/**
 * PersonalDashboard.jsx
 * - JSX limpio, sin estilos en línea ni emojis.
 * - Semántico y accesible (roles, aria-*).
 * - Estructura con cabecera, acciones, grid de métricas y panel de detalles.
 * - Pensado para aplicar estilos vía CSS (clases BEM).
 */
export default function PersonalDashboard({
  onRefresh,
  title = "Dashboard Personal",
  subtitle = "Visualiza tus métricas personales y hábitos. Estos datos se actualizan en tiempo real según tu actividad.",
  cards = [
    { id: "weekly", title: "Progreso semanal", status: "En curso", value: "72", unit: "%", hint: "Objetivo: 80% · Última actualización: hace 2h" },
    { id: "responsible", title: "Consumo responsable", status: "Estable", value: "18", unit: "pts", hint: "Tendencia +2 en la última semana" },
    { id: "habits-time", title: "Tiempo en hábitos", status: "Hoy", value: "45", unit: "min", hint: "Meta diaria: 60 min" },
  ],
}) {
  const handleRefresh = () => {
    if (typeof onRefresh === "function") onRefresh();
  };

  return (
    <section className="pd" aria-labelledby="pd-title">
      {/* Cabecera */}
      <header className="pd__header">
        <div className="pd__header-left">
          <span className="pd__marker" aria-hidden="true" />
          <h2 id="pd-title" className="pd__title">{title}</h2>
        </div>

        <div className="pd__actions">
          <button type="button" className="pd__btn pd__btn--ghost" onClick={handleRefresh}>
            Refrescar
          </button>
          <a href="/perfil" className="pd__btn pd__btn--link">
            Ver perfil
          </a>
        </div>
      </header>

      {/* Descripción */}
      <p className="pd__subtitle">{subtitle}</p>

      {/* Tarjetas de métricas */}
      <div className="pd__grid" role="list">
        {cards.map(({ id, title, status, value, unit, hint }) => (
          <article key={id} className="pd-card" role="listitem" aria-label={title}>
            <div className="pd-card__header">
              <h3 className="pd-card__title">{title}</h3>
              <span className={`pd-badge ${badgeTone(status)}`}>{status}</span>
            </div>

            <p className="pd-card__value">
              {value}
              {unit && <span className="pd-card__unit">{unit}</span>}
            </p>
            {hint && <p className="pd-card__hint">{hint}</p>}
          </article>
        ))}
      </div>

      {/* Panel de detalles / CTA */}
      <div className="pd-panel">
        <div className="pd-panel__text">
          <h4 className="pd-panel__title">Profundiza en tus datos</h4>
          <p className="pd-panel__desc">
            Explora tus tendencias, compara periodos y ajusta tus objetivos para mantener hábitos sostenibles.
          </p>
        </div>
        <div className="pd-panel__actions">
          <a href="/dashboards?view=personal" className="pd__btn pd__btn--primary">
            Abrir dashboards
          </a>
          <a href="/ajustes" className="pd__btn pd__btn--secondary">
            Ajustes
          </a>
        </div>
      </div>
    </section>
  );
}

/** Mapea el estado a una clase de tono de badge (para CSS) */
function badgeTone(status = "") {
  const s = status.toLowerCase();
  if (s.includes("estable") || s.includes("ok") || s.includes("bien")) return "pd-badge--success";
  if (s.includes("hoy") || s.includes("info") || s.includes("nuevo")) return "pd-badge--info";
  if (s.includes("alerta") || s.includes("riesgo")) return "pd-badge--warning";
  return "pd-badge--default";
}
