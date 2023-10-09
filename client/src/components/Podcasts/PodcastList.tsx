import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import PodcastCard from './PodcastCard';
import { getAllPodcasts } from '../../services/apiService/podcastApi';
import { IPodcast } from '../../../types/index';

type PodcastListProps = {
  selectedPodcastTypes: string[];
};

export default function PodcastList({
  selectedPodcastTypes,
}: PodcastListProps) {
  const {
    data: podcasts,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['podcasts'],
    queryFn: getAllPodcasts,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error && isError) {
    return <Error error={error} />;
  }

  const filteredPodcasts: IPodcast[] = !selectedPodcastTypes
    ? podcasts
    : podcasts?.filter((podcast) =>
        selectedPodcastTypes?.every(
          (selectedPodcastType) => podcast[selectedPodcastType],
        ),
      );

  return (
    <section className='columns-1 sm:columns-2 2xl:columns-3'>
      {filteredPodcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </section>
  );
}
