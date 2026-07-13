import { useAuth } from "../../context/AuthContext";

function WelcomeBanner() {
  const { userData, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold">
        Welcome back, {userData?.name || "User"} 👋
      </h1>
    </div>
  );
}

export default WelcomeBanner;