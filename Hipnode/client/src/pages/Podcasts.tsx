import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import { meetups } from '../constants/general';
import {
  MeetupCard,
  Navbar,
  PodcastFilter,
  Title,
  HostMeetup,
  PodcastPreviewList,
} from '../components';

const Podcasts = () => {
  const [podcastTypes, setPodcastTypes] = useState([]);

  const { data: meetupData } = useQuery('meetups', async () => {
    const res = await axios.get(`${import.meta.env.VITE_DEV_BACKEND_URL}/meetups`);
    return res.data;
  });

  return (
    <main>
      <div className="flex flex-col md:flex-row bg-grey-2 dark:bg-dark-black-2 md:h-auto mb-12 px-4 lg:px-8 min-h-screen">
        <div className="md:w-[90%] pt-5">
          <PodcastFilter setPodcastTypes={setPodcastTypes} />
        </div>
        <div>
          <PodcastPreviewList podcastTypes={podcastTypes} />
        </div>
        <div className="hidden xl:flex flex-col gap-8 pr-9">
          <div className="flex justify-center pt-5">
            <div>
              <HostMeetup />
            </div>
          </div>
          <div className="flex justify-center w-[325px]">
            <div className="bg-white dark:bg-dark-black-3 rounded-[10px] p-5 lg:mt-0">
              <Title title="Meetups" />
              <div className="flex flex-col gap-5 mt-5">
                {meetupData?.slice(0, 3).map((meetup) => (
                  <MeetupCard key={meetup.id} meetup={meetup} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Podcasts;
