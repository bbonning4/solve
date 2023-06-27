import { useState } from "react";
import * as postsAPI from "../../utilities/posts-api";

export default function CommentForm({ postId, comments, setComments }) {
  const [newComment, setNewComment] = useState({ text: "" });

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const createdComment = await postsAPI.createComment(postId, newComment);
      setNewComment({ text: "" });
      setComments([...comments, createdComment]);
    } catch {}
  }

  async function handleChange(evt) {
    setNewComment({ ...newComment, [evt.target.name]: evt.target.value });
  }

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <textarea
        className="textarea-primary textarea"
        placeholder="Your Comment"
        name="text"
        onChange={handleChange}
        value={newComment.text}
      ></textarea>
      <button className="btn" type="submit">
        submit
      </button>
    </form>
  );
}
