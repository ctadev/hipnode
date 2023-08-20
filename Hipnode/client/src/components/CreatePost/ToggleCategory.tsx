import React, { Dispatch, SetStateAction } from 'react';

import { arrowdown } from '../../assets/createpost-asset/index';
import { categories } from '../../constants/createpost';

interface Props {
  togglePost: boolean;
  togglePostMenu: () => void;
  category: string;
  setCategory?: Dispatch<SetStateAction<string>>;
}

const ToggleCategory = ({
  togglePost,
  togglePostMenu,
  category,
  setCategory,
}: Props) => {
  return (
    <section className="createpost-tabs relative" onClick={togglePostMenu}>
      <p>{`Create - ${category}`}</p>
      <img
        src={arrowdown as unknown as string}
        alt=""
        className="invert dark:invert-0 mt-1"
      />

      <div
        className={`${
          togglePost ? 'absolute' : 'hidden'
        } w-[213px] bg-grey-2 dark:bg-dark-black-4 rounded-lg left-0 bottom-[-295px] z-30`}
      >
        <ul className="flex flex-col gap-4 px-6 py-4 rounded-lg">
          {categories?.map((item, index) => (
            <li
              key={index}
              className="createpost-menu-tabs"
              onClick={() => setCategory(item.title)}
            >
              <img src={item.img} alt="" className="invert dark:invert-0" />
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
        <div className="w-[30px] h-[30px] rotate-45 absolute -top-1 left-6 -z-10 bg-grey-2 dark:bg-dark-black-4" />
      </div>
    </section>
  );
};

export default ToggleCategory;
