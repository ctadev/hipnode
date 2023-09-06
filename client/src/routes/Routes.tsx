import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import {
  HomePage,
  GroupPage,
  MeetupPage,
  PodcastPage,
  ProfilePage,
  SignInPage,
  ProtectedPage,
} from '../views';
import {
  UserName,
  Register,
  StepOne,
  StepTwo,
  StepThree,
} from '../views/SignUpPage/index';

export default function Routes() {
  return (
    <Switch>
      <Route
        path="/"
        element={
          <ProtectedPage user={true}>
            <HomePage />
          </ProtectedPage>
        }
      />
      <Route
        path="/meetups"
        element={
          <ProtectedPage user={true}>
            <MeetupPage />
          </ProtectedPage>
        }
      />
      <Route
        path="/groups"
        element={
          <ProtectedPage user={true}>
            <GroupPage />
          </ProtectedPage>
        }
      />
      <Route
        path="/podcasts"
        element={
          <ProtectedPage user={true}>
            <PodcastPage />
          </ProtectedPage>
        }
      />
      <Route
        path="/:user_id/profile"
        element={
          <ProtectedPage user={true}>
            <ProfilePage />
          </ProtectedPage>
        }
      />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up/set-username" element={<UserName />} />
      <Route path="/sign-up/register-email" element={<Register />} />
      <Route path="/sign-up/next-step-one" element={<StepOne />} />
      <Route path="/sign-up/next-step-two" element={<StepTwo />} />
      <Route path="/sign-up/next-step-three" element={<StepThree />} />
    </Switch>
  );
}
