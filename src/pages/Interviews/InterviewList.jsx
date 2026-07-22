import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getInterviews,
  deleteInterview,
} from "../../services/interviewService";

import InterviewCard from "./InterviewCard";

function InterviewList() {
  const { user } = useAuth();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await getInterviews(user.uid);
        setInterviews(data);
      } catch (error) {
        console.error("Failed to fetch interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this interview?")) return;

    try {
      await deleteInterview(user.uid, id);

      setInterviews((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete interview.");
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
        Loading interviews...
      </div>
    );
  }

  if (interviews.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
        No interviews scheduled.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {interviews.map((interview) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default InterviewList;