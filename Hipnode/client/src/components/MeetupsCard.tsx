import React, { FC, ReactNode } from 'react';
import { MeetupsDate } from '.';
import { meetupAvatar } from '../assets';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { IMeetup } from '../../types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type MeetupsCardProps = {
  title: string;
  content: string;
  image_url: string;
  location: string;
  date: Date;
  fulltime: boolean;
  parttime: boolean;
  internship: boolean;
  remote: boolean;
  contract: boolean;
  free: boolean;
  editType: string;
  podcastId: number;
  meetupId: number;
};

const deletePost = async (podcastId) => {
  const res = await axios.delete(`${import.meta.env.VITE_DEV_BACKEND_URL}/meetups/${podcastId}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('user')).token ?? ''
      }`,
    },
  });
  return res.data;
};

const MeetupsCard: FC<MeetupsCardProps> = ({
  title,
  content,
  image_url,
  location,
  date,
  fulltime,
  parttime,
  internship,
  remote,
  contract,
  free,
  editType,
  podcastId,
  meetupId
}) => {
  const { profileId } = useParams();
  const { id } = JSON.parse(localStorage.getItem('user'));
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getMonth = () => {
    return new Date(date).toLocaleString('en-us', {
      month: 'short',
    });
  };

  const getDay = () => {
    return new Date(date).toLocaleString('en-us', {
      day: 'numeric',
    });
  };

  const mutation = useMutation((id) => deletePost(id), {
    onMutate: (id) => {
      const prev = queryClient.getQueryData('meetups');
      queryClient.setQueryData('meetups', (prevState: IMeetup[]) =>
        prevState.filter((meetup) => meetup.id !== id),
      );
      return { prev };
    },
    onSuccess: () => queryClient.invalidateQueries('meetups'),
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
    toast.success('Your post have been deleted!', {
      position: 'bottom-center',
      duration: 3000,
    });
  };

  return (
    <div className="rounded-lg p-4 h-full shadow-lg bg-white dark:bg-dark-black-3">
      <ul className="flex justify-between">
        <li className="flex gap-2">
          <img
            src={image_url}
            alt=""
            className="max-h-[56px] max-w-[56px] min-h-[56px] min-w-[56px] object-cover rounded-lg"
          />
          <div>
            <h1 className="font-semibold dark:text-white">{title}</h1>
            <p className="text-dark-grey-2 text-sm">{location}</p>
          </div>
        </li>
        <li>
          <MeetupsDate month={getMonth()} day={getDay()} />
        </li>
      </ul>
      <ul>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="dark:text-white text-sm ml-3 mb-2"
        />
        <li className="flex">
          {fulltime && (
            <div className="bg-main-bg dark:bg-dark-black-4 p-2 rounded-md m-2 w-fit py-1 text-grey-3">
              Full-Time
            </div>
          )}
          {parttime && (
            <div className="bg-main-bg dark:bg-dark-black-4 p-2 rounded-md m-2 w-fit py-1 text-grey-3">
              Part-Time
            </div>
          )}
          {internship && (
            <div className="bg-main-bg dark:bg-dark-black-4 p-2 rounded-md m-2 w-fit py-1 text-grey-3">
              Internship
            </div>
          )}
          {remote && (
            <div className="bg-main-bg dark:bg-dark-black-4 p-2 rounded-md m-2 w-fit py-1 text-grey-3">
              Remote
            </div>
          )}
          {contract && (
            <div className="bg-main-bg dark:bg-dark-black-4 p-2 rounded-md m-2 w-fit py-1 text-grey-3">
              Contract
            </div>
          )}
          {free && (
            <div className="bg-main-bg dark:bg-dark-black-4 p-2 rounded-md m-2 w-fit py-1 text-grey-3">
              Free
            </div>
          )}
        </li>
      </ul>
      {Number(profileId) === id && (
        <div className="flex flex-wrap gap-2 mt-6 pl-4">
          <Link to={`/edit/${editType}/${podcastId}`}>
            <button className="border px-2 py-1 rounded-lg dark:text-white bg-grey-2 dark:bg-dark-black-3 hover:bg-grey-3 dark:hover:bg-grey-3">
              Edit
            </button>
          </Link>
          <button
            className="border px-2 py-1 rounded-lg dark:text-white bg-grey-2 dark:bg-dark-black-3 hover:bg-grey-3 dark:hover:bg-grey-3"
            onClick={() => handleDelete(podcastId)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetupsCard;
