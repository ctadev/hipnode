import React, { FormEvent, useState } from 'react';
import { useRegisterMutation } from '../hooks/register/useRegisterMutation';
import { useRegisterForm } from '../hooks/register/useRegisterForm';
import SignupForm from '../components/Form/SignupForm';
import {
  Information,
  SetUserName,
  Register,
  StepOne,
  StepTwo,
  StepThree,
} from '../components/SignUp';
import { signup, aboutyourself } from '../constants/signup';

export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const initialState: IRegisterUser = {
    username: '',
    email: '',
    password: '',
  };
  const [error, setError] = useState<string>('');
  const [checkSignUpProgress, setCheckSignUpProgress] = useState({
    isUserNameValid: true,
    isEmailValid: false,
    isCategoryStepOne: false,
    isCategoryStepTwo: false,
    isCategoryStepThree: false,
  });

  const { user, handleInputChange, resetForm } = useRegisterForm(initialState);

  const registerMutation = useRegisterMutation(user, resetForm, setError);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    registerMutation.mutate();
  };

  return (
    // <SignupForm
    //   user={user}
    //   error={error}
    //   handleInputChange={handleInputChange}
    //   handleFormSubmit={handleFormSubmit}
    // />

    <main className="flex flex-col lg:flex-row">
      {/* Right Side */}
      <Information
        title={
          checkSignUpProgress.isCategoryStepOne ||
          checkSignUpProgress.isCategoryStepTwo ||
          checkSignUpProgress.isCategoryStepThree
            ? 'Which best describes the stage you&apos;re at right now?'
            : 'Join a thriving community of Enterprenuers and Developers.'
        }
        data={
          checkSignUpProgress.isCategoryStepOne ||
          checkSignUpProgress.isCategoryStepTwo ||
          checkSignUpProgress.isCategoryStepThree
            ? aboutyourself
            : signup
        }
      />

      {/* Left Side */}
      {checkSignUpProgress.isUserNameValid && (
        <SetUserName setCheckSignUpProgress={setCheckSignUpProgress} />
      )}
      {checkSignUpProgress.isEmailValid && (
        <Register setCheckSignUpProgress={setCheckSignUpProgress} />
      )}
      {checkSignUpProgress.isCategoryStepOne && (
        <StepOne setCheckSignUpProgress={setCheckSignUpProgress} />
      )}
      {checkSignUpProgress.isCategoryStepTwo && (
        <StepTwo setCheckSignUpProgress={setCheckSignUpProgress} />
      )}
      {checkSignUpProgress.isCategoryStepThree && (
        <StepThree setCheckSignUpProgress={setCheckSignUpProgress} />
      )}
    </main>
  );
}
