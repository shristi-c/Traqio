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
import Badge from "../Common/Badge";
import Button from "../Common/Button";




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

       <Badge text={status} />
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
  <Button
    size="icon"
    variant="iconWarning"
    icon={<FaEdit />}
    onClick={() =>
      navigate(`/dashboard/interviews/${interview.id}/edit`)
    }
  />

  <Button
    size="icon"
    variant="iconDanger"
    icon={<FaTrash />}
    onClick={() => onDelete(interview.id)}
  />
</div>
    </div>
  );
};

export default InterviewCard;