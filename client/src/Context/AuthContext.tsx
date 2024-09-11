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
  userId: string | null;
  profilePicture: string | null;
  login: (userName: string, password: string) => Promise<void>;
  register: (
    userName: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
    bandId?: number,
    userType?: string,
  ) => Promise<void>;
  logout: () => void;
  loading: boolean; 
};

const initialValue = {
  authenticated: false,
  user: null,
  role: null,
  userId: null,
  profilePicture: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loading: false,
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
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [tokenState, setTokenState] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userId');
    const storedProfilePicture = localStorage.getItem('profilePicture') || ""; // Default to empty string if not found
  
    if (storedToken && storedUser && storedRole && storedUserId) {
      setTokenState(storedToken);
      setUserId(storedUserId);
      setAuthenticated(true);
      setUser(storedUser);
      setRole(storedRole);
      setAuthToken(storedToken);
      setProfilePicture(storedProfilePicture);
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = async (userName: string, password: string) => {
    try {
      const { token, role, refreshToken, userId } = await loginService({ userName, password });
      
      // Ensure non-null values when setting in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', userName);
      localStorage.setItem('userId', userId);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('profilePicture', profilePicture ?? ""); // Default to empty string if null
  
      setAuthToken(token);
      setAuthenticated(true);
      setRole(role);
      setUser(userName);
      setUserId(userId);
      setProfilePicture(profilePicture ?? ""); // Default to empty string if null
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
  phone: string,
  bandId?: number,
  userType?: string,
) => {
  try {
    await registerService({
      userName, email, password, firstName, lastName, phone, bandId,
      userType: ''
    });
    await login(userName, password);
  } catch (error) {
    console.error('Failed to register', error);
    throw error;
  }
};

  const navigateToDashboard = (role: string) => {
    if (role === null) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    logoutService();
    setAuthToken(null);
    localStorage.clear();
    setAuthenticated(false);
    setUser(null);
    setRole(null);
    setUserId(null);
    setProfilePicture(null);
    navigate('/login');
  };

  const refreshAuthToken = async () => {
    try {
      const newToken = await refreshTokenService();
      if (newToken) {
        localStorage.setItem('token', newToken);
        setAuthToken(newToken);
        console.log("Token refreshed successfully");
      } else {
        logout();
      }
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout(); 
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAuthToken();
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
    value={{
      authenticated,
      user,
      role,
      userId,
      profilePicture,
      login,
      register,
      logout,
      loading,  
    }}
  >
    {children}
  </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
