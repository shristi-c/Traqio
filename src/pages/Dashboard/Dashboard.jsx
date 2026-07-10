import { logout } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <p>{user?.email}</p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;