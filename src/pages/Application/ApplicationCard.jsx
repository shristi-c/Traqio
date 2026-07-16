// eslint-disable-next-line no-unused-vars
import React from "react";

const statusStyles = {
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-yellow-100 text-yellow-700",
  Assessment: "bg-purple-100 text-purple-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const ApplicationCard = ({ application }) => {
  const {
    company,
    jobTitle,
    status,
    location,
    appliedDate,
  } = application;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Company & Status */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {company}
          </h2>

          <p className="text-gray-600 mt-1">
            {jobTitle}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusStyles[status] ||
            "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="mt-5 space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-700">
            Location:
          </span>{" "}
          {location || "Not specified"}
        </p>

        <p>
          <span className="font-medium text-gray-700">
            Applied:
          </span>{" "}
          {appliedDate}
        </p>
      </div>
    </div>
  );
};

export default ApplicationCard;