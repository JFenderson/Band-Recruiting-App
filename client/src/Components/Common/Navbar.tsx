import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Home</Link>
            </div>
            <div className="navbar-menu">
                {user ? (
                    <>
                        <Link to="/students">Students</Link>
                        <Link to="/recruiters">Recruiters</Link>
                        <Link to="/bands">Bands</Link>
                        <Link to="/videos">Videos</Link>
                        <Link to="/scholarshipoffers">Scholarship Offers</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
