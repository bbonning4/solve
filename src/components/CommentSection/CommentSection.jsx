import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "../CommentForm/CommentForm";
import CommentListItem from "../CommentListItem/CommentListItem";
import * as commentsAPI from "../../utilities/comments-api";
import * as postsAPI from "../../utilities/posts-api";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(function () {
    async function getPostComments() {
      const allComments = await postsAPI.getPostComments(postId);
      setComments(allComments);
    }
    getPostComments();
  }, []);

  const commentList = comments.map((comment) => (
    <div key={comment._id}>
      <CommentListItem
        text={comment.text}
        updatedAt={new Date(comment.updatedAt).toLocaleDateString()}
      />
      <div className="divider"></div>
    </div>
  ));

  return (
    <>
      <CommentForm
        postId={postId}
        comments={comments}
        setComments={setComments}
      />
      {comments.length ? commentList : <p>No comments, yet</p>}
    </>
  );
}
