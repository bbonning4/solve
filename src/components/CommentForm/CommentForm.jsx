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
    <form className="p-4" onSubmit={handleSubmit}>
      <textarea
        className="textarea-primary textarea w-3/5"
        placeholder="Your Comment"
        name="text"
        onChange={handleChange}
        value={newComment.text}
      ></textarea>
      <br />
      <button className="btn btn-primary mt-2" type="submit">
        submit
      </button>
    </form>
  );
}
