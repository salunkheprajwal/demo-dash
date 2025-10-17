import React, { useState } from 'react';
import { Home, Plus, Eye, Settings, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', icon: Home, path: '/' },
    // { name: 'Add Project', icon: Plus, path: '/add-project' },
    { name: 'Boards', icon: Eye, path: '/work-items' }, 
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Hamburger fixed on top-left for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md text-gray-700 hover:text-gray-900"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white shadow-md border-r border-gray-100 lg:static fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 w-64 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-4 pt-4 lg:pt-4">
          <div className="lg:hidden flex justify-end mb-2">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-100 p-1.5 rounded-md hover:bg-gray-200"
            >
              <X size={18} />
            </button>
          </div>


          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  to={item.path} 
                  key={item.name}
                  className="flex items-center space-x-2 w-full px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100 text-sm transition-colors duration-200"
                  onClick={() => setIsOpen(false)} 
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
