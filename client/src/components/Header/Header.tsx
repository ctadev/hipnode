import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <ul className="flex justify-between">
          <div className="flex justify-between gap-10">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/meetups">Meetups</Link>
            </li>
            <li>
              <Link to="/groups">Groups</Link>
            </li>
            <li>
              <Link to="/podcasts">Podcasts</Link>
            </li>
          </div>
          <div className="flex justify-between gap-10">
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
