import SearchBar from "../Common/SearchBar";
import FilterBar from "../Common/FilterBar";

function InterviewToolbar({
  search,
  setSearch,
  status,
  setStatus,
  type,
  setType,
  sort,
  setSort,
}) {
  const filters = [
    {
      name: "status",
      value: status,
      onChange: setStatus,
      options: [
        { label: "All Status", value: "All" },
        { label: "Scheduled", value: "Scheduled" },
        { label: "Completed", value: "Completed" },
        { label: "Cancelled", value: "Cancelled" },
      ],
    },
    {
      name: "type",
      value: type,
      onChange: setType,
      options: [
        { label: "All Types", value: "All" },
        { label: "Online", value: "Online" },
        { label: "Offline", value: "Offline" },
        { label: "Phone", value: "Phone" },
      ],
    },
    {
      name: "sort",
      value: sort,
      onChange: setSort,
      options: [
        { label: "Newest", value: "newest" },
        { label: "Oldest", value: "oldest" },
        { label: "Company A-Z", value: "company-asc" },
        { label: "Company Z-A", value: "company-desc" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full lg:max-w-md">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search company or job title..."
        />
      </div>

      <FilterBar filters={filters} />
    </div>
  );
}

export default InterviewToolbar;