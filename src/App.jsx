import React, { useEffect } from "react"; // useEffect viene de React
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import Dashboards from "./pages/Dashboards";
import NotFound from "./pages/NotFound";
import ChatbotPage from "./pages/Chatbot";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout público */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Layout de dashboards */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboards" element={<Dashboards />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
