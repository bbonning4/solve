import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as aiAPI from "../../utilities/ai-api";
import { MathJax } from "better-react-mathjax";

export default function HomePage() {
  const [previewImage, setPreviewImage] = useState("");
  const [result, setResult] = useState("");
  const [mathpix, setMathpix] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleImageInput(evt) {
    const file = evt.target.files[0];

    const reader = new FileReader();
    reader.onload = async (e) => {
      setPreviewImage(e.target.result);
      setLoading(true);

      const aiResponse = await aiAPI.processImage({ image: e.target.result });
      setMathpix(`${aiResponse.tex}`);
      setResult(`${aiResponse.result}`);

      setLoading(false);
    };
    reader.readAsDataURL(file);
  }

  function handlePostClick() {
    navigate("/posts/new", {
      state: { base64: previewImage, mathpix: mathpix, result: result, answered: false },
    });
  }
  function handleAnsweredPostClick() {
    navigate("/posts/new", {
      state: { base64: previewImage, mathpix: mathpix, result: result, answered: true },
    });
  }

  return (
    <>
      <div className="card flex flex-col items-center justify-center">
        <div className="card-content m-5 rounded border-solid border-white bg-neutral p-8">
          <h1>Welcome!</h1>
          <a href=""></a>
          <Link to="/posts/new" className="btn bg-primary">
            New Post
          </Link>
        </div>
      </div>
      <form>
        <input type="file" accept="image/*" onChange={handleImageInput} />
        {previewImage && <img src={previewImage} alt="image preview" />}
      </form>
      {loading ? (
        <span className="loading loading-infinity loading-lg"></span>
      ) : (
        result && (
          <div>
            <MathJax>Answer: {result}</MathJax>
            <div>
              <p>Don't like this answer?</p>
              <button className="btn bg-primary" onClick={handlePostClick}>
                Post
              </button>{" "}
              your image for others to answer!
            </div>
            <div>
              <p>OR</p>
              <button className="btn bg-primary" onClick={handleAnsweredPostClick}>
                Post
              </button>{" "}
              your answer!
            </div>
          </div>
        )
      )}
    </>
  );
}
