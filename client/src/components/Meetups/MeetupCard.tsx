import React from 'react';
import { IMeetup } from '../../../types/index';

interface MeetupProps {
  meetup: IMeetup;
}

export default function MeetupCard({ meetup }: MeetupProps) {
  return <div>MeetupCard</div>;
}
