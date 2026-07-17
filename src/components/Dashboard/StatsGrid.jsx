import StatsCard from "./StatsCard";

function StatsGrid({ stats }) {
  const statItems = [
    {
      title: "Applications",
      value: stats.totalApplications,
    },
    {
      title: "Interviews",
      value: stats.interviews,
    },
    {
      title: "Offers",
      value: stats.offers,
    },
    {
      title: "Rejected",
      value: stats.rejections,
    },
    {
      title: "Response Rate",
      value: `${stats.responseRate}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
      {statItems.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  );
}

export default StatsGrid;