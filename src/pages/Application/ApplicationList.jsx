import { useEffect, useState } from "react";
import { getJobs } from "../../services/jobService";
import { useAuth } from "../../context/AuthContext";
import ApplicationCard from "./ApplicationCard";
import EmptyState from "./EmptyState";
import { deleteJob } from "../../services/jobService";
import ApplicationToolbar from "../../components/Application/ApplicationToolbar";


function ApplicationList() {
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [jobTypeFilter, setJobTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");

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

  const locations = [
  "All",
  ...new Set(
    applications
      .map((application) => application.location)
      .filter(Boolean)
  ),
];

 const filteredApplications = applications.filter((application) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    application.company?.toLowerCase().includes(search) ||
    application.jobTitle?.toLowerCase().includes(search);

  const matchesStatus =
    statusFilter === "All" ||
    application.status === statusFilter;

  const matchesJobType =
  jobTypeFilter === "All" ||
  application.jobType === jobTypeFilter;

const matchesLocation =
  locationFilter === "All" ||
  application.location === locationFilter;

return (
  matchesSearch &&
  matchesStatus &&
  matchesJobType &&
  matchesLocation
);
});

const sortedApplications = [...filteredApplications].sort((a, b) => {
  switch (sortOption) {
    case "Oldest":
      return (
        a.createdAt?.seconds -
        b.createdAt?.seconds
      );

    case "Company":
      return a.company.localeCompare(b.company);

    case "Applied Date":
      return (
        new Date(b.appliedDate) -
        new Date(a.appliedDate)
      );

    case "Newest":
    default:
      return (
        b.createdAt?.seconds -
        a.createdAt?.seconds
      );
  }
});
const clearFilters = () => {
  setSearchTerm("");
  setStatusFilter("All");
  setJobTypeFilter("All");
  setLocationFilter("All");
  setSortOption("Newest");
};

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
  <div className="space-y-6">
  <ApplicationToolbar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  jobTypeFilter={jobTypeFilter}
  setJobTypeFilter={setJobTypeFilter}
  locationFilter={locationFilter}
  setLocationFilter={setLocationFilter}
  sortOption={sortOption}
  setSortOption={setSortOption}
  locations={locations}
  clearFilters={clearFilters}
/>

  

<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <p className="text-sm text-gray-600">
    Showing{" "}
    <span className="font-semibold">
      {sortedApplications.length}
    </span>{" "}
    application{sortedApplications.length !== 1 ? "s" : ""}
  </p>


</div>

{sortedApplications.length === 0 ? (
  <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
    <h3 className="text-lg font-semibold text-gray-800">
      No applications found
    </h3>

    <p className="mt-2 text-gray-500">
      Try changing your search or filters.
    </p>

    <button
      onClick={clearFilters}
      className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
    >
      Clear Filters
    </button>
  </div>
) : (
  <div className="grid gap-6">
    {sortedApplications.map((application) => (
      <ApplicationCard
        key={application.id}
        application={application}
        onDelete={handleDelete}
      />
    ))}
  </div>
)}
</div>

  
);
}

export default ApplicationList;