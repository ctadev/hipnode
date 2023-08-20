import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { User, Post, Like } from '../../../../types';
import { useGetPosts } from '../../../../hooks/usePosts';
import { useGetUsers } from '../../../../hooks/useUsers';
import { getUser } from '../../../../utils/getUser';
import { useGetLikes } from '../../../../hooks/useLikes';
import { useGetNotifications } from '../../../../hooks/useNotifications';

import { PostCard } from '../..';
import { IPost, IUser } from '../../../../types/index';

const getPostsByUserId = async (profileId: number) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/users/${profileId}/posts`,
    );

    if (res.status !== 200) {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
};

const PostsFilter = () => {
  const { profileId } = useParams();
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentSortType, setCurrentSortType] = useState('Newest');
  const [selectedTag, setSelectedTag] = useState('');
  const [likes, setLikes] = useState<Like[]>([]);
  const getPosts = useGetPosts();
  const getUsers = useGetUsers();
  const getLikes = useGetLikes();
  const userId = getUser();
  const getNotifications = useGetNotifications();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(['posts', profileId], () =>
    getPostsByUserId(Number(profileId)),
  );

  const sortPosts = () => {
    let sortedPosts = [...posts];
    if (currentSortType === 'Newest') {
      sortedPosts = sortedPosts.sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    }
    if (currentSortType === 'Popular') {
      sortedPosts = sortedPosts.sort(
        (a: any, b: any) => b.like_count - a.like_count,
      );
    }
    if (currentSortType === 'Following') {
      // sortedPosts = sortedPosts.filter((post: any) => users.find((user) => user?.id === post?.user_id)?.following);
    }
    setPosts(sortedPosts);
  };

  useEffect(() => {
    getPosts.mutateAsync().then((result) => {
      setPosts(result);
    });
    getUsers.mutateAsync().then((result) => {
      setUsers(result);
    });
    getLikes.mutateAsync().then((result) => {
      setLikes(result);
    });
  }, []);

  useEffect(() => {
    sortPosts();
  }, [currentSortType]);

  return (
    <div className="flex flex-col gap-5 lg:w-full mt-6">
      <div className="dark:bg-dark-black-1 rounded-lg lg:mt-0">
        <div className="flex flex-col gap-[20px]">
          {data?.map((post, index) => (
            <PostCard
              key={index}
              post={post}
              user={users.find((user) => user?.id === post?.user_id)}
              likes={likes?.filter((like) => like?.post_id === post?.id) || []}
              editType="posts"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsFilter;
