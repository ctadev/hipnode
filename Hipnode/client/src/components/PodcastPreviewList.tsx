import React, { useEffect, useState } from 'react';

import { PodcastPreview } from '.';

const PodcastPreviewList = ({ podcastTypes }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}/podcasts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        setPodcasts(data);
      } catch (error) {
        setErrorMessage(
          'Oops! Something went wrong while fetching data. Please try again later',
        );
      }
    };

    fetchPodcasts();
  }, []);

  const filteredPodcasts = podcasts.filter((podcast) =>
    podcastTypes.some((type) => podcast[type]),
  );

  return (
    <div className="">
      {errorMessage && <div>{errorMessage}</div>}
      <ul className="columns-1 sm:columns-2 2xl:columns-3 gap-4 pt-10 px-6">
        {(podcastTypes.length === 0 ? podcasts : filteredPodcasts).map(
          (data, key) => (
            <PodcastPreview
              key={key}
              id={data.id}
              title={data.title}
              content={data.content}
              userImg={data.userImg}
              userName={data.artist}
              state={data.state}
              country={data.country}
              userId={data.user_id}
            />
          ),
        )}
      </ul>
    </div>
  );
};

export default PodcastPreviewList;
