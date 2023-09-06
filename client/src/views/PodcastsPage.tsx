import React, { useState } from 'react';
import PodcastList from '../components/Podcasts/PodcastList';
import PodcastFilter from '../components/Filter/PodcastFilter';

export default function PodcastsPage() {
  const [selectedPodcastTypes, setSelectedPodcastTypes] = useState<string[]>(
    [],
  );

  return (
    <main className="flex justify-between">
      <PodcastFilter
        selectedPodcastTypes={selectedPodcastTypes}
        setSelectedPodcastTypes={setSelectedPodcastTypes}
      />
      <PodcastList selectedPodcastTypes={selectedPodcastTypes} />
    </main>
  );
}
