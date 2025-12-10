import React from "react";
import Hero from "../components/experimental/Hero/Hero";
import Tareas from "../components/experimental/Tareas/Tareas";
import Objetivos from "../components/experimental/Objetivos/Objetivos";  // Importa el nuevo componente
import Aplicativo from "../components/experimental/Aplicativo/Aplicativo"; // Nuevo import para el componente Aplicativo

export default function Home() {
  return (
    <div>
      <Hero />
      <Objetivos /> {/* Aquí agregamos el componente de Objetivos */}
      <Aplicativo /> {/* Aquí agregamos el componente de Aplicativo */}
      <Tareas />
    </div>
  );
}
