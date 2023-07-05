import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as postsAPI from "../../utilities/posts-api";
import PostListItem from "../../components/PostListItem/PostListItem";

export default function PostHistoryPage() {
  const [posts, setPosts] = useState([]);

  useEffect(function () {
    async function getAllPosts() {
      const profilePosts = await postsAPI.getAll();
      setPosts(profilePosts);
    }
    getAllPosts();
  }, []);

  const postList = posts.map((post, index) => (
    <div key={post._id} className={index === 0 ? 'pt-4' : ''}>
      <PostListItem
        postId={post._id}
        text={post.text}
        updatedAt={new Date(post.updatedAt).toLocaleDateString()}
        answered={post.answered}
      />
      <div className="divider"></div>
    </div>
  ));

  return (
    <>
    <div className="card flex flex-col items-center justify-center">
      <div className="card-content m-5 rounded border-solid border-white bg-neutral p-8">
        <Link to="/posts/new" className="btn btn-primary">
          New Post
        </Link>
      </div>
    </div>
    {posts.length ? postList : <p>No Posts, yet.</p>}
    </>
  );
}
