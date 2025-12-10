import React from "react";
import "./proyectoDashboard.css";


/**
 * ProyectoDashboard.jsx
 * - JSX limpio, sin estilos en línea ni emojis.
 * - Semántico y accesible (roles, aria-*).
 * - Estructura: cabecera, acciones, grid de métricas y panel de detalles.
 * - Pensado para aplicar estilos vía CSS (clases BEM).
 */
export default function ProyectoDashboard({
  onRefresh,
  title = "Dashboard Proyecto ODS 12",
  subtitle = "Métricas y simulaciones del proyecto de consumo responsable.",
  cards = [
    { id: "impacto", title: "Impacto ambiental (estimado)", status: "En curso", value: "−12", unit: "%", hint: "Reducción frente a la línea base" },
    { id: "reciclaje", title: "Tasa de reciclaje", status: "Estable", value: "46", unit: "%", hint: "Promedio últimos 30 días" },
    { id: "ahorro", title: "Ahorro de recursos", status: "Hoy", value: "1.4", unit: "tCO₂e", hint: "Simulación diaria (scope estimado)" },
  ],
}) {
  const handleRefresh = () => {
    if (typeof onRefresh === "function") onRefresh();
  };

  return (
    <section className="proj" aria-labelledby="proj-title">
      {/* Cabecera */}
      <header className="proj__header">
        <div className="proj__header-left">
          <span className="proj__marker" aria-hidden="true" />
          <h2 id="proj-title" className="proj__title">{title}</h2>
        </div>

        <div className="proj__actions">
          <button
            type="button"
            className="proj__btn proj__btn--ghost"
            onClick={handleRefresh}
          >
            Refrescar
          </button>
          <a href="/dashboards" className="proj__btn proj__btn--link">
            Ver dashboards
          </a>
        </div>
      </header>

      {/* Descripción */}
      <p className="proj__subtitle">{subtitle}</p>

      {/* Tarjetas de métricas */}
      <div className="proj__grid" role="list">
        {cards.map(({ id, title, status, value, unit, hint }) => (
          <article key={id} className="proj-card" role="listitem" aria-label={title}>
            <div className="proj-card__header">
              <h3 className="proj-card__title">{title}</h3>
              <span className={`proj-badge ${badgeTone(status)}`}>{status}</span>
            </div>

            <p className="proj-card__value">
              {value}
              {unit && <span className="proj-card__unit">{unit}</span>}
            </p>
            {hint && <p className="proj-card__hint">{hint}</p>}
          </article>
        ))}
      </div>

      {/* Panel de detalles / CTA */}
      <div className="proj-panel">
        <div className="proj-panel__text">
          <h4 className="proj-panel__title">Explora simulaciones y escenarios</h4>
          <p className="proj-panel__desc">
            Ajusta parámetros del proyecto, compara periodos y evalúa el efecto en consumo responsable y reducción de residuos.
          </p>
        </div>
        <div className="proj-panel__actions">
          <a href="/dashboards?view=proyecto" className="proj__btn proj__btn--primary">
            Abrir simulaciones
          </a>
          <a href="/dashboards/config" className="proj__btn proj__btn--secondary">
            Configurar parámetros
          </a>
        </div>
      </div>
    </section>
  );
}

/** Mapea el estado a una clase de tono de badge (para CSS) */
function badgeTone(status = "") {
  const s = status.toLowerCase();
  if (s.includes("estable") || s.includes("ok") || s.includes("bien")) return "proj-badge--success";
  if (s.includes("hoy") || s.includes("info") || s.includes("nuevo")) return "proj-badge--info";
  if (s.includes("alerta") || s.includes("riesgo") || s.includes("en curso")) return "proj-badge--warning";
  return "proj-badge--default";
}
