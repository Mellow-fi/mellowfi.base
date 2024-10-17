import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 mt-12 shadow-2xl shadow-gray-900/20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">FAQs</a></li>
          </ul>
        </div>

        {/* Center Section: Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
          <p className="text-sm text-gray-400 mb-1">Email: <a href="mailto:info@mellowfinance.com" className="hover:text-blue-400 transition-colors">info@mellowfinance.com</a></p>
        </div>

        {/* Right Section: Social Media Icons */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
          <div className="flex space-x-6 text-2xl">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm text-gray-500">© 2024 Mellow Finance. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
