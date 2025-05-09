import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiEdit, FiTrash2, FiUser, FiGrid } from "react-icons/fi";

export default function UserProfile() {
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, templatesRes] = await Promise.all([
          axios.get("/api/v1/user/info", { withCredentials: true }),
          axios.get("/api/v1/user/saved-templates", { withCredentials: true }),
        ]);

        setUsername(userRes.data.username || "User");
        setSavedTemplates(templatesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteTemplate = async (templateId) => {
    try {
      await axios.delete(`/api/v1/user/templates/${templateId}`, {
        withCredentials: true,
      });
      setSavedTemplates(savedTemplates.filter((t) => t._id !== templateId));
    } catch (err) {
      console.error("Error deleting template:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/user/dashboard")}
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
          >
            <FiArrowLeft className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">WebWeaver</h1>
        </div>

        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
            <FiUser className="text-indigo-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{username}</h2>
            <p className="text-sm text-gray-500">User Account</p>
          </div>
        </div>

        <nav className="space-y-2">
          <Link
            to="/user/dashboard"
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <FiGrid className="mr-3" />
            Dashboard
          </Link>
          <div className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <FiUser className="mr-3" />
            Profile
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">My Templates</h2>
            <button
              onClick={() => navigate("/user/dashboard")}
              className="flex items-center text-sm text-gray-600 hover:text-indigo-600"
            >
              <FiArrowLeft className="mr-1" />
              Back to Dashboard
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : savedTemplates.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiGrid className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No saved templates yet
              </h3>
              <p className="text-gray-500 mb-4">
                Your saved templates will appear here
              </p>
              <button
                onClick={() => navigate("/user/dashboard")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Browse Templates
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTemplates.map((template) => (
                <div
                  key={template._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Saved on {new Date(template.savedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-5 py-3 flex justify-between">
                    <button
                      onClick={() =>
                        navigate("/user/editor", { state: { template } })
                      }
                      className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      <FiEdit className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(template._id)}
                      className="flex items-center text-sm text-red-600 hover:text-red-700"
                    >
                      <FiTrash2 className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
