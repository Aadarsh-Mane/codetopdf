import { useState, useContext } from 'react';
import axios from 'axios';
import { FaPlay, FaRegClipboard, FaFilePdf } from 'react-icons/fa';
import { PdfContext } from './PdfContext'; // Import the context

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const { setPdfOutput } = useContext(PdfContext); // Use context to set PDF output

  // Handle code submission and output fetching
  const handleSubmit = async () => {
    const payload = {
      language: "cpp",
      code,
    };

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:7000/run", payload);
      setOutput(data.output);
      // Set PDF output in context
      setPdfOutput(data.output);
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || "Unknown error";
      setOutput(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle code copy to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  // Handle setting output for PDF generation
  const handleSendToPdf = () => {
    setPdfOutput(output);
  };

  return (
    <div className="min-h-screen pt-16 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Online Code to PDF</h1>
      <div className="relative mb-6">
        <textarea
          rows="10"
          className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
          placeholder="Write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <button
          onClick={handleSubmit}
          className={`flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? <span className="spinner-border"></span> : <FaPlay className="mr-2" />}
          {loading ? "Running..." : "Run Code"}
        </button>
        <button
          onClick={handleCopyCode}
          className="flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
        >
          <FaRegClipboard className="mr-2" />
          Copy Code
        </button>
        <button
          onClick={handleSendToPdf}
          className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          <FaFilePdf className="mr-2" />
          Send to PDF
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Output</h2>
        <pre className="p-4 border border-gray-300 rounded-lg bg-gray-50 h-64 overflow-auto">
          {output || "Output will appear here after running the code."}
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;
