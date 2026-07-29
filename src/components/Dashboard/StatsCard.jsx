import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
} from "react-icons/fi";

const iconMap = {
  Applications: {
    icon: FiBriefcase,
    bg: "bg-blue-100",
    color: "text-blue-600",
    description: "Jobs you've applied to",
  },
  Interviews: {
    icon: FiCalendar,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
    description: "Interview invitations",
  },
  Offers: {
    icon: FiCheckCircle,
    bg: "bg-green-100",
    color: "text-green-600",
    description: "Job offers received",
  },
  Rejected: {
    icon: FiXCircle,
    bg: "bg-red-100",
    color: "text-red-600",
    description: "Applications declined",
  },
  "Response Rate": {
    icon: FiTrendingUp,
    bg: "bg-purple-100",
    color: "text-purple-600",
    description: "Interview response percentage",
  },
};

function StatsCard({ title, value }) {
  const stat = iconMap[title];

  const Icon = stat?.icon;

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {stat?.description}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat?.bg}`}
        >
          {Icon && (
            <Icon className={`text-2xl ${stat?.color}`} />
          )}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;