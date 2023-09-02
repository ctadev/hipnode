import React, { useEffect } from 'react';
import { toggleThemeState } from '../../app/themeStateSlice';
import { setTheme } from '../../app/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import HeaderIcon from '../Icons/HeaderIcon';

const Theme = () => {
  const { theme } = useSelector((state) => state.themeState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(theme);
    if (theme) {
      dispatch(setTheme('dark'));
    } else {
      dispatch(setTheme('light'));
    }
  }, [theme]);

  return (
    <section className="flex gap-4 items-center border-t py-3 mt-4">
      <h2 className="text-semibold text-lg pl-4">Interface</h2>
      <div
        className={`px-3 py-2 bg-slate-300 cursor-pointer rounded-full relative after:absolute after:bg-dark-main-bg after:h-[30px] after:w-[30px] after:rounded-full after:top-[2px] h-[35px] w-[70px] ${
          theme
            ? 'after:translate-x-6 after:transition-all'
            : 'after:-translate-x-2 after:transition-all'
        }`}
        onClick={() => dispatch(toggleThemeState())}
      >
        <aside className="absolute left-0 top-0 right-0 bottom-0 z-30 flex items-center gap-4 justify-center">
          <HeaderIcon iconName="sun" color={!theme ? 'yellow' : 'gray'} />
          <HeaderIcon iconName="moon" color={theme ? 'yellow' : 'gray'} />
        </aside>
      </div>
    </section>
  );
};

export default Theme;
