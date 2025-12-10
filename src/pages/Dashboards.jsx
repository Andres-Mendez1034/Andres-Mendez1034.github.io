import ProyectoDashboard from "../components/dashboards/ProyectoDashboard/ProyectoDashboard";
import PersonalDashboard from "../components/dashboards/PersonalDashboard/PersonalDashboard";

export default function Dashboards() {
  return (
    <div>
      <h1>Panel de Dashboards</h1>

      <div style={{ marginTop: "20px" }}>
        <ProyectoDashboard />
        <PersonalDashboard />
      </div>
    </div>
  );
}
