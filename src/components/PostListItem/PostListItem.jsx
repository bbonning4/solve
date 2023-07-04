import { Link } from "react-router-dom";
import { MathJax } from "better-react-mathjax";

export default function PostListItem({ postId, text, updatedAt, answered }) {
  return (
    <Link to={`/posts/${postId}`}>
      <div
        className={`flex ${
          answered ? "bg-neutral" : "bg-base-100"
        } justify-between`}
      >
        <p className="text-left">
          <MathJax>{text.length ?  text  : "[No Text]"}</MathJax>
        </p>
        <h1 className="text-right">{updatedAt}</h1>
      </div>
    </Link>
  );
}
