
import React from "react";
import "./objetivos.css";

/**
 * Objetivos.jsx
 * - JSX boosteado, sin CSS (listo para estilizar por clases).
 * - Semántico y accesible: landmarks, headings jerárquicos, aria-*.
 * - Estructura: hero breve, grid de secciones (Objetivos / Misión / Aplicativo),
 *   lista de objetivos, y CTA final.
 * - API por props para reutilizar en otras páginas.
 */
export default function Objetivos({
  title = "Consumo Responsable · Objetivos",
  intro = "Promovemos hábitos sostenibles mediante tecnología, datos y visualizaciones que permiten monitorear y reducir el impacto ambiental.",
  sections = [
    {
      id: "objetivos",
      heading: "Objetivos",
      body:
        "Fomentar el consumo responsable con herramientas que midan el impacto, informen decisiones y faciliten la mejora continua.",
      bullets: [
        "Medir y visualizar indicadores clave de sostenibilidad.",
        "Motivar cambios de hábito con metas claras y feedback.",
        "Comparar periodos y evaluar tendencias para tomar acciones.",
      ],
    },
    {
      id: "mision",
      heading: "Misión",
      body:
        "Inspirar y facilitar hábitos sostenibles en la comunidad a través de experiencias claras, datos accionables y educación continua.",
      bullets: [
        "Empoderar a los usuarios con información útil y comprensible.",
        "Conectar métricas con decisiones cotidianas.",
        "Crear una cultura de mejora y responsabilidad compartida.",
      ],
    },
    {
      id: "aplicativo",
      heading: "Aplicativo",
      body:
        "El aplicativo ofrece dashboards interactivos para monitorear, comparar y simular métricas de consumo responsable de recursos.",
      bullets: [
        "Dashboards con métricas en tiempo real y comparaciones históricas.",
        "Simulaciones y escenarios para evaluar impacto potencial.",
        "Integraciones futuras con dispositivos y fuentes de datos.",
      ],
    },
  ],
  cta = {
    title: "Explora los dashboards",
    description:
      "Profundiza en tus datos, ajusta metas y evalúa el impacto de tus decisiones.",
    primaryHref: "/dashboards",
    primaryLabel: "Abrir dashboards",
    secondaryHref: "/guia",
    secondaryLabel: "Ver guía de uso",
  },
}) {
  return (
    <section className="objetivos" aria-labelledby="objetivos-title">
      {/* Encabezado / Hero breve */}
      <header className="objetivos__hero">
        <div className="objetivos__hero-inner">
          <h1 id="objetivos-title" className="objetivos__title">
            {title}
          </h1>
          {intro && <p className="objetivos__intro">{intro}</p>}
        </div>
      </header>

      {/* Contenedor principal */}
      <div className="objetivos__container">
        {/* Grid de secciones */}
        <div className="objetivos__grid" role="list">
          {sections.map(({ id, heading, body, bullets }) => (
            <article
              key={id}
              id={id}
              className="objetivos__section"
              role="listitem"
              aria-labelledby={`${id}-heading`}
            >
              <header className="objetivos__section-header">
                <h2 id={`${id}-heading`} className="objetivos__section-title">
                  {heading}
                </h2>
              </header>

              <div className="objetivos__section-body">
                {body && <p className="objetivos__section-text">{body}</p>}

                {Array.isArray(bullets) && bullets.length > 0 && (
                  <ul className="objetivos__list">
                    {bullets.map((item, idx) => (
                      <li key={`${id}-bullet-${idx}`} className="objetivos__list-item">
                        <span className="objetivos__list-marker" aria-hidden="true" />
                        <span className="objetivos__list-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* CTA final */}
        <aside className="objetivos__cta" aria-labelledby="cta-title">
          <div className="objetivos__cta-content">
            <h3 id="cta-title" className="objetivos__cta-title">
              {cta?.title}
            </h3>
            {cta?.description && (
              <p className="objetivos__cta-desc">{cta.description}</p>
            )}
          </div>

          <div className="objetivos__cta-actions">
            {cta?.primaryHref && (
              <a
                href={cta.primaryHref}
                className="objetivos__btn objetivos__btn--primary"
              >
                {cta.primaryLabel || "Continuar"}
              </a>
            )}
            {cta?.secondaryHref && (
              <a
                href={cta.secondaryHref}
                className="objetivos__btn objetivos__btn--secondary"
              >
                {cta.secondaryLabel || "Más información"}
              </a>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
