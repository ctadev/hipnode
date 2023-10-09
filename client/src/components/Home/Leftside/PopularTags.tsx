import React, { useState } from 'react';
import { postTag } from '../../../constants/postTypes';

const PopularTags = () => {
  const [postTags, setPostTags] = useState('');

  return (
    <main className="rounded-[16px] bg-white dark:bg-dark-main-bg p-4 mt-6 hidden lg:block">
      <h1 className="mb-4 dark:text-white font-semibold">Popular Tags</h1>
      <ul className="flex flex-col gap-2">
        {postTag.map((item) => (
          <li
            key={item.title}
            className={`flex items-center gap-2 hover:bg-main-bg dark:hover:bg-dark-secondary-bg cursor-pointer rounded-lg p-2 ${
              postTags === item.title && 'bg-main-bg dark:bg-dark-secondary-bg'
            }`}
            onClick={() => setPostTags(item.title)}
          >
            <div className="">
              <img src={item.img} alt="Popular Tags" />
            </div>

            <div>
              <h3 className="font-semibold text-sm dark:text-white">
                {item.title}
              </h3>
              <p className="text-dark-grey-2 text-xs">
                {item.count} Posted by this tag
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PopularTags;
