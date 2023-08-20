import React from 'react';

import { CheckMark } from '.';

const MeetupsFilter = ({ setMeetupTypes }) => {
  const podcastFilters = [
    { text: 'Full Time', name: 'is_fulltime', size: 'md', color: '' },
    { text: 'Part Time', name: 'is_parttime', size: 'md', color: '' },
    {text: 'Internship', name: 'is_internship', size: 'sm', color: 'text-[#97989D]'},
    { text: 'Remote', name: 'is_remote', size: 'md', color: '' },
    {text: 'Contract',name: 'is_contract',size: 'sm',color: 'text-[#97989D]'},
    { text: 'Free', name: 'is_free', size: 'sm', color: 'text-[#97989D]' },
  ];

  return (
    <main className="p-6 mt-5 my-auto rounded-lg bg-white dark:bg-dark-black-3 dark:text-white">
      <ul className="flex flex-col gap-2">
        <li>
          <h1 className="font-semibold text-2xl">Filter By Show</h1>
        </li>
        {podcastFilters.map((item) => (
          <li
            key={`podcast-filter-${item.text}`}
            className="flex justify-between"
          >
            <p className={``}>{item.text}</p>
            <CheckMark name={item.name} handler={setMeetupTypes} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default MeetupsFilter;
