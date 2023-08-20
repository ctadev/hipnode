import React, { useEffect, useState } from 'react';
import { comments, heartGroup, shareGroup } from '../assets';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { user1 } from '../assets';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

type Props = {
  group: {
    id?: number;
    name: string;
    about: string | null;
    description: string | null;
    image_url: string | null;
    content: string;
    user_id: number;
    created_at?: Date;
    updated_at?: Date | null;
  };
};

const GroupCard = ({ group }: Props) => {
  const [userInfo, setUserInfo] = useState(null);
  const { profileId, type } = useParams();
  const { id } = JSON.parse(localStorage.getItem('user'));

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/users/${
          group.user_id
        }/profile`,
      );
      setUserInfo(res.data);
    };
    fetchUser();
  }, []);

  const timePosted = () => {
    return new Date(group?.created_at).toLocaleString('en-us', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const deletePost = async (podcastId) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/groups/${podcastId}`,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token ?? ''
          }`,
        },
      },
    );
    return res.data;
  };

  const mutation = useMutation((id) => deletePost(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('groups');
      toast.success('Your post have been deleted!', {
        position: 'bottom-center',
        duration: 3000,
      });
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="bg-white dark:bg-dark-black-3 p-[10px] rounded-2xl flex flex-col min-w-full sm:w-[250px] mb-4 break-inside-avoid drop-shadow-lg">
      <div className="">
        <Link to={`/profiles/${userInfo?.id}`} className="flex gap-[10px]">
          <img
            src={userInfo?.avatar ?? user1}
            alt={userInfo?.avatar}
            className="w-[34px] h-[34px] rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-xs dark:text-white">
              {group?.name}
            </h3>
            <p className="text-[10px] dark:text-white">
              {userInfo?.first_name && userInfo?.last_name
                ? `${userInfo?.first_name} ${userInfo?.last_name}`
                : userInfo?.username}
            </p>
          </div>
        </Link>
      </div>
      <Link to={`/groups/${group?.id}`}>
        <img
          src={group?.image_url}
          alt={group?.name}
          className="rounded-[10px] mt-[10px] w-full max-h-[150px]"
        />
      </Link>
      {Number(profileId) !== id && (
        <div className="flex mt-[10px] gap-5">
          <img
            src={heartGroup}
            alt="heart"
            className="w-5 h-5 cursor-pointer"
          />
          <img
            src={comments}
            alt="comments"
            className="w-5 h-5 cursor-pointer"
          />
          <img
            src={shareGroup}
            alt="share"
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      )}
      <div
        className="mt-[10px] text-xs dark:text-white"
        dangerouslySetInnerHTML={{ __html: group?.description }}
      ></div>
      <p className="mt-[10px] text-xs text-dark-grey-2">{timePosted()}</p>
      {Number(profileId) === id && (
        <div className="flex flex-wrap gap-2 h-full mt-4">
          <Link to={`/edit/groups/${group.id}`}>
            <button className="border px-2 py-1 rounded-lg dark:text-white bg-grey-2 dark:bg-dark-black-3 hover:bg-grey-3 dark:hover:bg-grey-3">
              Edit
            </button>
          </Link>
          <button
            className="border px-2 py-1 rounded-lg dark:text-white bg-grey-2 dark:bg-dark-black-3 hover:bg-grey-3 dark:hover:bg-grey-3"
            onClick={() => handleDelete(group.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupCard;
