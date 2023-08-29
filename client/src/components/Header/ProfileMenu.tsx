import React, { useState } from 'react';
import HeaderIcon from '../Icons/HeaderIcon';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../app/userSlice';
import { removeUserFromLocalStorage } from '../../services/authService/userAuth';

const ProfileMenu = () => {
  const [toggleTheme, setToggleTheme] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    removeUserFromLocalStorage();
    navigate('/');
  };

  return (
    <main className="absolute w-[182px] bg-white dark:bg-dark-main-bg dark:text-white left-0 rounded-lg top-[70px] pt-4">
      {/* Profile Button */}
      <section className="flex gap-3 items-center px-4">
        <HeaderIcon iconName="profile" color="red" />
        <h1 className="font-bold text-xl">Profile</h1>
      </section>

      {/* Logout Button */}
      <section className="flex gap-3 items-center mt-3 px-4">
        <HeaderIcon iconName="logout" />
        <h1 className="font-bold text-xl">Logout</h1>
      </section>

      {/* Dark/Light Mode Toggle */}
      <section className="flex gap-4 items-center border-t py-3 mt-4">
        <h2 className="text-semibold text-lg pl-4">Interface</h2>
        <div
          className={`px-3 py-2 bg-slate-300 cursor-pointer rounded-full relative after:absolute after:bg-dark-main-bg after:h-[30px] after:w-[30px] after:rounded-full after:top-[2px] h-[35px] w-[70px] ${
            toggleTheme
              ? 'after:-translate-x-2 after:transition-all'
              : 'after:translate-x-6 after:transition-all'
          }`}
          onClick={() => setToggleTheme(!toggleTheme)}
        >
          <aside className="absolute left-0 top-0 right-0 bottom-0 z-30 flex items-center gap-4 justify-center">
            <HeaderIcon
              iconName="sun"
              color={toggleTheme ? 'yellow' : 'gray'}
            />
            <HeaderIcon
              iconName="moon"
              color={!toggleTheme ? 'yellow' : 'gray'}
            />
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ProfileMenu;
