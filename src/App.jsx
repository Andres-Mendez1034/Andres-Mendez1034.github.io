import { BrowserRouter, Routes, Route, useNavigate, useEffect } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import Dashboards from "./pages/Dashboards";
import NotFound from "./pages/NotFound";
import ChatbotPage from "./pages/Chatbot";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Este componente redirige a la ruta correcta si viene desde 404.html
function RedirectHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, [navigate]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RedirectHandler />
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
