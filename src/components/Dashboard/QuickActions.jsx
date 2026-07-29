import { Link } from "react-router-dom";
import {
  FiPlusCircle,
  FiCalendar,
  FiBarChart2,
  FiBriefcase,
} from "react-icons/fi";

const actions = [
  {
    title: "New Application",
    description: "Track a new job application",
    icon: FiPlusCircle,
    to: "/dashboard/applications/new",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Schedule Interview",
    description: "Add an upcoming interview",
    icon: FiCalendar,
    to: "/dashboard/interviews/new",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Applications",
    description: "View all tracked jobs",
    icon: FiBriefcase,
    to: "/dashboard/applications",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Analytics",
    description: "View your progress",
    icon: FiBarChart2,
    to: "/dashboard/analytics",
    color: "bg-purple-100 text-purple-600",
  },
];

function QuickActions() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="group rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}
              >
                <Icon className="text-2xl" />
              </div>

              <h3 className="font-semibold text-gray-900">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;