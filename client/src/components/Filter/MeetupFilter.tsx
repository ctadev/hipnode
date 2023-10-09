import React, { ChangeEvent, Dispatch } from 'react';

type MeetupFilterProps = {
  meetupCategoryTypes: string[];
  setMeetupCategoryTypes: Dispatch<React.SetStateAction<string[]>>;
};

const meetupTypes: string[] = [
  'is_fulltime',
  'is_parttime',
  'is_internship',
  'is_remote',
  'is_contract',
  'is_free',
];

const podcastTypeName = {
  is_fulltime: 'Full Time',
  is_parttime: 'Part Time',
  is_internship: 'Internship',
  is_remote: 'Remote',
  is_contract: 'Contract',
  is_free: 'Free',
};

export default function MeetupFilter({
  meetupCategoryTypes,
  setMeetupCategoryTypes,
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setMeetupCategoryTypes((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((meetupCategoryType) => meetupCategoryType !== value),
    );
  };

  return (
    <main className="">
      <h3 className="font-semibold text-[18px] dark:text-white">Categories</h3>
      <form className="flex flex-col gap-3 mt-4">
        {meetupTypes.map((meetupType) => (
          <div key={meetupType} className="flex items-center justify-between">
            <label
              htmlFor={meetupType}
              className="font-semibold text-[12px] text-dark-grey-1 dark:text-white cursor-pointer"
            >
              {podcastTypeName[meetupType]}
            </label>
            <input
              type="checkbox"
              id={meetupType}
              value={meetupType}
              checked={meetupCategoryTypes.includes(meetupType)}
              onChange={handleChange}
              className="cursor-pointer"
            />
          </div>
        ))}
      </form>
    </main>
  );
}
