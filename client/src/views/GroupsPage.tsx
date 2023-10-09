import GroupList from '../components/Groups/GroupList';
import { groupTypes } from '../constants/group';
import React, { useState } from 'react';
import GroupTypeCard from '../components/Groups/GroupTypeCard';
import MeetupSideBar from '../components/Meetups/MeetupSideBar';
import { PodcastSideBar } from '../components/Podcasts';

export default function GroupsPage() {
  const [newGroup1, setNewGroup1] = useState([]);
  const [newGroup2, setNewGroup2] = useState([]);
  const [popularGroup1, setPopularGroup1] = useState([]);
  const [popularGroup2, setPopularGroup2] = useState([]);
  const [growingGroup1, setGrowingGroup1] = useState([]);
  const [growingGroup2, setGrowingGroup2] = useState([]);

  // const { data } = useQuery('groups', async () => {
  //   const res = await axios.get(
  //     `${import.meta.env.VITE_DEV_BACKEND_URL}/groups`,
  //   );
  //   return res.data;
  // });

  // const { data: meetupData } = useQuery('meetups', async () => {
  //   const res = await axios.get(
  //     `${import.meta.env.VITE_DEV_BACKEND_URL}/meetups`,
  //   );
  //   return res.data;
  // });

  // const { data: podcastData } = useQuery('podcasts', async () => {
  //   const res = await axios.get(
  //     `${import.meta.env.VITE_DEV_BACKEND_URL}/podcasts`,
  //   );
  //   return res.data;
  // });

  // useEffect(() => {
  //   const newlyLaunch = () => {
  //     if (data?.length > 1) {
  //       const sortedArray = data.sort((a, b) => b.created_at - a.created_at);
  //       setNewGroup1(sortedArray.slice(0, 3));
  //       setNewGroup2(sortedArray);
  //     }
  //     return null;
  //   };
  //   newlyLaunch();

  //   const Popular = () => {
  //     if (data?.length > 1) {
  //       const sortedArray = data.sort(
  //         (a: any, b: any) => b.view_count - a.view_count,
  //       );
  //       setPopularGroup1(sortedArray.slice(0, 3));
  //       setPopularGroup2(sortedArray);
  //     }
  //     return null;
  //   };
  //   Popular();

  //   const Growing = () => {
  //     if (data?.length > 1) {
  //       const sortedArray = data.sort(
  //         (a: any, b: any) => b.member_count - a.member_count,
  //       );
  //       setGrowingGroup1(sortedArray.slice(0, 3));
  //       setGrowingGroup2(sortedArray);
  //     }
  //     return null;
  //   };
  //   Growing();
  // }, [data]);

  return (
    <main className="mt-6 flex flex-col lg:flex-row gap-6 pb-[120px] md:pb-[50px] px-6">
      {/* Left Sidebar Group Categories */}
      <section className="bg-white dark:bg-dark-main-bg w-full p-[10px] rounded-2xl lg:min-w-[214px] lg:max-w-[214px] flex flex-col lg:gap-5 gap-4 h-fit">
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
      </section>

      {/* Middle Content Group Cards */}
      <section className="flex flex-1 flex-col">
        <GroupList />
      </section>

      {/* Right Sidebar */}
      <section className="w-full lg:w-[325px] flex flex-col gap-6">
        <MeetupSideBar />
        <PodcastSideBar />
      </section>
    </main>
  );
}
