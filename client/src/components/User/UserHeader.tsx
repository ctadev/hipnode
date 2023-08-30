import React from 'react';
import { getUserInfo } from '../../services/apiService/userAPI';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

interface UserHeaderProps {
  user_id: number;
}

export default function UserHeader({ user_id }: UserHeaderProps) {
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
    <div>
      <div>
        <div>
          <img src={user?.avatar} alt="" height={50} width={50} />
        </div>
        <h4>{user?.username}</h4>
      </div>
    </div>
  );
}
