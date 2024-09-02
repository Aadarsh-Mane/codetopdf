// import React from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import PdfCustomizer from './PdfCustomizer';
import AiSuggestions from './AiSuggestions';

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold">Welcome to Code2PDF</h1>
          <p className="mt-4 text-xl">Compile, Customize, and Create PDFs seamlessly.</p>
          <Link to="/editor" className="mt-8 inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition duration-300">
            Get Started
          </Link>
        </div>
      </section>

      {/* Code Editor Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800">Code Editor</h2>
          <p className="mt-4 text-lg text-gray-600">Write and compile your code online.</p>
          <div className="mt-8">
            <CodeEditor />
          </div>
          <Link to="/editor" className="mt-8 inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
            Try Now
          </Link>
        </div>
      </section>

      {/* PDF Customizer Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800">PDF Customizer</h2>
          <p className="mt-4 text-lg text-gray-600">Customize and download your code as a professional PDF.</p>
          <div className="mt-8">
            <PdfCustomizer />
          </div>
          <Link to="/customizer" className="mt-8 inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
            Customize PDF
          </Link>
        </div>
      </section>

      {/* AI Suggestions Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800">AI Suggestions</h2>
          <p className="mt-4 text-lg text-gray-600">Get AI-powered insights and suggestions.</p>
          <div className="mt-8">
            <AiSuggestions />
          </div>
          <Link to="/ai-suggestions" className="mt-8 inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
            Generate Suggestions
          </Link>
        </div>
      </section>

      
    </div>
  );
}

export default HomePage;
