import React, { ChangeEvent, FormEvent, useState } from 'react';
import Form from '../components/Form/Form';

interface SignupPageState {
  username: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const [user, setUser] = useState<SignupPageState>({
    username: '',
    email: '',
    password: '',
  });

  const clearFormInputs = () => {
    setUser({
      username: '',
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
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </div>
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
