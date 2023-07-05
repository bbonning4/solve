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
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();


  async function handleInput(evt) {
    const file = evt.target.files[0];
    setSelectedFile(file);
    handleImageInput(file);
  }

  async function handleDrop(evt) {
    evt.preventDefault();
    const file = evt.dataTransfer.files[0];
    setSelectedFile(file);
    handleImageInput(file);
  }

  async function handleImageInput(file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("text", newPost.text);
    formData.append("mathpix", mathpix);
    formData.append("answered", answered ? answered : false);
    if (base64) {
      formData.append("base64", base64);
    } else {
      formData.append("image", selectedFile);
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
          <div
            className="flex items-center justify-center p-8"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(e);
            }}
          >
            <div className="dropzone flex h-64 w-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center">
              <span>Drag and Drop File or:</span>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                name="image"
                onChange={handleInput}
                className="file-input-bordered file-input file-input-md w-full max-w-xs"
              />
              {previewImage && <img src={previewImage} alt="image preview" />}
              {base64 && <img src={base64} alt="base64 image" />}
            </div>
          </div>
          <label>Text (optional)</label>
          <div className="w-full max-w-3x1">
            <MathJax>
              <textarea
                name="text"
                value={newPost.text}
                onChange={handleChange}
                className="textarea-primary textarea w-full"
                placeholder="Your Post"
              />
            </MathJax>
          </div>
          <button className="btn btn-primary" type="submit">
            Create Post
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}
