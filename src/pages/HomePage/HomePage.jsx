import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <div className="card flex flex-col items-center justify-center">
        <div className="card-content p-8 m-5 rounded border-solid border-white bg-neutral">
            <h1>Welcome!</h1>
            <a href=""></a>
            <Link to="/posts/new" className="btn bg-primary">New Post</Link>
        </div>
      </div>
    </>
  );
}
