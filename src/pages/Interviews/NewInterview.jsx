import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import InterviewForm from "../../components/Interview/InterviewForm";
import { addInterview } from "../../services/interviewService";

function NewInterview() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await addInterview(user.uid, formData);

      alert("Interview scheduled successfully!");

      navigate("/dashboard/interviews");
    } catch (error) {
      console.error(error);
      alert("Failed to schedule interview.");
    }
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
        onSubmit={handleSubmit}
        submitText="Schedule Interview"
      />
    </div>
  );
}

export default NewInterview;