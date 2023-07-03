import { Link, useLocation } from "react-router-dom";
import SearchListItem from "../../components/SearchListItem/SearchListItem";

export default function SearchResultPage() {
  const location = useLocation();
  const results = location.state && location.state.results;

  const resultsList = results.map((post) => (
    <div key={post._id}>
      <Link to={`/posts/${post._id}`}>
        <SearchListItem
          image={post.image ? post.image : null}
          text={post.text}
          updatedAt={new Date(post.updatedAt).toLocaleDateString()}
        />
      </Link>
      <div className="divider"></div>
    </div>
  ));

  return (
    <>
      <div>
        <h1>Search Results</h1>
        <div className="divider"></div>
      </div>
      {results ? resultsList : <p>No results found.</p>}
    </>
  );
}
