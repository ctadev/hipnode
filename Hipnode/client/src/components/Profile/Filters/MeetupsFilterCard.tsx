import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PostMetrics, TagBubble } from '../../../components';
import { heart, user1, heartLiked } from '../../..//assets';
import { IMeetup } from '../../../../../server/types';
import { User, Post } from '../../../../types';
import { getUser } from '../../../../utils/getUser';
import { useParams } from 'react-router-dom';

type Props = {
  meetup: IMeetup;
  user?: User | undefined;
  editType: string;
};

const MeetupsFilterCard = ({ meetup, user, editType }: Props) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({ id: '0', token: '' });
  const { profileId } = useParams();
  const { id } = JSON.parse(localStorage.getItem('user'));

  const timeSincePosted = () => {
    const date = new Date(meetup.created_at);
    const now = new Date();
    const difference = now.getTime() - date.getTime();
    const days = Math.floor(difference / (1000 * 3600 * 24));
    const hours = Math.floor(difference / (1000 * 3600));
    const minutes = Math.floor(difference / (1000 * 60));
    const seconds = Math.floor(difference / 1000);

    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    if (seconds > 0) return `${seconds} seconds ago`;
  };

  useEffect(() => {
    setLoggedInUser(getUser());
  }, []);

  return (
    <div className="p-[14px] lg:p-5 bg-white dark:bg-dark-black-3 rounded-[10px] flex items-start lg:h-[196px]">
      <Link to={`/profiles/${meetup.user_id}`}>
        <img
          src={user?.avatar || user1}
          alt="user"
          className="object-contain shrink-0 flex lg:hiddenw-[56px] h-[56px] lg:w-[156px] lg:h-[156px]"
        />
      </Link>
      <div className="flex flex-col ml-[14px] lg:w-full lg:justify-between">
        <div className="flex flex-col lg:mb-[30px]">
          <div className="flex items-start gap-5 lg:justify-between">
            <Link to={`/meetups/${meetup.id}`}>
              <h2 className="dark:text-grey-2 text-xs lg:text-lg font-semibold">
                {meetup.name}
              </h2>
            </Link>
          </div>
        </div>
        <div className="flex justify-between flex-wrap">
          <div className="hidden lg:flex gap-[10px]">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Link to={`/profiles/${meetup.user_id}`}>
                  <div
                    dangerouslySetInnerHTML={{ __html: meetup?.content }}
                    className="text-sm dark:text-white"
                  />
                </Link>
              </div>
              <div className="flex justify-between mt-10">
                <p className="text-[10px] text-dark-grey-2">
                  {timeSincePosted()}
                </p>
              </div>
              {Number(profileId) === id && (
                <div className='flex flex-wrap gap-2 mt-4'>
                  <Link to={`/edit/${editType}/${meetup.id}`}>
                    <button className='border px-2 py-1 rounded-lg dark:text-white bg-grey-2 dark:bg-dark-black-3 hover:bg-grey-3 dark:hover:bg-grey-3'>Edit</button>
                  </Link>
                  <button className='border px-2 py-1 rounded-lg dark:text-white bg-grey-2 dark:bg-dark-black-3 hover:bg-grey-3 dark:hover:bg-grey-3'>Delete</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetupsFilterCard;
