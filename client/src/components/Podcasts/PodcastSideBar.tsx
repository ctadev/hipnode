import React from 'react';
import PodcastSideBarCard from './PodcastSideBarCard';
import { arrowdark, arrowlight } from '../../assets';
import { useSelector } from 'react-redux';

const PodcastSideBar = () => {
  const { theme } = useSelector((state) => state.themeState);

  const podcastData = [
    {
      id: 1,
      title: 'Podcast1',
      image_url:
        'https://cohort3-tech-titans-hip-node.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddr5vqfte%2Fimage%2Fupload%2Fv1691864171%2FHipNode%2520Post%2520Cover%2520Image%2Fjk9iaihkmr9wgoqmtr81.jpg&w=640&q=75',
      artist: 'Congie',
    },
    {
      id: 2,
      title: 'Podcast1',
      image_url:
        'https://cohort3-tech-titans-hip-node.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddr5vqfte%2Fimage%2Fupload%2Fv1691864171%2FHipNode%2520Post%2520Cover%2520Image%2Fjk9iaihkmr9wgoqmtr81.jpg&w=640&q=75',
      artist: 'Congie',
    },
    {
      id: 3,
      title: 'Podcast1',
      image_url:
        'https://cohort3-tech-titans-hip-node.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddr5vqfte%2Fimage%2Fupload%2Fv1691864171%2FHipNode%2520Post%2520Cover%2520Image%2Fjk9iaihkmr9wgoqmtr81.jpg&w=640&q=75',
      artist: 'Congie',
    },
  ];

  return (
    <main className="bg-white dark:bg-dark-main-bg p-[20px] rounded-[16px]">
      <section className="flex items-center gap-2">
        <h1 className="font-semibold text-[16px] text-dark-grey-1 dark:text-grey-2">
          Podcasts
        </h1>
        <img src={theme ? arrowdark : arrowlight} alt="" />
      </section>

      <section className="flex flex-col gap-5 mt-4">
        {podcastData?.slice(0, 3).map((podcast) => (
          <PodcastSideBarCard key={podcast.id} podcast={podcast} />
        ))}
      </section>
    </main>
  );
};

export default PodcastSideBar;
