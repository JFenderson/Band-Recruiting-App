import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { authenticated, role, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('Current route:', location.pathname);
    console.log('Authenticated:', authenticated);
    console.log('User Role:', role);
  }, [location, authenticated, role]);

  if (loading) {
    return <div>Loading...</div>;  // Optionally render a loading state
  }

  if (!authenticated) {
    console.log('Not authenticated, redirecting to login.');
    return <Navigate to="/login" replace />;
  }

  if (role && allowedRoles.includes(role)) {
    console.log('User has the correct role, rendering protected route.');
    return <Outlet />;
  }

  // Redirect if the user does not have the correct role
  console.log('User does not have the correct role, redirecting to home.');
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
