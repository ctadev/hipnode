import React from 'react';
import { Link } from 'react-router-dom';
import {
  white_logo,
  dark_logo,
  dark_hipnode,
  white_hipnode,
  inbox,
  lightning,
} from '../../assets/index';
import { useSelector } from 'react-redux';

const SignInGuide = () => {
  const { theme } = useSelector((state) => state.themeState);

  return (
    <main className="relative lg:h-screen lg:w-1/2 bg-grey-2 dark:bg-dark-black-2 dark:text-white">
      <Link to="/" className="absolute left-14 top-14">
        <nav className="flex items-center gap-2 cursor-pointer">
          <img src={theme ? white_logo : dark_logo} alt="" />
          <img src={theme ? white_hipnode : dark_hipnode} alt="" />
        </nav>
      </Link>

      <section className="flex items-center justify-center h-full pt-[150px] pb-[50px] lg:pt-0 lg:pb-0">
        <div className="flex flex-col items-center justify-center gap-8 px-4 max-w-[450px] w-full">
          <h1 className="text-3xl font-bold">Sign in to Hipnode</h1>

          <ul className="flex flex-col gap-5">
            <li className="flex gap-6 items-center dark:bg-dark-main-bg bg-white p-6 rounded-lg">
              <span
                className={`dark:bg-dark-secondary-bg py-2 px-5 rounded-lg bg-[#E7FAF4]`}
              >
                <img src={inbox} alt="" className="h-[40px] w-[40px]" />
              </span>
              <p className="font-semibold">
                Did you join before February 2017? You need to connect an email
                address to your username.
              </p>
            </li>
            <li className="flex gap-6 items-center dark:bg-dark-main-bg bg-white p-6 rounded-lg">
              <span
                className={`dark:bg-dark-secondary-bg py-4 px-5 rounded-lg bg-[#FDF4EA]`}
              >
                <img src={lightning} alt="" className="h-[20px] w-[20px]" />
              </span>
              <p className="font-semibold">
                Trouble logging in?{' '}
                <span className="text-primary-orange cursor-pointer">
                  Reset
                </span>{' '}
                your password.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default SignInGuide;
