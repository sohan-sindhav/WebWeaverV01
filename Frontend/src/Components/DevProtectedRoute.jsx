import { useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "../api/axios";

export default function DevProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const devToken = localStorage.getItem("devToken");
  const devRole = localStorage.getItem("devRole");

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get("/api/v1/dev/verify", {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated && devRole === "dev");
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    verifyAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/dev/login" replace />;

  return children;
}
