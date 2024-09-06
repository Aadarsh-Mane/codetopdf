import { useState, useContext } from 'react';
import axios from 'axios';
import { FaPlay, FaRegClipboard, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PdfContext } from './PdfContext';

// Import CodeMirror and language-specific modules
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view'; // Import EditorView for custom styling

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const { setPdfData } = useContext(PdfContext);
  const navigate = useNavigate();

  // Handle code submission and output fetching
  const handleSubmit = async () => {
    const payload = { language, code };

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:7000/run", payload);
      setOutput(data.output);
      setPdfData({ code, output: data.output });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || "Unknown error";
      setOutput(errorMessage);
      setPdfData({ code, output: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  // Handle code copy to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  // Handle setting data for PDF generation and navigate to customizer
  const handleSendToPdf = () => {
    setPdfData({ code, output });
    navigate('/customizer');
  };

  // Set language mode based on selection
  const getLanguageMode = () => {
    switch (language) {
      case "cpp":
        return cpp();
      case "python":
        return python();
      case "java":
        return java();
      case "javascript":
        return javascript();
      default:
        return cpp();
    }
  };

  // Custom theme to change the font size
  const customTheme = EditorView.theme({
    '&.cm-editor': {
      fontSize: '22px', // Set your desired font size here
    },
    '.cm-content': {
      fontFamily: 'monospace', // Set your preferred font family here
    }
  });

  return (
    <div className="min-h-screen pt-16 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Online Code to PDF</h1>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-lg"
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="javascript">JavaScript</option>
      </select>

      <div className="relative mb-6">
        <CodeMirror
          value={code}
          height="400px"
          extensions={[getLanguageMode(), customTheme]}
          onChange={(value) => setCode(value)}
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <button
          onClick={handleSubmit}
          className={`flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? "Running..." : <FaPlay className="mr-2" />}
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
