import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import InterviewForm from "../../components/Interview/InterviewForm";

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
      <div className="p-8 text-center">
        Loading interview...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Interview
        </h1>

        <p className="mt-2 text-gray-500">
          Update your interview details.
        </p>
      </div>

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