import React, { useState, useEffect } from 'react';
import HeaderIcon from '../Icons/HeaderIcon';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../app/userSlice';
import { removeUserFromLocalStorage } from '../../services/authService/userAuth';
import Theme from './Theme';

const ProfileMenu = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.themeState);

  const handleLogout = () => {
    dispatch(logoutUser());
    removeUserFromLocalStorage();
    navigate('/sign-in');
  };

  const handleLogin = () => {
    navigate('/sign-in');
  };

  return (
    <main className="absolute w-[182px] bg-white dark:bg-dark-main-bg dark:text-white left-0 rounded-lg top-[70px] pt-4">
      {/* Profile Button */}
      <section className="flex gap-3 items-center mx-4 px-4 py-1 cursor-pointer hover:bg-primary-orange rounded-full">
        {currentUser && (
          <>
            <HeaderIcon iconName="profile" color={theme ? 'white' : 'black'} />
            <h1
              className="font-semibold text-lg"
              onClick={() => navigate(`/${currentUser.id}/profile`)}
            >
              Profile
            </h1>
          </>
        )}
      </section>

      {/* Logout Button */}
      <section className="flex gap-3 items-center mt-3 mx-4 px-4 py-1 hover:bg-primary-orange rounded-full cursor-pointer">
        <HeaderIcon iconName="logout" color={theme ? 'white' : 'black'} />
        {currentUser ? (
          <h1 className="font-semibold text-lg" onClick={handleLogout}>
            Logout
          </h1>
        ) : (
          <h1 className="font-semibold text-lg" onClick={handleLogin}>
            Login
          </h1>
        )}
      </section>

      {/* Dark/Light Mode Toggle */}
      <Theme />
    </main>
  );
};

export default ProfileMenu;
