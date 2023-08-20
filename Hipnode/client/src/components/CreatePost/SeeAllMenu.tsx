import {
  growing,
  category1,
  backarrow,
} from '../../assets/createpost-asset/index';
import { groupData } from '../../constants/createpost';

import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  setGroupType: Dispatch<SetStateAction<string>>;
  data: any;
  group: string;
  groupId: number;
  setGroup?: Dispatch<SetStateAction<string>>;
  setGroupId?: Dispatch<SetStateAction<number>>;
  categorizedGroup1: any;
  categorizedGroup2: any;
  categorizedGroup3: any;
  setToggleGroup: Dispatch<SetStateAction<boolean>>;
}

const SeeAllMenu = ({
  setGroupType,
  data,
  setGroup,
  groupId,
  setGroupId,
  categorizedGroup1,
  categorizedGroup2,
  categorizedGroup3,
  setToggleGroup,
}: Props) => {
  const getGroupInfo = (item) => {
    setGroup(item.name);
    setGroupId(item.id);
  };

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + '...';
    }
  }

  return (
    <main
      className={`absolute bottom-[-720px] left-[-60px] md:bottom-[-330px] md:left-[-140px] z-30 bg-grey-2 dark:text-white dark:bg-dark-black-4 flex items-center justify-center rounded-lg`}
    >
      <div className="w-[250px] md:w-[680px] p-6 flex flex-col items-start justify-center">
        <section
          className="mb-2 md:ml-3"
          onClick={() => setGroupType('main menu')}
        >
          <img src={backarrow} alt="back arrow" />
        </section>

        <section className="w-full flex flex-col md:flex-row gap-4">
          <ol className="flex flex-col items-center justify-center gap-1 w-full">
            <aside className={`${data.bg} px-2 py-4 rounded-lg w-[12rem] mb-2`}>
              <div className="flex gap-2">
                <img src={data.img} alt="" />
                <h1 className="text-black font-bold whitespace-nowrap">
                  {data.title}
                </h1>
              </div>
              <p className="text-dark-grey-2 text-xs">
                List updated daily at midnight PST.
              </p>
            </aside>
            {categorizedGroup1?.map((item, index) => (
              <li
                className="flex gap-2 w-[12rem] hover:bg-slate-200 dark:hover:bg-slate-900 p-1 rounded-md"
                key={index}
                onClick={() => {
                  getGroupInfo(item);
                  setToggleGroup(false);
                }}
              >
                <img src={category1} alt="" />
                <div>
                  <p
                    className={`text-xs ${
                      groupId == item.id && 'text-cyan-500'
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-xs text-dark-grey-2">
                    {truncateText(item.about, 25)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <ul className="flex flex-col items-center gap-1 w-full md:pl-4">
            {categorizedGroup2?.map((item, index) => (
              <li
                className="flex gap-2 w-[12rem] hover:bg-slate-200 dark:hover:bg-slate-900 p-1 rounded-md"
                key={index}
                onClick={() => {
                  getGroupInfo(item);
                  setToggleGroup(false);
                }}
              >
                <img src={category1} alt="" />
                <div>
                  <p
                    className={`text-xs ${
                      groupId == item.id && 'text-cyan-500'
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-xs text-dark-grey-2">
                    {truncateText(item.about, 25)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col items-center gap-1 w-full">
            {categorizedGroup3?.map((item, index) => (
              <li
                className="flex gap-2 w-[12rem] hover:bg-slate-200 dark:hover:bg-slate-900 p-1 rounded-md"
                key={index}
                onClick={() => {
                  getGroupInfo(item);
                  setToggleGroup(false);
                }}
              >
                <img src={category1} alt="" />
                <div>
                  <p
                    className={`text-xs ${
                      groupId == item.id && 'text-cyan-500'
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-xs text-dark-grey-2">
                    {truncateText(item.about, 25)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="w-[30px] h-[30px] rotate-45 absolute -top-1 left-[200px] md:left-[150px] -z-10 bg-grey-2 dark:bg-dark-black-4" />
    </main>
  );
};

export default SeeAllMenu;
