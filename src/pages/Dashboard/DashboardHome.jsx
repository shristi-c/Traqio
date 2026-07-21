import { useEffect, useState } from "react";

import WelcomeBanner from "../../components/Dashboard/WelcomeBanner";
import StatsGrid from "../../components/Dashboard/StatsGrid";
import RecentApplications from "../../components/Dashboard/RecentApplications";
import UpcomingInterviews from "../../components/Dashboard/UpcomingInterviews";

import { useAuth } from "../../context/AuthContext";
import { getAnalyticsData } from "../../services/jobService";
function DashboardHome() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalApplications: 0,
    interviews: 0,
    offers: 0,
    rejections: 0,
    responseRate: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        const dashboardStat = await getAnalyticsData(user.uid);
        setStats(dashboardStat);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };

    fetchStats();
  }, [user]);
  return (
    <div className="space-y-8">
      <WelcomeBanner />
<StatsGrid stats={stats} />

      <RecentApplications />

      <UpcomingInterviews />
    </div>
  );
}

export default DashboardHome;