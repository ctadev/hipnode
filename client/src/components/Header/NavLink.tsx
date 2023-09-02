import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderIcon from '../Icons/HeaderIcon';

const NavLink = ({ label, path }) => {
  const location = useLocation();
  return (
    <Link to={path}>
      <li
        className={
          location.pathname === path
            ? 'bg-primary-orange p-3 rounded-md relative group header_li active'
            : 'hover:bg-primary-orange p-3 rounded-md relative group transition-all header_li'
        }
      >
        <HeaderIcon iconName={label} color="#C5D0E6" className="header_icon" />
        <p className="capitalize absolute left-1/2 -translate-x-1/2 top-14 bg-dark-secondary-bg text-white w-fit px-2 rounded-md hidden group-hover:block">
          {label}
        </p>
      </li>
    </Link>
  );
};

export default NavLink;
