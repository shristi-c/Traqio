import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";
import { getUpcomingInterviews } from "../../services/interviewService";
import Badge from "../Common/Badge";

function UpcomingInterviews() {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      if (!user) return;

      try {
        const data = await getUpcomingInterviews(user.uid);
        setInterviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUpcoming();
  }, [user]);

  const getRemainingDays = (date) => {
    if (!date) return "";

    const today = new Date();
    const interview = new Date(date);

    today.setHours(0, 0, 0, 0);
    interview.setHours(0, 0, 0, 0);

    const diff = Math.ceil(
      (interview - today) / (1000 * 60 * 60 * 24)
    );

    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return `In ${diff} days`;
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Upcoming Interviews
        </h2>

        <Link
          to="/dashboard/interviews"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View All
          <FiArrowRight />
        </Link>
      </div>

      {interviews.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center">
          <p className="text-gray-500">
            No upcoming interviews scheduled.
          </p>

          <Link
            to="/dashboard/interviews/new"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Schedule Interview
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="rounded-xl border border-gray-200 p-5 transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {interview.company}
                  </h3>

                  <p className="text-gray-500">
                    {interview.jobTitle}
                  </p>
                </div>

                <Badge text={interview.status} />
              </div>

              <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FiCalendar />
                  {new Date(
                    interview.interviewDate
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <FiClock />
                  {interview.interviewTime}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  {interview.interviewType}
                </span>

                <span className="text-sm font-semibold text-green-600">
                  {getRemainingDays(interview.interviewDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingInterviews;