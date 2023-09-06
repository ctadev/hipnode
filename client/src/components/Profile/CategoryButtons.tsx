import React, { ReactNode, Dispatch } from 'react';
import PostList from '../Posts/PostList';
import MeetupList from '../Meetups/MeetupList';
import GroupList from '../Groups/GroupList';
import PodcastList from '../Podcasts/PodcastList';
import { CategoryState } from '../../views/ProfilePage';

type CategoryButtonsProps = {
  setCategory: Dispatch<React.SetStateAction<CategoryState>>;
};

const categoryButtons: CategoryState[] = [
  'posts',
  'meetups',
  'groups',
  'podcasts',
];

export default function CategoryButtons({ setCategory }: CategoryButtonsProps) {
  return (
    <section className="flex justify-evenly">
      {categoryButtons.map((categoryButton) => (
        <button
          key={categoryButton}
          onClick={() => setCategory(categoryButton)}
        >
          {categoryButton}
        </button>
      ))}
    </section>
  );
}
