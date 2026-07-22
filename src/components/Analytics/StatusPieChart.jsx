import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const STATUS_COLORS = {
  Applied: "#3B82F6",
  Interview: "#F59E0B",
  Offer: "#10B981",
  Rejected: "#EF4444",
  Assessment: "#8B5CF6",
};

function StatusPieChart({ data }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm select-none">
      <h2 className="mb-6 text-lg font-semibold">
        Status Distribution
      </h2>

     <div className="h-72 sm:h-80 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
  key={entry.name}
  fill={
    STATUS_COLORS[entry.name] || "#6B7280"
  }
/>
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatusPieChart;