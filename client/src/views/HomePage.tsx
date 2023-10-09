import React from 'react';
import PostType from '../components/Home/Leftside/PostType';
import PopularTags from '../components/Home/Leftside/PopularTags';
import PinnedGroups from '../components/Home/Leftside/PinnedGroups';
import CreatePostForm from '../components/Home/MiddleContent/CreatePostForm';
import { PostList } from '../components/Posts';
import MeetupSideBar from '../components/Meetups/MeetupSideBar';
import PodcastSideBar from '../components/Podcasts/PodcastSideBar';

export default function HomePage() {
  return (
    <main className="flex flex-col lg:flex-row gap-6 pt-6 pb-[120px] md:pb-[50px] px-6">
      {/* LeftSideBar*/}
      <section className="w-full lg:w-[210px]">
        <PostType />
        <PopularTags />
        <PinnedGroups />
      </section>

      {/* Middle Content Cards */}
      <section className="flex-1">
        <CreatePostForm />
        <PostList />
      </section>

      {/* RightSideBar */}
      <section className="w-full lg:w-[280px] xl:w-[325px] flex flex-col gap-6">
        <MeetupSideBar />
        <PodcastSideBar />
      </section>
    </main>
  );
}
