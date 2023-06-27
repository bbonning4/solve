import { useState } from "react";
import * as postsAPI from "../../utilities/posts-api";

export default function PostForm({ post, setPost, setPostCreated, setPostId }) {
  const [newPost, setNewPost] = useState({text: ""})
  const [error, setError] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const submittedPost = await postsAPI.createPost(newPost);
      setNewPost({text: ""});
      setPostId(submittedPost._id)
      setPost({})
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
