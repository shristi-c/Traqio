import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import InterviewForm from "../../components/Interview/InterviewForm";
import PageHeader from "../../components/PageHeader/PageHeader";

import {
  getInterviewById,
  updateInterview,
} from "../../services/interviewService";

function EditInterview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
    interviewDate: "",
    interviewTime: "",
    interviewType: "Online",
    interviewRound: "",
    status: "Scheduled",
    notes: "",
  });

  useEffect(() => {
    if (!user) return;

    const fetchInterview = async () => {
      try {
        const data = await getInterviewById(user.uid, id);

        setFormData({
          company: data.company || "",
          jobTitle: data.jobTitle || "",
          interviewDate: data.interviewDate || "",
          interviewTime: data.interviewTime || "",
          interviewType: data.interviewType || "Online",
          interviewRound: data.interviewRound || "",
          status: data.status || "Scheduled",
          notes: data.notes || "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load interview.");
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [user, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateInterview(user.uid, id, formData);

      alert("Interview updated successfully!");

      navigate("/dashboard/interviews");
    } catch (error) {
      console.error(error);
      alert("Failed to update interview.");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/interviews");
  };

  if (loading) {
    return (
     <div className="flex h-64 items-center justify-center">
  <p className="text-gray-500">
    Loading interview...
  </p>
</div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
     <PageHeader
  title="Edit Interview"
  subtitle="Update your interview details."
/>

      <InterviewForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitButtonText="Update Interview"
      />
    </div>
  );
}

export default EditInterview;