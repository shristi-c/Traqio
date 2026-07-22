import { Link } from "react-router-dom";
// import InterviewList from "../../components/Interview/InterviewList";

function Interviews() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Interviews
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your scheduled interviews.
          </p>
        </div>

        <Link
          to="/dashboard/interviews/new"
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + Schedule Interview
        </Link>
      </div>

      <InterviewList />
    </div>
  );
}

export default Interviews;