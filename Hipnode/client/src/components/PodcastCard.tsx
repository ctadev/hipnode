import React from 'react';
import { arrow } from '../assets';
import { Link } from 'react-router-dom';

type Props = {
  podcast: {
    id: number;
    title: string;
    image_url: string;
    artist: string;
  };
};

const PodcastCard = ({ podcast }: Props) => {
  return (
    <Link to={`/podcasts/${podcast.id}`}>
      <div className="flex gap-[14px] drop-shadow-lg">
        <img
          src={podcast.image_url}
          alt="podcast"
          className="object-cover min-w-[58px] min-h-[58px] max-w-[58px] max-h-[58px] rounded-sm"
        />
        <div className="flex flex-col gap-[6px] w-full">
          <div className="flex justify-between gap-1 items-end">
            <h3 className="dark:text-grey-2 text-xs font-semibold">
              {podcast.title}
            </h3>
            <img
              src={arrow}
              alt="arrow"
              className="object-contain shrink-0 w-3 h-[10px]"
            />
          </div>
          <p className="text-dark-grey-2 text-[10px]">by {podcast.artist}</p>
        </div>
      </div>
    </Link>
  );
};

export default PodcastCard;
