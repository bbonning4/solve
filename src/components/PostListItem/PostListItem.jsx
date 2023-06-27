export default function PostListItem({ text, updatedAt }) {
    return (
        <div>
            <h1>{text}</h1>
            <h2>{updatedAt}</h2>
        </div>
    )
}