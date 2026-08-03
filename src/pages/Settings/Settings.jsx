import { useAuth } from "../../context/AuthContext";

import AccountSettings from "../../components/Settings/AccountSettings";
import AppearanceSettings from "../../components/Settings/AppearanceSettings";
import NotificationSettings from "../../components/Settings/NotificationSettings";
import DangerZone from "../../components/Settings/DangerZone";

function Settings() {
  const { userData } = useAuth();

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">

        <AccountSettings
          userData={userData}
        />

        <AppearanceSettings />

        <NotificationSettings />

        <DangerZone />

      </div>

    </div>
  );
}

export default Settings;