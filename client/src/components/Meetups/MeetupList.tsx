import { useQuery } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { IMeetup } from '../../../types/index';
import { getAllMeetups } from '../../services/apiService/meetupApi';
import MeetupCard from './MeetupCard';

type MeetupListProps = {
  meetupCategoryTypes: string[];
};

export default function MeetupList({ meetupCategoryTypes }: MeetupListProps) {
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

  if (isError) {
    return <Error error={error} />;
  }

  const filteredMeetups: IMeetup[] = !meetupCategoryTypes
    ? meetups
    : meetups?.filter((meetup) =>
        meetupCategoryTypes.every(
          (meetupCategoryType) => meetup[meetupCategoryType],
        ),
      );

  return (
    <section>
      {filteredMeetups?.map((meetup: IMeetup) => (
        <MeetupCard key={meetup.id} meetup={meetup} />
      ))}
    </section>
  );
}
