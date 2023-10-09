import React from 'react';
import MeetupSideBarCard from './MeetupSideBarCard';
import { arrowlight, arrowdark } from '../../assets';
import { useSelector } from 'react-redux';

const MeetupSideBar = () => {
  const { theme } = useSelector((state) => state.themeState);
  const meetupData = [
    {
      id: 1,
      name: 'Meetup1',
      tags: ['tag1', 'tags2', 'tags3'],
      content: 'lorem random stuff to put here for now',
      image_url: 'no image yet',
      organizer: 'JSM Mastery',
      location: 'California, USA',
      date: '1970-01-01 00:00:01',
      user_id: 1,
    },
    {
      id: 1,
      name: 'Meetup1',
      tags: ['tag1', 'tags2', 'tags3'],
      content: 'lorem random stuff to put here for now',
      image_url: 'no image yet',
      organizer: 'JSM Mastery',
      location: 'California, USA',
      date: '1970-01-01 00:00:01',
      user_id: 1,
    },
    {
      id: 1,
      name: 'Meetup1',
      tags: ['tag1', 'tags2', 'tags3'],
      content: 'lorem random stuff to put here for now',
      image_url: 'no image yet',
      organizer: 'JSM Mastery',
      location: 'California, USA',
      date: '1970-01-01 00:00:01',
      user_id: 1,
    },
  ];

  return (
    <main className="bg-white dark:bg-dark-main-bg p-[20px] rounded-[16px]">
      <section className='flex items-center gap-2'>
        <h1 className='font-semibold text-[16px] text-dark-grey-1 dark:text-grey-2'>Meetups</h1>
        <img src={theme ? arrowdark : arrowlight} alt="" />
      </section>

      <section className="flex flex-col gap-5 mt-3">
        {meetupData?.slice(0, 3).map((meetup, index) => (
          <MeetupSideBarCard key={index} meetup={meetup} />
        ))}
      </section>
    </main>
  );
};

export default MeetupSideBar;
