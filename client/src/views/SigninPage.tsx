import React, { FormEvent, useState } from 'react';
import { useLoginMutation } from '../hooks/login/useLoginMutation';
import { useLoginForm } from '../hooks/login/useLoginForm';
import SigninForm from '../components/Form/SigninForm';

export interface ILoginUser {
  email: string;
  password: string;
}

export default function SigninPage() {
  const initialState: ILoginUser = { email: '', password: '' };
  const [error, setError] = useState<string>('');

  const { user, handleInputChange, resetForm } = useLoginForm(initialState);

  const loginMutation = useLoginMutation(user, resetForm, (err: any) => {
    setError(err.message);
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <SigninForm
      user={user}
      error={error}
      handleInputChange={handleInputChange}
      handleFormSubmit={handleFormSubmit}
    />
  );
}
