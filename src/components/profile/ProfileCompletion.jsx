function ProfileCompletion({ profile }) {
  const fields = [
    profile.name,
    profile.phone,
    profile.location,
    profile.bio,
    profile.github,
    profile.linkedin,
    profile.portfolio,
    profile.resumeUrl,
    profile.skills?.length,
  ];

  const completed = fields.filter(Boolean).length;

  const percent = Math.round(
    (completed / fields.length) * 100
  );

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Profile Completion
      </h2>

      <div className="mt-5 h-3 rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-green-500 transition-all"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <p className="mt-4 text-gray-600">
        {percent}% Complete
      </p>
    </div>
  );
}

export default ProfileCompletion;