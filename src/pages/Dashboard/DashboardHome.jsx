import WelcomeBanner from "../../components/Dashboard/WelcomeBanner";
import StatsGrid from "../../components/Dashboard/StatsGrid";
import RecentApplications from "../../components/Dashboard/RecentApplications";
import UpcomingInterviews from "../../components/Dashboard/UpcomingInterviews";

function DashboardHome() {
  return (
    <div className="space-y-8">
      <WelcomeBanner />

      <StatsGrid />

      <RecentApplications />

      <UpcomingInterviews />
    </div>
  );
}

export default DashboardHome;