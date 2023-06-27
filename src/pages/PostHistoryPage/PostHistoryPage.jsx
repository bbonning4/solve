import { useState, useEffect } from "react";
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

  const postList = posts.map((post) => (
    <PostListItem
      text={post.text}
      updatedAt={new Date(post.updatedAt).toLocaleDateString()}
    />
  ));

  return (
    <>
      <h1>PostHistoryPage</h1>
      {posts.length ? postList : <p>No Posts, yet.</p>}
    </>
  );
}
