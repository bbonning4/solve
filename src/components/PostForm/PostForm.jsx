import { useState, useRef } from "react";
import * as postsAPI from "../../utilities/posts-api";

export default function PostForm({ post, setPost, setPostCreated, setPostId }) {
  const [newPost, setNewPost] = useState({ text: "" });
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('text', newPost.text);
    formData.append('image', fileInputRef.current.files[0]);

    try {
      const submittedPost = await postsAPI.createPost(formData);
      setNewPost({ text: "" });
      setPostId(submittedPost._id);
      setPost({});
      setPostCreated(true);
    } catch {
      setError("Failed to create post.");
    }
  }

  async function handleChange(evt) {
    setNewPost({ ...newPost, [evt.target.name]: evt.target.value });
    setError("");
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <form
          className="flex flex-col items-center justify-center"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            className="file-input-bordered file-input-info file-input w-full max-w-xs"
            type="file"
            ref={fileInputRef}
            name="image"
            accept="image/*"
          />
          <label>Text</label>
          <textarea
            name="text"
            value={newPost.text}
            onChange={handleChange}
            required
          />
          <button className="btn" type="submit">
            Create Post
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}
