function PageHeader({ title, buttonText, onButtonClick }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <button
        onClick={onButtonClick}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default PageHeader;