import { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function GrapesEditor() {
  const [template, setTemplate] = useState(null);
  const { templateId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`/api/v1/templates/${templateId}`);
        setTemplate(res.data.template);
      } catch (err) {
        console.error(err);
        navigate("/user/templates");
      }
    };
    fetchTemplate();
  }, [templateId, navigate]);

  useEffect(() => {
    if (template) {
      const editor = grapesjs.init({
        container: "#gjs",
        components: template.html,
        styles: template.css,
        codeViewer: true,
        showOffsets: 1,
      });
    }
  }, [template]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex justify-between items-center px-6 py-4 shadow-md bg-gray-800">
        <h1 className="text-2xl font-bold text-indigo-400">Edit Template</h1>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-6">
        <div
          id="gjs"
          className="w-full h-full border-2 border-gray-700 rounded-md"
        ></div>
      </div>
    </div>
  );
}
