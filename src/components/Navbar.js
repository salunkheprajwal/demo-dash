import React from 'react';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-5 w-full">
        <div className="flex h-16 items-center">
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
