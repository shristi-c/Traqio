import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white p-6">

      <h2 className="mb-10 text-2xl font-bold">
        Traqio
      </h2>

      <nav className="space-y-3">

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/applications"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`
          }
        >
          Applications
        </NavLink>

        <NavLink
  to="/dashboard/interviews"
  className={({ isActive }) =>
    `block rounded-lg px-4 py-3 ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-100"
    }`
  }
>
  Interviews
</NavLink>

<NavLink
  to="/dashboard/analytics"
  className={({ isActive }) =>
    `block rounded-lg px-4 py-3 ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-100"
    }`
  }
>
  Analytics
</NavLink>

<NavLink
  to="/dashboard/profile"
  className={({ isActive }) =>
    `block rounded-lg px-4 py-3 ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-100"
    }`
  }
>
  Profile
</NavLink>

<NavLink
  to="/dashboard/settings"
  className={({ isActive }) =>
    `block rounded-lg px-4 py-3 ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-100"
    }`
  }
>
  Settings
</NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;