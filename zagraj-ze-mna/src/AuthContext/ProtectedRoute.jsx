import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// const ProtectedRoute = ({ element, roles }) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (roles && !roles.includes(user.role)) {
//     return <Navigate to="/" />;
//   }

//   return element;
// };

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
  };
  
export default ProtectedRoute;