import {
  Information,
  StepTwo,
} from '../../components/SignUp';
import { aboutyourself } from '../../constants/signup';
import React from 'react';

const StepTwoPage = () => {
  return (
    <main className="flex flex-col lg:flex-row">
      {/* Right Side */}
      <Information
        title="Tell us a little about yourself!"
        data={aboutyourself}
      />

      {/* Left Side */}
      <StepTwo />
    </main>
  );
};

export default StepTwoPage;
