import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext} from "../context/AuthContext";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = "/login" }) => {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default {ProtectedRoute, PrivateRoutes};
