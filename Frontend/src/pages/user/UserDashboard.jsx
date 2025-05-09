import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get("/api/v1/templates", {
          withCredentials: true,
        });
        setTemplates(res.data.templates);
        setFilteredTemplates(res.data.templates);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching templates");
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTemplates(templates);
    } else {
      const filtered = templates.filter(
        (template) =>
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTemplates(filtered);
    }
  }, [searchQuery, templates]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/user/logout", {}, { withCredentials: true });
      localStorage.removeItem("userToken");
      localStorage.removeItem("userRole");
      navigate("/user/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const generateSrcDoc = (template) => {
    return `<!DOCTYPE html>
      <html>
        <head>
          <style>
            ${template.css || ""}
            body { margin: 0; padding: 0; overflow: hidden; }
          </style>
        </head>
        <body>${template.html || ""}</body>
      </html>`;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Navbar */}
      <div className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-indigo-400">WebWeaver</h1>
          <nav className="hidden md:flex space-x-1">
            <button
              onClick={() => navigate("/user/dashboard")}
              className="px-3 py-1 text-sm rounded-md hover:bg-gray-800 transition-colors text-indigo-300 font-medium"
            >
              Templates
            </button>
            <button
              onClick={() => navigate("/user/profile")}
              className="px-3 py-1 text-sm rounded-md hover:bg-gray-800 transition-colors"
            >
              Profile
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-1.5 rounded-md transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-100">
              Templates Gallery
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {filteredTemplates.length} template
              {filteredTemplates.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search templates..."
              className="block w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-800 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-auto text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-medium text-red-400 mt-4">
              Error loading templates
            </h3>
            <p className="text-gray-400 mt-2">{error}</p>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-200 mt-4">
              {searchQuery
                ? "No matching templates found"
                : "No templates available"}
            </h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              {searchQuery
                ? "Try a different search term"
                : "Check back later for new template additions"}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {filteredTemplates.map((template) => (
              <div
                key={template._id}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="h-64 bg-white overflow-hidden relative">
                  <iframe
                    title={`preview-${template._id}`}
                    srcDoc={generateSrcDoc(template)}
                    sandbox="allow-same-origin"
                    className="w-full h-full absolute top-0 left-0 border-0"
                    style={{
                      transform: "scale(0.8)",
                      transformOrigin: "0 0",
                      width: "125%",
                      height: "125%",
                    }}
                  />
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-100 text-lg">
                      {template.name}
                    </h3>
                    <span className="bg-gray-800 text-indigo-400 text-xs px-3 py-1 rounded-full">
                      {template.category || "General"}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {template.createdBy?.username || "Unknown"}
                  </div>

                  <button
                    onClick={() =>
                      navigate("/user/editor", { state: { template } })
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors"
                  >
                    Open in Editor
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 py-4 px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} WebWeaver. All rights reserved.
      </div>
    </div>
  );
}
