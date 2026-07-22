import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import InterviewForm from "../../components/Interview/InterviewForm";
import { addInterview } from "../../services/interviewService";

function NewInterview() {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addInterview(user.uid, formData);

      alert("Interview scheduled successfully!");

      navigate("/dashboard/interviews");
    } catch (error) {
      console.error(error);
      alert("Failed to schedule interview.");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/interviews");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Schedule Interview
        </h1>

        <p className="mt-2 text-gray-500">
          Add details about your upcoming interview.
        </p>
      </div>

      <InterviewForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitButtonText="Schedule Interview"
      />
    </div>
  );
}

export default NewInterview;