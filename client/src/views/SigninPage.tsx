import React, { ChangeEvent, FormEvent, useState } from 'react';
import Form from '../components/Form/Form';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/apiService/userApi';
import { useNavigate } from 'react-router';
import { setUserToLocalStorage } from '../services/authService/userAuth';
import { useDispatch, useSelector } from 'react-redux';
import { IUserState, loggedinUser } from '../app/userSlice';

interface SigninPageState {
  email: string;
  password: string;
}

export default function SigninPage() {
  const [user, setUser] = useState<SigninPageState>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearFormInputs = () => {
    setUser({
      email: '',
      password: '',
    });
  };

  const mutation = useMutation({
    mutationFn: () => loginUser(user),
    onSuccess: (data) => {
      dispatch(loggedinUser(data));
      setUserToLocalStorage(data);
      clearFormInputs();
      navigate('/');
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
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
        <p>{error}</p>
        <button>Login</button>
      </form>
    </Form>
  );
}
