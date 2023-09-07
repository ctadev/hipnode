import React from 'react';
import NavLink from './NavLink';
import { Link } from 'react-router-dom';
import {
  white_logo,
  dark_logo,
  dark_hipnode,
  white_hipnode,
} from '../../assets/index';
import { useSelector } from 'react-redux';

const MainMenu = () => {
  const { theme } = useSelector((state) => state.themeState);
  return (
    <main className="flex items-center md:gap-[20px] lg:gap-[40px] xl:gap-[50px]">
      <Link to="/">
        <section className="flex items-center gap-2 cursor-pointer">
          <img src={theme ? white_logo : dark_logo} alt="" />
          <img
            src={theme ? white_hipnode : dark_hipnode}
            alt=""
            className="hidden lg:block"
          />
        </section>
      </Link>

      <ul className="hidden md:flex gap-[10px] lg:gap-[20px] items-center">
        <NavLink path="/" label="home" />
        <NavLink path="/meetups" label="meetup" />
        <NavLink path="/groups" label="group" />
        <NavLink path="/podcasts" label="podcast" />
      </ul>
    </main>
  );
};

export default MainMenu;
