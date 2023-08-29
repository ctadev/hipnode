import React from 'react';
<<<<<<< HEAD
import { MainMenu, UserMenu } from './';
=======
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../app/userSlice';
import { removeUserFromLocalStorage } from '../../services/authService/userAuth';
>>>>>>> bee9eb8ac4be01714d525304ded81bc67c37a171

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
<<<<<<< HEAD
      <nav className="flex items-center justify-between bg-white dark:text-white dark:bg-dark-main-bg px-3 md:px-6 h-[80px]">
        {/* Left Side */}
        <MainMenu />

        {/* Right Side */}
        <UserMenu />
=======
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
>>>>>>> bee9eb8ac4be01714d525304ded81bc67c37a171
      </nav>
    </header>
  );
}
