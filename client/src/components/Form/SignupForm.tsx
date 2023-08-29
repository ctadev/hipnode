import React, { ChangeEvent, FormEvent } from 'react';
import Input from '../Input/Input';
import { IRegisterUser } from '../../views/SignupPage';

interface SignupFormProps {
  user: IRegisterUser;
  error: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function SignupForm({
  user,
  error,
  handleInputChange,
  handleFormSubmit,
}: SignupFormProps) {
  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        type="text"
        id="username"
        name="username"
        value={user.username}
        onChange={handleInputChange}
        label="username"
      />
      <Input
        type="text"
        id="email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        label="email"
      />
      <Input
        type="text"
        id="password"
        name="password"
        value={user.password}
        onChange={handleInputChange}
        label="password"
      />

      {error && <p>{error}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
