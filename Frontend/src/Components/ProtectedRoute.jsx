import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRole, children }) => {
  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("userRole");

  if (!token || role !== allowedRole) {
    return <Navigate to="/user/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
