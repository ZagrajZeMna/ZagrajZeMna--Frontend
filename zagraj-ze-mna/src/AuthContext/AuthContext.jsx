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
    const adminToken = localStorage.getItem('adminToken');
    if (token) {
      try {
        let isAdmin = false;
        if (adminToken) {
          const decodedAdmin = jwtDecode(adminToken);
          isAdmin = decodedAdmin.ADMIN === true;
        }
        setCurrentUser({ token, isAdmin, username: localStorage.getItem('username') });
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('https://zagrajzemna-backend.onrender.com/api/auth/signin', {
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
      const { token, username, admin } = responseData;
      let isAdmin = false;
      if (admin) {
        const decodedAdmin = jwtDecode(admin);
        isAdmin = decodedAdmin.ADMIN === true;
      }
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      if (admin) {
        localStorage.setItem('adminToken', admin); 
      }
      setCurrentUser({ token, isAdmin, username });
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('adminToken');
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