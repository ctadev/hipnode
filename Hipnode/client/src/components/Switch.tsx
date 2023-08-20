import React, { useEffect, useState } from 'react';

const Switch = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <article>
      <label className="toggle-switch">
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === 'dark'}
        />
        <span className="switch"></span>
      </label>
    </article>
  );
};

export default Switch;
