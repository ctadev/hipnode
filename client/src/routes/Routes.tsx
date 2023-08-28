import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import HomePage from '../views/HomePage';
import MeetupPage from '../views/MeetupsPage';
import GroupPage from '../views/GroupPage';
import PodcastPage from '../views/PodcastsPage';
import SigninPage from '../views/SigninPage';
import SignupPage from '../views/SignupPage';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path="/" element={<HomePage />} />
        <Route path="/meetups" element={<MeetupPage />} />
        <Route path="/groups" element={<GroupPage />} />
        <Route path="/podcasts" element={<PodcastPage />} />
        <Route path="/podcasts" element={<PodcastPage />} />
        <Route path="/sign-in" element={<SigninPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Switch>
    </>
  );
}
