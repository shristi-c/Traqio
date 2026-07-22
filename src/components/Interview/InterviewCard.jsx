import {
  FaCalendarAlt,
  FaClock,
  FaEdit,
  FaTrash,
  FaBuilding,
  FaVideo,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  Scheduled: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const typeIcons = {
  Online: <FaVideo className="text-blue-500" />,
  Offline: <FaMapMarkerAlt className="text-green-500" />,
  Phone: <FaPhoneAlt className="text-purple-500" />,
};

const InterviewCard = ({ interview, onDelete }) => {
  const navigate = useNavigate();

  const {
    company,
    jobTitle,
    interviewDate,
    interviewTime,
    interviewType,
    interviewRound,
    status,
  } = interview;

  const formattedDate = interviewDate
    ? new Date(interviewDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not specified";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <FaBuilding className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {company}
            </h2>

            <p className="text-gray-600">
              {jobTitle}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            statusStyles[status] ||
            "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="mt-5 space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaClock className="text-gray-400" />
          <span>{interviewTime || "Not specified"}</span>
        </div>

        <div className="flex items-center gap-2">
          {typeIcons[interviewType]}
          <span>{interviewType}</span>
        </div>

        <div>
          <span className="font-medium text-gray-700">
            Round:
          </span>{" "}
          {interviewRound || "Not specified"}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end gap-2 border-t pt-4">
        <button
          onClick={() =>
            navigate(
              `/dashboard/interviews/${interview.id}/edit`
            )
          }
          className="rounded-lg p-2 text-yellow-600 transition hover:bg-yellow-50"
          title="Edit"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => onDelete(interview.id)}
          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default InterviewCard;