import React, { useMemo, useState } from "react";

/**
 * Aplicativo.jsx (Boosted, sin CSS)
 * - Clases BEM listas para estilizar: aplicativo__*, ml-box__*, result__*, etc.
 * - Parámetros con cajitas (range + number).
 * - Simulación de resultados según tipo de modelo.
 * - Accesibilidad y manejo de estados de UI.
 */
export default function Aplicativo() {
  // Entradas
  const [inputData, setInputData] = useState("");
  const [model, setModel] = useState("regresion"); // regresion | clasificacion | clustering
  const [params, setParams] = useState({
    epochs: 20,         // 1 - 200
    batchSize: 16,      // 1 - 512
    learningRate: 0.05, // 0.001 - 1
    regularization: 0.1 // 0 - 1
  });
  const [seed, setSeed] = useState(42);

  // UI
  const [modelResult, setModelResult] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Texto de ayuda dinámico
  const helpText = useMemo(() => {
    const items = [];
    if (!inputData.trim()) items.push("Ingresa datos de entrada.");
    if (params.epochs < 1 || params.epochs > 200) items.push("epochs entre 1 y 200.");
    if (params.batchSize < 1 || params.batchSize > 512) items.push("batchSize entre 1 y 512.");
    if (params.learningRate <= 0 || params.learningRate > 1) items.push("learningRate entre 0 y 1.");
    if (params.regularization < 0 || params.regularization > 1) items.push("regularization entre 0 y 1.");
    return items.join(" ");
  }, [inputData, params]);

  // Handlers
  const handleInputChange = (e) => setInputData(e.target.value);
  const handleModelChange = (e) => setModel(e.target.value);
  const handleParam = (key) => (e) => {
    const val = e.target.type === "range" ? parseFloat(e.target.value) : Number(e.target.value);
    setParams((p) => ({ ...p, [key]: val }));
  };
  const handleSeedChange = (e) => setSeed(Number(e.target.value));
  const randomizeSeed = () => setSeed(Math.floor(Math.random() * 100000));

  const resetForm = () => {
    setInputData("");
    setModel("regresion");
    setParams({ epochs: 20, batchSize: 16, learningRate: 0.05, regularization: 0.1 });
    setSeed(42);
    setModelResult(null);
    setMetrics(null);
    setError(null);
    setLoading(false);
  };

  return (
    <section className="aplicativo" aria-labelledby="ml-title">
      {/* Título */}
      <header className="aplicativo__header">
        <h2 id="ml-title" className="aplicativo__title">Manipulador de Modelo ML (NO ESTA APLICADO=)</h2>
        <p className="aplicativo__subtitle">
          Ingresa datos, elige el tipo de modelo y ajusta parámetros antes de ejecutar.
        </p>
      </header>

      {/* Form principal */}
      <form
        className="aplicativo__form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        aria-describedby="ml-help"
      >
        {/* Datos de entrada */}
        <div className="aplicativo__field">
          <label htmlFor="input-data" className="aplicativo__label">Datos de entrada</label>
          <input
            type="text"
            id="input-data"
            className="aplicativo__input"
            value={inputData}
            onChange={handleInputChange}
            placeholder="Ej: valores separados por coma, JSON, etc."
            autoComplete="off"
          />
        </div>

        {/* Tipo de modelo */}
        <div className="aplicativo__field">
          <label htmlFor="model" className="aplicativo__label">Tipo de modelo</label>
          <select
            id="model"
            className="aplicativo__select"
            value={model}
            onChange={handleModelChange}
          >
            <option value="regresion">Regresión</option>
            <option value="clasificacion">Clasificación</option>
            <option value="clustering">Clustering</option>
          </select>
        </div>

        {/* Cajitas de parámetros */}
        <fieldset className="aplicativo__params" aria-labelledby="params-title">
          <legend id="params-title" className="aplicativo__legend">Parámetros</legend>

          <div className="ml-box" role="group" aria-labelledby="epochs-label">
            <div className="ml-box__header">
              <h4 id="epochs-label" className="ml-box__title">epochs</h4>
              <span className="ml-box__value" aria-live="polite">{params.epochs}</span>
            </div>
            <div className="ml-box__controls">
              <input
                type="range"
                min={1}
                max={200}
                step={1}
                value={params.epochs}
                onChange={handleParam("epochs")}
                className="ml-box__range"
              />
              <input
                type="number"
                min={1}
                max={200}
                step={1}
                value={params.epochs}
                onChange={handleParam("epochs")}
                className="ml-box__number"
              />
            </div>
            <p className="ml-box__hint">Iteraciones de entrenamiento (1–200).</p>
          </div>

          <div className="ml-box" role="group" aria-labelledby="batch-label">
            <div className="ml-box__header">
              <h4 id="batch-label" className="ml-box__title">batchSize</h4>
              <span className="ml-box__value" aria-live="polite">{params.batchSize}</span>
            </div>
            <div className="ml-box__controls">
              <input
                type="range"
                min={1}
                max={512}
                step={1}
                value={params.batchSize}
                onChange={handleParam("batchSize")}
                className="ml-box__range"
              />
              <input
                type="number"
                min={1}
                max={512}
                step={1}
                value={params.batchSize}
                onChange={handleParam("batchSize")}
                className="ml-box__number"
              />
            </div>
            <p className="ml-box__hint">Tamaño del lote (1–512).</p>
          </div>

          <div className="ml-box" role="group" aria-labelledby="lr-label">
            <div className="ml-box__header">
              <h4 id="lr-label" className="ml-box__title">learningRate</h4>
              <span className="ml-box__value" aria-live="polite">{params.learningRate}</span>
            </div>
            <div className="ml-box__controls">
              <input
                type="range"
                min={0.001}
                max={1}
                step={0.001}
                value={params.learningRate}
                onChange={handleParam("learningRate")}
                className="ml-box__range"
              />
              <input
                type="number"
                min={0.001}
                max={1}
                step={0.001}
                value={params.learningRate}
                onChange={handleParam("learningRate")}
                className="ml-box__number"
              />
            </div>
            <p className="ml-box__hint">Tasa de aprendizaje (0.001–1).</p>
          </div>

          <div className="ml-box" role="group" aria-labelledby="reg-label">
            <div className="ml-box__header">
              <h4 id="reg-label" className="ml-box__title">regularization</h4>
              <span className="ml-box__value" aria-live="polite">{params.regularization}</span>
            </div>
            <div className="ml-box__controls">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={params.regularization}
                onChange={handleParam("regularization")}
                className="ml-box__range"
              />
              <input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={params.regularization}
                onChange={handleParam("regularization")}
                className="ml-box__number"
              />
            </div>
            <p className="ml-box__hint">Regularización (0–1).</p>
          </div>
        </fieldset>

        {/* Semilla */}
        <div className="aplicativo__seed">
          <label htmlFor="seed" className="aplicativo__label">Semilla (seed)</label>
          <div className="aplicativo__seed-row">
            <input
              type="number"
              id="seed"
              className="aplicativo__input aplicativo__input--seed"
              value={seed}
              onChange={handleSeedChange}
            />
            <button
              type="button"
              className="aplicativo__btn aplicativo__btn--ghost"
              onClick={randomizeSeed}
              aria-label="Randomizar semilla"
            >
              Random
            </button>
          </div>
        </div>

        {/* Ayuda / estado */}
        <p id="ml-help" className="aplicativo__help">
          {helpText || "Todo listo para ejecutar."}
        </p>

        {/* Acciones */}
        <div className="aplicativo__actions">
          <button
            type="submit"
            className="aplicativo__btn aplicativo__btn--primary"
            disabled={loading}
          >
            {loading ? "Ejecutando..." : "Ejecutar Modelo"}
          </button>
          <button
            type="button"
            className="aplicativo__btn aplicativo__btn--secondary"
            onClick={resetForm}
            disabled={loading}
          >
            Resetear
          </button>
        </div>
      </form>

      {/* Errores */}
      {error && (
        <div className="aplicativo__error" role="alert" aria-live="assertive">
          {error}
        </div>
      )}

      {/* Resultados */}
      <section className="aplicativo__result" aria-labelledby="result-title" aria-live="polite">
        <h3 id="result-title" className="result__title">Resultado del Modelo</h3>

        {/* Skeleton */}
        {loading && (
          <div className="result__skeleton" aria-hidden="true">
            <div className="skeleton__line" />
            <div className="skeleton__line" />
            <div className="skeleton__grid">
              <div className="skeleton__card" />
              <div className="skeleton__card" />
              <div className="skeleton__card" />
            </div>
          </div>
        )}

        {/* Contenido */}
        {!loading && (modelResult || metrics) && (
          <div className="result__content">
            {modelResult && <p className="result__main">{modelResult}</p>}

            {metrics && (
              <div className="result__grid" role="list">
                {Object.entries(metrics).map(([key, val]) => (
                  <article key={key} className="result__card" role="listitem">
                    <h4 className="result__card-title">{formatMetricName(key)}</h4>
                    <p className="result__card-value">{val}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </section>
  );
}

/* Utilidad para mostrar nombres legibles de métricas */
function formatMetricName(key) {
  switch (key) {
    case "mae": return "MAE";
    case "rmse": return "RMSE";
    case "r2": return "R²";
    case "accuracy": return "Accuracy";
    case "precision": return "Precision";
    case "recall": return "Recall";
    case "silhouette": return "Silhouette";
    case "calinskiHarabasz": return "Calinski–Harabasz";
    case "daviesBouldin": return "Davies–Bouldin";
    default: return key;
  }
}
