import React from 'react';
import UserHeader from '../User/UserHeader';
import { IPodcast } from '../../../types/index';

interface PodcastCardProps {
  podcast: IPodcast;
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
  const { title, content, user_id } = podcast;

  return (
    <main className="bg-white dark:bg-dark-main-bg p-[20px] rounded-[16px] mb-4 break-inside-avoid flex flex-col gap-3 hover:shadow-lg dark:hover:shadow-[0_10px_15px_-3px_rgba(255,255,255,0.8)]">
      <h3 className="text-[18px] font-semibold text-dark-grey-1 dark:text-white">
        {title}
      </h3>
      <p className="text-[14px] text-dark-grey-2">{content}</p>
      <UserHeader user_id={user_id} />
    </main>
  );
}
