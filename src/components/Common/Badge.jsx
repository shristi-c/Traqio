const Badge = ({ text, variant = "gray" }) => {
  const variants = {
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    indigo: "bg-indigo-100 text-indigo-700",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        variants[variant] || variants.gray
      }`}
    >
      {text}
    </span>
  );
};

export default Badge;