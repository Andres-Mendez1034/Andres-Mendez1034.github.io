import React, { useState } from "react";
import "./playground.css";

export default function Playground() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <section className="pg">
      <header className="pg__header">
        <h1 className="pg__title">Playground Experimental</h1>
        <p className="pg__subtitle">
          Prueba componentes, estados y eventos aquí.
        </p>
      </header>

      <div className="pg__content">
        {/* Contador */}
        <div className="pg__card">
          <h2>Contador simple</h2>
          <p className="pg__value">{count}</p>
          <div className="pg__actions">
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
            <button onClick={() => setCount(0)}>Reset</button>
          </div>
        </div>

        {/* Input */}
        <div className="pg__card">
          <h2>Input controlado</h2>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe algo..."
          />
          <p>Texto actual: <strong>{text}</strong></p>
        </div>
      </div>
    </section>
  );
}
