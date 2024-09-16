// components/Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-4">
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard Overview
          </Link>
        </li>
        <li>
          <Link to="/students" className="hover:text-gray-300">
            Students
          </Link>
        </li>
        <li>
          <Link to="/offers" className="hover:text-gray-300">
            Offers
          </Link>
        </li>
        <li>
          <Link to="/videos" className="hover:text-gray-300">
            Videos
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="hover:text-gray-300">
            Notifications
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
