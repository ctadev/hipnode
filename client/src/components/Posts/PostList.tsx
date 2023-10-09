import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PostCard from './PostCard';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { fetchPosts } from '../../services/apiService/postAPI';

export default function PostList() {
  const { data, isLoading, isError, error } = useQuery(['posts'], fetchPosts);

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return <Error error={error} />;
  }

  return (
    <section className='flex flex-col gap-6 mt-6'>
      {data?.posts &&
        data?.posts?.map((post) => <PostCard key={post.id} post={post} />)}
    </section>
  );
}
