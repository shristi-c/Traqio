import { useEffect, useState } from "react";

import WelcomeBanner from "../../components/Dashboard/WelcomeBanner";
import StatsGrid from "../../components/Dashboard/StatsGrid";
import RecentApplications from "../../components/Dashboard/RecentApplications";
import UpcomingInterviews from "../../components/Dashboard/UpcomingInterviews";
import QuickActions from "../../components/Dashboard/QuickActions";
import DashboardSkeleton from "../../components/Dashboard/DashboardSkeleton";
import GoalTracker from "../../components/Dashboard/GoalTtracker";
import DashboardInsights from "../../components/Dashboard/DashboardInsights";


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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Stop loading if there is no logged-in user
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const dashboardStats = await getAnalyticsData(user.uid);
        setStats(dashboardStats);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      <WelcomeBanner />

      <StatsGrid stats={stats} />

      <QuickActions />

      <div className="grid gap-8 lg:grid-cols-2">
        <GoalTracker totalApplications={stats.totalApplications} />

        <DashboardInsights stats={stats} />
      </div>

      <UpcomingInterviews />

      <RecentApplications />

      {/* Temporary component for getting Firebase ID Token */}
      
    </div>
  );
}

export default DashboardHome;