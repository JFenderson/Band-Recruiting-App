import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import BandsList from "./components/Band/BandsList";
import BandProfile from "./components/Band/BandProfile";
import StudentProfilePage from "./components/Student/StudentDashboard";
import ProfileManagement from "./components/Student/ProfileManagement";
import RecruiterProfilePage from "./components/Recruiter/RecruiterDashboard";
import StudentVideoDashboard from "./components/Video/Dashboard";
import MakeOffer from "./components/Recruiter/MakeOffer";
import StudentProfile from "./components/Recruiter/StudentProfiles";
import RecruiterStudentList from "./components/Recruiter/RecruiterStudentList";
import AllStudentsList from "./components/Recruiter/AllStudentsList";
import ProfilePage from "./components/Profile";
import { Toaster } from "./components/ui/toaster";
import OfferManagement from "./components/Recruiter/OfferManagement";

// const PrivateRoutes = () => {
//   const { authenticated } = useContext(AuthContext);

//   if (!authenticated) return <Navigate to="/login" replace />;

//   return <Outlet />;
// };

const App: React.FC = () => {
    const { user } = useAuth();
    const storedUserId = localStorage.getItem('userId');

    console.log("user in App", user)

    
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
      <Routes>
                <Route index element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute allowedRoles={['Student', 'Recruiter']} />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile-update" element={<ProfilePage />} />
                </Route>
                
                {/* Protected Dashboard Routes */}
                <Route element={<ProtectedRoute allowedRoles={['Student']} />}>
                    <Route path="/student-profile-update" element={<ProfileManagement />} />
                    <Route path="/bands" element={<BandsList />} />
                    <Route path="/bands/student/:id" element={<BandProfile />} />
                    <Route path="/student-profile" element={<StudentProfilePage />} />
                    <Route path="/dashboard/student/videos" element={<StudentVideoDashboard studentId = {storedUserId!} />} />
                    
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['Recruiter']} />}>
                    <Route path="/recruiter-profile" element={<RecruiterProfilePage />} />
                    <Route path="/recruiter-profile-update" element={<ProfileManagement />} />
                    <Route path="recruiter/students" element={<RecruiterStudentList recruiterId={storedUserId!} />} />
                    <Route path="/bands" element={<BandsList />} />
                    <Route path="/bands/recruiter/:id" element={<BandProfile />} />
                    <Route path="/students" element={<AllStudentsList />} />
                    <Route path="/students/:studentId" element={<StudentProfile />} />
                    <Route path="/students/offer/:studentId" element={<OfferManagement studentId={storedUserId!} />} />
                </Route>
            </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
