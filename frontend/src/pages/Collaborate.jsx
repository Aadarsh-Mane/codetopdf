import { useState } from 'react';
import { FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa';

const Collaborate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
    // You can use axios or fetch to send form data to your backend here
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 md:p-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Contact with Us</h1>
          <p className="text-lg text-gray-700 mb-8">
            Were excited to explore collaboration opportunities with innovative individuals and organizations.
            Fill out the form below or contact us through our social media channels to get in touch!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-900"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="flex-1 mt-4 sm:mt-0">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-900"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-900"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300 text-lg font-semibold"
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect with Us</h2>
            <p className="text-lg text-gray-600 mb-6">
              Reach out through our social media channels or contact us directly:
            </p>
            <div className="flex justify-center space-x-6">
              <a href="mailto:info@code2pdf.com" className="text-gray-900 hover:text-gray-600 transition duration-300">
                <FaEnvelope className="w-8 h-8" />
                <span className="sr-only">Email</span>
              </a>
              <a href="tel:+1234567890" className="text-gray-900 hover:text-gray-600 transition duration-300">
                <FaPhone className="w-8 h-8" />
                <span className="sr-only">Phone</span>
              </a>
              <a href="https://linkedin.com/company/code2pdf" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-600 transition duration-300">
                <FaLinkedin className="w-8 h-8" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborate;
