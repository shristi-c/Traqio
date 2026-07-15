const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
};

export default TextAreaField;