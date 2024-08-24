import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { authenticated, role } = useAuth();
  const location = useLocation();
  useEffect(() => {
    console.log('Current route:', location.pathname);
  }, [location]);
  if (!authenticated) {
    
    return <Navigate to="/login" replace />;
  }

  if (role && allowedRoles.includes(role)) {
    return <Outlet />;
  }

  // Redirect if the user does not have the correct role
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;