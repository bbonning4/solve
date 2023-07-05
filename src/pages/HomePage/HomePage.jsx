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

  async function handleInput(evt) {
    const file = evt.target.files[0];
    handleImageInput(file);
  }

  async function handleDrop(evt) {
    evt.preventDefault();
    const file = evt.dataTransfer.files[0];
    handleImageInput(file);
  }

  async function handleImageInput(file) {
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
      state: {
        base64: previewImage,
        mathpix: mathpix,
        result: result,
        answered: false,
      },
    });
  }
  function handleAnsweredPostClick() {
    navigate("/posts/new", {
      state: {
        base64: previewImage,
        mathpix: mathpix,
        result: result,
        answered: true,
      },
    });
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="card flex flex-col items-center justify-center">
        <div className="card-content m-5 rounded border-solid border-white bg-neutral p-8">
          <h1>
            Welcome! To begin, use the dropzone below to get an answer to a
            problem within an image.
          </h1>
          <h1>
            Also, feel free to create a{" "}
            <Link to="/posts/new" className="btn-primary btn">
              New Post
            </Link>
          </h1>
        </div>
      </div>
      <div
        className="flex items-center justify-center p-8"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleDrop(e);
        }}
      >
        <div className="dropzone flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center">
          <form>
            <span>Drag and Drop File or: </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleInput}
              className="file-input-bordered file-input file-input-md w-full max-w-xs"
            />
            {previewImage && <img src={previewImage} alt="image preview" />}
          </form>
        </div>
      </div>
      <div className="card flex flex-col items-center justify-center">
        {loading ? (
          <span className="loading loading-infinity loading-lg"></span>
        ) : (
          result && (
            <div className="card-content m-5 rounded border-solid border-white bg-neutral p-8">
              <MathJax>Answer: {result}</MathJax>
              <div>
                <p>Don't like this answer?</p>
                <button className="btn-primary btn" onClick={handlePostClick}>
                  Post
                </button>{" "}
                your image for others to answer!
              </div>
              <div>
                <p>OR</p>
                <button
                  className="btn-primary btn"
                  onClick={handleAnsweredPostClick}
                >
                  Post
                </button>{" "}
                your answer!
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
