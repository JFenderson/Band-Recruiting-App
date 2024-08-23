import React, { useContext } from "react";
import {
  BrowserRouter,
  Route,
  Navigate,
  Outlet,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Common/Navbar";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard";

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route element={<PrivateRoutes />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
