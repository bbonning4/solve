import { useState, useEffect, useRef } from "react";
import * as profilesAPI from "../../utilities/profiles-api";

export default function ProfilePage() {
  const [previewImage, setPreviewImage] = useState(false);
  const [profile, setProfile] = useState({});
  const [name, setName] = useState("");
  const [updated, setUpdated] = useState(false);
  const fileInputRef = useRef();

  useEffect(function () {
    async function getUserProfile() {
      const userProfile = await profilesAPI.getProfile();
      setProfile(userProfile);
    }
    async function getUserName() {
      const userName = await profilesAPI.getName();
      setName(userName);
    }
    getUserProfile();
    getUserName();
  }, [updated]);

  async function handleImageInput(evt) {
    const file = evt.target.files[0];

    const reader = new FileReader();
    reader.onload = async (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  async function handleUpdateAvatar(evt) {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("image", fileInputRef.current.files[0]);
    formData.append("profileId", profile._id);
    const updatedProfile = await profilesAPI.updateAvatar(formData);
    setPreviewImage(false);
    setProfile(updatedProfile);
    setUpdated(!updated);
  }
  async function handleUpdateName(evt) {
    evt.preventDefault();
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="card flex flex-col items-center justify-center">
        <div className="card-content m-5 rounded border-solid border-white bg-neutral p-8">
          <h1>
            Hello, {name}.
          </h1>
          <h1>
            To update your avatar, choose a new image below.
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center">
          <form onSubmit={handleUpdateAvatar}>
            <div className="flex justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageInput}
                className="file-input file-input-bordered file-input-success w-full"
              />
            </div>
            {previewImage && <img src={previewImage} alt="image preview" />}
            {previewImage && (
              <button type="submit" className="btn-primary btn">
                Update Avatar
              </button>
            )}
            {!previewImage && (
              <div className="card-content m-5 rounded border-solid border-white bg-neutral p-8">
                <label>Current avatar:</label>
                <img src={profile.avatar} alt="user avatar" className="max-w-sm max-h-96" />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
