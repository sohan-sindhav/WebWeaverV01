import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function DevDashboard() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get("/api/v1/templates", {
          // Changed to dev-specific endpoint
          withCredentials: true,
        });
        setTemplates(res.data.templates);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching templates");
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/dev/logout", {}, { withCredentials: true });
      localStorage.removeItem("devToken");
      localStorage.removeItem("devRole");
      navigate("/dev/login");
    } catch (err) {
      alert(err.response?.data?.message || "Logout failed");
    }
  };

  const handleCreateTemplate = () => {
    navigate("/dev/template/upload");
  };

  const handleEditTemplate = (template) => {
    navigate("/dev/template/edit", { state: { template } });
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
        <h1 className="text-2xl font-bold text-indigo-400">Developer Portal</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-300 hover:text-indigo-400 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Your Templates</h2>
            <p className="text-gray-400 text-sm mt-1">
              {templates.length} template{templates.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Template Creation Card */}
        <div className="mb-8">
          <div
            onClick={handleCreateTemplate}
            className="bg-gray-900 border-2 border-dashed border-indigo-500/30 hover:border-indigo-500/50 rounded-xl p-8 text-center cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-indigo-400 mb-1">
              Create New Template
            </h3>
            <p className="text-gray-500 text-sm">
              Design and publish a new template to the marketplace
            </p>
          </div>
        </div>

        {/* Templates List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-red-400 mb-2">
              Error loading templates
            </h3>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : templates.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <div
                key={template._id}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all hover:shadow-lg"
              >
                {/* Preview Section */}
                <div className="h-48 bg-white relative overflow-hidden">
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

                {/* Template Info Section */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-100 text-lg">
                      {template.name}
                    </h3>
                    <span className="bg-gray-800 text-indigo-400 text-xs px-3 py-1 rounded-full">
                      {template.status || "Draft"}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-4">
                    {template.category || "Uncategorized"}
                  </p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTemplate(template)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-sm font-medium transition"
                    >
                      Edit
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm font-medium transition">
                      Stats
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-medium text-gray-200 mb-2">
              No templates yet
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by creating your first template
            </p>
            <button
              onClick={handleCreateTemplate}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium transition"
            >
              Create Template
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 py-4 px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} WebWeaver Developer Platform
      </div>
    </div>
  );
}
