import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { PostMetrics, TagBubble } from '../components';
import { heart, user1, heartLiked } from '../assets';
import { User, Post, Like } from '../../types';
import { usePostLike, usePostUnlike } from '../../hooks/useLikes';
import { getUser } from '../../utils/getUser';
import { usePostNotification } from '../../hooks/useNotifications';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

type Props = {
  post: Post;
  user: User;
  likes?: Like[];
  editType: string;
};

const PostCard = ({ post, user, likes, editType }: Props) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({ id: null, token: '' });
  const postLike = usePostLike();
  const unlikePost = usePostUnlike();
  const addNotification = usePostNotification();
  const [tags, setTags] = useState([]);
  const { profileId } = useParams();
  const { id } = JSON.parse(localStorage.getItem('user'));
  const [comments, setComments] = useState([]);

  const handleClick = () => {
    setIsFavorited((prev) => !prev);
    if (isFavorited) {
      unlikePost.mutate({
        data: { post_id: post.id, user_id: loggedInUser.id },
        token: loggedInUser.token,
      });
    } else {
      postLike.mutate({
        data: { post_id: post.id, user_id: loggedInUser.id },
        token: loggedInUser.token,
      });
      addNotification.mutate({
        data: {
          type: 'like',
          user_id: post.user_id,
          post_id: post.id,
          from_user_id: loggedInUser.id,
        },
        token: loggedInUser.token,
      });
    }
  };

  const checkIfFavorited = () => {
    const foundLike = likes?.find(
      (like) => like.post_id === post.id && like.user_id === loggedInUser.id,
    );
    if (foundLike) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  };

  const timeSincePosted = () => {
    const date = new Date(post.created_at);
    const now = new Date();
    const difference = now.getTime() - date.getTime();
    const days = Math.floor(difference / (1000 * 3600 * 24));
    const hours = Math.floor(difference / (1000 * 3600));
    const minutes = Math.floor(difference / (1000 * 60));
    const seconds = Math.floor(difference / 1000);

    if (days > 0) return `${days} ${days - 1 ? 'days' : 'day'} ago`;
    if (hours > 0) return `${hours} ${hours - 1 ? 'hours' : 'hour'} ago`;
    if (minutes > 0)
      return `${minutes} ${minutes - 1 ? 'minutes' : 'minute'} ago`;
    if (seconds > 0)
      return `${seconds} ${seconds - 1 ? 'seconds' : 'second'} ago`;
  };

  useEffect(() => {
    const fetchCommentsByPostId = async () => {
      if (!post.id) {
        return; // Exit early if loggedInUser.id is not available
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DEV_BACKEND_URL}/posts/${post.id}/comments`,
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchCommentsByPostId();
  }, []);

  useEffect(() => {
    setLoggedInUser(getUser());
    try {
      const fetchTags = async () => {
        const tagsData = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}/posts/${post.id}/tags`,
        );
        setTags(tagsData.data);
      };
      fetchTags();
    } catch (error) {
      console.log(error);
    }
  }, [post.id]);

  useEffect(() => {
    checkIfFavorited();
  }, [loggedInUser]);

  const queryClient = useQueryClient();
  const deletePost = async (postId: number) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token: string = user?.token ?? '';
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status !== 200) {
        throw new Error('Failed to delete the post');
      }

      return res.data;
    } catch (err) {
      console.error(err.message);
    }
  };

  // const mutation = useMutation((id) => deletePost(id), {
  //   onMutate: (id) => {
  //     const prev = queryClient.getQueryData('posts');
  //     queryClient.setQueryData('posts', (prevState: Post[]) =>
  //       prevState.filter((meetup: Post) => meetup.id !== id),
  //     );
  //     return { prev };
  //   },
  //   onSuccess: () => queryClient.invalidateQueries('posts'),
  // });

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      toast.success('Your post have been deleted!', {
        position: 'bottom-center',
        duration: 3000,
      });
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  return (
    <div className="p-[14px] lg:p-5 bg-white dark:bg-dark-black-3 rounded-[10px] flex items-start drop-shadow-lg">
      <Link to={`/posts/${post.id}`}>
        <img
          src={post.image_url}
          alt="post"
          className="object-cover shrink-0 flex max-w-[56px] max-h-[56px] min-w-[56px] min-h-[56px] lg:max-w-[156px] lg:max-h-[156px] lg:min-w-[156px] lg:min-h-[156px] lg:rounded-[16px] rounded-md"
        />
      </Link>
      <div className="flex flex-col ml-[14px] w-full lg:justify-between">
        <div className="flex flex-col lg:mb-[30px]">
          <div className="flex items-start gap-5 justify-between">
            <Link to={`/posts/${post.id}`}>
              <h2 className="dark:text-grey-2 text-xs lg:text-lg font-semibold">
                {post.title}
              </h2>
            </Link>
            <div
              className={`flex ${
                isFavorited
                  ? 'bg-alt-3 dark:bg-dark-black-4'
                  : 'bg-grey-1 dark:bg-dark-black-4'
              } py-[6px] px-[5px] rounded-full cursor-pointer`}
              onClick={handleClick}
            >
              <img
                src={isFavorited ? heartLiked : heart}
                alt="heart"
                className="object-contain shrink-0 w-5 h-5"
              />
            </div>
          </div>

          <div className="flex gap-[10px] mt-[10px]">
            {tags?.map((tag, index) => (
              <TagBubble key={tag + index} tag={tag} />
            ))}
          </div>
        </div>
        <div className="flex justify-between flex-wrap items-start mt-4 lg:mt-0">
          <div className="flex gap-[10px]">
            <Link to={`/profiles/${post.user_id}`}>
              <img
                src={user?.avatar || user1}
                alt="user"
                className="object-cover shrink-0 min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full"
              />
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Link to={`/profiles/${post.user_id}`}>
                  <p className="font-semibold text-sm dark:text-white">
                    {user?.username}
                  </p>
                </Link>
                <div
                  className={`w-[5px] h-[5px] rounded-full ${
                    loggedInUser?.username === user?.username
                      ? 'bg-alt-9'
                      : 'bg-dark-grey-4'
                  }`}
                />
              </div>
              <p className="text-[10px] text-dark-grey-2">
                {timeSincePosted()}
              </p>
            </div>
            {Number(profileId) === id && (
              <div className="flex flex-wrap gap-2 h-full ml-4">
                <Link to={`/edit/${editType}/${post.id}`}>
                  <button className="border px-2 py-1 rounded-lg dark:text-white bg-grey-2 dark:bg-dark-black-3 hover:bg-grey-3 dark:hover:bg-grey-3">
                    Edit
                  </button>
                </Link>
                <button
                  className="border px-2 py-1 rounded-lg dark:text-white bg-grey-2 dark:bg-dark-black-3 hover:bg-grey-3 dark:hover:bg-grey-3"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <PostMetrics
            viewCount={post.view_count}
            likeCount={post.like_count}
            commentCount={post.comment_count}
            postId={post.id}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
