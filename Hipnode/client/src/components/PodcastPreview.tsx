import { FC, ReactNode, useState, useEffect } from 'react';
import { UserAvatar2 } from '../assets';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { user1 } from '../assets';

type PodcastPreviewProps = {
  title: string;
  content: string;
  userImg: ReactNode;
  userName: string;
  state: string;
  country: string;
  id: number;
  userId: number;
};

const PodcastPreview: FC<PodcastPreviewProps> = ({
  title,
  content,
  userImg = <img src={UserAvatar2} alt="Avatar" />,
  userName,
  state,
  country,
  id,
  userId,
}) => {
  const [getUser, setGetUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/users/${userId}/profile`,
      );
      setGetUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="px-8 py-8 w-full mb-4 rounded-md dark:bg-dark-black-3 dark:text-white bg-[#ffff] break-inside-avoid drop-shadow-lg">
      <Link to={`/podcasts/${id}`}>
        <div>
          <p className="font-semibold text-xl text-left">{title}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="text-[#97989D] mt-2"
        />
      </Link>
      <Link to={`/profiles/${id}`}>
        <div className="flex gap-4 items-center mt-6">
          <img
            src={getUser?.avatar || user1}
            className="rounded-full min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] object-cover"
          />
          <div>
            <button type="button">
              <p className="font-semibold">{getUser?.username}</p>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PodcastPreview;
