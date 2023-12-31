import React, { FormEvent, useState } from 'react';
import { useLoginMutation } from '../hooks/login/useLoginMutation';
import { useLoginForm } from '../hooks/login/useLoginForm';
import SigninForm from '../components/Form/SigninForm';
import LoginForm from '../components/SignIn/LoginForm';
import SignInGuide from '../components/SignIn/SignInGuide';

export interface ILoginUser {
  email: string;
  password: string;
}

export default function SigninPage() {
  const initialState: ILoginUser = { email: '', password: '' };
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { user, handleInputChange, resetForm } = useLoginForm(initialState);

  const loginMutation = useLoginMutation(user, resetForm, (err: any) => {
    console.log('errorObj', err);
    setErrorMessage(err.message);
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    // <SigninForm
    //   user={user}
    //   error={error}
    //   handleInputChange={handleInputChange}
    //   handleFormSubmit={handleFormSubmit}
    // />

    <main className="flex flex-col lg:flex-row">
      {/* Right Side */}
      <SignInGuide />

      {/* Left Side */}
      <LoginForm />
    </main>
  );
}
