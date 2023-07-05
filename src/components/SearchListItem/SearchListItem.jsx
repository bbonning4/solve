import { MathJax } from "better-react-mathjax";

export default function SearchListItem({ image, text, updatedAt, answered }) {
  return (
    <div
      className={`flex ${
        answered ? "bg-neutral" : "bg-base-100"
      } justify-between p-4`}
    >
      {image ? <img src={image}></img> : <p>[No Image]</p>}
      <div className="text-left">
        <MathJax>{text}</MathJax>
      </div>
      <div className="text-right">{updatedAt}</div>
    </div>
  );
}
