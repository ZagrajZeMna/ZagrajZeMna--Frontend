import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser === null) {
    
    return <div>Please Log in ERROR 404</div>;
  }
  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;