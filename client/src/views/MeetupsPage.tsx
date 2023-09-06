import React, { useState } from 'react';
import MeetupList from '../components/Meetups/MeetupList';
import MeetupFilter from '../components/Filter/MeetupFilter';

export default function MeetupsPage() {
  const [meetupCategoryTypes, setMeetupCategoryTypes] = useState<string[]>([]);

  return (
    <main className="flex justify-between">
      <MeetupFilter
        meetupCategoryTypes={meetupCategoryTypes}
        setMeetupCategoryTypes={setMeetupCategoryTypes}
      />
      <MeetupList meetupCategoryTypes={meetupCategoryTypes} />
    </main>
  );
}
