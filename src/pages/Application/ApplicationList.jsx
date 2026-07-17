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

    <input
      type="text"
      placeholder="Search by company or job title..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
    />
<select
  value={jobTypeFilter}
  onChange={(e) => setJobTypeFilter(e.target.value)}
  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="All">All Job Types</option>
  <option value="Full Time">Full Time</option>
  <option value="Internship">Internship</option>
  <option value="Part Time">Part Time</option>
  <option value="Contract">Contract</option>
</select>

<select
  value={locationFilter}
  onChange={(e) => setLocationFilter(e.target.value)}
  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
>
  {locations.map((location) => (
    <option key={location} value={location}>
      {location === "All" ? "All Locations" : location}
    </option>
  ))}
</select>
<select
  value={sortOption}
  onChange={(e) => setSortOption(e.target.value)}
  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="Newest">Newest First</option>
  <option value="Oldest">Oldest First</option>
  <option value="Company">Company Name</option>
  <option value="Applied Date">Applied Date</option>
</select>

    <div className="grid gap-6">
     {sortedApplications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onDelete={handleDelete}
        />
      ))}
    </div>

  </div>
);
}

export default ApplicationList;