import { useEffect, useState } from "react";
import { getJobs } from "../../services/jobService";
import { useAuth } from "../../context/AuthContext";
import ApplicationCard from "./ApplicationCard";
import EmptyState from "./EmptyState";
import { deleteJob } from "../../services/jobService";


function ApplicationList() {
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const jobs = await getJobs(user.uid);
        setApplications(jobs);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const handleDelete = async (jobId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this application?"
  );

  if (!confirmDelete) return;

  try {
    await deleteJob(user.uid, jobId);

    setApplications((prev) =>
      prev.filter((job) => job.id !== jobId)
    );
  } catch (error) {
    console.error(error);
    alert("Failed to delete application.");
  }
};
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        Loading applications...
      </div>
    );
  }

  if (applications.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-6">
      {applications.map((application) => (
        <ApplicationCard
  key={application.id}
  application={application}
  onDelete={handleDelete}
/>
      ))}
    </div>
  );
}

export default ApplicationList;