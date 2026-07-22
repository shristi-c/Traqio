import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAnalyticsData } from "../../services/jobService";

import MetricsGrid from "../../components/Analytics/MetricsGrid";
import StatusPieChart from "../../components/Analytics/StatusPieChart";
import MonthlyApplicationsChart from "../../components/Analytics/MonthlyApplicationsChart";

function Analytics() {
  const { user } = useAuth();

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await getAnalyticsData(user.uid);
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
        Loading analytics...
      </div>
    );
  }
  if (
  !analytics ||
  analytics.totalApplications === 0
) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800">
        No Analytics Available
      </h2>

      <p className="mt-3 text-gray-500">
        Add your first job application to start
        tracking your progress.
      </p>
    </div>
  );
}

  return (
   <div className="space-y-6 sm:space-y-8">

      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Analytics
        </h1>

        <p className="mt-2 text-gray-500">
          Track your job application performance and progress.
        </p>
      </div>

      <MetricsGrid analytics={analytics} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <StatusPieChart
          data={analytics.statusDistribution}
        />

        <MonthlyApplicationsChart
          data={analytics.monthlyApplications}
        />

      </div>

    </div>
  );
}

export default Analytics;