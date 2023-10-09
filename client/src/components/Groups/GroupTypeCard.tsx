import React, { useState, useEffect } from 'react';
import { grow, minimize } from '../../assets';
import { Link } from 'react-router-dom';

type Props = {
  groupType: {
    type: string;
    bg: string;
    groups: {
      type: string;
      title: string;
      image: string;
    }[];
  };
  index: number;
  categorizedGroup1: any;
  categorizedGroup2: any;
};

const GroupTypeCard = ({
  groupType,
  index,
  categorizedGroup1,
  categorizedGroup2,
}: Props) => {
  const [toggleSeeAllMenu, setToggleSeeAllMenu] = useState(false);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + '...';
    }
  }

  return (
    <main className={`lg:flex lg:flex-col lg:items-start`}>
      <div
        className={`${groupType.bg} flex p-[10px] rounded-[10px] cursor-pointer items-center justify-between lg:flex'
        `}
        onClick={() => setToggleSeeAllMenu(!toggleSeeAllMenu)}
      >
        <div className={`flex flex-col`}>
          <div className="flex gap-[6px] items-center">
            <img src={grow} alt="grow" className="w-5 h-5" />
            <h3 className="font-semibold dark:text-black lg:text-lg">
              {groupType.type}
            </h3>
          </div>
          <p className="text-[10px] lg:text-xs text-dark-grey-2">
            List updated daily at midnight PST.
          </p>
        </div>
        <img src={minimize} alt="minimize" className="flex lg:hidden h-5 w-5" />
      </div>

      {toggleSeeAllMenu ? (
        <div className="mt-[10px] lg:flex lg:flex-col gap-[10px]">
          {categorizedGroup2?.map((group, index) => (
            <Link
              to={`http://localhost:5173/groups/${group.id}`}
              key={group.name + index}
            >
              <div className="flex items-start gap-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-900 p-1 rounded-md">
                <img
                  src={group.logo_url}
                  alt={group.name}
                  className="rounded-full w-[34px] h-[34px] object-cover"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-xs dark:text-white">
                    {group.name}
                  </h3>
                  <p className="text-[10px] text-dark-grey-2">
                    {truncateText(group.about, 30)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-[10px] hidden lg:flex lg:flex-col gap-[10px]">
          {categorizedGroup1?.map((group) => (
            <Link
              to={`http://localhost:5173/groups/${group.id}`}
              key={group.id}
            >
              <div className="flex items-start gap-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-900 p-1 rounded-md">
                <img
                  src={group.logo_url}
                  alt={group.name}
                  className="rounded-full w-[34px] h-[34px] object-cover"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-xs dark:text-white">
                    {group.name}
                  </h3>
                  <p className="text-[10px] text-dark-grey-2">
                    {truncateText(group.about, 30)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <button
        className="hidden lg:flex bg-alt-6 rounded-[10px] px-1 text-alt-7 font-semibold text-[9px] mt-[10px]"
        onClick={() => setToggleSeeAllMenu(!toggleSeeAllMenu)}
      >
        see all
      </button>
    </main>
  );
};

export default GroupTypeCard;
