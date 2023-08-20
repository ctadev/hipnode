import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { Navbar, PostCommentCard, HashTags } from '../components';
import { messageDark, postHeader, smiley, user1 } from '../assets';

import {
  additionalPosts,
  postContent,
  postDetails,
  postTags,
  reportOptions,
} from '../constants/post';
import {
  useCreateComment,
  useGetComments,
  useGetPost,
  useReportPost,
} from '../../hooks/usePosts';
import { Post, User } from '../../types';
import { useGetUsers } from '../../hooks/useUsers';
import { useGetLikes, usePostLike, usePostUnlike } from '../../hooks/useLikes';
import { heartLiked } from '../assets';
import { getUser } from '../../utils/getUser';
import { IComment } from '../../types';
import { usePostNotification } from '../../hooks/useNotifications';

const Posts = () => {
  const { id } = JSON.parse(localStorage.getItem('user'));
  const [loggedInUser, setLoggedInUser] = useState({
    id: id,
    token: '',
    username: '',
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [reportModalShowing, setReportModalShowing] = useState(false);
  const [post, setPost] = useState<Post>({});
  const navigate = useNavigate();
  const [creator, setCreator] = useState<User>();
  const [reportInfo, setReportInfo] = useState({
    reason: '',
    username: loggedInUser.username,
  });
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState<IComment[]>([]);
  const [likes, setLikes] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const getPostMutation = useGetPost();
  const getUserMutation = useGetUsers();
  const getLikes = useGetLikes();
  const reportPostMutation = useReportPost();
  const getCommentsMutation = useGetComments();
  const { postId } = useParams<{ postId: string }>();
  const postLike = usePostLike();
  const unlikePost = usePostUnlike();
  const createComment = useCreateComment();
  const addNotification = usePostNotification();
  const [tags, setTags] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);
  const [comments, setComments] = useState([]);

  const handleReportToggle = () => {
    setReportModalShowing((prev) => !prev);
  };

  const getTimeSinceJoined = () => {
    const joinedDate = new Date(creator?.joined_date as string);
    const currentDate = new Date();
    const difference = currentDate.getTime() - joinedDate.getTime();
    const days = Math.floor(difference / (1000 * 3600 * 24));
    const hours = Math.floor(difference / (1000 * 3600));
    const minutes = Math.floor(difference / (1000 * 60));
    const seconds = Math.floor(difference / 1000);
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    if (seconds > 0) return `${seconds} seconds ago`;
  };

  const handleReportSubmit = () => {
    reportPostMutation.mutateAsync(reportInfo);
    setReportModalShowing(false);
    setReportInfo({
      reason: '',
      username: loggedInUser.username,
    });
  };

  const fetchPostComments = async () => {
    if (!post || !postId) return;
    try {
      const result = await getCommentsMutation.mutateAsync(postId);
      setPostComments(result);
    } catch (error) {
      console.error('Error fetching post comments:', error);
    }
  };

  const handleSubmitComment = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    if (!post || !postId) return;
    if (e.key === 'Enter') {
      const comment = await createComment.mutateAsync({
        data: {
          post_id: post.id,
          user_id: loggedInUser.id,
          content: newComment,
        },
        token: loggedInUser.token,
      });
      addNotification.mutate({
        data: {
          type: 'comment',
          user_id: loggedInUser.id,
          post_id: post.id,
          comment_id: comment.id,
        },
        token: loggedInUser.token,
      });
      setNewComment('');
      await fetchPostComments();
    }
  };

  const checkIfFavorited = () => {
    if (!loggedInUser || !post) return;
    const foundLike = likes.find(
      (like) =>
        like.post_id === post.id &&
        like.user_id === loggedInUser.id &&
        like.comment_id == null,
    );
    if (foundLike) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  };

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
    }
  };

  useEffect(() => {
    if (postId) {
      getPostMutation.mutateAsync(postId).then((result) => {
        setPost(result);
      });
      getLikes.mutateAsync().then((result) => {
        setLikes(result);
      });
      try {
        const fetchTags = async () => {
          const tagsData = await axios.get(
            `${import.meta.env.VITE_DEV_BACKEND_URL}/posts/${postId}/tags`,
          );
          setTags(tagsData.data);
        };
        fetchTags();
      } catch (error) {
        console.log(error);
      }
    }
    setLoggedInUser(getUser());
  }, []);

  useEffect(() => {
    fetchPostComments();
  }, [post, postId]);

  useEffect(() => {
    checkIfFavorited();
  }, [loggedInUser]);

  useEffect(() => {
    if (post?.user_id)
      getUserMutation.mutateAsync().then((result) => {
        setCreator(result.find((user: User) => user.id === post?.user_id));
      });
  }, [post]);

  useEffect(() => {
    const getIsFollowingUsers = async () => {
      if (!loggedInUser.id) {
        return; // Exit early if loggedInUser.id is not available
      }
      try {
        const fetchFollowings = await fetch(
          `${import.meta.env.VITE_DEV_BACKEND_URL}/follows/${
            loggedInUser.id
          }/following`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user') || '').token
              }`,
            },
          },
        );
        if (fetchFollowings.ok) {
          const data = await fetchFollowings.json();

          const followingsAsIntegers = data.map((obj) =>
            parseInt(obj.following_id, 10),
          );
          setFollowings(followingsAsIntegers);
          const profileIdAsInt = parseInt(creator?.id, 10);
          const isFollowing = data.some(
            (obj) => obj.following_id === profileIdAsInt,
          );
          setIsFollowingProfile(isFollowing);
          if (creator?.id === loggedInUser.id) {
            setIsMyPost(true);
          }
        }
      } catch (error) {
        console.error('Error fetching followings:', error);
      }
    };
    getIsFollowingUsers();
  }, [loggedInUser.id, creator?.id]);

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
  }, [post?.id]);

  const handleFollow = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/follows/${parseInt(
        creator.id,
        10,
      )}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user') || '').token
          }`,
        },
      },
    );
    setIsFollowingProfile(true);
    navigate(`/posts/${post.id}`);
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    const res = await axios.delete(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/follows/${parseInt(
        creator.id,
        10,
      )}/unfollow`,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user') ?? '').token
          }`,
        },
      },
    );
    setIsFollowingProfile(false);
    navigate(`/posts/${post.id}`);
  };

  const navigateToProfile = () => {
    navigate(`/profiles/${loggedInUser.id}`);
  };

  // useEffect(() => {
  //   checkIfFavorited();
  // }, [likes, loggedInUser, post]);

  if (!post || !creator) return null;

  return (
    <div className="relative">
      <div
        className={`p-5 lg:px-10 bg-grey-2 dark:bg-dark-black-2 min-h-screen flex flex-col lg:flex-row justify-between gap-5 ${
          reportModalShowing && 'blur-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:justify-center gap-5 lg:w-full">
          <div className="flex flex-col gap-5 lg:flex-row-reverse lg:items-start">
            <div className="">
              <img
                src={post?.image_url}
                alt="post"
                className="object-cover w-full min-w-[335px] min-h-[117px] max-h-[180px] lg:min-w-[785px] lg:max-h-[275px] rounded-t-[10px]"
              />
              <div className="flex flex-col bg-white dark:bg-dark-black-3 p-5 lg:p-[30px] pl-[61px] lg:pl-[77px] gap-[14px] rounded-b-2xl">
                <h2 className="dark:text-grey-2 font-semibold lg:text-[26px]">
                  {post?.title}
                </h2>
                <div className="flex gap-6">
                  {tags?.map((tag, index) => (
                    <HashTags
                      tag={tag}
                      key={index}
                      style="text-alt-4 text-xs lg:text-base"
                    />
                  ))}
                </div>

                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="dark:text-white"
                />

                <div className="mt-[16px] flex gap-4">
                  <img
                    src={user1}
                    alt="user"
                    className="object-contain flex lg:hidden w-10 h-10"
                  />
                  <button type="button">
                    <img
                      src={user1}
                      alt="user"
                      className="object-contain hidden lg:flex w-11 h-11"
                    />
                  </button>
                  <div className="flex border px-4 py-2 rounded-full flex-1 justify-between">
                    <input
                      onKeyDown={(e) =>
                        e.key === 'Enter' ? handleSubmitComment(e) : null
                      }
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      type="text"
                      placeholder="Say something..."
                      className="placeholder:text-dark-black-4 placeholder:dark:text-dark-grey-4 bg-transparent flex lg:hidden w-full outline-none dark:text-white"
                    />
                    <input
                      onKeyDown={(e) =>
                        e.key === 'Enter' ? handleSubmitComment(e) : null
                      }
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      type="text"
                      placeholder={`Say something nice to ${creator?.username}...`}
                      className="placeholder:text-dark-black-4 placeholder:dark:text-dark-grey-4 bg-transparent hidden lg:flex w-full outline-none dark:text-white"
                    />
                    <button type="submit">
                      <img
                        src={smiley}
                        alt="smiley"
                        className="object-contain w-6 h-6"
                      />
                    </button>
                  </div>
                </div>
                <div className="hidden flex-col gap-5 lg:gap-[30px] lg:flex lg:mt-[30px]">
                  {postComments?.map((comment, index) => (
                    <div key={index} className="flex flex-col gap-5">
                      <PostCommentCard
                        comment={comment}
                        loggedInUser={loggedInUser}
                        postComments={postComments}
                      />
                      {/* <div className='pl-16'>
                                                <PostCommentCard comment={comment} />
                                            </div> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-white dark:bg-dark-black-3 p-5 rounded-2xl gap-5 shrink-0 lg:min-w-[210px]">
              {postDetails?.map((detail, index) => (
                <div
                  key={detail.type + index}
                  className="flex gap-[14px] items-center cursor-pointer"
                  onClick={() => {
                    detail.type.toLowerCase() === 'report'
                      ? handleReportToggle()
                      : detail.type.toLowerCase() === 'likes' && handleClick();
                  }}
                >
                  <div
                    className={`py-[5px] px-1 rounded-md ${
                      isFavorited && detail.type.toLowerCase() === 'likes'
                        ? 'bg-alt-3 dark:bg-dark-black-4'
                        : 'bg-grey-1 dark:bg-dark-black-4'
                    }`}
                  >
                    <img
                      src={
                        detail.type.toLocaleLowerCase() === 'likes' &&
                        isFavorited
                          ? heartLiked
                          : detail.icon
                      }
                      alt={detail.type}
                      className="object-contain w-5 h-5"
                    />
                  </div>
                  <p className="text-dark-grey-2 lg:font-semibold">
                    {/* {post?.like_count && detail.type.toLowerCase() === 'likes'
                      ? post?.like_count
                      : null} */}
                    {detail.type.toLowerCase() === 'likes'
                      ? post?.like_count
                      : null}
                    {detail.type.toLowerCase() === 'comments'
                      ? Array.isArray(comments)
                        ? comments.length
                        : 0
                      : null}
                    {detail.type.toLocaleLowerCase() === 'shares' ? 0 : null}
                    {detail.type.toLowerCase() === 'report' ? '' : null}
                    {' ' + detail?.type}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-5 lg:hidden">
              {postComments
                ?.sort(
                  (a: any, b: any) =>
                    new Date(b.created_at) - new Date(a.created_at),
                )
                .map((comment, index) => (
                  <div key={index} className="flex flex-col gap-5">
                    <PostCommentCard
                      comment={comment}
                      loggedInUser={loggedInUser}
                      postComments={postComments}
                    />
                    <PostCommentCard
                      comment={comment}
                      loggedInUser={loggedInUser}
                      postComments={postComments}
                    />
                    {/* <div className='pl-16'>
                                        <PostCommentCard comment={comment} />
                                    </div> */}
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col bg-white dark:bg-dark-black-3 py-[30px] px-[25px] items-center rounded-2xl">
              <button type="button">
                <img
                  src={creator?.avatar || user1}
                  alt="user"
                  className="object-cover w-[100px] h-[100px] rounded-full"
                />
              </button>
              <h2 className="font-semibold text-[26px] mt-5 dark:text-grey-2">
                {creator?.username}
              </h2>
              <p className="mt-[2px] text-dark-grey-2 font-semibold">
                Web Developer
              </p>
              <button
                type="button"
                className={`p-[10px] border mt-2 dark:text-white rounded-md ${
                  isFollowingProfile && 'bg-orange-400'
                }`}
                onClick={
                  isMyPost
                    ? navigateToProfile
                    : isFollowingProfile
                    ? handleUnfollow
                    : handleFollow
                }
              >
                {isMyPost
                  ? 'Visit Profile'
                  : isFollowingProfile
                  ? 'Unfollow'
                  : 'Follow'}
              </button>
              <p className="mt-5 text-dark-grey-2">
                Joined {getTimeSinceJoined()}
              </p>
            </div>
            <div className="flex flex-col bg-white dark:bg-dark-black-3 p-5 rounded-2xl mb-10 gap-[15px]">
              <h3 className="dark:text-grey-2 font-semibold text-lg">
                More from {creator?.username}
              </h3>
              <div className="border border-grey-1 dark:border-dark-grey-1" />
              {additionalPosts.map((post, index) => (
                <div
                  key={post.title + index}
                  className="flex flex-col font-semibold text-xs dark:text-grey-2"
                >
                  <p className="dark:text-grey-2">{post.title}</p>
                  <div className="flex mb-[15px]">
                    {tags?.map((tag, index) => (
                      <HashTags tag={tag} key={index} />
                    ))}
                  </div>
                  <div className="border border-grey-1 dark:border-dark-grey-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {reportModalShowing && (
        <div className="w-full max-w-[335px] lg:max-w-[477px] bg-white dark:bg-dark-black-4 rounded-2xl absolute z-40 left-1/2 -translate-x-1/2 top-24 lg:top-32 p-5">
          <h3 className="font-semibold text-lg dark:text-white">
            Why are you reporting this post by @{creator?.username}?
          </h3>
          <div className="mt-[30px] flex flex-wrap gap-5">
            {reportOptions.map((option, index) => (
              <div
                key={option + index}
                className={`py-[10px] px-5 rounded-[20px] border border-dark-grey-4 dark:border-black text-xs dark:text-white ${
                  reportInfo.reason === option
                    ? 'bg-dark-grey-4 dark:bg-black'
                    : 'bg-grey-1 dark:bg-dark-black-3'
                }`}
                onClick={() => setReportInfo({ ...reportInfo, reason: option })}
              >
                {option}
              </div>
            ))}
          </div>
          <div className="mt-[30px] flex gap-5">
            <button
              type="submit"
              className="bg-primary-blue-1 py-[10px] w-[160px] text-white rounded-md font-semibold text-lg"
              onClick={handleReportSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="text-dark-grey-2 text-lg"
              onClick={handleReportToggle}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
