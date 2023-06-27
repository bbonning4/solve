import { Link } from "react-router-dom";

export default function PostListItem({ postId, text, updatedAt }) {
    return (
        <Link to={`/posts/${postId}`}>
            <div className="flex justify-between">
                <p className="text-left">{text}</p>
                <h1 className="text-right">{updatedAt}</h1>
            </div>
        </Link>
    )
}