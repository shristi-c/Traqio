import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiMapPin } from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";
import { getJobs } from "../../services/jobService";
import Badge from "../Common/Badge";

function RecentApplications() {
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return;

      try {
        const data = await getJobs(user.uid);

        const sorted = data
          .sort(
            (a, b) =>
              new Date(b.createdAt || b.appliedDate) -
              new Date(a.createdAt || a.appliedDate)
          )
          .slice(0, 5);

        setApplications(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Applications
        </h2>

        <Link
          to="/dashboard/applications"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
        >
          View All
          <FiArrowRight />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : applications.length === 0 ? (
        <div className="rounded-xl border border-dashed py-10 text-center">
          <p className="text-gray-500">
            Start tracking your first application.
          </p>

          <Link
            to="/dashboard/applications/new"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Add Application
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border p-5 transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">
                    {job.company}
                  </h3>

                  <p className="text-gray-500">
                    {job.jobTitle}
                  </p>
                </div>

                <Badge text={job.status} />
              </div>

              <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <FiMapPin />
                  {job.location || "Remote"}
                </span>

                <span className="flex items-center gap-2">
                  <FiCalendar />
                  {job.appliedDate}
                </span>
              </div>

              <div className="mt-4">
                <Link
                  to={`/dashboard/applications/${job.id}`}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentApplications;