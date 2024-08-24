//Dashboard: Overview of scouted students, notifications, and analytics.
import React, {useEffect} from "react";
import Navbar from "../Common/Navbar";
import { useLocation } from 'react-router-dom';

const RecruiterDashboard = () => {
    const location = useLocation();

  useEffect(() => {
    console.log('Navigated to:', location.pathname);
  }, [location]);
  return (
    <div>
      <Navbar />
      <div>
        <h2>Recruiter Dashboard</h2>
        {/* Add more content specific to recruiters here */}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
