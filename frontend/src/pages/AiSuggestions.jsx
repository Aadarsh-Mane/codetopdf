import { useState } from 'react';
import axios from 'axios';
import { FaMagic } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const AiSuggestions = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/generate-text', {
        prompt,
      });
      setResult(response.data.result);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate text.');
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
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <button
          onClick={handleSubmit}
          className={`flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? <span className="spinner-border"></span> : <FaMagic className="mr-2" />}
          {loading ? "Generating..." : "Get Suggestions"}
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">AI Generated Output</h2>
        <div className="p-4 border h-64 border-gray-300 rounded-lg bg-gray-50 overflow-auto">
          {result ? (
            <ReactMarkdown>{result}</ReactMarkdown>
          ) : (
            <p>Suggestions will appear here after generating.</p>
          )}
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AiSuggestions;
