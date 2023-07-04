import * as postsAPI from "../../utilities/posts-api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "../../components/CommentSection/CommentSection";
import { MathJax } from "better-react-mathjax";

export default function PostPage({ post, setPost }) {
  const { id } = useParams();
  const [isProfile, setIsProfile] = useState(false);
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(function () {
    async function getPost() {
      const thisPost = await postsAPI.getPost(id);
      setPost(thisPost);
    }
    async function checkUser() {
      const check = await postsAPI.isUser(id);
      setIsProfile(check);
    }
    getPost();
    checkUser();
  }, [updated]);

  async function handleDelete() {
    const deleted = await postsAPI.deletePost(id);
    if (deleted.success) {
      navigate("/");
    }
  }

  return (
    <div>
      {isProfile && (
        <div className="dropdown-end dropdown float-right">
          <label tabIndex={0} className="btn m-1">
            . . .
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a>Edit</a>
            </li>
            <li>
              <a onClick={handleDelete}>Delete</a>
            </li>
          </ul>
        </div>
      )}
      <br />
      <div>
        <p className="text-left">
          posted on {new Date(post.updatedAt).toLocaleDateString()}
        </p>
        <div className="divider"></div>
        <div className={`${post.answered ? 'bg-neutral' : ''}`}>
          <img src={post.image} alt="image of problem" />
          <p className="text-left">
            <MathJax>{post.text}</MathJax>
          </p>
        </div>
      </div>
      <div className="divider"></div>
      <CommentSection postId={id} isProfile={isProfile} updated={updated} setUpdated={setUpdated} />
    </div>
  );
}
