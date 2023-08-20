import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import SelectGroup from './SelectGroup';
import { growing, rocket, fire } from '../../assets/createpost-asset/index';

interface Props {
  setGroupType: Dispatch<SetStateAction<string>>;
  setGroup: Dispatch<SetStateAction<string>>;
  group: string;
  categorizedGroup: Array<any>;
  groupId: number;
  setGroupId?: Dispatch<SetStateAction<number>>;
  setToggleGroup: Dispatch<SetStateAction<boolean>>;
}

const SelectMainMenu = ({
  setGroupType,
  setGroup,
  group,
  categorizedGroup,
  groupId,
  setToggleGroup,
  setGroupId,
}: Props) => {
  const [newGroup, setNewGroup] = useState([]);
  const [popularGroup, setPopularGroup] = useState([]);
  const [growingGroup, setGrowingGroup] = useState([]);

  useEffect(() => {
    const newlyLaunch = () => {
      if (categorizedGroup?.length > 1) {
        const sortedArray = categorizedGroup.sort(
          (a, b) => b.created_at - a.created_at,
        );
        const getThree = sortedArray.slice(0, 3);
        setNewGroup(getThree);
      }
      return null;
    };
    newlyLaunch();

    const Popular = () => {
      if (categorizedGroup?.length > 1) {
        const sortedArray = categorizedGroup.sort(
          (a, b) => b.view_count - a.view_count,
        );
        const getThree = sortedArray.slice(0, 3);
        setPopularGroup(getThree);
      }
      return null;
    };
    Popular();

    const Growing = () => {
      if (categorizedGroup?.length > 1) {
        const sortedArray = categorizedGroup.sort(
          (a, b) => b.member_count - a.member_count,
        );
        const getThree = sortedArray.slice(0, 3);
        setGrowingGroup(getThree);
      }
      return null;
    };
    Growing();
  }, [categorizedGroup]);

  return (
    <div
      className={`
        absolute bg-grey-2 dark:bg-dark-black-4 md:left-[-145px] left-[-30px] bottom-[-870px] md:bottom-[-330px] z-30 p-6 rounded-lg flex flex-col md:flex-row md:gap-10 gap-6`}
    >
      <SelectGroup
        title="Fastest Growing"
        description="List updated daily at midnight PST."
        categorizedGroup={growingGroup}
        img={growing}
        setGroupType={setGroupType}
        bg="bg-orange-200"
        type="growing"
        setGroup={setGroup}
        group={group}
        groupId={groupId}
        setGroupId={setGroupId}
        setToggleGroup={setToggleGroup}
      />

      <SelectGroup
        title="Most Popular"
        description="List updated daily at midnight PST."
        categorizedGroup={popularGroup}
        img={fire}
        setGroupType={setGroupType}
        bg="bg-yellow-200"
        type="popular"
        setGroup={setGroup}
        group={group}
        groupId={groupId}
        setGroupId={setGroupId}
        setToggleGroup={setToggleGroup}
      />

      <SelectGroup
        title="Newly Launched"
        description="List updated daily at midnight PST."
        categorizedGroup={newGroup}
        img={rocket}
        setGroupType={setGroupType}
        bg="bg-teal-200"
        type="new"
        setGroup={setGroup}
        groupId={groupId}
        setGroupId={setGroupId}
        group={group}
        setToggleGroup={setToggleGroup}
      />

      <div className="w-[30px] h-[30px] rotate-45 absolute -top-1 left-[150px] md:left-[150px] -z-10 bg-grey-2 dark:bg-dark-black-4" />
    </div>
  );
};

export default SelectMainMenu;
