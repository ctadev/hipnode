import React, { ReactNode } from 'react';
import PodcastList from '../Podcasts/PodcastList';
import MeetupList from '../Meetups/MeetupList';
import GroupList from '../Groups/GroupList';
import { CategoryState } from '../../views/ProfilePage';

type CategoryComponentMapProps = {
  category: string;
};

const componentMap: Record<CategoryState, ReactNode> = {
  posts: <PodcastList />,
  meetups: <MeetupList />,
  groups: <GroupList />,
  podcasts: <PodcastList />,
};

export default function CategoryComponentMap({
  category,
}: CategoryComponentMapProps) {
  return <section>{componentMap[category]}</section>;
}
