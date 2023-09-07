import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setRegisteredUser } from '../../app/userSlice';

const SetUserName = () => {
  const { registeredUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setRegisteredUser({ name, value }));
  };

  return (
    <main className="lg:h-screen lg:w-1/2 bg-white dark:bg-dark-main-bg flex flex-col items-center justify-center dark:text-white py-[50px]">
      <section className="flex flex-col gap-2 items-start max-w-[450px] w-full">
        <h1 className="font-semibold text-lg">Choose a username</h1>
        <input
          type="text"
          name="username"
          placeholder="e.g Hipnode2023"
          value={registeredUser.username}
          onChange={handleChange}
          className="h-[50px] dark:bg-dark-black-2 bg-main-bg rounded-lg px-5 w-full"
        />
        <Link to="/sign-up/register-email">
          <button className="bg-alt-2 hover:bg-primary-orange text-white h-[50px] rounded-lg px-9 mt-5 font-bold">
            Next
          </button>
        </Link>
        <p className="mt-4">
          Already have an account?{' '}
          <Link to="/sign-in">
            <span className="text-alt-1 cursor-pointer">Sign In</span>
          </Link>
        </p>
      </section>

      <section className="flex flex-col gap-2 mt-8 w-[450px]">
        <div className="flex items-center w-full">
          <span className="flex-1 border-b border-dark-grey-1" />
          <p className="px-4 mb-1">OR</p>
          <span className="flex-1 border-b border-dark-grey-1" />
        </div>

        <div className="flex flex-col gap-2">
          <button className="dark:bg-dark-secondary-bg w-full h-[50px] rounded-lg font-semibold">
            Sign Up With Google
          </button>
          <button className="dark:bg-dark-secondary-bg w-full h-[50px] rounded-lg font-semibold">
            Sign Up With Facebook
          </button>
        </div>
      </section>
    </main>
  );
};

export default SetUserName;
