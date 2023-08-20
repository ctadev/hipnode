import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import {
  Sidebar,
  Button,
  Title,
  MeetupCard,
  PodcastCard,
  PostCard,
  HandlePosts,
  Pagination,
} from '.';
import { avatar } from '../assets';
import { meetups, podcasts } from '../constants/general';
import { useGetPosts } from '../../hooks/usePosts';
import { useGetUsers } from '../../hooks/useUsers';
import { getUser } from '../../utils/getUser';
import { useGetLikes } from '../../hooks/useLikes';
import { User, Post, Like } from '../../types';
import { Link } from 'react-router-dom';
import { useGetNotifications } from '../../hooks/useNotifications';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [currentSortType, setCurrentSortType] = useState('Newest');
  const [selectedTag, setSelectedTag] = useState('');
  const [likes, setLikes] = useState<Like[]>([]);
  const getPosts = useGetPosts();
  const getUsers = useGetUsers();
  const getLikes = useGetLikes();
  const userId = getUser();
  const getNotifications = useGetNotifications();
  const [pageNumber, setPageNumber] = useState(0);
  const { id } = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);

  const { postTitleQuery } = useSelector((state) => state.post);

  const { data: meetupData } = useQuery('meetups', async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/meetups`,
    );
    return res.data;
  });

  const { data: podcastData } = useQuery('podcasts', async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/podcasts`,
    );
    return res.data;
  });

  const getFollowedUsers = async () => {
    if (!userData) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/follows/${
          JSON.parse(localStorage.getItem('user')).id
        }/following`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        },
      );

      if (!res.ok) {
        throw new Error('Failed to fetch following users');
      }

      const data = await res.json();

      const followedUserIds = data
        ?.filter((follow: any) => follow.follower_id === userData.id)
        .map((follow: any) => follow.following_id);

      setFollowedUsers(followedUserIds);
    } catch (error) {
      console.error('Error fetching followed users:', error);
    }
  };

  const showProducts = 5;
  const paginateProducts = pageNumber * showProducts;

  const pageCount = Math.ceil(filteredPosts?.length / showProducts);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const sortPosts = () => {
    let sortedPosts = [...posts];
    if (currentSortType === 'Newest') {
      sortedPosts = sortedPosts.sort(
        (a: Post, b: Post) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    }
    if (currentSortType === 'Popular') {
      sortedPosts = sortedPosts.sort(
        (a: Post, b: Post) => b.like_count - a.like_count,
      );
    }
    if (currentSortType === 'Following') {
      sortedPosts = sortedPosts.filter((post) => {
        return followedUsers.includes(post.user_id);
      });
    }
    setFilteredPosts(sortedPosts);
  };

  useEffect(() => {
    const getLoggedInUser = async () => {
      const userId = getUser(); // Assuming you have implemented the getUser() function correctl
      if (userId) {
        try {
          const fetchLoggedInUser = await fetch(
            `${import.meta.env.VITE_DEV_BACKEND_URL}/users/${userId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem('user') ?? '').token
                }`,
              },
            },
          );
          const data = await fetchLoggedInUser.json();
          setUserData(data);
          if (data.id) {
            setIsAuth(true);
          }
        } catch (error) {
          navigate('/signin'); // Replace '/signin' with your actual sign-in page route
          console.error('Error fetching profile:', error);
        }
      }
    };

    getLoggedInUser();
  }, [navigate]);

  useEffect(() => {
    getFollowedUsers();
  }, [userData]);

  //get current post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    getPosts.mutateAsync().then((result) => {
      setPosts(result.posts);
      setFilteredPosts(result.posts);
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

  if (!filteredPosts) return null;

  const searchedPost = filteredPosts.filter((post) => {
    return post.title.toLowerCase().includes(postTitleQuery.toLowerCase());
  });

  return (
    // DESKTOP VIEW
    <main className="max-w-full bg-grey-1 min-h-screen items-center lg:p-0 p-6 xl:px-10 dark:bg-[#151A1E]">
      <section className="max-w-8xl flex flex-col lg:flex-row justify-between h-full lg:gap-[20px]">
        {/* SIDEBAR */}
        <section className="lg:mt-5 lg:w-[270px] x l:justify-end rounded-lg w-full">
          <Sidebar
            currentSortType={currentSortType}
            setCurrentSortType={setCurrentSortType}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
        </section>

        {/* MIDDLE MAIN SECTION */}
        <section className="mt-5 items-center xl:w-full pb-12">
          {/* searchsection */}
          <div className="h-[86px] flex flex-col-3  bg-white rounded-lg p-[10px] dark:bg-[#262D34]">
            <div className="flex xl:mx-1 items-center justify-center w-[80px]">
              <div className="w-12 h-12 bg-primary-orange-2 rounded-full flex items-center justify-center">
                <img
                  src={userData.avatar ? userData.avatar : avatar}
                  alt="user avatar"
                  className="object-cover h-[35px] w-[35px] rounded-full"
                  onClick={() => navigate(`/profiles/${userId.id}`)}
                />
              </div>
            </div>

            <div className="mx-4 flex justify-center items-center w-full">
              <div className="h-[46px] bg-grey-1 w-full rounded-lg dark:bg-dark-black-4 flex items-center justify-start p-2">
                <input
                  className="text-start bg-grey-1 text-dark-grey-2 w-full dark:bg-dark-black-4 px-2 outline-0"
                  placeholder="Let's share whats on your mind..."
                />
              </div>
            </div>
            <div className="p-1 flex justify-start items-center w-[120px] xl:w-[150px] whitespace-nowrap">
              <Button
                text="Create Posts"
                handleClick={() =>
                  navigate(`/create-post`, { state: userData })
                }
              />
            </div>
          </div>

          {/* POSTS */}

          {/* <div>
            <HandlePosts posts={currentPosts} loading={loading} />
            {posts.length >= 4 ? (
              <Pagination
                postPerPage={postPerPage}
                totalPosts={posts.length}
                paginate={setCurrentPage}
                currentPage={currentPage}
              />
            ) : null}
          </div> */}

          <div className="flex flex-col gap-5 lg:w-full mt-6">
            <div className="rounded-lg lg:mt-0">
              <div className="flex flex-col gap-[20px]">
                {(!postTitleQuery ? filteredPosts : searchedPost)
                  ?.slice(paginateProducts, paginateProducts + showProducts)
                  .map((data, index) => (
                    <PostCard
                      key={index}
                      post={data}
                      user={users.find((user) => user?.id === data?.user_id)}
                      likes={
                        likes?.filter((like) => like?.post_id === data?.id) ||
                        []
                      }
                    />
                  ))}
              </div>
            </div>
            {filteredPosts?.length > 4 && (
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                className="flex items-center justify-center gap-4 mt-8 dark:text-white"
                containerClassName={`s.paginationBtns`}
                previousClassName={`border py-2 px-4 rounded-md dark:border-white border-black`}
                nextLinkClassName={`border py-2 px-4 rounded-md dark:border-white border-black`}
                disabledClassName={`hidden`}
                activeClassName={`border px-2 rounded-md border-pink-500`}
              />
            )}
          </div>
        </section>

        {/* MEETUP/PODCASTS */}
        <section className="sm:mt-5 lg:w-[400px] rounded-lg">
          <div className="flex flex-col gap-5 lg:max-w-[325px]">
            <div className="bg-white dark:bg-dark-black-3 rounded-[10px] p-5 lg:mt-0">
              <Title title="Meetups" />
              <div className="flex flex-col gap-5 mt-5">
                {meetupData?.slice(0, 3).map((meetup, index) => (
                  <MeetupCard key={index} meetup={meetup} />
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-dark-black-3 rounded-[10px] p-5 mb-24">
              <Title title="Podcasts" />
              <div className="flex flex-col gap-5 mt-5">
                {podcastData?.slice(0, 6).map((podcast, index) => (
                  <PodcastCard key={index} podcast={podcast} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Home;
