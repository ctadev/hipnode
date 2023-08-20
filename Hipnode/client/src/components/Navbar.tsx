import React, { useEffect, useState } from 'react';
import { ImHome } from 'react-icons/im';
import { BsFillCalendarMinusFill } from 'react-icons/bs';
import { MdGroups2 } from 'react-icons/md';
import { FaPodcast } from 'react-icons/fa';
import { FaCommentDots } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';

import { avatar, logo, search, smallLogo, smallLogoDark } from '../assets';
import { getUser } from '../../utils/getUser';
import { MessagesModal, NotificationsModal, ProfileModal } from '.';
import { INotification } from '../../types/index';
import { useGetNotifications } from '../../hooks/useNotifications';
import arrowDown from '../assets/arrow-down.png';
import { setPostTitleQuery } from '../app/postSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = ({ theme, setTheme }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string | null>();
  const isDarkMode = document.documentElement.classList.contains('dark');

  const { postTitleQuery } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  const fetchData = (value) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((resp) => resp.json())
      .then((data) => {
        // const results = json.filter((user) => {
        //   return (
        //     value &&
        //     user &&
        //     user.name &&
        //     user.name.toLowerCase().includes(value)
        //   );
        // });
      });
  };

  const handleChange = (e) => {
    // setSearchInput(value);
    // fetchData(value);
    dispatch(setPostTitleQuery(e.target.value));
  };

  const [notifications, setNotifications] = useState<INotification[]>([]);
  const getNotifications = useGetNotifications();

  const handleModalClick = (modalName: string | null) => {
    if (activeModal === modalName) {
      setActiveModal(null);
    } else {
      setActiveModal(modalName);
    }
  };

  useEffect(() => {
    const getLoggedInUser = async () => {
      const userId = getUser();
      if (userId) {
        try {
          const fetchLoggedInUser = await fetch(
            `${import.meta.env.VITE_DEV_BACKEND_URL}/users/${userId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem('user')).token
                }`,
              },
            },
          );
          const data = await fetchLoggedInUser.json();
          setUserData(data);
          if (data.id) {
            setIsAuth(true);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    getLoggedInUser();
    getNotifications.mutateAsync().then((result) => {
      setNotifications(result);
    });
  }, []);

  return (
    <main className="sm:w-10/12 m-auto white dark:bg-[#262D34] lg:w-full relative">
      <section className="flex sm:justify-between items-center p-2 px-5 lg:px-10">
        <Link to="/">
          <div className="flex items-center">
            <img
              src={isDarkMode ? smallLogoDark : smallLogo}
              alt="logo"
              className="self-center object-cover mr-2 cursor-pointer w-[30px] h-[30px]"
            />
            <h1 className="hidden  sm:block text-[#FF4401] capitalize font-bold text-xl">
              hipnode
            </h1>
          </div>
        </Link>

        <ul className="hidden items-center lg:flex lg:justify-between lg:w-1/5">
          <li className="text-slate-400">
            <NavLink
              to="/"
              style={({ isActive }) => {
                return { color: isActive ? '#ff4401' : 'grey' };
              }}
            >
              <ImHome />
            </NavLink>
          </li>
          <li className="text-slate-400 text-xl">
            <NavLink
              to="/meetups"
              style={({ isActive }) => {
                return { color: isActive ? '#ff4401' : 'grey' };
              }}
            >
              <BsFillCalendarMinusFill />
            </NavLink>
          </li>

          <li className="text-slate-400 text-3xl">
            <NavLink
              to="/groups"
              style={({ isActive }) => {
                return { color: isActive ? '#ff4401' : 'grey' };
              }}
            >
              <MdGroups2 />
            </NavLink>
          </li>
          <li className="text-slate-400 text-xl">
            <NavLink
              to="/podcasts"
              style={({ isActive }) => {
                return { color: isActive ? '#ff4401' : 'grey' };
              }}
            >
              <FaPodcast />
            </NavLink>
          </li>
        </ul>

        <div className="flex p-1 items-center sm:bg-[#F4F6F8] dark:bg-dark-black-4  rounded-lg lg:w-5/12">
          <input
            type="text"
            className="hidden sm:block sm:w-64  bg-[#F4F6F8] dark:bg-dark-black-4  p-1 mr-2 lg:mr-0 lg:w-full outline-none px-2 dark:text-white"
            placeholder="Type here to search..."
            value={searchInput}
            onChange={handleChange}
          />
          <span className="self-center text-slate-400 p-2">
            <Link to="/">
              <img src={search} alt="search" className="w-5 h-5" />
            </Link>
          </span>
        </div>

        <ul className="flex items-center ml-auto sm:ml-0 sm:justify-between select-none">
          <li
            className="text-slate-400 cursor-pointer text-xl"
            onClick={() => {
              handleModalClick('messages');
            }}
          >
            <FaCommentDots />
          </li>
          <li
            className="ml-6 text-slate-400 cursor-pointer text-xl"
            onClick={() => {
              handleModalClick('notifications');
            }}
          >
            <IoMdNotifications />
          </li>
          <li
            className="ml-6 cursor-pointer flex items-center"
            onClick={() => {
              handleModalClick('profile');
            }}
          >
            <img
              src={userData?.avatar ? userData?.avatar : avatar}
              alt="user avatar"
              className="object-cover h-[30px] w-[30px] rounded-full mr-2 md:mr-0"
            />
            <h3 className="hidden lg:block lg:ml-3 font-bold text-dark-black-5 dark:text-grey-2">
              {userData.username}
            </h3>
            <span className="hidden lg:inline lg:ml-3  text-xl">
              <img
                src={arrowDown}
                alt="arrow down"
                className="w-5 h-5 object-cover"
              />
            </span>
          </li>
        </ul>
      </section>
      {activeModal === 'messages' && <MessagesModal />}
      {activeModal === 'notifications' && (
        <NotificationsModal
          notifications={notifications}
          setNotifications={setNotifications}
          userData={userData}
        />
      )}
      {activeModal === 'profile' && (
        <ProfileModal
          setUserData={setUserData}
          theme={theme}
          setTheme={setTheme}
          setActiveModal={setActiveModal}
        />
      )}
    </main>
  );
};

export default Navbar;
