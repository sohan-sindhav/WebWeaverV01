import { BrowserRouter, Routes, Route } from "react-router-dom";
import DevLogin from "./pages/dev/DevLogin";
import DevRegister from "./pages/dev/DevRegister";
import DevDashboard from "./pages/dev/DevDashboard";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import UserDashboard from "./pages/user/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import DevTemplateUpload from "./pages/Dev/DevTemplateUpload";
import DevProtectedRoute from "./Components/DevProtectedRoute";
import EditorPage from "./pages/user/UserEditor"; // ← make sure this exists
import UserProfile from "./pages/user/UserProfile";

export default function Router() {
  const isAuthenticated = true; // Replace with actual auth state
  const role = "dev"; // Replace with actual user role from state or context

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Dev Routes */}
        <Route path="/dev/login" element={<DevLogin />} />
        <Route path="/dev/register" element={<DevRegister />} />
        <Route
          path="/dev/dashboard"
          element={
            <DevProtectedRoute
              isAuthenticated={isAuthenticated}
              role={role}
              allowedRole="dev"
            >
              <DevDashboard />
            </DevProtectedRoute>
          }
        />
        <Route
          path="/dev/template/upload"
          element={
            <DevProtectedRoute
              isAuthenticated={isAuthenticated}
              role={role}
              allowedRole="dev"
            >
              <DevTemplateUpload />
            </DevProtectedRoute>
          }
        />

        {/* User Routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/editor" element={<EditorPage />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              role={role}
              allowedRole="normal"
            >
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
