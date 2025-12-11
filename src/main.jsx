import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";  // Importación del archivo global de estilos

// Crear el root de la aplicación y renderizarla
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
