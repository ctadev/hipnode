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
    <div className="flex items-center gap-2">
      <div>
        <img
          src={
            user.avatar
              ? user.avatar
              : 'https://cohort3-tech-titans-hip-node.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddr5vqfte%2Fimage%2Fupload%2Fv1692057644%2FHipNode%2520Post%2520Cover%2520Image%2Fett9kryhg80uhssczvi9.png&w=48&q=75'
          }
          alt=""
          className="rounded-full min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px]"
        />
      </div>
      <div>
        <h4 className="font-semibold text-[14px] text-dark-grey-1 dark:text-white">
          {user?.username}
        </h4>
        <p className="text-[10px] text-dark-grey-2 dark:text-dark-grey-4">
          3 days ago
        </p>
      </div>
    </div>
  );
}
