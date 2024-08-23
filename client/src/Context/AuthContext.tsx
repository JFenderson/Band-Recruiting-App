import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, register as registerService } from '../services/authService';

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  user: string | null;
  setAuthenticated: (newState: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
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
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthentication = (newState: boolean, userEmail?: string) => {
    setAuthenticated(newState);
    setUser(userEmail || null);
    if (newState) {
      navigate('/dashboard'); // Redirect to dashboard after login
    } else {
      navigate('/login'); // Redirect to login after logout
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { token } = await loginService({ email, password });
      localStorage.setItem('token', token);
      handleAuthentication(true, email);
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
      await login(email, password); // Automatically log in after successful registration
    } catch (error) {
      console.error('Failed to register', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    handleAuthentication(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        setAuthenticated: handleAuthentication,
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
