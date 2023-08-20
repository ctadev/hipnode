import React from 'react';

import { CheckMark } from '.';

const PodcatsFilter = ({ setPodcastTypes }) => {
  const podcastFilters = [
    { text: 'Indie Bites', name: 'is_indie_bites', size: 'md', color: '' },
    {
      text: 'Software Social',
      name: 'is_software_social',
      size: 'md',
      color: '',
    },
    {
      text: 'Hipnode',
      name: 'is_hipnode',
      size: 'sm',
      color: 'text-[#97989D]',
    },
    { text: 'Free', name: 'is_free', size: 'sm', color: 'text-[#97989D]' },
  ];

  return (
    <main className="p-6 mt-5 my-auto rounded-lg bg-[#fff] dark:bg-dark-black-3 dark:text-white min-w-[250px]">
      <ul className="flex flex-col gap-2">
        <li>
          <h1 className="font-semibold text-2xl">Filter By Show</h1>
        </li>
        {podcastFilters.map((item) => (
          <li
            key={`podcast-filter-${item.text}`}
            className="flex justify-between"
          >
            <p className="">{item.text}</p>
            <CheckMark name={item.name} handler={setPodcastTypes} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PodcatsFilter;
