import {
  GroupTypeCard,
  MeetupCard,
  Navbar,
  Title,
  PodcastCard,
  GroupCard,
} from '../components';
import { meetups, podcasts } from '../constants/general';
import { groupTypes } from '../constants/group';
import { arrow } from '../assets';
import { useEffect, useState } from 'react';
import { IGroup } from '../../types/index';
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const Groups = () => {
  const [newGroup1, setNewGroup1] = useState([]);
  const [newGroup2, setNewGroup2] = useState([]);
  const [popularGroup1, setPopularGroup1] = useState([]);
  const [popularGroup2, setPopularGroup2] = useState([]);
  const [growingGroup1, setGrowingGroup1] = useState([]);
  const [growingGroup2, setGrowingGroup2] = useState([]);

  const { data } = useQuery('groups', async () => {
    const res = await axios.get(`${import.meta.env.VITE_DEV_BACKEND_URL}/groups`);
    return res.data;
  });

  const { data: meetupData } = useQuery('meetups', async () => {
    const res = await axios.get(`${import.meta.env.VITE_DEV_BACKEND_URL}/meetups`);
    return res.data;
  });

  const { data: podcastData } = useQuery('podcasts', async () => {
    const res = await axios.get(`${import.meta.env.VITE_DEV_BACKEND_URL}/podcasts`);
    return res.data;
  });

  useEffect(() => {
    const newlyLaunch = () => {
      if (data?.length > 1) {
        const sortedArray = data.sort((a, b) => b.created_at - a.created_at);
        setNewGroup1(sortedArray.slice(0, 3));
        setNewGroup2(sortedArray);
      }
      return null;
    };
    newlyLaunch();

    const Popular = () => {
      if (data?.length > 1) {
        const sortedArray = data.sort((a, b) => b.view_count - a.view_count);
        setPopularGroup1(sortedArray.slice(0, 3));
        setPopularGroup2(sortedArray);
      }
      return null;
    };
    Popular();

    const Growing = () => {
      if (data?.length > 1) {
        const sortedArray = data.sort(
          (a, b) => b.member_count - a.member_count,
        );
        setGrowingGroup1(sortedArray.slice(0, 3));
        setGrowingGroup2(sortedArray);
      }
      return null;
    };
    Growing();
  }, [data]);

  return (
    <div className="bg-grey-2 dark:bg-dark-black-2 h-auto">
      <div className="flex flex-col lg:flex-row lg:items-start p-5 lg:py-[30px] lg:px-10 gap-5 lg:justify-center">
        <div className="bg-white dark:bg-dark-black-3 w-full p-[10px] rounded-2xl lg:min-w-[214px] lg:max-w-[214px] flex flex-col lg:gap-5 gap-4">
          <GroupTypeCard
            key={groupTypes[0].type + 0}
            groupType={groupTypes[0]}
            index={0}
            categorizedGroup1={newGroup1}
            categorizedGroup2={newGroup2}
          />
          <GroupTypeCard
            key={groupTypes[1].type + 1}
            groupType={groupTypes[1]}
            index={1}
            categorizedGroup1={popularGroup1}
            categorizedGroup2={popularGroup2}
          />
          <GroupTypeCard
            key={groupTypes[2].type + 2}
            groupType={groupTypes[2]}
            index={2}
            categorizedGroup1={growingGroup1}
            categorizedGroup2={growingGroup2}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="columns-1 sm:columns-2 xl:columns-3 gap-4 w-full">
            {data?.map((group: IGroup) => (
              <GroupCard group={group} key={group.id} />
            ))}
          </div>
          <div className="flex mt-3 gap-[14px]">
            <p className="text-[10px] text-dark-grey-2">See more</p>
            <img
              src={arrow}
              alt="arrow"
              className="object-contain w-3 h-[10px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:max-w-[325px]">
          <div className="bg-white dark:bg-dark-black-3 rounded-[10px] p-5 lg:mt-0">
            <Title title="Meetups" />
            <div className="flex flex-col gap-5 mt-5">
              {meetupData?.slice(0, 3).map((meetup) => (
                <MeetupCard meetup={meetup} key={meetup.id} />
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-dark-black-3 rounded-[10px] p-5 mb-24">
            <Title title="Podcasts" />
            <div className="flex flex-col gap-5 mt-5">
              {podcastData?.slice(0, 6).map((podcast) => (
                <PodcastCard podcast={podcast} key={podcast.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <MobileNav /> */}
    </div>
  );
};

export default Groups;
