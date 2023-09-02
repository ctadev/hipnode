import React from 'react';
import {
  Information,
  Register,
} from '../../components/SignUp';
import { signup } from '../../constants/signup';

const EmailAndPasswordPage = () => {
  return (
    <main className="flex flex-col lg:flex-row">
      {/* Right Side */}
      <Information
        title="Join a thriving community of Enterprenuers and Developers."
        data={signup}
      />

      {/* Left Side */}
      <Register />
    </main>
  );
};

export default EmailAndPasswordPage;
