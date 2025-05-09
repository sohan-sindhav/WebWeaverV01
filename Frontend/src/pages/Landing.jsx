import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          WebWeaver
        </h1>
        <div className="flex space-x-6">
          <Link
            to="/user/login"
            className="text-sm hover:text-indigo-400 transition"
          >
            Login
          </Link>
          <Link
            to="/user/register"
            className="text-sm hover:text-indigo-400 transition"
          >
            Register
          </Link>
          <Link
            to="/dev/register"
            className="text-sm text-indigo-400 hover:text-indigo-300 transition"
          >
            Developer?
          </Link>
        </div>
      </nav>

      {/* Centered Content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Craft Stunning Websites
            </span>
          </h2>
          <h3 className="text-2xl font-bold text-white mb-6">
            With Zero Limits
          </h3>
          <p className="text-gray-400 text-lg mb-8">
            Whether you're coding from scratch or using our visual builder,
            WebWeaver gives you the power to create anything you imagine.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/user/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Start Building Free
            </Link>
            <Link
              to="/templates"
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-6 text-gray-500 text-sm border-t border-gray-700">
        © 2025 WebWeaver. All rights reserved.
      </footer>
    </div>
  );
}
