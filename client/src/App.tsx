import React from 'react';
import { Header, BottomHeader } from './components/Header';
import Routes from './routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Router>
        <main className="relative">
          <Header />
          <Routes />
          <BottomHeader />
        </main>
      </Router>
    </>
  );
}
