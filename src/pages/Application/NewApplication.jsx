import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/PageHeader/PageHeader";

import { validateApplication } from "../../utils/validation";
import { addJob } from "../../services/jobService";
import { useAuth } from "../../context/AuthContext";
import ApplicationForm from "../../components/Application/AppliationForm";

const NewApplication = () => {
  const navigate = useNavigate();
  const { user } = useAuth();


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

   <ApplicationForm
  formData={formData}
  setFormData={setFormData}
  errors={errors}
  isSubmitting={isSubmitting}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  submitButtonText="Save Application"
/>
    </div>
  );
};

export default NewApplication;