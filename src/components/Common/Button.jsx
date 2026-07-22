function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
}) {
  const baseStyles =
    "rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",

    secondary:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-400",

    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

    success:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;