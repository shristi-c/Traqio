



import InputField from "../Form/InputField";
import SelectField from "../Form/SelectField";
import TextAreaField from "../Form/TextAreaField";



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



function ApplicationForm({
  formData,
  setFormData,
  errors,
  isSubmitting,
  onSubmit,
  onCancel,
  submitButtonText = "Save Application",
}) {
  

 


  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

 const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit(e);
};

 

  return (
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
            onChange={handleChange}
            error={errors.appliedDate}
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
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplicationForm;