import React from 'react';
import { Link } from 'react-router-dom';
import { arrowdark, arrowlight } from '../../assets';
import { useSelector } from 'react-redux';

type Props = {
  id: number;
  title: string;
  image_url: string;
  artist: string;
};

const PodcastSideBarCard = ({ podcast }: Props) => {
  const { theme } = useSelector((state) => state.themeState);
  return (
    <Link
      to={`/podcasts/${podcast.id}`}
      className="py-2 pr-4 rounded-[8px] hover:bg-main-bg dark:hover:bg-dark-secondary-bg"
    >
      <div className="flex gap-[14px] drop-shadow-lg">
        <img
          src={podcast.image_url}
          alt="podcast"
          className="object-cover min-w-[58px] min-h-[58px] max-w-[58px] max-h-[58px] rounded-md"
        />
        <div className="flex flex-col gap-[6px] w-full">
          <h3 className="dark:text-grey-2 text-xs font-semibold">
            {podcast.title}
          </h3>
          <div className="flex justify-between gap-1 items-end">
            <p className="text-dark-grey-2 text-[10px]">by {podcast.artist}</p>
            <img src={theme ? arrowdark : arrowlight} alt="arrow" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PodcastSideBarCard;
