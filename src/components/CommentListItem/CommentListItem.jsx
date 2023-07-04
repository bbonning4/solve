import { MathJax } from "better-react-mathjax";

export default function CommentListItem({ text, updatedAt }) {
  return (
    <div className="flex justify-between">
      <p className="text-left">
        <MathJax>{text}</MathJax>
      </p>
      <h1 className="text-right">{updatedAt}</h1>
    </div>
  );
}
