import React from 'react';
import Header from './components/Header/Header';
import Routes from './routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes />
      </Router>
    </>
  );
}
