import { FaUserCircle, FaEdit } from "react-icons/fa";

function ProfileHeader({ user, onEdit, editMode }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-5">
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-blue-100 bg-gray-100">
  {user?.profileImage ? (
    <img
      src={user.profileImage}
      alt={user.name}
      className="h-full w-full object-cover"
    />
  ) : (
    <FaUserCircle className="text-7xl text-blue-500" />
  )}
</div>
          <div>
            <h1 className="text-3xl font-bold">
              {user?.name || "User"}
            </h1>

            <p className="text-gray-500">
              {user?.email}
            </p>
          </div>
        </div>

       <button
  onClick={onEdit}
  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
>
  <FaEdit />
  {editMode ? "Editing..." : "Edit Profile"}
</button>
      </div>
    </div>
  );
}

export default ProfileHeader;