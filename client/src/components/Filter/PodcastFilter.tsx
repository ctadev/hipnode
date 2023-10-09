import React, { ChangeEvent, Dispatch } from 'react';

type PodcastFilterProps = {
  selectedPodcastTypes: string[];
  setSelectedPodcastTypes: Dispatch<React.SetStateAction<string[]>>;
};

const podcastTypes: string[] = [
  'is_indie_bites',
  'is_software_social',
  'is_hipnode',
  'is_free',
];

const podcastTypeName = {
  is_indie_bites: 'Indie Bites',
  is_software_social: 'Software Social',
  is_hipnode: 'Hipnode',
  is_free: 'Free',
};

export default function PodcastFilter({
  selectedPodcastTypes,
  setSelectedPodcastTypes,
}: PodcastFilterProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedPodcastTypes((prev) =>
      checked ? [...prev, value] : prev.filter((type) => type !== value),
    );
  };

  return (
    <main>
      <h3 className="font-semibold text-[18px] dark:text-white">
        Filter By Show
      </h3>
      <form className="flex flex-col gap-3 mt-4">
        {podcastTypes.map((podcastType) => (
          <div key={podcastType} className="flex items-center justify-between">
            <label
              htmlFor={podcastType}
              className="font-semibold text-[12px] text-dark-grey-1 dark:text-white cursor-pointer"
            >
              {podcastTypeName[podcastType]}
            </label>
            <input
              type="checkbox"
              id={podcastType}
              value={podcastType}
              checked={selectedPodcastTypes.includes(podcastType)}
              onChange={handleChange}
              className="cursor-pointer"
            />
          </div>
        ))}
      </form>
    </main>
  );
}
