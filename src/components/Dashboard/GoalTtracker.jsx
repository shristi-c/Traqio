function GoalTracker({ totalApplications, goal = 50 }) {
  const percentage = Math.min(
    Math.round((totalApplications / goal) * 100),
    100
  );

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Job Search Goal
        </h2>

        <span className="text-sm text-gray-500">
          {totalApplications}/{goal}
        </span>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="mt-4 flex justify-between text-sm">
        <span>{percentage}% Complete</span>

        <span className="text-gray-500">
          {goal - totalApplications} Remaining
        </span>
      </div>
    </div>
  );
}

export default GoalTracker;