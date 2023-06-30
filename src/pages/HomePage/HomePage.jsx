import { useState } from "react";
import { Link } from "react-router-dom";
import * as aiAPI from "../../utilities/ai-api";
import { MathJax } from "better-react-mathjax";

export default function HomePage() {
  const [previewImage, setPreviewImage] = useState("");
  const [result, setResult] = useState("");

  async function handleImageInput(evt) {
    const file = evt.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      setPreviewImage(e.target.result);
      const aiResponse = await aiAPI.processImage({ image: e.target.result});
      setResult(`${aiResponse.result.message}`);
    };
    reader.readAsDataURL(file);

    // console.log(aiResponse);
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
      <div>
        <MathJax>{"\\[\n{ }_{92}^{235} \\mathrm{U}+{ }_{0}^{1} n \\longrightarrow{ }_{55}^{141} \\mathrm{Cs}+3{ }_{0}^{1} n+X\n\\]\nNeutron bombardment of uranium can induce the reaction represented above. Nuclide \\( X \\) is which of the following?\nA) \\( { }_{35}^{92} \\mathrm{Br} \\)\nB) \\( { }_{35}^{94} \\mathrm{Br} \\)\nC) \\( { }_{37}^{91} \\mathrm{Rb} \\)\nD) \\( { }_{37}^{92} \\mathrm{Rb} \\)\nE) \\( { }_{37}^{94} \\mathrm{Rb} \\)"}</MathJax>
      </div>
    </>
  );
}
