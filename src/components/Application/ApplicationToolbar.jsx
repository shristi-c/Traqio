import SearchBar from "../Common/searchBar";
import FilterBar from "../Common/FilterBar";
import Button from "../Common/Button";

function ApplicationToolbar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  jobTypeFilter,
  setJobTypeFilter,
  locationFilter,
  setLocationFilter,
  sortOption,
  setSortOption,
  locations,
  clearFilters,
}) {
  const filters = [
    {
      name: "status",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { label: "All Statuses", value: "All" },
        { label: "Applied", value: "Applied" },
        { label: "Interview", value: "Interview" },
        { label: "Assessment", value: "Assessment" },
        { label: "Offer", value: "Offer" },
        { label: "Rejected", value: "Rejected" },
      ],
    },
    {
      name: "jobType",
      value: jobTypeFilter,
      onChange: setJobTypeFilter,
      options: [
        { label: "All Job Types", value: "All" },
        { label: "Full Time", value: "Full Time" },
        { label: "Internship", value: "Internship" },
        { label: "Part Time", value: "Part Time" },
        { label: "Contract", value: "Contract" },
      ],
    },
    {
      name: "location",
      value: locationFilter,
      onChange: setLocationFilter,
      options: locations.map((location) => ({
        label:
          location === "All"
            ? "All Locations"
            : location,
        value: location,
      })),
    },
    {
      name: "sort",
      value: sortOption,
      onChange: setSortOption,
      options: [
        { label: "Newest First", value: "Newest" },
        { label: "Oldest First", value: "Oldest" },
        { label: "Company Name", value: "Company" },
        { label: "Applied Date", value: "Applied Date" },
      ],
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search company or job title..."
          />
        </div>

        <FilterBar filters={filters} />
      </div>

      <div className="flex justify-end">
        <Button
          variant="secondary"
          size="sm"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}

export default ApplicationToolbar;