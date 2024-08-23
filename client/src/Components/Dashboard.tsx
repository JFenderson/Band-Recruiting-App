import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Welcome to the Dashboard</h1>
            {user && <p>You are logged in as: {user}</p>}

            <nav style={{ marginBottom: '20px' }}>
                <ul>
                    <li>
                        <a href="/students">View Students</a>
                    </li>
                    <li>
                        <a href="/recruiters">View Recruiters</a>
                    </li>
                    {/* Add other navigation links here */}
                </ul>
            </nav>

            <button onClick={logout}>Logout</button>
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
