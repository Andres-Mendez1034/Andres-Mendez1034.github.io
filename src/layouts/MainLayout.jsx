import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar/Navbar";
import Footer from "../components/ui/Footer/Footer";

export default function MainLayout({ clean }) {
  return (
    <>
      {!clean && <Navbar />}
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet />
      </main>
      {!clean && <Footer />}
    </>
  );
}
