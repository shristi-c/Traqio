import SectionCard from "../Common/SectionCard";
import InputField from "../Common/InputField";
import Button from "../Common/Button";

function AccountSettings({ userData }) {
  return (
    <SectionCard title="Account Settings">
      <div className="space-y-5">

        <InputField
          label="Full Name"
          value={userData?.name || ""}
          disabled
        />

        <InputField
          label="Email"
          value={userData?.email || ""}
          disabled
        />

        <Button variant="primary">
          Change Password
        </Button>

      </div>
    </SectionCard>
  );
}

export default AccountSettings;