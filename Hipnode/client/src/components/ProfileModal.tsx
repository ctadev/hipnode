import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoSignOut } from 'react-icons/go';
import { DarkMode } from '.';
import { profile, gear } from '../assets';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../app/userSlice';
import { useSelector } from 'react-redux';

const ProfileModal = ({ setUserData, theme, setTheme, setActiveModal }) => {
  // const userId = localStorage.getItem('userID');
  const { id } = JSON.parse(localStorage.getItem('user')) || '';
  const navigate = useNavigate();
  const handleProfileLinkClick = () => {
    if (id) window.location.href = `/profiles/${id}`;
    setActiveModal('');
  };

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    setUserData({});
    navigate('/signin');
    dispatch(logoutUser());
    setActiveModal('');
  };

  return (
    <section className="bg-[#F4F6F8] dark:bg-dark-black-4 dark:text-white sm:w-1/3 lg:w-52 py-3 px-4 rounded-lg sm:absolute sm:right-0 lg:right-[20px] z-50">
      <div
        className="flex mb-3 cursor-pointer"
        onClick={handleProfileLinkClick}
      >
        <img src={profile} alt="profile" className="mr-6 dark:invert" />
        <h3 className="capitalize tracking-wide">profile</h3>
      </div>
      <div className="flex mb-3 cursor-pointer">
        <img src={gear} alt="setting" className="mr-6 dark:invert" />
        <h3 className="capitalize tracking-wide">settings</h3>
      </div>
      <div className="flex cursor-pointer" onClick={handleLogOut}>
        <div className="mr-6">
          <GoSignOut size={20} />
        </div>
        <h3 className="capitalize tracking-wide -mt-1 mb-4">
          {isLoggedIn ? 'Logout' : 'Login'}
        </h3>
      </div>
      <hr className="mb-3" />
      <div className="grid place-content-center">
        <DarkMode theme={theme} setTheme={setTheme} />
      </div>
    </section>
  );
};

export default ProfileModal;
