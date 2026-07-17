import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader/PageHeader";


import { validateApplication } from "../../utils/validation";
import { useAuth } from "../../context/AuthContext";
import { getJobById, updateJob } from "../../services/jobService";

import ApplicationForm from "../../components/Application/AppliationForm";

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

  const handleCancel = () => {
  navigate(`/dashboard/applications/${id}`);
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

    <ApplicationForm
  formData={formData}
  setFormData={setFormData}
  errors={errors}
  isSubmitting={isSubmitting}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  submitButtonText="Update Application"
/>
    </div>
  );
}

export default EditApplication;