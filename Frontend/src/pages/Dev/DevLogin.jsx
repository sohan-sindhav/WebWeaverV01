import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function DevLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // In your login component
      const response = await axios.post("/api/v1/dev/login", {
        email,
        password,
      });
      localStorage.setItem("devToken", response.data.token);
      localStorage.setItem("devRole", response.data.role);
      navigate("/dev/dashboard");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex justify-between items-center px-6 py-4 shadow-md bg-gray-800">
        <Link to="/" className="text-2xl font-bold text-indigo-400">
          WebWeaver
        </Link>
        <Link
          to="/dev/register"
          className="text-sm text-gray-300 hover:text-indigo-400"
        >
          New Dev? Register
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 shadow-xl rounded-xl p-8 max-w-md w-full space-y-6"
        >
          <h2 className="text-2xl font-semibold text-center">Dev Login</h2>

          {message.text && (
            <div
              className={`text-sm text-center p-2 rounded ${
                message.type === "error" ? "text-red-400" : "text-green-400"
              }`}
            >
              {message.text}
            </div>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input"
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
