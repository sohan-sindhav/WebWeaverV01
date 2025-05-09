import { Link, useNavigate } from "react-router-dom"; // Don't forget to import useNavigate
import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/v1/auth/profile");
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout"); // Logout on backend
      setIsLoggedIn(false); // Update the logged-in state
      navigate("/login"); // Redirect to login page after logout
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold">
        <Link to="/">WebWeaver</Link>
      </div>
      <div className="flex gap-6 text-lg">
        <Link
          to="/dashboard"
          className="px-4 py-1 bg-blue-900 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          My Projects
        </Link>
        {isLoggedIn ? (
          <button
            className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
