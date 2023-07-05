import { MathJax } from "better-react-mathjax";
import * as commentsAPI from "../../utilities/comments-api";

export default function CommentListItem({
  comment,
  isProfile,
  updated,
  setUpdated,
}) {
  async function handleDelete(evt) {}

  async function handleMarkAnswer() {
    await commentsAPI.markAnswer({ id: comment._id });
    setUpdated(!updated);
  }
  async function handleUnmarkAnswer() {
    await commentsAPI.unmarkAnswer({ id: comment._id });
    setUpdated(!updated);
  }

  return (
    <div
      className={`flex justify-between ${comment.isAnswer ? "bg-neutral" : ""}`}
    >
      {isProfile && (
        <div className="dropdown-start dropdown float-right">
          <label tabIndex={0} className="btn m-1">
            . . .
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
          >
            <li>
              {comment.isAnswer ? (
                <a onClick={handleUnmarkAnswer}>Unmark as Answer</a>
              ) : (
                <a onClick={handleMarkAnswer}>Mark as Answer</a>
              )}
            </li>
            <li>
              <a onClick={handleDelete}>Report and Delete</a>
            </li>
          </ul>
        </div>
      )}

      <p className="text-left">
        <MathJax>{comment.text}</MathJax>
      </p>
      <h1 className="text-right">
        {new Date(comment.updatedAt).toLocaleDateString()}
      </h1>
    </div>
  );
}
