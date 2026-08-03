function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">

      <div className="h-44 rounded-2xl bg-gray-200" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-gray-200"
          />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="h-96 rounded-2xl bg-gray-200" />
        <div className="h-96 rounded-2xl bg-gray-200" />
      </div>

    </div>
  );
}

export default DashboardSkeleton;