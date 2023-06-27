import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import PostForm from "../../components/PostForm/PostForm";

export default function NewPostPage({ post, setPost }) {
  const [postCreated, setPostCreated] = useState(false)
  const [postId, setPostId] = useState('');

  useEffect(() => {
    if (postCreated) {
      const resetPostCreated = () => setPostCreated(false);

      // Listen for navigation events to reset postCreated
      const removeListener = () => {
        window.removeEventListener('popstate', resetPostCreated);
      };

      // Add a listener for the back/forward navigation
      window.addEventListener('popstate', resetPostCreated);

      // Clean up the listener on unmount or navigation
      return removeListener;
    }
  }, [postCreated]);

  return (
    <>
      <h1>NewPostPage</h1>
      { postCreated ?
        <Navigate to={`/posts/${postId}`} replace /> 
      : 
        <PostForm post={post} setPost={setPost} setPostCreated={setPostCreated} setPostId={setPostId} />
      }
    </>
  );
}