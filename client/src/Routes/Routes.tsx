// src/routes/Routes.js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import RecruiterDashboard from '../pages/RecruiterDashboard';
import StudentDashboard from '../pages/StudentDashboard';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        
        {/* Private Routes */}
        <PrivateRoute path="/recruiter/dashboard" component={RecruiterDashboard} role="recruiter" />
        <PrivateRoute path="/student/dashboard" component={StudentDashboard} role="student" />
        
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}