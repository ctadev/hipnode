import React, { useState } from 'react';
import MeetupList from '../components/Meetups/MeetupList';
import MeetupFilter from '../components/Filter/MeetupFilter';
import HostMeetup from '../components/Meetups/HostMeetup';
import { PodcastSideBar } from '../components/Podcasts';

export default function MeetupsPage() {
  const [meetupCategoryTypes, setMeetupCategoryTypes] = useState<string[]>([]);

  return (
    <main className="flex flex-col lg:flex-row justify-between mt-6 px-6 gap-6 pb-[120px] md:pb-[50px]">
      {/* LeftSide Filters */}
      <section className="p-[20px] w-full  lg:w-[210px] h-fit bg-white rounded-[16px] dark:bg-dark-main-bg">
        <MeetupFilter
          meetupCategoryTypes={meetupCategoryTypes}
          setMeetupCategoryTypes={setMeetupCategoryTypes}
        />
      </section>

      {/* Middle Section Cards */}
      <section className='flex-1'>
        <MeetupList meetupCategoryTypes={meetupCategoryTypes} />
      </section>

      {/* Right Side SideBar */}
      <section className='w-full lg:w-[325px] flex flex-col gap-6'>
        <HostMeetup />
        <PodcastSideBar />
      </section>
    </main>
  );
}
