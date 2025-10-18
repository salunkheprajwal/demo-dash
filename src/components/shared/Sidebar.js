import React from 'react';
import PropTypes from 'prop-types';
import { Home, X } from 'lucide-react';
import { Link } from 'react-router-dom'; 

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {

  const navigation = [
    { name: 'work-items', icon: Home, path: '/' },
  ];

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md border-r border-gray-100 fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 w-64 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:self-start`}
        aria-hidden={!isOpen}
      >
        <div className="p-4 pt-4 lg:pt-4">
          <div className="lg:hidden flex justify-end mb-2">
            <button
              onClick={onClose}
              className="bg-gray-100 p-1.5 rounded-md hover:bg-gray-200"
              aria-label="Close sidebar"
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
                  onClick={onClose} 
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
