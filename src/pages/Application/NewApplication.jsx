import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/PageHeader/PageHeader";
import InputField from "../../components/Form/InputField";
import SelectField from "../../components/Form/SelectField";
import TextAreaField from "../../components/Form/TextAreaField";
import { validateApplication } from "../../utils/validation";
import { addJob } from "../../services/jobService";
import { useAuth } from "../../context/AuthContext";

const statusOptions = [
  { value: "Applied", label: "Applied" },
  { value: "Interview", label: "Interview" },
  { value: "Assessment", label: "Assessment" },
  { value: "Offer", label: "Offer" },
  { value: "Rejected", label: "Rejected" },
];

const jobTypeOptions = [
  { value: "Full Time", label: "Full Time" },
  { value: "Internship", label: "Internship" },
  { value: "Part Time", label: "Part Time" },
  { value: "Contract", label: "Contract" },
];

const NewApplication = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("Current UID:", user?.uid);
console.log("Current Email:", user?.email);

  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
    status: "",
    location: "",
    jobType: "",
    salary: "",
    appliedDate: "",
    jobLink: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormDirty = Object.values(formData).some(
  (value) => value.toString().trim() !== ""
);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validateApplication(formData);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});
try {
  setIsSubmitting(true);

  await addJob(user.uid, formData);

  navigate("/dashboard/applications");
} catch (error) {
  console.error("Error saving application:", error);
  alert("Something went wrong while saving the application.");
} finally {
  setIsSubmitting(false);
}
};

const handleCancel = () => {
  if (!isFormDirty) {
    navigate("/dashboard/applications");
    return;
  }

  const confirmDiscard = window.confirm(
    "You have unsaved changes. Are you sure you want to discard them?"
  );

  if (confirmDiscard) {
    navigate("/dashboard/applications");
  }
};

  return (
    <div className="space-y-6">
      <PageHeader title="New Application" />

      <div className="rounded-xl bg-white p-6 shadow">
       <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              error={errors.company}
              placeholder="Google"
            />

            <InputField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              error={errors.jobTitle}
              placeholder="Frontend Developer"
            />

            <SelectField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              error={errors.status}
              options={statusOptions}
            />

            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              
              placeholder="Pune"
            />

            <SelectField
              label="Job Type"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              options={jobTypeOptions}
            />

            <InputField
              label="Salary"
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="1200000"
            />

            <InputField
              label="Applied Date"
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              error={errors.appliedDate}
              onChange={handleChange}
            />

            <InputField
              label="Job Link"
              type="url"
              name="jobLink"
              value={formData.jobLink}
              onChange={handleChange}
              error={errors.jobLink}
              placeholder="https://..."
            />
          </div>

          <TextAreaField
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any notes about this application..."
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
  type="submit"
  disabled={isSubmitting}
  className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {isSubmitting ? "Saving..." : "Save Application"}
</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewApplication;