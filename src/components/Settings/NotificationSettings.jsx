import { useState } from "react";
import SectionCard from "../Common/SectionCard";

function NotificationSettings() {
  const [settings, setSettings] = useState({
    interview: true,
    weekly: false,
    email: true,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const options = [
    {
      key: "email",
      label: "Email Notifications",
    },
    {
      key: "interview",
      label: "Interview Reminders",
    },
    {
      key: "weekly",
      label: "Weekly Progress Report",
    },
  ];

  return (
    <SectionCard title="Notifications">

      <div className="space-y-5">

        {options.map((item) => (
          <label
            key={item.key}
            className="flex items-center justify-between"
          >
            <span>{item.label}</span>

            <input
              type="checkbox"
              checked={settings[item.key]}
              onChange={() =>
                toggle(item.key)
              }
            />
          </label>
        ))}

      </div>

    </SectionCard>
  );
}

export default NotificationSettings;