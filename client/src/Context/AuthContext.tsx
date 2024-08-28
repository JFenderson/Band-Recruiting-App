/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, register as registerService, refreshToken as refreshTokenService, logout as logoutService } from '../services/authService';
import {setAuthToken} from '../services/apiConfig';

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  user: string | null;
  role: string | null;
  setAuthenticated: (newState: boolean) => void;
  login: (userName: string, password: string) => Promise<void>;
  register: (
    userName: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    bandId?: number
  ) => Promise<void>;
  logout: () => void;
};

const initialValue = {
  authenticated: false,
  user: null,
  role: null,
  setAuthenticated: () => {},
  login: async () => {},
  register: async () => {},
  logout: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState<boolean>(initialValue.authenticated);
  const [user, setUser] = useState<string | null>(initialValue.user);
  const [role, setRole] = useState<string | null>(initialValue.role);
  const [token, setTokenState] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userId');
  

    if (storedToken && storedUser && storedRole && storedUserId) {
      setTokenState(storedToken);
      setUserId(storedUserId);
      setAuthenticated(true);
      setUser(storedUser);
      setRole(storedRole);
      setAuthToken(storedToken);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const login = async (userName: string, password: string) => {
    try {
        const { token, role, refreshToken, userId } = await loginService({ userName, password });
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('user', userName);
        localStorage.setItem('userId', userId); 
        localStorage.setItem('refreshToken', refreshToken);
        console.log('refreshToken', refreshToken)
        setAuthToken(token); // Set the token in the Authorization header
        setAuthenticated(true);
        setRole(role);
        setUser(userName);
        setUserId(userId);
        navigateToDashboard(role);
    } catch (error) {
        console.error('Failed to login', error);
        throw error;
    }
};


  const register = async (
    userName: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    bandId?: number
  ) => {
    try {
      await registerService({ userName, email, password, firstName, lastName, bandId });
      await login(userName, password); // Automatically login after registration
    } catch (error) {
      console.error('Failed to register', error);
      throw error;
    }
  };

  const navigateToDashboard = (role: string) => {
    if (role === null) {
      navigate('/login');
    } else {
      navigate('/dashboard'); // Default for other roles
    }
  };

  const logout = () => {
    logoutService();
    setTokenState(null);
    setAuthenticated(false);
    setUser(null);
    setRole(null);
    navigate('/login');
  };

  const refreshAuthToken = async () => {
    try {
      const newToken = await refreshTokenService();
      if (newToken) {
        setTokenState(newToken);
        console.log("refreshed")
      } else {
        logout();
      }
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout(); // If token refresh fails, logout the user
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAuthToken();
    }, 15 * 60 * 1000); // Refresh every 15 minutes or based on your token's expiry

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        role,
        setAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
