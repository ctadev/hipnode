import React, { FormEvent, useState } from 'react';
import { useRegisterMutation } from '../hooks/register/useRegisterMutation';
import { useRegisterForm } from '../hooks/register/useRegisterForm';
import SignupForm from '../components/Form/SignupForm';

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

  const { user, handleInputChange, resetForm } = useRegisterForm(initialState);

  const registerMutation = useRegisterMutation(user, resetForm, setError);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    registerMutation.mutate();
  };

  return (
    <SignupForm
      user={user}
      error={error}
      handleInputChange={handleInputChange}
      handleFormSubmit={handleFormSubmit}
    />
  );
}
