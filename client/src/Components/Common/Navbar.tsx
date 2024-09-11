import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserIcon, LogOutIcon, SettingsIcon } from "lucide-react";

const Navbar: React.FC = () => {
  const { role, logout, user, profilePicture } = useAuth();
  const navigate = useNavigate();


  const pages =
    role === "Recruiter"
      ? [
          { name: "Dashboard", path: "/recruiter-profile" },
          { name: "Students", path: "/students" },
          { name: "My Students", path: "/recruiter/students" },
          { name: "Band", path: "/band" },
          { name: "Messages", path: "/recruiter/students" },
        ]
      : [
          { name: "Dashboard", path: "/student-profile" },
          { name: "Bands", path: "/bands" },
          { name: "Offers", path: "/offers" },
          { name: "Videos", path: "/videos" },
        ];

        const handleLogout = () => {
          logout();
          navigate("/login");
        };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-800">RecruiterHub</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {pages.map((page) => (
                <Link
                  key={page.name}
                  to={page.path}
                  className="text-gray-900 hover:bg-gray-100 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium transition duration-150 ease-in-out"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profilePicture || ""} alt={user || "User"} />
                    <AvatarFallback>{user!.charAt(0) || <UserIcon className="h-4 w-4" />}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/account")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
