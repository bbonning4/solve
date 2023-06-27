import * as postsAPI from "../../utilities/posts-api";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PostPage({ post, setPost }) {
    const { id } = useParams();

    useEffect(function() {
        async function getPost() {
          const thisPost = await postsAPI.getPost(id);
          setPost(thisPost)
        }
        getPost();
        
      }, []);

    return (
        <>
            <p>posted on {new Date(post.updatedAt).toLocaleDateString()}</p>
            <p>{post.text}</p>
        </>
    )
}