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
    <>
      <form onSubmit={handleUpdateName}>
        <p>Hello, {name}.</p>
        {/* <p>Posts: {profile.posts.length}</p>
        <p>Comments: {profile.comments.length}</p> */}
        {/* <label>Edit username: </label>
        <input name="name" type="text" placeholder="New username" className="input input-bordered w-full max-w-xs" required />
        <button type="submit" className="btn">Update Username</button> */}
      </form>
      <form onSubmit={handleUpdateAvatar}>
        <input type="file" accept="image/*" name="image" ref={fileInputRef} onChange={handleImageInput} />
        {previewImage ? 
        <div>
            <img src={previewImage} alt="image preview" />
            <button type="submit" className="btn">Update Avatar</button> 
        </div>
        :
        <div>
            <label>Current avatar:</label>
            <img src={profile.avatar} alt="user avatar" className="max-w-sm max-h-96" />
        </div>
        }
      </form>
    </>
  );
}
