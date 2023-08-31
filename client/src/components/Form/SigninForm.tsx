import React, { ChangeEvent, FormEvent } from 'react';
import Input from '../Input/Input';
import { ILoginUser } from '../../views/SigninPage';

interface SigninFormProps {
  user: ILoginUser;
  errorMessage: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function SigninForm({
  user,
  errorMessage,
  handleInputChange,
  handleFormSubmit,
}: SigninFormProps) {
  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        type="email"
        id="email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        label="email"
      />
      <Input
        type="password"
        id="password"
        name="password"
        value={user.password}
        onChange={handleInputChange}
        label="password"
      />

      {errorMessage && <p>{errorMessage}</p>}

      <button type="submit">Sign In</button>
    </form>
  );
}
