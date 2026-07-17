import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader/PageHeader";
import InputField from "../../components/Form/InputField";
import SelectField from "../../components/Form/SelectField";
import TextAreaField from "../../components/Form/TextAreaField";

import { validateApplication } from "../../utils/validation";
import { useAuth } from "../../context/AuthContext";
import { getJobById, updateJob } from "../../services/jobService";

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

function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        console.log("User UID:", user?.uid);
console.log("Application ID:", id);
       const data = await getJobById(user.uid, id);

console.log("Application fetched:", data);

        setFormData({
          company: data.company || "",
          jobTitle: data.jobTitle || "",
          status: data.status || "",
          location: data.location || "",
          jobType: data.jobType || "",
          salary: data.salary || "",
          appliedDate: data.appliedDate || "",
          jobLink: data.jobLink || "",
          notes: data.notes || "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load application.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchApplication();
    }
  }, [user, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("Setting form data...");

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

      await updateJob(user.uid, id, formData);

      navigate(`/dashboard/applications/${id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to update application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading application...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Application" />

      <div className="rounded-xl bg-white p-6 shadow">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <InputField
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              error={errors.company}
            />

            <InputField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              error={errors.jobTitle}
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
            />

          </div>

          <TextAreaField
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={() => navigate(`/dashboard/applications/${id}`)}
              className="rounded-lg border px-5 py-2.5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-white disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Application"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditApplication;