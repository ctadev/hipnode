import React, { Dispatch, SetStateAction } from 'react';

import { growing, category1 } from '../../assets/createpost-asset/index';

interface Props {
  title: string;
  description: string;
  categorizedGroup: Array<any>;
  img: string;
  bg: string;
  type: string;
  setGroupType: Dispatch<SetStateAction<string>>;
  group: string;
  setGroup?: Dispatch<SetStateAction<string>>;
  groupId: number;
  setGroupId?: Dispatch<SetStateAction<number>>;
  setToggleGroup: Dispatch<SetStateAction<boolean>>;
}

const SelectGroup = ({
  title,
  description,
  categorizedGroup,
  img,
  bg,
  type,
  group,
  setGroup,
  setGroupType,
  groupId,
  setGroupId,
  setToggleGroup,
}: Props) => {
  const getGroupInfo = (item) => {
    setGroup(item.name);
    setGroupId(item.id);
  };

  return (
    <main className="w-[190px]">
      <div>
        <aside
          className={`${bg} px-2 py-4 rounded-lg mb-4`}
          onClick={() => setGroupType(type)}
        >
          <div className="flex gap-2">
            <img src={img} alt="Logo Icon" />
            <h1 className="text-black whitespace-nowrap font-bold">{title}</h1>
          </div>
          <p className="text-dark-grey-2 text-xxs">{description}</p>
        </aside>

        <ol className="flex flex-col items-center gap-1">
          {categorizedGroup?.map((item, index) => (
            <li
              className={`flex gap-2 w-[90%] hover:bg-slate-200 dark:hover:bg-slate-900 p-1 rounded-md`}
              key={index}
              onClick={() => {
                getGroupInfo(item);
                setToggleGroup(false);
              }}
            >
              <img src={category1} alt="" />
              <div>
                <p
                  className={`text-xs ${groupId == item.id && 'text-cyan-500'}`}
                >
                  {item.name}
                </p>
                <p className="text-xxs text-dark-grey-2">{item.description}</p>
              </div>
            </li>
          ))}
          <li className="text-left w-[90%]" onClick={() => setGroupType(type)}>
            <button className="bg-see-all-btn text-see-all-text-color text-xxs rounded-full px-1">
              See all
            </button>
          </li>
        </ol>
      </div>
    </main>
  );
};

export default SelectGroup;
