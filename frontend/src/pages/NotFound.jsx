import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Error from '../assets/404.jpg'
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <img 
        src={Error} 
        alt="404 Not Found"
        className="w-60 h-60 mb-8"
      />
      <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
      <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="flex items-center text-blue-500 hover:text-blue-700">
        <FaArrowLeft className="mr-2" /> Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
