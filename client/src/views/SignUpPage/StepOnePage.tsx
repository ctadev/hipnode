import React from 'react'
import {
    Information,
    StepOne,
  } from '../../components/SignUp';
  import { aboutyourself } from '../../constants/signup';

const StepOnePage = () => {
  return (
    <main className="flex flex-col lg:flex-row">
      {/* Right Side */}
      <Information
        title="Tell us a little about yourself!"
        data={aboutyourself}
      />

      {/* Left Side */}
      <StepOne />
    </main>
  )
}

export default StepOnePage