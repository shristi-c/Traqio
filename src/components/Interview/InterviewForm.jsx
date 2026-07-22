function InterviewForm({
  formData,
  setFormData,
  onSubmit,
  submitButtonText = "Save Interview",
  onCancel,
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
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
            value={formData.interviewRound}
            onChange={handleChange}
            placeholder="Technical Round 1"
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

      {/* Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default InterviewForm;