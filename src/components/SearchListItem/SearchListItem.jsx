import { MathJax } from "better-react-mathjax";

export default function SearchListItem({ image, text, updatedAt, answered }) {
  return (
    <div
      className={`flex ${
        answered ? "bg-neutral" : "bg-base-100"
      } justify-between`}
    >
      {image ? <img src={image}></img> : <p>[No Image]</p>}
      <p className="text-left">
        <MathJax>{text}</MathJax>
      </p>
      <h1 className="text-right">{updatedAt}</h1>
    </div>
  );
}
