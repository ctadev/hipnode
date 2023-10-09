import React, { useState } from 'react';
import PodcastList from '../components/Podcasts/PodcastList';
import PodcastFilter from '../components/Filter/PodcastFilter';
import MeetupSideBar from '../components/Meetups/MeetupSideBar';

export default function PodcastsPage() {
  const [selectedPodcastTypes, setSelectedPodcastTypes] = useState<string[]>(
    [],
  );

  return (
    <main className="flex flex-col lg:flex-row justify-between mt-6 px-6 gap-6 pb-[120px] md:pb-[50px]">
      <section className="p-[20px] w-full  lg:w-[210px] h-fit bg-white rounded-[16px] dark:bg-dark-main-bg">
        <PodcastFilter
          selectedPodcastTypes={selectedPodcastTypes}
          setSelectedPodcastTypes={setSelectedPodcastTypes}
        />
      </section>

      <section className="flex-1">
        <PodcastList selectedPodcastTypes={selectedPodcastTypes} />
      </section>

      <section className="w-full lg:w-[325px] flex flex-col gap-6">
        <MeetupSideBar />
      </section>
    </main>
  );
}
