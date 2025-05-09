import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

export default function TemplateList() {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get("/api/v1/templates");
        setTemplates(res.data.templates);
      } catch (err) {
        setError("Failed to fetch templates");
      }
    };
    fetchTemplates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex justify-between items-center px-6 py-4 shadow-md bg-gray-800">
        <h1 className="text-2xl font-bold text-indigo-400">
          Available Templates
        </h1>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-6">
        {error && <div className="text-red-400 text-center">{error}</div>}

        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div
              key={template._id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-white">
                {template.name}
              </h3>
              <span className="bg-indigo-500 text-xs text-white px-2 py-1 rounded-full mt-2 inline-block">
                {template.category || "Uncategorized"}
              </span>
              <div className="mt-4">
                <Link
                  to={`/user/editor/${template._id}`}
                  className="text-indigo-600 hover:text-indigo-400"
                >
                  Edit Template
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
