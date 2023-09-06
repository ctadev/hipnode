import React, { ChangeEvent, Dispatch } from 'react';

type PodcastFilterProps = {
  selectedPodcastTypes: string[];
  setSelectedPodcastTypes: Dispatch<React.SetStateAction<string[]>>;
};

const podcastTypes: string[] = [
  'indie-bites',
  'software-social',
  'hipnode',
  'free',
];

export default function PodcastFilter({
  selectedPodcastTypes,
  setSelectedPodcastTypes,
}: PodcastFilterProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked && !selectedPodcastTypes.includes(value)) {
      setSelectedPodcastTypes((prev) => [...prev, value]);
    } else if (!checked && selectedPodcastTypes.includes(value)) {
      setSelectedPodcastTypes((prev) => prev.filter((type) => type !== value));
    }
  };

  return (
    <div>
      <h3>Filter By Show</h3>
      <form className="flex flex-col">
        {podcastTypes.map((podcastType) => (
          <div key={podcastType}>
            <label htmlFor={podcastType}>{podcastType}</label>
            <input
              type="checkbox"
              id={podcastType}
              value={podcastType}
              onChange={handleChange}
            />
          </div>
        ))}
      </form>
    </div>
  );
}
