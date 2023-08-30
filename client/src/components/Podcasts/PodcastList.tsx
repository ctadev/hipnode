import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import PodcastCard from './PodcastCard';
import { getAllPodcasts } from '../../services/apiService/podcastApi';
import { IPodcast } from '../../../types/index';

export default function PodcastList() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['podcasts'],
    queryFn: getAllPodcasts,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error && isError) {
    return <Error error={error} />;
  }
  return (
    <section>
      {data.length > 0 &&
        data.map((podcast: IPodcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
    </section>
  );
}
