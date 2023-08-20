import React from 'react';

import { profilebackground } from '../assets';
import { Link } from 'react-router-dom';

const HostMeetup = () => {
  return (
    <div className="relative">
      {/* Image */}
      <img
        src={profilebackground}
        alt="background"
        className="w-full rounded-lg h-[168px]"
      />
      {/* Text */}
      <div className="absolute top-0 left-0 p-4 text-white dark:text-white">
        <h2 className="text-md font-bold -left-10">Host a Meetup</h2>
        <p className="text-xs text-ellipsis">
          Find other Hipnoders in your area so you can learn, share, and work
          together.{' '}
        </p>
        <div className="flex gap-2 justify-between">
          <button
            type="submit"
            className="mt-6 text-[#FFECE6] bg-[#FF8F67] w-[130px] h-[40px] rounded-lg text-sm"
          >
            Code of Conduct
          </button>
          <Link to="/create-post">
            <button
              type="submit"
              className="mt-6 bg-[#FFECE6] text-[#FF8F67] w-[130px] h-[40px] rounded-lg text-sm"
            >
              Host a Meetup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HostMeetup;
