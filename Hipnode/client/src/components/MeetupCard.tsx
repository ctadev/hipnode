import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  meetup: {
    id: number;
    name: string;
    tags: string[];
    content: string;
    image_url: string;
    organizer: string;
    location: string;
    date: string;
    user_id: number;
  };
};

const MeetupCard = ({ meetup }: Props) => {
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
    <>
      <Link to={`/meetups`}>
        <div className="flex gap-[14px] items-start drop-shadow-lg">
          <div className="border border-grey-1 dark:border-dark-black-3 py-1 px-[10px] rounded-md shadow-meetup flex flex-col items-center">
            <h3 className="dark:text-grey-2 text-[14px] font-semibold uppercase">
              {getMonth()}
            </h3>
            <h3 className="text-alt-8 font-bold text-[26px]">{getDay()}</h3>
          </div>
          <div className="flex flex-col">
            <h1 className="dark:text-grey-2 font-semibold text-[14px]">
              {meetup.name}
            </h1>
            <div className="mt-[2px] flex items-center gap-[6px]">
              <img
                src={meetup.image_url}
                alt="meetup"
                className="object-contain h-4 w-4"
              />
              <div className="font-semibold text-[10px] text-dark-grey-2 flex">
                <p>{meetup.location}</p>
              </div>
            </div>
            <div className="flex gap-[10px] mt-[10px]">
              {meetup?.tags?.map((tag, index) => (
                <div
                  className="bg-grey-1 dark:bg-dark-black-4 py-[2px] px-2 rounded-[20px] text-dark-grey-3 text-[9px]"
                  key={index}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MeetupCard;
