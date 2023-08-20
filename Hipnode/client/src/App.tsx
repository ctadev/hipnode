import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import {
  Posts,
  Signin,
  Signup,
  Groups,
  Group,
  Podcasts,
  Meetups,
  Profile,
  Podcast,
  Profiles,
  EditProfile,
  CreatePost,
  EditPost,
  ProtectedRoute,
} from '../src/pages';
import Home from './components/Home.tsx';
import queryClient from '../providers/queryClient';
import Navbar from './components/Navbar.tsx';

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const [theme, setTheme] = useState('');
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setTheme(prefersDarkMode ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/"
              element={
                <ProtectedRoute user={isLoggedIn}>
                  <Navbar theme={theme} setTheme={setTheme} />
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute user={isLoggedIn}>
                  <Navbar theme={theme} setTheme={setTheme} />
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:type/:id"
              element={
                <ProtectedRoute user={isLoggedIn}>
                  <Navbar theme={theme} setTheme={setTheme} />
                  <EditPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/groups/:groupId"
              element={
                <ProtectedRoute user={isLoggedIn}>
                  <Navbar theme={theme} setTheme={setTheme} />
                  <Group />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/:postId"
              element={
                <ProtectedRoute user={isLoggedIn}>
                  <Navbar theme={theme} setTheme={setTheme} />
                  <Posts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profiles/:profileId"
              element={
                <ProtectedRoute user={isLoggedIn}>
                  <Navbar theme={theme} setTheme={setTheme} />
                  <Profiles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile/:profileId"
              element={
                <ProtectedRoute user={isLoggedIn}>
                  <Navbar theme={theme} setTheme={setTheme} />
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:type/:id"
              element={
                <ProtectedRoute user={isLoggedIn}>
                  <Navbar theme={theme} setTheme={setTheme} />
                  <EditPost />
                </ProtectedRoute>
              }
            />

            <Route
              path="/groups"
              element={
                <>
                  <Navbar theme={theme} setTheme={setTheme} /> <Groups />
                </>
              }
            />
            <Route
              path="/podcasts"
              element={
                <>
                  <Navbar theme={theme} setTheme={setTheme} /> <Podcasts />
                </>
              }
            />
            <Route
              path="/podcasts/:podcastId"
              element={
                <>
                  <Navbar theme={theme} setTheme={setTheme} /> <Podcast />
                </>
              }
            />
            <Route
              path="/meetups"
              element={
                <>
                  <Navbar theme={theme} setTheme={setTheme}/> <Meetups />
                </>
              }
            />
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
