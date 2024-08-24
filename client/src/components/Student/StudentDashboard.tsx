//Dashboard: Overview of video uploads, feedback, and profile views.
import React, {useEffect} from 'react'
import Navbar from '../Common/Navbar'
import { useLocation } from 'react-router-dom';

const StudentDashboard = () => {
    const location = useLocation();

  useEffect(() => {
    console.log('Navigated to:', location.pathname);
  }, [location]);
  return (
    <div>
        <Navbar />
    <div>
            <h2>Student Dashboard</h2>
            {/* Add more content specific to students here */}
        </div>
    </div>
  )
}

export default StudentDashboard
