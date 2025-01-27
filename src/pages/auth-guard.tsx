import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/auth.context';

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  const location = useLocation();

  // if (!token) {
  //   return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  // }

  return children;
};
