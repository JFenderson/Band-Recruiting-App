import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StudentDashboard from '../components/Student/StudentDashboard'
import RecruiterDashboard from '../components/Recruiter/RecruiterDashboard'
import { useLocation } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const { role } = useAuth();
    const location = useLocation();

  useEffect(() => {
    console.log('Navigated to:', location.pathname);
  }, [location]);
  return (
    <div>
      {role === 'Student' && <StudentDashboard />}
      {role === 'Recruiter' && <RecruiterDashboard />}
      {/* other role-specific content */}
    </div>
  );
};

// const DashboardPage: React.FC = () => {
//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <p>Welcome to your dashboard!</p>
//         </div>
//     );
// };

export default DashboardPage;
