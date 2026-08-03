function SocialLinks({
  formData,
  handleChange,
  disabled,
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Professional Links
      </h2>

      <div className="grid gap-5">
        <input
          type="url"
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
          disabled={disabled}
          className="rounded-lg border p-3"
        />

        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
          disabled={disabled}
          className="rounded-lg border p-3"
        />

        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio URL"
          value={formData.portfolio}
          onChange={handleChange}
          disabled={disabled}
          className="rounded-lg border p-3"
        />
      </div>
    </div>
  );
}

export default SocialLinks;