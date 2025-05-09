import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function DevTemplateUpload() {
  const [name, setName] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [category, setCategory] = useState("Other");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const categoryOptions = [
    "Portfolio",
    "Business",
    "E-commerce",
    "Blog",
    "Landing Page",
    "Educational",
    "SaaS",
    "Agency",
    "Event",
    "Resume",
    "Restaurant",
    "Travel",
    "Photography",
    "Health & Fitness",
    "Real Estate",
    "Technology",
    "Non-Profit",
    "Entertainment",
    "Finance",
    "Other",
  ];

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        "/api/v1/templates/create",
        { name, html, css, js, category },
        { withCredentials: true }
      );
      setSuccess("Template uploaded successfully!");
      setError(null);
      setTimeout(() => navigate("/dev/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload template");
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Navbar */}
      <div className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-2xl font-bold text-indigo-400">Developer Portal</h1>
        <button
          onClick={() => navigate("/dev/dashboard")}
          className="text-sm text-gray-300 hover:text-indigo-400 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-indigo-400">
                Upload New Template
              </h2>
              <p className="text-gray-400 text-sm">
                Create and publish a new template to the marketplace
              </p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleUpload} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-900/50 border border-red-800 text-red-300 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-900/50 border border-green-800 text-green-300 px-4 py-3 rounded-md">
                  {success}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Template Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Template Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="My Awesome Template"
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Column - Preview Placeholder */}
                <div className="bg-gray-800 border border-gray-700 rounded-md h-full flex items-center justify-center">
                  <div className="text-center p-4 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                    <p>Template preview will appear here</p>
                  </div>
                </div>
              </div>

              {/* Code Editors */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    HTML
                  </label>
                  <textarea
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    placeholder="<!DOCTYPE html>..."
                    required
                    className="w-full px-4 py-3 h-40 bg-gray-800 border border-gray-700 rounded-md text-white font-mono text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      CSS
                    </label>
                    <textarea
                      value={css}
                      onChange={(e) => setCss(e.target.value)}
                      placeholder="body { ... }"
                      required
                      className="w-full px-4 py-3 h-40 bg-gray-800 border border-gray-700 rounded-md text-white font-mono text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      JavaScript
                    </label>
                    <textarea
                      value={js}
                      onChange={(e) => setJs(e.target.value)}
                      placeholder="function() { ... }"
                      required
                      className="w-full px-4 py-3 h-40 bg-gray-800 border border-gray-700 rounded-md text-white font-mono text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => navigate("/dev/dashboard")}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition flex items-center justify-center min-w-24"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Upload Template"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
