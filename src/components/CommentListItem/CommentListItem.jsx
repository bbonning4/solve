import { Link } from "react-router-dom";

export default function CommentListItem({ text, updatedAt }) {
  return (
    <div className="flex justify-between">
      <p className="text-left">{text}</p>
      <h1 className="text-right">{updatedAt}</h1>
    </div>
  );
}
