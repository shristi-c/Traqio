import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import {
  getInterviews,
  deleteInterview,
} from "../../services/interviewService";

import InterviewCard from "./InterviewCard";
import EmptyState from "../../pages/Application/EmptyState";

function InterviewList() {
  const { user } = useAuth();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetchInterviews();
  }, [user]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);

      const data = await getInterviews(user.uid);

      setInterviews(data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmDelete) return;

    try {
      await deleteInterview(user.uid, id);

      setInterviews((prev) =>
        prev.filter((interview) => interview.id !== id)
      );
    } catch (error) {
      console.error("Error deleting interview:", error);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading interviews...
      </div>
    );
  }

  if (interviews.length === 0) {
    return (
      <EmptyState
        title="No Interviews Scheduled"
        description="Start by adding your first interview."
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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