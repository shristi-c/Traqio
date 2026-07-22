import { useState } from "react";

function InterviewForm({
  initialData = {},
  onSubmit,
  submitText = "Save Interview",
}) {
  const [formData, setFormData] = useState({
    company: initialData.company || "",
    jobTitle: initialData.jobTitle || "",
    interviewDate: initialData.interviewDate || "",
    interviewTime: initialData.interviewTime || "",
    interviewType: initialData.interviewType || "Online",
    interviewRound: initialData.interviewRound || "",
    status: initialData.status || "Scheduled",
    notes: initialData.notes || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm"
    >
      {/* Company */}

      <div>
        <label className="mb-2 block font-medium">
          Company
        </label>

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Job Title */}

      <div>
        <label className="mb-2 block font-medium">
          Job Title
        </label>

        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Date & Time */}

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Interview Date
          </label>

          <input
            type="date"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Interview Time
          </label>

          <input
            type="time"
            name="interviewTime"
            value={formData.interviewTime}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* Type & Round */}

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Interview Type
          </label>

          <select
            name="interviewType"
            value={formData.interviewType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Online</option>
            <option>Offline</option>
            <option>Phone</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Interview Round
          </label>

          <input
            type="text"
            name="interviewRound"
            placeholder="Technical Round 1"
            value={formData.interviewRound}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* Status */}

      <div>
        <label className="mb-2 block font-medium">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Notes */}

      <div>
        <label className="mb-2 block font-medium">
          Notes
        </label>

        <textarea
          rows={4}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Button */}

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
}

export default InterviewForm;