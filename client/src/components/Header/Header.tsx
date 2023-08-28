import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../app/userSlice';
import { removeUserFromLocalStorage } from '../../services/authService/userAuth';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    removeUserFromLocalStorage();
    navigate('/');
  };

  return (
    <header>
      <nav>
        <ul className="flex justify-between">
          <div className="flex justify-between gap-10">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/meetups">Meetups</Link>
            </li>
            <li>
              <Link to="/groups">Groups</Link>
            </li>
            <li>
              <Link to="/podcasts">Podcasts</Link>
            </li>
          </div>
          {currentUser ? (
            <div>
              <div className="flex justify-between gap-10">
                <li>
                  <Link to="/sign-in">{currentUser.username}</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </div>
            </div>
          ) : (
            <div className="flex justify-between gap-10">
              <li>
                <Link to="/sign-in">Sign In</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}
