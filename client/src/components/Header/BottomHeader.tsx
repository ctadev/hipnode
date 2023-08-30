import React from 'react';
import BottomNavLink from './BottomNavLink';

const BottomHeader = () => {
  return (
    <main className="bg-white dark:bg-dark-main-bg dark:text-white h-[80px] fixed left-0 bottom-0 w-full flex items-center justify-center md:hidden">
      <ul className="flex gap-[30px] items-center">
        <BottomNavLink path="/" label="home" />
        <BottomNavLink path="/meetups" label="meetup" />
        <BottomNavLink path="/groups" label="group" />
        <BottomNavLink path="/podcasts" label="podcast" />
      </ul>
    </main>
  );
};

export default BottomHeader;
