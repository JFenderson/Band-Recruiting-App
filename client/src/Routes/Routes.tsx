import React, { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import HomePage from "../components/Home/Home";
import LoginPage from "../components/Login/Login";
import RegisterPage from "../components/Register/Register";
import DashboardPage from "../components/Dashboard";


const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

const Routes: React.FC = () => {
  return (
    <Router>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      <Route element={<PrivateRoutes />}>
      </Route>
    </Router>
  );
};

export default Routes;
