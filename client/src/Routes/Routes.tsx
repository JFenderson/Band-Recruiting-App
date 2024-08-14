// src/routes/Routes.js
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
import Home from '../Pages/Home/Home';
// import Login from '../Pages/Login/Login';
// import Signup from '../Pages/Signup/Signup';
// import RecruiterDashboard from '../pages/RecruiterDashboard';
// import StudentDashboard from '../pages/StudentDashboard';
import React from 'react';

function Routes() {
  return (
    <Router>
        <Route path="/" Component={Home} />
        {/* <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} /> */}
        
        {/* Private Routes */}
        {/* <PrivateRoute path="/recruiter/dashboard" component={RecruiterDashboard} role="recruiter" />
        <PrivateRoute path="/student/dashboard" component={StudentDashboard} role="student" /> */}
        
        {/* Add more routes as needed */}
    </Router>
  );
}

export default Routes;