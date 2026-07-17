// import React from "react";
import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800">
        No Applications Yet
      </h2>

      <p className="mt-3 text-gray-600">
        Start tracking your job applications by adding your first one.
      </p>

      <Link
        to="/dashboard/applications/new"
        className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        + Add Your First Application
      </Link>
    </div>
  );
};

export default EmptyState;