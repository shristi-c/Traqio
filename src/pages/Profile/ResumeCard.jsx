function ResumeCard({ resumeUrl }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Resume
      </h2>

      {resumeUrl ? (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          View Resume
        </a>
      ) : (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="text-gray-500">
            Resume upload coming soon.
          </p>
        </div>
      )}
    </div>
  );
}

export default ResumeCard;