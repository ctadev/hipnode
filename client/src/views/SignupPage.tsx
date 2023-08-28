import React, { ChangeEvent, FormEvent, useState } from 'react';
import Form from '../components/Form/Form';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/apiService/userApi';
import { useNavigate } from 'react-router';

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
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const clearFormInputs = () => {
    setUser({
      username: '',
      email: '',
      password: '',
    });
  };

  const mutation = useMutation({
    mutationFn: () => registerUser(user),
    onSuccess: () => {
      clearFormInputs();
      navigate('/sign-in');
    },
    onError(err: any) {
      setError(err.message);
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
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
        <p>{error}</p>
        <button>Login</button>
      </form>
    </Form>
  );
}
