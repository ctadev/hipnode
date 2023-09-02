import { Information, StepThree } from '../../components/SignUp';
import { aboutyourself } from '../../constants/signup';
import React from 'react';

const StepThreePage = () => {
  return (
    <main className="flex flex-col lg:flex-row">
      {/* Right Side */}
      <Information
        title="Tell us a little about yourself!"
        data={aboutyourself}
      />

      {/* Left Side */}
      <StepThree />
    </main>
  );
};

export default StepThreePage;
