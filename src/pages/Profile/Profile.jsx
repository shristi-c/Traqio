import { useEffect, useState } from "react";

import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileForm from "../../components/profile/ProfileForm";
import SkillsInput from "../../components/profile/SkillsInput";
import SocialLinks from "../../components/profile/SocialLinks";
import ResumeCard from "../../components/profile/ResumeCard";
import ProfileCompletion from "../../components/Profile/ProfileCompletion";

import { useAuth } from "../../context/AuthContext";
import {
  getUserProfile,
  updateUserProfile,
} from "../../services/UserService";

function Profile() {
  const { user } = useAuth();

  const emptyProfile = {
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    experience: "",
    github: "",
    linkedin: "",
    portfolio: "",
    resumeUrl: "",
    profileImage: "",
    skills: [],
  };

  const [formData, setFormData] = useState(emptyProfile);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const profile = await getUserProfile(user.uid);

        if (profile) {
          setFormData({
            ...emptyProfile,
            ...profile,
          });

          setSkills(profile.skills || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = async () => {
    if (!user) return;

    const profile = await getUserProfile(user.uid);

    setFormData({
      ...emptyProfile,
      ...profile,
    });

    setSkills(profile?.skills || []);

    setEditMode(false);
  };

const handleSave = async () => {
  if (!user) return;

  setSaving(true);

  try {
    await updateUserProfile(user.uid, {
      ...formData,
      skills,
    });

    setEditMode(false);
  } catch (error) {
    console.error(error);
    alert("Failed to update profile.");
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-40 rounded-2xl bg-gray-200" />
        <div className="h-96 rounded-2xl bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <ProfileHeader
        user={formData}
        onEdit={handleEdit}
        editMode={editMode}
      />
      <ProfileCompletion profile={{ ...formData, skills }} />

<ProfileForm
  formData={formData}
  handleChange={handleChange}
  editMode={editMode}
  onSave={handleSave}
  onCancel={handleCancel}
  saving={saving}
/>

      <SkillsInput
        skills={skills}
        setSkills={setSkills}
        disabled={!editMode}
      />

      <SocialLinks
        formData={formData}
        handleChange={handleChange}
        disabled={!editMode}
      />

      <ResumeCard
        resumeUrl={formData.resumeUrl}
      />

    </div>
  );
}

export default Profile;