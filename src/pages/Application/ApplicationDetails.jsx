import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { getJobById, deleteJob } from "../../services/jobService";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await getJobById(user.uid, id);
        setApplication(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
   

    if (user) {
      fetchApplication();
    }
  }, [user, id]);

  const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this application?"
  );

  if (!confirmDelete) return;

  try {
    await deleteJob(user.uid, id);

    alert("Application deleted successfully.");

    navigate("/dashboard/applications");
  } catch (error) {
    console.error(error);
    alert("Failed to delete application.");
  }
};

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading application...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-8 text-center text-red-500">
        Application not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Application Details" />

      <div className="rounded-xl bg-white p-8 shadow">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              {application.company}
            </h2>

            <p className="mt-1 text-gray-500">
              {application.jobTitle}
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700">
            {application.status}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

          <Detail label="Location" value={application.location} />

          <Detail label="Job Type" value={application.jobType} />

          <Detail label="Salary" value={application.salary} />

          <Detail
            label="Applied Date"
            value={application.appliedDate}
          />

          <Detail
            label="Job Link"
            value={application.jobLink}
          />

        </div>

        <div className="mt-8">

          <h3 className="mb-2 text-lg font-semibold">
            Notes
          </h3>

          <p className="rounded-lg bg-gray-50 p-4">
            {application.notes || "No notes added."}
          </p>

        </div>

        <div className="mt-10 flex justify-end gap-3">

          <button
            onClick={() => navigate("/dashboard/applications")}
            className="rounded-lg border px-5 py-2"
          >
            Back
          </button>

         <button
  onClick={() =>
    navigate(`/dashboard/applications/${id}/edit`)
  }
  className="rounded-lg bg-yellow-500 px-5 py-2 text-white transition hover:bg-yellow-600"
>
  Edit
</button>

         <button
  onClick={handleDelete}
  className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
>
  Delete
</button>

        </div>

      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value || "-"}
      </p>
    </div>
  );
}

export default ApplicationDetails;