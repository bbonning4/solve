import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "../CommentForm/CommentForm";
import CommentListItem from "../CommentListItem/CommentListItem";
import * as commentsAPI from "../../utilities/comments-api";
import * as postsAPI from "../../utilities/posts-api";

export default function CommentSection({ postId, isProfile, updated, setUpdated }) {
  const [comments, setComments] = useState([]);

  useEffect(function () {
    async function getPostComments() {
      const allComments = await postsAPI.getPostComments(postId);
      setComments(allComments);
    }
    getPostComments();
  }, [updated]);

  const commentList = comments.map((comment) => (
    <div key={comment._id}>
      <CommentListItem
        comment={comment}
        isProfile={isProfile}
        updated={updated}
        setUpdated={setUpdated}
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
      <div className="divider"></div>
      {comments.length ? commentList : <p className="p-4">No comments, yet</p>}
    </>
  );
}
