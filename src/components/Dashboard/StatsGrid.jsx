import StatsCard from "./StatsCard";

function StatsGrid() {
  const stats = [
    {
      title: "Applications",
      value: 0,
    },
    {
      title: "Interviews",
      value: 0,
    },
    {
      title: "Offers",
      value: 0,
    },
    {
      title: "Rejected",
      value: 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
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