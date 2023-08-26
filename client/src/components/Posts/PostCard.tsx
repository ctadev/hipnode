import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { getUserInfo } from '../../services/apiService/userAPI';

export default function PostCard({ post }) {
  const { id, title, content, image_url, user_id } = post;

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery(['users', user_id], () => getUserInfo(user_id));

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return <Error error={error} />;
  }

  return (
    <article>
      <div>
        <img src={image_url} alt="" height={300} width={300} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        <span>{user_id}</span>
        <div>
          <div>
            <div>
              <img src={user?.avatar} alt="" height={50} width={50} />
            </div>
            <h4>{user?.username}</h4>
          </div>
        </div>
      </div>
    </article>
  );
}