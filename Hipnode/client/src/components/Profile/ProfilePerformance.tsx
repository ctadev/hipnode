import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

import { profilebackground } from '../../assets';
import { PerformanceCard } from '..';
import { User, Post, Like } from '../../../types';
import { useGetPosts } from '../../../hooks/usePosts';
import { useGetLikes } from '../../../hooks/useLikes';

const ProfilePerformance = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const getPosts = useGetPosts();
  const getLikes = useGetLikes();
  const [likes, setLikes] = useState<Like[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getLikes.mutateAsync().then((result) => {
      setLikes(result);
    });
  }, []);

  useEffect(() => {
    const getPostsByUserId = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/users/${profileId}/posts`,
      );
      if (res.status === 200) {
        const data = await res.json();
        setPosts(data);
      }
    };
    getPostsByUserId();
  }, []);

  return (
    <div className="relative">
      {/* Image */}
      <img
        src={profilebackground}
        alt="background"
        className="w-full rounded-lg h-[168px]"
      />
      {/* Text */}
      <div className="absolute top-0 left-0 p-4 text-white dark:text-white">
        <h2 className="text-md font-bold">Start Your Interview</h2>
        <p className="text-xs text-ellipsis">
          Working on your own internet business? We'd love to interview you!
        </p>
        <div className="flex gap-2 justify-between">
          <button
            type="submit"
            className="mt-6 text-[#FFECE6] bg-[#FF8F67] w-[130px] h-[40px] rounded-lg text-sm"
          >
            Code of Conduct
          </button>
          <button
            type="submit"
            className="mt-6 bg-[#FFECE6] text-[#FF8F67] w-[130px] h-[40px] rounded-lg text-sm"
          >
            Submit a Story
          </button>
        </div>
      </div>
      {/* performance */}
      <section className="mt-4 w-full max-h-[500px] bg-white rounded-lg dark:bg-[#262D34]">
        <div className="p-4">
          <h1 className="text-[16px] font-semibold text-black dark:text-white">
            Performance
          </h1>
          <p className="text-[12px] text-[#97989D]">
            {posts.length === 0
              ? 'Please Create a new posts to see its performance'
              : 'Showing Data from the last 30 days'}
          </p>
        </div>
        <div className="px-4">
          {posts?.slice(0, 8).map((post, index) => (
            <PerformanceCard post={post} key={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePerformance;
