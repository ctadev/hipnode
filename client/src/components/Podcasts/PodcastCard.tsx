import React from 'react';
import UserHeader from '../User/UserHeader';
import { IPodcast } from '../../../types/index';

interface PodcastCardProps {
  podcast: IPodcast;
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
  const { title, content, user_id } = podcast;

  return (
    <article>
      <h3>{title}</h3>
      <p>{content}</p>
      <UserHeader user_id={user_id} />
    </article>
  );
}
