import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import * as userService from "../../utilities/users-service";
import * as profilesAPI from "../../utilities/profiles-api";

export default function NavBar({ user, setUser }) {
  const [profile, setProfile] = useState({});  

  function handleLogOut() {
    userService.logOut();
    setUser(null);
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
          <input
            type="text"
            placeholder="Search"
            className="input-bordered input w-24 md:w-auto"
          />
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
