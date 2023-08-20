import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import {
  Navbar,
  ProfileDataComponent,
  ProfilePostsFilter,
  ProfilePerformance,
} from '../components';

const Profiles = () => {
  //compare whos logged in to whos route we are in
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const { profileId } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileQuery = await fetch(
          `${import.meta.env.VITE_DEV_BACKEND_URL}/users/${profileId}/profile`,
        );
        const authUser = await profileQuery.json();
        setUser(authUser);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [profileId]);

  return (
    <div className="relative">
      <div className="max-w-8xl bg-grey-1 dark:bg-[#151A1E] h-full flex flex-col items-center md:flex-row md:items-start lg:gap-[20px] px-6 pb-12 min-h-screen">
        {/* left handside */}
        <section className="lg:mt-5 mt-4 sm:w-[270px] xl:justify-end rounded-lg w-full p-2 sm:p-0 ">
          <ProfileDataComponent user={user} />
        </section>

        {/* posts  */}
        <section className="mt-5 items-center w-full p-2">
          <ProfilePostsFilter />
        </section>

        {/* performance */}
        <section className="sm:mt-5 md:w-[425px] rounded-lg p-2 hidden lg:flex">
          <ProfilePerformance />
        </section>
      </div>
    </div>
  );
};

export default Profiles;
