/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { login as loginService, register as registerService } from '../services/authService';
import api, { setAuthToken } from '../services/apiConfig';
import {jwtDecode ,JwtPayload } from 'jwt-decode';

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
  const [authenticated, setAuthenticated] = useState(initialValue.authenticated);
  // const [role, setRole] = useState<string | null>(initialValue.role);
  // const [user, setUser] = useState<string | null>(initialValue.user);
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [tokenState, setTokenState] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    if (storedToken && storedUser && storedRole) {
      setTokenState(storedToken);
      setAuthenticated(true);
      setUser(storedUser);
      setRole(storedRole);
    } else {
      setAuthenticated(false);
    }
  }, []);


  // const handleAuthentication = (newState: boolean, userRole: string | null, userName: string | null) => {
  //   setAuthenticated(newState);
  //   setRole(userRole || null);
  //   setUser(userName || null);
  //   if (newState && userRole) {
  //     if (role === 'Student') {
  //       console.log('Navigating to /student-dashboard');
  //       navigate('/student-dashboard');
  //     } else if (role === 'Recruiter') {
  //       console.log('Navigating to /recruiter-dashboard');
  //       navigate('/recruiter-dashboard');
  //     } else {
  //       console.log('Navigating to /dashboard');
  //       navigate('/dashboard'); // Default for other roles
  //     }
  //   } else {
  //     console.log("newState:", newState);
  //     console.log("user role:", role);
  //     console.log('Navigating to /login');
  //     navigate('/login');
  //   }
  // };

  const login = async (userName: string, password: string) => {
    try {
      const { token, role } = await loginService({ userName, password });
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', userName);
      setTokenState(token);
      setAuthenticated(true);
      setRole(role);
      setUser(userName);
      navigateToDashboard(role);
      // console.log('Starting login process for username:', userName);
      // const { token } = await loginService({ userName, password });
    
      // console.log('Token received:', token);

      // // Decode the token to get the user role
      // // const decoded: any = jwtDecode(token);
      // const decoded: any = jwtDecode<JwtPayload>(token);
      // const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      // const userDecoded = decoded.sub;
      // console.log('Decoded user role from token:', userRole, userName);
      // localStorage.setItem('token', token);
      // localStorage.setItem('role', userRole);
      // localStorage.setItem('user', userName);
      // handleAuthentication(true, userRole, userName);
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
    if (role === 'Student') {
      navigate('/dashboard');
    } else if (role === 'Recruiter') {
      navigate('/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setTokenState(null);
    setAuthenticated(false);
    setUser(null);
    setRole(null);
    navigate('/login');
  };


  // const logout = () => {
  //     localStorage.removeItem('token');
  //     handleAuthentication(false, null, null);
  // };

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


