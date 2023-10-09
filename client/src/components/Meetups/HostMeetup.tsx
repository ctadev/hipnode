import React from 'react';
import { profilebackground } from '../../assets';
import { Link } from 'react-router-dom';

const HostMeetup = () => {
  return (
    <main className="relative">
      {/* Image */}
      <img
        src={profilebackground}
        alt="background"
        className="w-full rounded-[16px] h-full object-cover"
      />
      {/* Text */}
      <div className="absolute top-0 left-0 py-4 px-6 text-white dark:text-white">
        <h2 className="text-md font-bold -left-10">Host a Meetup</h2>
        <p className="text-xs text-ellipsis mt-2">
          Find other Hipnoders in your area so you can learn, share, and work
          together.
        </p>
        <div className="">
          <Link to="/create-post">
            <button
              type="submit"
              className="mt-6 font-semibold bg-[#FFECE6] text-[#FF8F67] h-[40px] rounded-lg text-sm w-full"
            >
              Create Meetup
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HostMeetup;
