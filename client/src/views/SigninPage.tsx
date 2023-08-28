import React, { ChangeEvent, FormEvent, useState } from 'react';
import Form from '../components/Form/Form';
import { useMutation } from '@tanstack/react-query';

interface SigninPageState {
  email: string;
  password: string;
}

export default function SigninPage() {
  const [user, setUser] = useState<SigninPageState>({
    email: '',
    password: '',
  });

  const clearFormInputs = () => {
    setUser({
      email: '',
      password: '',
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearFormInputs();
  };

  return (
    <Form>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <button>Login</button>
      </form>
    </Form>
  );
}
