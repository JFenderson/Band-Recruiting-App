/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import {
  BrowserRouter,
  Route,
  Navigate,
  Outlet,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Common/Navbar";
import { AuthContext, AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import StudentDashboard from "./components/Student/StudentDashboard";
import RecruiterDashboard from "./components/Recruiter/RecruiterDashboard";

// const PrivateRoutes = () => {
//   const { authenticated } = useContext(AuthContext);

//   if (!authenticated) return <Navigate to="/login" replace />;

//   return <Outlet />;
// };

const App: React.FC = () => {
    const { role } = useAuth();
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                
                {/* Protected Dashboard Routes */}
                <Route element={<ProtectedRoute allowedRoles={['Student']} />}>
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['Recruiter']} />}>
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
