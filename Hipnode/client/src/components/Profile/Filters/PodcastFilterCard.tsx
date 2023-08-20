import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { PostMetrics, TagBubble } from '../../../components';
import { heart, user1, heartLiked } from '../../..//assets';
import { IPodcast } from '../../../../../server/types';
import { User, Post } from '../../../../types';
import { getUser } from '../../../../utils/getUser';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

type Props = {
  podcast: IPodcast;
  user?: User | undefined;
  editType: string;
};

const PodcastFilterCard = ({ podcast, user, editType }: Props) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({ id: '0', token: '' });
  const { profileId } = useParams();
  const { id } = JSON.parse(localStorage.getItem('user'));

  const timeSincePosted = () => {
    const date = new Date(podcast.created_at);
    const now = new Date();
    const difference = now.getTime() - date.getTime();
    const days = Math.floor(difference / (1000 * 3600 * 24));
    const hours = Math.floor(difference / (1000 * 3600));
    const minutes = Math.floor(difference / (1000 * 60));
    const seconds = Math.floor(difference / 1000);

    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    if (seconds > 0) return `${seconds} seconds ago`;
  };

  useEffect(() => {
    setLoggedInUser(getUser());
  }, []);

  const queryClient = useQueryClient();

  const deletePost = async (podcastId) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/podcasts/${podcastId}`,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token ?? ''
          }`,
        },
      },
    );
    return res.data;
  };

  const mutation = useMutation((id) => deletePost(id), {
    onMutate: (id) => {
      const prev = queryClient.getQueryData('podcasts');
      queryClient.setQueryData('podcasts', (prevState: IPodcast[]) =>
        prevState.filter((podcast) => podcast.id !== id),
      );
      return { prev };
    },
    onSuccess: () => queryClient.invalidateQueries('podcasts'),
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
    toast.success('Your post have been deleted!', {
      position: 'bottom-center',
      duration: 3000,
    });
  };

  return (
    // <div className="p-[14px] lg:p-5 bg-white dark:bg-dark-black-3 rounded-[10px] flex items-start">
    //   <Link to={`/podcasts/${podcast.id}`}>
    //     <img
    //       src={podcast?.image_url || user1}
    //       alt="user"
    //       className="h-[56px] w-[56px] object-cover rounded-lg md:h-full md:min-w-[125px] md:max-w-[125px]"
    //     />
    //   </Link>
    //   <div className="flex flex-col ml-[14px] lg:w-full lg:justify-between">
    //     <div className="flex flex-col lg:mb-[30px]">
    //       <div className="flex items-start gap-5 lg:justify-between">
    //         <Link to={`/podcasts/${podcast.id}`}>
    //           <h2 className="dark:text-grey-2 text-xs lg:text-lg font-semibold">
    //             {podcast.title}
    //           </h2>
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="flex justify-between flex-wrap ">
    //       <div className="hidden lg:flex gap-[10px]">
    //         <div className="flex flex-col">
    //           <div className="flex items-center gap-1">
    //             <Link to={`/profiles/${podcast.user_id}`}>
    //               <div
    //                 dangerouslySetInnerHTML={{ __html: podcast?.content }}
    //                 className="text-sm dark:text-white"
    //               />
    //             </Link>
    //           </div>
    //           <div className="flex mt-10 items-start">
    //             <p className="text-[10px] dark:text-white mr-2">
    //               Written by {podcast.artist}
    //             </p>
    //             <p className="text-[10px] text-dark-grey-2">
    //               {timeSincePosted()}
    //             </p>
    //           </div>
    //           {Number(profileId) === id && (
    //             <div className="flex flex-wrap gap-2 mt-6">
    //               <Link to={`/edit/${editType}/${podcast.id}`}>
    //                 <button className="border px-2 py-1 rounded-lg dark:text-white bg-grey-2 dark:bg-dark-black-3 hover:bg-grey-3 dark:hover:bg-grey-3">
    //                   Edit
    //                 </button>
    //               </Link>
    //               <button className="border px-2 py-1 rounded-lg dark:text-white bg-grey-2 dark:bg-dark-black-3 hover:bg-grey-3 dark:hover:bg-grey-3">
    //                 Delete
    //               </button>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <main className="bg-white dark:bg-dark-black-3 dark:text-white p-[14px] rounded-md flex gap-4 flex-col md:flex-row drop-shadow-lg">
      {/* Left Side */}
      <section>
        <Link to={`/podcasts/${podcast?.id}`}>
          <img
            src={podcast?.image_url || user1}
            alt={podcast?.title}
            className="object-cover min-h-[130px] max-h-[100px] md:min-w-[200px] md:min-h-full w-full rounded-md"
          />
        </Link>
      </section>

      {/* Right Side */}
      <section className="item flex flex-col gap-4">
        <Link to={`/podcasts/${podcast?.id}`}>
          <h1 className="dark:text-grey-2 text-xs lg:text-lg font-semibold">
            Title Here
          </h1>
        </Link>

        <div
          dangerouslySetInnerHTML={{ __html: podcast?.content }}
          className="text-sm dark:text-white"
        />

        <div>
          <p className="text-[10px] text-dark-grey-2">
            Written By {podcast?.artist} <span>{timeSincePosted()}</span>
          </p>
        </div>

        {Number(profileId) === id && (
          <div className="flex flex-wrap gap-2 mt-6">
            <Link to={`/edit/${editType}/${podcast.id}`}>
              <button className="border px-2 py-1 rounded-lg dark:text-white bg-grey-2 dark:bg-dark-black-3 hover:bg-grey-3 dark:hover:bg-grey-3">
                Edit
              </button>
            </Link>
            <button
              className="border px-2 py-1 rounded-lg dark:text-white bg-grey-2 dark:bg-dark-black-3 hover:bg-grey-3 dark:hover:bg-grey-3"
              onClick={() => handleDelete(podcast.id)}
            >
              Delete
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default PodcastFilterCard;
