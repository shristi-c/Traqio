import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUpcomingInterviews } from "../../services/interviewService";

function UpcomingInterviews() {
  const { user } = useAuth();

  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      if (!user) return;

      try {
        const data = await getUpcomingInterviews(
          user.uid
        );

        setInterviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUpcoming();
  }, [user]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Upcoming Interviews
      </h2>

      {interviews.length === 0 ? (
        <p className="text-gray-500">
          No upcoming interviews.
        </p>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="rounded-lg border border-gray-200 p-4"
            >
              <h3 className="font-semibold">
                {interview.company}
              </h3>

              <p className="text-sm text-gray-500">
                {interview.jobTitle}
              </p>

              <p className="mt-2 text-sm">
                📅 {interview.interviewDate}
              </p>

              <p className="text-sm">
                🕒 {interview.interviewTime}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingInterviews;