import SectionCard from "../Common/SectionCard";
import Button from "../Common/Button";
import { logout } from "../../services/authService";

function DangerZone() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <SectionCard title="Danger Zone">

      <div className="space-y-4">

        <Button variant="secondary">
          Delete Account
        </Button>

        <Button
          variant="danger"
          onClick={handleLogout}
        >
          Logout
        </Button>

      </div>

    </SectionCard>
  );
}

export default DangerZone;