// src/contexts/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../api/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Fetch current user from API or localStorage
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData);
    };
    
    fetchUser();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}