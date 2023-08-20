import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import SeeAllMenu from './SeeAllMenu';
import SelectMainMenu from './SelectMainMenu';
import { newly, growings, popular } from '../../constants/createpost';

interface Props {
  toggleGroup: boolean;
  group: string;
  setGroup?: Dispatch<SetStateAction<string>>;
  groupId: number;
  setGroupId?: Dispatch<SetStateAction<number>>;
  setToggleGroup: Dispatch<SetStateAction<boolean>>;
}

const ToggleGroup = ({
  toggleGroup,
  setGroup,
  group,
  groupId,
  setGroupId,
  setToggleGroup,
}: Props) => {
  const { data: categorizedGroup } = useQuery('groups', async () => {
    const res = await axios.get(`${import.meta.env.VITE_DEV_BACKEND_URL}/groups`);
    return res.data;
  });

  const [newGroup1, setNewGroup1] = useState([]);
  const [newGroup2, setNewGroup2] = useState([]);
  const [newGroup3, setNewGroup3] = useState([]);
  const [popularGroup1, setPopularGroup1] = useState([]);
  const [popularGroup2, setPopularGroup2] = useState([]);
  const [popularGroup3, setPopularGroup3] = useState([]);
  const [growingGroup1, setGrowingGroup1] = useState([]);
  const [growingGroup2, setGrowingGroup2] = useState([]);
  const [growingGroup3, setGrowingGroup3] = useState([]);

  useEffect(() => {
    const newlyLaunch = () => {
      if (categorizedGroup?.length > 1) {
        const sortedArray = categorizedGroup.sort(
          (a, b) => b.created_at - a.created_at,
        );
        setNewGroup1(sortedArray.slice(0, 3));
        setNewGroup2(sortedArray.slice(3, 7));
        setNewGroup3(sortedArray.slice(7, 11));
      }
      return null;
    };
    newlyLaunch();

    const Popular = () => {
      if (categorizedGroup?.length > 1) {
        const sortedArray = categorizedGroup.sort(
          (a, b) => b.view_count - a.view_count,
        );
        setPopularGroup1(sortedArray.slice(0, 3));
        setPopularGroup2(sortedArray.slice(3, 7));
        setPopularGroup3(sortedArray.slice(7, 11));
      }
      return null;
    };
    Popular();

    const Growing = () => {
      if (categorizedGroup?.length > 1) {
        const sortedArray = categorizedGroup.sort(
          (a, b) => b.member_count - a.member_count,
        );
        setGrowingGroup1(sortedArray.slice(0, 3));
        setGrowingGroup2(sortedArray.slice(3, 7));
        setGrowingGroup3(sortedArray.slice(7, 11));
      }
      return null;
    };
    Growing();
  }, [categorizedGroup]);

  const [groupType, setGroupType] = useState('');
  let renderedComponent;

  switch (groupType) {
    case 'growing':
      renderedComponent = (
        <SeeAllMenu
          setGroupType={setGroupType}
          data={growings}
          setGroup={setGroup}
          group={group}
          groupId={groupId}
          setGroupId={setGroupId}
          categorizedGroup1={growingGroup1}
          categorizedGroup2={growingGroup2}
          categorizedGroup3={growingGroup3}
          setToggleGroup={setToggleGroup}
        />
      );
      break;
    case 'popular':
      renderedComponent = (
        <SeeAllMenu
          setGroupType={setGroupType}
          data={popular}
          setGroup={setGroup}
          group={group}
          groupId={groupId}
          setGroupId={setGroupId}
          categorizedGroup1={popularGroup1}
          categorizedGroup2={popularGroup2}
          categorizedGroup3={popularGroup3}
          setToggleGroup={setToggleGroup}
        />
      );
      break;
    case 'new':
      renderedComponent = (
        <SeeAllMenu
          setGroupType={setGroupType}
          data={newly}
          setGroup={setGroup}
          group={group}
          groupId={groupId}
          setGroupId={setGroupId}
          categorizedGroup1={newGroup1}
          categorizedGroup2={newGroup2}
          categorizedGroup3={newGroup3}
          setToggleGroup={setToggleGroup}
        />
      );
      break;
    default:
      renderedComponent = (
        <SelectMainMenu
          setGroupType={setGroupType}
          setGroup={setGroup}
          groupId={groupId}
          setGroupId={setGroupId}
          group={group}
          categorizedGroup={categorizedGroup}
          setToggleGroup={setToggleGroup}
        />
      );
      break;
  }

  return (
    <div className={`${!toggleGroup && 'hidden'} absolute top-7`}>
      {renderedComponent}
    </div>
  );
};

export default ToggleGroup;
