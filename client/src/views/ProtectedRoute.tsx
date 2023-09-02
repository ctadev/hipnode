import React from 'react';
import { Navigate } from 'react-router-dom';
import { Header, BottomHeader } from '../components/Header';

// interface Props {
//   user: boolean;
//   redirectPath: string;
//   children: React.ReactNode;
// }

const ProtectedRoute = ({ user, redirectPath = '/sign-up', children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <Header />
      <main className='max-w-[1400px] mx-auto'>{children}</main>
      <BottomHeader />
    </>
  );
};

export default ProtectedRoute;
