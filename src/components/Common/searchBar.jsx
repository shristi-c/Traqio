import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative w-full md:w-80 ${className}`}>
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
};

export default SearchBar;