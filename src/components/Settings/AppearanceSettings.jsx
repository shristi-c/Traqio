import { useState } from "react";
import SectionCard from "../Common/SectionCard";

function AppearanceSettings() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SectionCard title="Appearance">

      <label className="flex items-center justify-between">

        <div>
          <p className="font-medium">
            Dark Mode
          </p>

          <p className="text-sm text-gray-500">
            Coming soon
          </p>
        </div>

        <input
          type="checkbox"
          checked={darkMode}
          onChange={() =>
            setDarkMode(!darkMode)
          }
        />

      </label>

    </SectionCard>
  );
}

export default AppearanceSettings;