import { useMutation } from '@tanstack/react-query';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/apiService/userApi';
import { signinUser } from '../../app/userSlice';
import { setUserToLocalStorage } from '../../services/authService/userAuth';

type UserState = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [user, setUser] = useState<UserState>({
    email: '',
    password: '',
  });

  const [errMsg, setErrMsg] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (user: UserState) => loginUser(user),
    onSuccess: (data) => {
      dispatch(signinUser(data));
      setUserToLocalStorage(data);
      resetForm();
      navigate('/');
    },
    onError: (err: any) => setErrMsg(err?.message),
  });

  const resetForm = () => {
    setUser({
      email: '',
      password: '',
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setErrMsg('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(user);
  };

  return (
    <main className="lg:h-screen lg:w-1/2 bg-white dark:bg-dark-main-bg flex flex-col items-center justify-center dark:text-white py-[50px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-start max-w-[450px] w-full"
      >
        <h1 className="font-semibold text-lg">Enter your email</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter your email..."
          value={user.email}
          onChange={handleInputChange}
          className="h-[50px] dark:bg-dark-black-2 bg-main-bg rounded-lg px-5 w-full"
        />
        <h1 className="font-semibold text-lg mt-3">Enter a password</h1>
        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          value={user.password}
          onChange={handleInputChange}
          className="h-[50px] dark:bg-dark-black-2 bg-main-bg rounded-lg px-5 w-full"
        />
        {errMsg && errMsg}
        <button
          type="submit"
          className="bg-alt-2 hover:bg-primary-orange text-white h-[50px] rounded-lg px-9 mt-5 font-bold"
        >
          Login
        </button>
        <p className="mt-4">
          Dont have an account?{' '}
          <Link to="/sign-up/set-username">
            <span className="text-alt-1 cursor-pointer">
              Join the Community!
            </span>
          </Link>
        </p>
      </form>

      <section className="flex flex-col gap-2 mt-8 w-[450px]">
        <div className="flex items-center w-full">
          <span className="flex-1 border-b border-dark-grey-1" />
          <p className="px-4 mb-1">OR</p>
          <span className="flex-1 border-b border-dark-grey-1" />
        </div>

        <div className="flex flex-col gap-3">
          <button className="dark:bg-dark-secondary-bg bg-[#F4F6F8] w-full h-[50px] rounded-lg font-semibold">
            Sign Up With Google
          </button>
          <button className="dark:bg-dark-secondary-bg bg-[#F4F6F8] w-full h-[50px] rounded-lg font-semibold">
            Sign Up With Facebook
          </button>
        </div>
      </section>
    </main>
  );
};

export default LoginForm;
