import React from 'react';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { useLoginUser } from '../../hooks/useAuth';

type formProp = {
  email: string;
  password: string;
};

const TestingForm = () => {
  const form = useForm<formProp>();
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  const { login } = useLoginUser();

  const onSubmit = (data: formProp) => {
    login(data);
    reset();
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <h3 className="dark:text-grey-2 font-semibold text-lg max-w-sm">
            Email
          </h3>

          <input
            type="email"
            placeholder="Enter Email address"
            id="email"
            className="bg-white dark:bg-dark-black-3 py-3 px-5 rounded-lg w-full text-sm mt-[10px] lg:bg-grey-1 dark:lg:bg-dark-black-2 dark:text-grey-2 outline-none"
            {...register('email', {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email format',
              },
              required: {
                value: true,
                message: 'Email is required',
              },
              validate: (fieldValue) => {
                return (
                  fieldValue !== 'admin@example.com' ||
                  'Enter a different email address'
                );
              },
            })}
          />
          <p className="text-[#dc3545]">{errors.email?.message}</p>
        </div>
        <div>
          <h3 className="dark:text-grey-2 font-semibold text-lg max-w-sm ">
            Password
          </h3>

          <input
            type="password"
            placeholder="Choose Password"
            id="password"
            className="bg-white dark:bg-dark-black-3 py-3 px-5 rounded-lg w-full text-sm mt-[10px] lg:bg-grey-1 dark:lg:bg-dark-black-2 dark:text-grey-2 outline-none"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
            })}
          />

          <p className="text-[#dc3545]">{errors.password?.message}</p>
        </div>
        <input
          type="submit"
          value="Log In"
          className="bg-alt-1 text-grey-2 py-[10px] px-10 rounded-lg mt-5 text-lg font-semibold cursor-pointer"
        />
      </form>
      <Toaster />
    </main>
  );
};

export default TestingForm;
