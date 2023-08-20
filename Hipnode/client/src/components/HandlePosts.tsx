import React, { useState } from 'react';
import { User, Like } from '../../types';
import { PostCard } from '.';

const HandlePosts = ({ posts, loading }) => {
  const [users] = useState<User[]>([]);
  const [likes] = useState<Like[]>([]);

  if (loading) {
    <h2>loading...</h2>;
  }

  return (
    <div className="flex flex-col gap-5 lg:w-full mt-6">
      <div className="dark:bg-dark-black-2 rounded-lg lg:mt-0">
        <div className="flex flex-col gap-[20px]">
          {posts?.map((data, index) => (
            <PostCard
              key={index}
              post={data}
              user={users.find((user) => user?.id === data?.user_id)}
              likes={likes?.filter((like) => like?.post_id === data?.id) || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HandlePosts;
