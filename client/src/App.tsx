import React, { useEffect } from 'react';
import { Header, BottomHeader } from './components/Header';
import Routes from './routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setThemeState } from './app/themeStateSlice';

export default function App() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        dispatch(setThemeState(true));
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        dispatch(setThemeState(false));
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <>
      <Router>
        <main className="relative">
          <Routes />
        </main>
      </Router>
    </>
  );
}
