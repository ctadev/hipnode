import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { IMeetup } from '../../../types/index';
import { getAllMeetups } from '../../services/apiService/meetupApi';
import MeetupCard from './MeetupCard';

export default function MeetupList() {
  const {
    data: meetups,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['meetups'],
    queryFn: getAllMeetups,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error && isError) {
    return <Error error={error} />;
  }

  return (
    <section>
      {meetups.map((meetup: IMeetup) => (
        <MeetupCard meetup={meetup} />
      ))}
    </section>
  );
}
