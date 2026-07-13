function StatsCard({ title, value }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-gray-500 text-sm font-medium">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

export default StatsCard;