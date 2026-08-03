import InputField from "../Common/InputField";
import TextAreaField from "../Common/TextAreaField";
import SectionCard from "../Common/SectionCard";
import Button from "../Common/Button";

function ProfileForm({
  formData,
  handleChange,
  editMode,
  onSave,
  onCancel,
  saving,
}) {
  return (
    <SectionCard title="Personal Information">
      <div className="grid gap-5 md:grid-cols-2">
        <InputField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!editMode}
        />

        <InputField
          label="Email"
          name="email"
          value={formData.email}
          disabled
        />

        <InputField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!editMode}
        />

        <InputField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>

      <div className="mt-6">
        <TextAreaField
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          disabled={!editMode}
          rows={4}
        />
      </div>

      <div className="mt-6">
        <TextAreaField
          label="Experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          disabled={!editMode}
          rows={5}
        />
      </div>

      {editMode && (
        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

         <Button
  variant="primary"
  onClick={onSave}
  disabled={saving}
>
  {saving ? "Saving..." : "Save Changes"}
</Button>
        </div>
      )}
    </SectionCard>
  );
}

export default ProfileForm;