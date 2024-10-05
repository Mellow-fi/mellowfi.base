import React from 'react';
// import '@fontawesome/fontawesome-free/css/all.min.css';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 py-6 mt-12 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
       

        {/* Right Section: Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">© 2024 Mellow Finance. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
