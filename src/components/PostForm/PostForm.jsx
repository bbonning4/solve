import { useState, useRef, useEffect } from "react";
import * as postsAPI from "../../utilities/posts-api";
import { MathJax } from "better-react-mathjax";

export default function PostForm({
  post,
  setPost,
  setPostCreated,
  setPostId,
  base64,
  mathpix,
  result,
  answered,
}) {
  const [newPost, setNewPost] = useState({ text: answered ? result : "" });
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("text", newPost.text);
    formData.append("mathpix", mathpix);
    formData.append("answered", answered ? answered : false);
    if (base64) {
      formData.append("base64", base64);
    } else {
      formData.append("image", fileInputRef.current.files[0]);
    }

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
          {base64 ? (
            <img src={base64} alt="base64 image" />
          ) : (
            <input
              className="file-input-bordered file-input-info file-input w-full max-w-xs"
              type="file"
              ref={fileInputRef}
              name="image"
              accept="image/*"
            />
          )}
          <label>Text</label>
          <MathJax>
            <textarea
              name="text"
              value={newPost.text}
              onChange={handleChange}
            />
          </MathJax>
          <button className="btn" type="submit">
            Create Post
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}
