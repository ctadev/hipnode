import React from 'react';
import { Link } from 'react-router-dom';
import {
  white_logo,
  dark_logo,
  dark_hipnode,
  white_hipnode,
} from '../../assets/index';
import { useSelector } from 'react-redux';

interface Props {
  title: string;
  data: {
    img: any;
    description: string;
    bg: string;
  };
}

const Information = ({ title, data }: Props) => {
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
          <h1 className="text-3xl font-bold">{title}</h1>

          <ul className="flex flex-col gap-5">
            {data?.map((item) => (
              <li
                key={item.img}
                className="flex gap-6 items-center dark:bg-dark-main-bg bg-white p-6 rounded-lg"
              >
                <span
                  className={`dark:bg-dark-secondary-bg py-4 px-5 rounded-lg ${item.bg}`}
                >
                  <img src={item.img} alt="" className="h-[30px] w-[30px]" />
                </span>
                <p className="font-semibold">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Information;
