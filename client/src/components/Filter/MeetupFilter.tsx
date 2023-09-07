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
    <section>
      <h3>Categories</h3>
      <form>
        {meetupTypes.map((meetupType) => (
          <div key={meetupType}>
            <label htmlFor={meetupType}>{podcastTypeName[meetupType]}</label>
            <input
              type="checkbox"
              id={meetupType}
              value={meetupType}
              checked={meetupCategoryTypes.includes(meetupType)}
              onChange={handleChange}
            />
          </div>
        ))}
      </form>
    </section>
  );
}
