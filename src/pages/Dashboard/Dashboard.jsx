import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user ? user.email : "No user logged in"}</p>
    </div>
  );
}

export default Dashboard;