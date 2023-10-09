import React from 'react';
import { IMeetup } from '../../../types/index';

interface MeetupProps {
  meetup: IMeetup;
}

export default function MeetupCard({ meetup }: MeetupProps) {
  const {
    name,
    content,
    image_url,
    location,
    date,
    is_fulltime,
    is_parttime,
    is_internship,
    is_remote,
    is_contract,
    is_free,
  } = meetup;

  const getMonth = () => {
    return new Date(meetup.date).toLocaleString('en-us', {
      month: 'short',
    });
  };

  const getDay = () => {
    return new Date(meetup.date).toLocaleString('en-us', {
      day: 'numeric',
    });
  };

  return (
    <article className="bg-white dark:bg-dark-main-bg rounded-[16px] p-[20px] hover:shadow-lg dark:hover:shadow-[0_10px_15px_-3px_rgba(255,255,255,0.8)]">
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={image_url}
            className="max-h-[72px] max-w-[72px] min-h-[72px] min-w-[72px] rounded-[6px] object-cover"
          />
          <aside>
            <h1 className='text-[18px] font-semibold text-dark-grey-1 dark:text-grey-2'>{name}</h1>
            <p className='text-[14px] text-dark-grey-2'>{location}</p>
          </aside>
        </div>

        <div className="border border-grey-1 dark:border-none py-[5px] px-[16px] rounded-md shadow-meetup flex flex-col items-center w-fit h-fit">
          <h3 className="dark:text-grey-2 text-[14px] font-semibold uppercase">
            {getMonth()}
          </h3>
          <h3 className="text-alt-8 font-bold text-[26px]">{getDay()}</h3>
        </div>
      </section>

      <section className='text-[14px] text-dark-grey-1 mt-4 dark:text-grey-2'>{content}</section>

      <section className='mt-2'>
        <ul className="flex gap-[10px] mt-[10px]">
          {is_fulltime && (
            <li className="bg-main-bg dark:bg-dark-secondary-bg py-[2px] px-[8px] rounded-[20px] text-grey-3 dark:text-dark-grey-4 text-[9px]">
              Full-Time
            </li>
          )}
          {is_parttime && (
            <li className="bg-main-bg dark:bg-dark-secondary-bg py-[2px] px-[8px] rounded-[20px] text-grey-3 dark:text-dark-grey-4 text-[9px]">
              Part-Time
            </li>
          )}
          {is_internship && (
            <li className="bg-main-bg dark:bg-dark-secondary-bg py-[2px] px-[8px] rounded-[20px] text-grey-3 dark:text-dark-grey-4 text-[9px]">
              Internship
            </li>
          )}
          {is_remote && (
            <li className="bg-main-bg dark:bg-dark-secondary-bg py-[2px] px-[8px] rounded-[20px] text-grey-3 dark:text-dark-grey-4 text-[9px]">
              Remote
            </li>
          )}
          {is_contract && (
            <li className="bg-main-bg dark:bg-dark-secondary-bg py-[2px] px-[8px] rounded-[20px] text-grey-3 dark:text-dark-grey-4 text-[9px]">
              Contract
            </li>
          )}
          {is_free && (
            <li className="bg-main-bg dark:bg-dark-secondary-bg py-[2px] px-[8px] rounded-[20px] text-grey-3 dark:text-dark-grey-4 text-[9px]">
              Free
            </li>
          )}
        </ul>
      </section>
    </article>
  );
}
