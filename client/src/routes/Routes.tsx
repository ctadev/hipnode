import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import HomePage from '../views/HomePage';
import MeetupPage from '../views/MeetupsPage';
import GroupPage from '../views/GroupPage';
import PodcastPage from '../views/PodcastsPage';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path="/" element={<HomePage />} />
      </Switch>
      <Switch>
        <Route path="/meetups" element={<MeetupPage />} />
      </Switch>
      <Switch>
        <Route path="/groups" element={<GroupPage />} />
      </Switch>
      <Switch>
        <Route path="/podcasts" element={<PodcastPage />} />
      </Switch>
    </>
  );
}
