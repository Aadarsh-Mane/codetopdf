import { useState } from 'react';
import axios from 'axios';
import { FaMagic } from 'react-icons/fa';

const AiSuggestions = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [theory, setTheory] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateSuggestions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:7000/ai-suggestions", { code, output });
      setTitle(data.title);
      setBody(data.body);
      setTheory(data.theory);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error generating suggestions:", error);
      setSuggestions("Failed to fetch suggestions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">AI Suggestions</h1>
      <div className="relative mb-6">
        <textarea
          rows="5"
          className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
          placeholder="Enter your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
      </div>
      <div className="relative mb-6">
        <textarea
          rows="5"
          className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
          placeholder="Enter the output here..."
          value={output}
          onChange={(e) => setOutput(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <button
          onClick={handleGenerateSuggestions}
          className={`flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? <span className="spinner-border"></span> : <FaMagic className="mr-2" />}
          {loading ? "Generating..." : "Get Suggestions"}
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">AI Generated Title</h2>
        <p className="p-4 border border-gray-300 rounded-lg bg-gray-50">{title || "Title will appear here after generating suggestions."}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">AI Generated Body</h2>
        <p className="p-4 border border-gray-300 rounded-lg bg-gray-50">{body || "Body will appear here after generating suggestions."}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">AI Generated Theory</h2>
        <p className="p-4 border border-gray-300 rounded-lg bg-gray-50">{theory || "Theory will appear here after generating suggestions."}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-700">AI Suggestions</h2>
        <p className="p-4 border border-gray-300 rounded-lg bg-gray-50">{suggestions || "Suggestions will appear here after generating suggestions."}</p>
      </div>
    </div>
  );
};

export default AiSuggestions;
