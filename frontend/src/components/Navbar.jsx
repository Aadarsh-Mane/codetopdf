import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-shrink-0">
            <img src={logo} alt='image' className='w-12 mr-2'/>
            <Link to="/" className="text-2xl font-semibold text-gray-800 hover:text-gray-600">
              Code2PDF
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-lg font-medium text-gray-700 hover:text-gray-500 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/editor"
              className="text-lg font-medium text-gray-700 hover:text-gray-500 transition duration-300"
            >
              Code Editor
            </Link>
            <Link
              to="/customizer"
              className="text-lg font-medium text-gray-700 hover:text-gray-500 transition duration-300"
            >
              PDF Customizer
            </Link>
            <Link
              to="/done"
              className="text-lg font-medium text-gray-700 hover:text-gray-500 transition duration-300"
            >
              collab
            </Link>
            <Link
              to="/ai-suggestions"
              className="text-lg font-medium text-gray-700 hover:text-gray-500 transition duration-300"
            >
              AI Suggestions
            </Link>
            <Link
              to="/collaborate"
              className="text-lg font-medium text-gray-700 hover:text-gray-500 transition duration-300"
            >
              Collaborate
            </Link>
            {/* <Link
              to="/next-ai"
              className="text-lg font-medium text-gray-700 hover:text-gray-500 transition duration-300"
            >
              Next AI
            </Link> */}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-800 hover:text-gray-600 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block text-lg font-medium text-gray-700 hover:text-gray-500 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/editor"
            className="block text-lg font-medium text-gray-700 hover:text-gray-500 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Code Editor
          </Link>
          <Link
            to="/customizer"
            className="block text-lg font-medium text-gray-700 hover:text-gray-500 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            PDF Customizer
          </Link>
          <Link
            to="/ai-suggestions"
            className="block text-lg font-medium text-gray-700 hover:text-gray-500 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            AI Suggestions
          </Link>
          <Link
            to="/collaborate"
            className="block text-lg font-medium text-gray-700 hover:text-gray-500 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Collaborate
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
