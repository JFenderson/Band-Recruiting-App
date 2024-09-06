import React from 'react';
import { StudentTableComponent } from '../../components/Student/studentTable';

const Home: React.FC = () => (
    <div>
        <h1>Welcome to TBR</h1>
        <p>Connect with top talent.</p>
        <StudentTableComponent />
    </div>
);

export default Home;
