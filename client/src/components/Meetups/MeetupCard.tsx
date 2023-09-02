import React from 'react';
import { IMeetup } from '../../../types/index';

interface MeetupProps {
  meetup: IMeetup;
}

export default function MeetupCard({ meetup }: MeetupProps) {
  const { name, content, image_url, location, date } = meetup;
  return (
    <article>
      <div>
        <img src={image_url} alt={name} height={100} width={100} />
        <h3>{name}</h3>
      </div>
      <p>{content}</p>
    </article>
  );
}
