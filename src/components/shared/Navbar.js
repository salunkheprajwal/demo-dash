import React from 'react';
import PropTypes from 'prop-types';
import { Sparkles, Menu } from 'lucide-react';

const Navbar = ({ onMenuToggle }) => {
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-5 w-full">
        <div className="flex h-16 items-center">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            aria-label="Toggle menu"
            className="lg:hidden mr-3 p-1 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo and Title aligned to the left */}
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <div className="relative w-7 h-7 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
            </div>
            {/* Title hidden on mobile */}
            <span className="hidden sm:block text-sm sm:text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Project Management
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  onMenuToggle: PropTypes.func,
};
