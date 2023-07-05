import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as commentsAPI from "../../utilities/comments-api";
import CommentListItem from "../../components/CommentListItem/CommentListItem";

export default function CommentHistoryPage() {
  const [comments, setComments] = useState([]);

  useEffect(function () {
    async function getAllComments() {
      const profileComments = await commentsAPI.getAll();
      setComments(profileComments);
    }
    getAllComments();
  }, []);

  const commentsList = comments.map((comment) => (
    <div key={comment._id}>
      <Link to={`/posts/${comment.post}`}>
        <CommentListItem
          comment={comment}
          updatedAt={new Date(comment.updatedAt).toLocaleDateString()}
        />
      </Link>
      <div className="divider"></div>
    </div>
  ));

  return (
    <>
      {comments.length ? commentsList : <p>You haven't commented on any posts.</p>}
    </>
  );
}
