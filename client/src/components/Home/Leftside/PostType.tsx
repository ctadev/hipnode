import React, { useState } from 'react';
import { postType } from '../../../constants/postTypes';
import { SideBarIcon } from '../../../components/Icons';

const PostType = () => {
  const [postFilter, setPostFilter] = useState('Popular');

  return (
    <ul className="rounded-[16px] bg-white dark:bg-dark-main-bg p-4 flex lg:flex-col gap-2">
      {postType.map((item) => (
        <li
          key={item.title}
          className={`flex w-full items-center gap-2 hover:bg-main-bg dark:hover:bg-dark-secondary-bg cursor-pointer rounded-lg p-2 ${
            postFilter === item.title && 'bg-main-bg dark:bg-dark-secondary-bg'
          }`}
          onClick={() => setPostFilter(item.title)}
        >
          <div className="bg-main-bg dark:bg-dark-secondary-bg p-1 rounded-md">
            <SideBarIcon
              iconName={item.img}
              height={item.height}
              width={item.width}
            />
          </div>

          <div>
            <h3 className="font-semibold text-sm dark:text-white">
              {item.title}
            </h3>
            <p className="text-dark-grey-2 text-[9px] hidden sm:block">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostType;
