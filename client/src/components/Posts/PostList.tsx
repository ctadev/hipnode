import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import PostCard from './PostCard';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

const apiUrl = import.meta.env.VITE_DEV_BACKEND_URL;

const fetchPosts = async () => {
  const res = await axios(`${apiUrl}/posts`);
  return await res.data;
};

export default function PostList() {
  const { data, isLoading, isError, error } = useQuery(['posts'], fetchPosts);

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return <Error error={error} />;
  }

  return (
    <section>
      {data?.posts &&
        data?.posts?.map((post) => <PostCard key={post.id} post={post} />)}
    </section>
  );
}
