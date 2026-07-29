import { Link } from "react-router-dom";

const EmptyState = ({
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800">
        {title}
      </h2>

      <p className="mt-3 text-gray-600">
        {description}
      </p>

      {buttonText && buttonLink && (
        <Link
          to={buttonLink}
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;