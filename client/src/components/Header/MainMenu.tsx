import React from 'react';
import NavLink from './NavLink';
import {
  white_logo,
  dark_logo,
  dark_hipnode,
  white_hipnode,
} from '../../assets/index';

const MainMenu = () => {
  return (
    <main className="flex items-center md:gap-[20px] lg:gap-[80px]">
      <section className="flex items-center gap-2 cursor-pointer">
        <img src={dark_logo} alt="" />
        <img src={dark_hipnode} alt="" className="hidden lg:block" />
      </section>

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
