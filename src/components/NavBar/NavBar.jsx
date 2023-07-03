import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import * as userService from "../../utilities/users-service";
import * as profilesAPI from "../../utilities/profiles-api";
import * as postsAPI from "../../utilities/posts-api";

export default function NavBar({ user, setUser }) {
  const [profile, setProfile] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);  
  const navigate = useNavigate();

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  async function handleSearch(evt) {
    evt.preventDefault();
    const results = await postsAPI.search(searchQuery);
    setSearchQuery('');
    setSearchResults(results);
    navigate("/search", { state: { results: results } });
  }

  useEffect(function() {
    async function getUserProfile() {
      const profile = await profilesAPI.getProfile();
      setProfile(profile);
    }
    getUserProfile();
  }, []);

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link to="/" className="btn-ghost btn text-xl normal-case">solve</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              name="q"
              className="input-bordered input w-24 md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <img src={profile.avatar} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-200 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                {/* <span className="badge">New</span> */}
              </a>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/comments">Comments</Link>
            </li>
            <li>
              <a onClick={handleLogOut}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
