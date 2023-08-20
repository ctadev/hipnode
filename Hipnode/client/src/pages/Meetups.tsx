import React, { useState } from 'react';
import {
  HostMeetup,
  MeetupList,
  MeetupsFilter,
  Navbar,
  PodcastCard,
  Title,
} from '../components';
import { podcasts } from '../constants/general';
import { useQuery } from 'react-query';
import axios from 'axios';

const Meetups = () => {
  const [meetupTypes, setMeetupTypes] = useState([]);

  const { data: podcastData } = useQuery('podcasts', async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/podcasts`,
    );
    return res.data;
  });

  return (
    <main className="bg-grey-1 dark:bg-dark-black-2 pb-12">
      <div className="flex flex-col justify-center md:flex-row md:justify-between">
        {/* First Column */}
        <div className="p-4 md:w-[22%] min-w-[250px]">
          <MeetupsFilter setMeetupTypes={setMeetupTypes} />
        </div>

        {/* Second Column */}
        <div className="flex-1 px-4">
          <MeetupList meetupTypes={meetupTypes} />
        </div>

        {/* Third Column */}
        <div className="hidden xl:flex flex-col gap-4 md:w-[425px]">
          <div className="flex justify-center pt-5">
            <div>
              <HostMeetup />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white dark:bg-dark-black-3 rounded-[10px] w-[75%] p-5">
              <Title title="Podcasts" />
              <div className="flex flex-col gap-5 mt-5">
                {podcastData?.slice(0, 6).map((podcast, index) => (
                  <PodcastCard key={index} podcast={podcast} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Meetups;
