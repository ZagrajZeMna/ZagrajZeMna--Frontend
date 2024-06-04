import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      
      const decoded = jwtDecode(token);
      const isAdmin = decoded.ADMIN !== undefined;
      setCurrentUser({ token, isAdmin });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:4001/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Błąd logowania');
      }

      const responseData = await response.json();
      console.log("data:", responseData);
      const { token, username } = responseData;
      const decoded = jwtDecode(token);  
      console.log("decoded", decoded);
      const isAdmin = decoded.ADMIN !== undefined;
      console.log("isadmin", isAdmin);
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setCurrentUser({ token, isAdmin, username });
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}