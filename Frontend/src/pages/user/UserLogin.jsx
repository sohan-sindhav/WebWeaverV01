import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await axios.post(
        "/api/v1/user/login",
        { email, password },
        {
          withCredentials: true, // Crucial for sessions
        }
      );
      setIsError(false);
      setMessage(res.data.message);

      // Store auth state
      localStorage.setItem("userToken", "authenticated"); // Or use a real JWT
      localStorage.setItem("userRole", res.data.role);

      navigate("/user/dashboard");
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 shadow-md bg-gray-800">
        <Link to="/" className="text-2xl font-bold text-indigo-400">
          WebWeaver
        </Link>
        <Link
          to="/user/register"
          className="text-sm text-gray-300 hover:text-indigo-400"
        >
          New here? Register
        </Link>
      </div>

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 shadow-xl rounded-xl p-8 max-w-md w-full space-y-6"
        >
          <h2 className="text-2xl font-semibold text-center text-white">
            User Login
          </h2>

          {/* Status message */}
          {message && (
            <div
              className={`text-sm text-center font-medium px-3 py-2 rounded-md ${
                isError
                  ? "text-red-400 bg-red-900/30"
                  : "text-green-400 bg-green-900/30"
              }`}
            >
              {message}
            </div>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
