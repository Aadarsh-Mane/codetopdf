import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info (Code2PDF) */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold hover:text-gray-300">
              Code2PDF
            </Link>
            <p className="mt-2 text-gray-400">
              Empowering students with seamless code-to-PDF solutions. Simplify your assignments and practicals with our intuitive platform.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/editor" className="hover:text-gray-300">
                  Code Editor
                </Link>
              </li>
              <li>
                <Link to="/customizer" className="hover:text-gray-300">
                  PDF Customizer
                </Link>
              </li>
              <li>
                <Link to="/ai-suggestions" className="hover:text-gray-300">
                  AI Suggestions
                </Link>
              </li>
              <li>
                <Link to="/collaborate" className="hover:text-gray-300">
                  Collaborate
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and Contact Us */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/terms-of-service" className="hover:text-gray-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <h3 className="text-lg font-semibold mt-8">Contact Us</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="mailto:20sdevelopers4209@gmail.com" className="flex items-center hover:text-gray-300">
                  <FaEnvelope className="mr-2" /> 20sdevelopers4209@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918484049485" className="flex items-center hover:text-gray-300">
                  <FaPhoneAlt className="mr-2" /> +91 8484049485
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://www.facebook.com/people/20s-developers/61563618284219/" className="text-gray-400 hover:text-gray-300" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a href="https://x.com/20sDevelopers?t=1JVmmjgUHyWyRYSKTFVobg&s=09" className="text-gray-400 hover:text-gray-300" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/company/code2pdf" className="text-gray-400 hover:text-gray-300" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/20s__developers?utm_source=qr&igsh=MXN5a2NtOW1vc3hidg==" className="text-gray-400 hover:text-gray-300" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; 2024 20sDevelopers. All rights reserved. | <Link to="/terms-of-service" className="hover:text-gray-300">Terms of Service</Link> | <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
