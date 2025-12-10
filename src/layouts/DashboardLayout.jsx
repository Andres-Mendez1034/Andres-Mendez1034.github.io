import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/dashboards/DashboardSidebar/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div style={styles.layout}>
      <DashboardSidebar />

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#020617",
    color: "white"
  },
  main: {
    flex: 1,
    padding: "30px"
  }
};
