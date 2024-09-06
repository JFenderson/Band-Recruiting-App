import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div className="relative h-screen overflow-hidden">
            {/* Background video */}
            <video 
                autoPlay 
                loop 
                muted 
                className="absolute w-full h-full object-cover"
            >
                <source src="https://www.example.com/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay for dimming the video and adding a subtle background */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Centered content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                <h1 className="text-5xl font-bold mb-8">Welcome to the TBR</h1>
                <div className="flex space-x-4">
                    <Link 
                        to="/login" 
                        className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </Link>
                    <Link 
                        to="/register" 
                        className="px-6 py-3 bg-green-600 rounded hover:bg-green-700 transition duration-300"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
