function Card({
  children,
  className = "",
  hover = true,
}) {
  return (
    <div
      className={`
        rounded-xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        ${hover ? "transition-all hover:-translate-y-1 hover:shadow-lg" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;