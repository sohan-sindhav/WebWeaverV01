import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import axios from "../../api/axios";

export default function UserEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const template = location.state?.template;
  const editorRef = useRef(null);
  const [templateName, setTemplateName] = useState(template?.name || "");
  const [jsContent, setJsContent] = useState(template?.js || "");
  const [showJsPanel, setShowJsPanel] = useState(true);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      fromElement: false,
      height: "calc(100vh - 60px)",
      storageManager: false,
    });

    if (template) {
      editor.setComponents(template.html);
      editor.setStyle(template.css);
    }

    editorRef.current = editor;
  }, [template]);

  const handlePreview = () => {
    const editor = editorRef.current;
    const html = editor.getHtml();
    const css = editor.getCss();

    // Create a complete HTML document with proper structure
    const previewContent = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            try {
              ${jsContent}
            } catch (e) {
              console.error("Template JS error:", e);
            }
          </script>
        </body>
      </html>`;

    // Open new window and write content
    const previewWindow = window.open();
    if (previewWindow) {
      previewWindow.document.open();
      previewWindow.document.write(previewContent);
      previewWindow.document.close();
    } else {
      alert("Popup blocked! Please allow popups for this site.");
    }
  };

  const handleSave = async () => {
    if (!templateName) {
      alert("Please enter a name for your template!");
      return;
    }

    const editor = editorRef.current;
    const html = editor.getHtml();
    const css = editor.getCss();

    try {
      const response = await axios.post(
        "/api/v1/user/save",
        {
          originalTemplateId: template?._id,
          name: templateName,
          html,
          css,
          js: jsContent,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert("Template saved successfully!");
        navigate("/user/dashboard");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert(err.response?.data?.message || "Error saving template");
    }
  };

  const toggleJsPanel = () => {
    setShowJsPanel(!showJsPanel);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-semibold text-indigo-400">
          Editing: {template?.name || "New Template"}
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded w-64"
            placeholder="Enter template name"
          />

          <button
            onClick={toggleJsPanel}
            className={`px-3 py-1 rounded text-sm ${
              showJsPanel
                ? "bg-indigo-600 hover:bg-indigo-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {showJsPanel ? "Hide JS" : "Show JS"}
          </button>

          <button
            onClick={handlePreview}
            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 text-sm"
          >
            Preview
          </button>

          <button
            onClick={handleSave}
            className="bg-green-600 px-4 py-1 rounded hover:bg-green-500 text-sm"
          >
            Save
          </button>

          <button
            onClick={() => navigate("/user/dashboard")}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-400 text-sm"
          >
            Back
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* GrapesJS Editor */}
        <div id="editor" className="flex-1"></div>

        {/* JS Editor Panel - Collapsible */}
        {showJsPanel && (
          <div className="w-1/3 bg-gray-900 border-l border-gray-700 flex flex-col">
            <div className="bg-gray-800 px-4 py-2 text-sm font-medium">
              JavaScript Editor (Included in Preview)
            </div>
            <textarea
              value={jsContent}
              onChange={(e) => setJsContent(e.target.value)}
              className="flex-1 bg-gray-800 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
              placeholder="Enter JavaScript code here..."
            />
          </div>
        )}
      </div>
    </div>
  );
}
