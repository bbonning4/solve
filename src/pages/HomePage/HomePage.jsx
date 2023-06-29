import { useState } from "react";
import { Link } from "react-router-dom";
import * as aiAPI from "../../utilities/ai-api";

export default function HomePage() {
  const [previewImage, setPreviewImage] = useState("");

  async function handleImageInput(evt) {
    const file = evt.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      setPreviewImage(e.target.result);
      const aiResponse = await aiAPI.processImage({ image: e.target.result});
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
    </>
  );
}
