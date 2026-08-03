import { FaFilePdf } from "react-icons/fa";

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
          className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-gray-50"
        >
          <FaFilePdf className="text-3xl text-red-500" />

          <div>
            <p className="font-semibold">
              View Resume
            </p>

            <p className="text-sm text-gray-500">
              Open uploaded resume
            </p>
          </div>
        </a>
      ) : (
        <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
          Resume upload coming in next update.
        </div>
      )}
    </div>
  );
}

export default ResumeCard;