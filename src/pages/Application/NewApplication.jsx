import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/PageHeader/PageHeader";
import InputField from "../../components/Form/InputField";
import SelectField from "../../components/Form/SelectField";
import TextAreaField from "../../components/Form/TextAreaField";

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="New Application" />

      <div className="rounded-xl bg-white p-6 shadow">
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Google"
            />

            <InputField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Frontend Developer"
            />

            <SelectField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
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
              onChange={handleChange}
            />

            <InputField
              label="Job Link"
              type="url"
              name="jobLink"
              value={formData.jobLink}
              onChange={handleChange}
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
              onClick={() => navigate("/dashboard/applications")}
              className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              Save Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewApplication;