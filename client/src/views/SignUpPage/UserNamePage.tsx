import {
  Information,
  SetUserName,
} from '../../components/SignUp';
import { signup } from '../../constants/signup';
import React from 'react';

const UserNamePage = () => {
  return (
    <main className="flex flex-col lg:flex-row">
      {/* Right Side */}
      <Information
        title="Join a thriving community of Enterprenuers and Developers."
        data={signup}
      />

      {/* Left Side */}
      <SetUserName />
    </main>
  );
};

export default UserNamePage;
