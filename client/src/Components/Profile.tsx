import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import  StudentProfileManagement from '../components/Student/ProfileManagement'
import RecruiterProfileManagement from '../components/Recruiter/ProfileManagement'
import { useLocation } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const { role } = useAuth();
    const location = useLocation();

  useEffect(() => {
    console.log('Navigated to:', location.pathname);
  }, [location]);
  console.log("role:", role);

  return (
    <div>
      {role === 'Student' && <StudentProfileManagement />}
      {role === 'Recruiter' && <RecruiterProfileManagement />}
      {/* other role-specific content */}
    </div>
  );
};

export default ProfilePage;
