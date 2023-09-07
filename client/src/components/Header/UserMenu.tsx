import React, { useState, useEffect } from 'react';
import HeaderIcon from '../Icons/HeaderIcon';
import { Messages, Notifications, ProfileMenu } from '.';

const UserMenu = () => {
  const [messageModal, setMessageModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth);
  const [hideUserMenu, setHideUserMenu] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsWideScreen(window.innerWidth);
      if (isWideScreen > 1023) {
        setToggleSearchBar(true);
        setHideUserMenu(false);
        setSearchInput('');
      } else {
        setToggleSearchBar(false);
        setHideUserMenu(false);
        setSearchInput('');
      }
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [isWideScreen]);

  const toggleMessageModal = () => {
    setMessageModal(!messageModal);
    setNotificationModal(false);
    setProfileModal(false);
  };

  const toggleNotificationModal = () => {
    setNotificationModal(!notificationModal);
    setMessageModal(false);
    setProfileModal(false);
  };

  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
    setMessageModal(false);
    setNotificationModal(false);
  };

  return (
    <main className="flex items-center flex-1 w-full">
      {/* Search Bar */}
      <section className="relative flex-1 mx-4 md:mx-6">
        <input
          type="text"
          className={`outline-none h-[40px] rounded-lg bg-main-bg dark:bg-dark-secondary-bg transition-all ${
            toggleSearchBar ? 'w-full px-4' : 'w-0 px-0'
          }`}
          placeholder="Type here to search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer z-20 lg:hidden"
          onClick={() => {
            setToggleSearchBar(!toggleSearchBar);
            setHideUserMenu(!hideUserMenu);
          }}
        >
          <HeaderIcon
            iconName="search"
            color="#C5D0E6"
            className="search_icon"
          />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer z-20 hidden lg:block">
          <HeaderIcon
            iconName="search"
            color="#C5D0E6"
            className="search_icon"
          />
        </div>

        {/* Search Modal Results */}
        {searchInput && (
          <aside className="absolute w-full h-[300px] bg-white dark:bg-dark-main-bg dark:text-white left-0 rounded-lg top-[50px]">
            Searching....
          </aside>
        )}
      </section>

      {/* User Menu */}
      <section className={`relative ${hideUserMenu ? 'hidden' : 'block'}`}>
        <ul className="flex items-center gap-2 md:gap-6">
          <li
            className="cursor-pointer bg-main-bg dark:bg-dark-secondary-bg p-2 rounded-lg dark:hover:bg-primary-orange hover:bg-primary-orange header_li"
            onClick={toggleMessageModal}
          >
            <HeaderIcon
              iconName="message"
              color="#C5D0E6"
              className="header_icon"
            />
          </li>
          <li
            className="cursor-pointer bg-main-bg dark:bg-dark-secondary-bg p-2 rounded-lg dark:hover:bg-primary-orange hover:bg-primary-orange header_li"
            onClick={toggleNotificationModal}
          >
            <HeaderIcon
              iconName="notification"
              color="#C5D0E6"
              className="header_icon"
            />
          </li>
          <li
            className="flex items-center gap-3 cursor-pointer hover:bg-red-500 p-2 rounded-lg"
            onClick={toggleProfileModal}
          >
            <img
              src="https://cohort3-tech-titans-hip-node.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddr5vqfte%2Fimage%2Fupload%2Fv1692057644%2FHipNode%2520Post%2520Cover%2520Image%2Fett9kryhg80uhssczvi9.png&w=48&q=75"
              alt=""
              className="rounded-lg h-[40px] w-[40px] object-cover"
            />
            <HeaderIcon
              iconName="arrowdown"
              color="#C5D0E6"
              className="h-[15px] w-[15px]"
            />
          </li>
        </ul>

        {/* Users Interaction Modal */}
        {messageModal && <Messages />}
        {notificationModal && <Notifications />}
        {profileModal && <ProfileMenu />}
      </section>
    </main>
  );
};

export default UserMenu;
