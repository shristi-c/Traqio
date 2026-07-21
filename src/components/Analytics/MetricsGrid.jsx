import AnalyticsCard from "./AnalyticsCard";

function MetricsGrid({ analytics }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

      <AnalyticsCard
        title="Applications"
        value={analytics.totalApplications}
      />

      <AnalyticsCard
        title="Interviews"
        value={analytics.interviews}
      />

      <AnalyticsCard
        title="Offers"
        value={analytics.offers}
      />

      <AnalyticsCard
        title="Rejected"
        value={analytics.rejections}
      />

      <AnalyticsCard
        title="Response Rate"
        value={`${analytics.responseRate}%`}
      />

    </div>
  );
}

export default MetricsGrid;