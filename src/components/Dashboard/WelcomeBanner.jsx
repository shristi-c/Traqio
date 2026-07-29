import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function WelcomeBanner() {
  const { userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 shadow-sm animate-pulse h-40" />
    );
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-blue-100">{today}</p>

          <h1 className="mt-2 text-4xl font-bold">
            Welcome back, {userData?.name || "User"} 👋
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Keep tracking your applications, prepare for upcoming interviews,
            and stay one step closer to your dream job.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/dashboard/applications/new"
            className="rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            + New Application
          </Link>

          <Link
            to="/dashboard/interviews/new"
            className="rounded-lg border border-white px-5 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-700"
          >
            + Schedule Interview
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;