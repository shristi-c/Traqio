// import React from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaEye,
  FaBuilding,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/Common/Badge";
import Button from "../../components/Common/Button";
import Card from "../../components/Common/Card";


const ApplicationCard = ({ application, onDelete }) => {
  const {
    company,
    jobTitle,
    status,
    location,
    appliedDate,
  } = application;
  
 
  const navigate = useNavigate();

  const formattedDate = appliedDate
    ? new Date(appliedDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not specified";

  return (
    <Card>
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
          <FaMapMarkerAlt className="text-gray-400" />
          <span>{location || "Location not specified"}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400" />
          <span>{formattedDate}</span>
        </div>
      </div>

    {/* Footer */}
<div className="mt-6 flex justify-end gap-2 border-t pt-4">
  <Button
    size="icon"
    variant="iconPrimary"
    icon={<FaEye />}
    onClick={() =>
      navigate(`/dashboard/applications/${application.id}`)
    }
  />

  <Button
    size="icon"
    variant="iconWarning"
    icon={<FaEdit />}
    onClick={() =>
      navigate(`/dashboard/applications/${application.id}/edit`)
    }
  />

  <Button
    size="icon"
    variant="iconDanger"
    icon={<FaTrash />}
    onClick={() => onDelete(application.id)}
  />
</div>
   </Card>
  );
};

export default ApplicationCard;