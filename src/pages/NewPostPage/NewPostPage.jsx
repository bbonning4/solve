import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PostForm from "../../components/PostForm/PostForm";

export default function NewPostPage({ post, setPost }) {
  const [postCreated, setPostCreated] = useState(false);
  const [postId, setPostId] = useState("");
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (postCreated) {
      const resetPostCreated = () => setPostCreated(false);

      // Listen for navigation events to reset postCreated
      const removeListener = () => {
        window.removeEventListener("popstate", resetPostCreated);
      };

      // Add a listener for the back/forward navigation
      window.addEventListener("popstate", resetPostCreated);

      // Clean up the listener on unmount or navigation
      return removeListener;
    }
  }, [postCreated]);

  return (
    <>
      {postCreated ? (
        <Navigate to={`/posts/${postId}`} replace />
      ) : (
        <PostForm
          post={post}
          setPost={setPost}
          setPostCreated={setPostCreated}
          setPostId={setPostId}
          base64={state ? state.base64 : null}
          mathpix={state ? state.mathpix : null}
          result={state ? state.result : null}
          answered={state ? state.answered : null}
        />
      )}
    </>
  );
}
