import { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import "./tareas.css";

export default function Tareas() {
  const tareasIniciales = [
    { id: 1, texto: "Seguridad", completada: false },
    { id: 2, texto: "Contra SQL injection", completada: false },
    { id: 3, texto: "XSS", completada: false },
    { id: 4, texto: "COOKIES", completada: false },
    { id: 5, texto: "Configurar (SPF, DKIM, DMARC)", completada: false },
    { id: 6, texto: "HASH", completada: false },
    { id: 7, texto: "Terminar MODELO MACHINE LEARNING", completada: false },
    { id: 8, texto: "TERMINAR FRAGMENTOS PAGINA", completada: false }
  ];

  const [tareas, setTareas] = useState(tareasIniciales);
  const [texto, setTexto] = useState("");

  const agregarTarea = () => {
    if (!texto.trim()) return;
    setTareas([
      ...tareas,
      { id: Date.now(), texto, completada: false }
    ]);
    setTexto("");
  };

  const toggleTarea = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  const eliminarTarea = (id, e) => {
    e.stopPropagation();
    setTareas(tareas.filter((t) => t.id !== id));
  };

  const tareasCompletadas = tareas.filter(t => t.completada).length;
  const tareasTotal = tareas.length;

  return (
    <div className="tareas-container">
      <div className="tareas-box">
        <div className="tareas-header">
          <h3 className="tareas-title">Mis Tareas</h3>
          <div className="tareas-counter">
            {tareasCompletadas} de {tareasTotal} completadas
          </div>
          <div className="tareas-progress-bar">
            <div 
              className="tareas-progress-fill"
              style={{
                width: `${tareasTotal ? (tareasCompletadas / tareasTotal) * 100 : 0}%`
              }}
            />
          </div>
        </div>

        <div className="tareas-input-group">
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && agregarTarea()}
            placeholder="Nueva tarea..."
            className="tareas-input"
          />
          <button onClick={agregarTarea} className="tareas-button">
            <Plus size={18} />
            <span>Agregar</span>
          </button>
        </div>

        <ul className="tareas-list">
          {tareas.map((t) => (
            <li
              key={t.id}
              className={`tareas-item ${t.completada ? 'completada' : ''}`}
            >
              <div 
                className="tareas-item-content"
                onClick={() => toggleTarea(t.id)}
              >
                <div className="tareas-checkbox">
                  {t.completada && <Check size={16} strokeWidth={3} />}
                </div>
                <span className="tareas-texto">
                  {t.texto}
                </span>
              </div>
              <button
                onClick={(e) => eliminarTarea(t.id, e)}
                className="tareas-delete"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}