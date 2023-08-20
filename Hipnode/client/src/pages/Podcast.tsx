import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { Navbar } from '../components';
import { User } from '../../types';
import { podcastdisc, podcastimage } from '../assets';
import { useGetUsers } from '../../hooks/useUsers';

const getPodcastById = async (podcastId: any) => {
  const res = await axios.get(`${import.meta.env.VITE_DEV_BACKEND_URL}/podcasts/${podcastId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('user') ?? '').token
      }`,
    },
  });
  return res.data;
};

const Podcast = () => {
  const navigate = useNavigate();
  const { podcastId } = useParams();
  const { data, isLoading, isError } = useQuery('podcast', () =>
    getPodcastById(podcastId),
  );
  const [users, setUsers] = useState<User[]>([]);
  const getUsers = useGetUsers();

  return (
    <>
      <div className="flex flex-col items-center bg-grey-2 dark:bg-dark-black-2 min-h-screen gap-4 mt-12 px-4 md:px-8">
        <section className="lg:w-[785px] lg:h-[190px] items-center justify-center md:gap-[100px] mt-6 rounded-lg p-2 dark:bg-dark-black-4 dark:text-white w-full flex flex-col pb-6 pt-6 md:flex-row gap-4">
          <div className="flex relative">
            <img
              src={podcastdisc}
              className="w-[120px] h-[120px] z-1 absolute mx-[100px] mt-3"
              alt="disc"
            />
            <img
              src={podcastimage}
              className="h-[150px] w-[150px] z-10 relative"
              alt="logo"
            />
          </div>

          <div className="flex justify-center mt-2 ">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[12px] text-[#3F4354] dark:text-white">
                Hipnod • Episode {data?.id}
              </p>
              <h1 className="text-[#3F4354] text-[18px] dark:text-white">
                by {data?.artist}
              </h1>
              <AudioPlayer
                autoPlay
                src={data?.audio_url}
                // other props here
                className='mt-4 rounded-lg'
              />
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-dark-black-4 lg:w-[785px] lg:h-[190px] flex flex-col justify-start rounded-lg p-4 dark:text-white">
          <section className="text-[26px] font-sans">
            #{data?.id} – {data?.title}
          </section>
          <section className="mt-4 text-[#97989D]">
            EPISODE DETAILS
            <p className="mt-8">{data?.content}</p>
          </section>
        </section>
      </div>
    </>
  );
};

export default Podcast;
