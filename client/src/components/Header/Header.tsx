import React from 'react';
import { MainMenu, UserMenu } from './';

export default function Header() {
  return (
    <header className='sticky left-0 top-0'>
      <nav className="flex items-center justify-between bg-white dark:text-white dark:bg-dark-main-bg px-3 md:px-6 h-[80px]">
        {/* Left Side */}
        <MainMenu />

        {/* Right Side */}
        <UserMenu />
      </nav>
    </header>
  );
}
