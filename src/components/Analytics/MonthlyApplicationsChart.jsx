import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function MonthlyApplicationsChart({ data }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm select-none">
      <h2 className="mb-6 text-lg font-semibold">
        Monthly Applications
      </h2>

     <div className="h-72 sm:h-80 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart  data={data}>
            
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#D1D5DB" }}
              tickLine={{ stroke: "#D1D5DB" }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#D1D5DB" }}
              tickLine={{ stroke: "#D1D5DB" }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
              }}
            />

            <Bar
              dataKey="applications"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyApplicationsChart;