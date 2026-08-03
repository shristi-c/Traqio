function DashboardInsights({ stats }) {
  const insights = [];

  if (stats.totalApplications === 0)
    insights.push("Start by adding your first application.");

  if (stats.responseRate > 40)
    insights.push(
      "Great response rate! Keep applying to similar roles."
    );

  if (stats.offers > 0)
    insights.push(
      `Congratulations! You have ${stats.offers} offer(s).`
    );

  if (
    stats.totalApplications > 0 &&
    stats.interviews === 0
  )
    insights.push(
      "Update your resume to improve interview chances."
    );

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Insights
      </h2>

      <ul className="space-y-3">
        {insights.length ? (
          insights.map((item, index) => (
            <li
              key={index}
              className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700"
            >
              💡 {item}
            </li>
          ))
        ) : (
          <p className="text-gray-500">
            Keep tracking your progress.
          </p>
        )}
      </ul>
    </div>
  );
}

export default DashboardInsights;