import React from 'react';

const WorkItemsHeader = () => {
  return (
    <div className="border-b border-gray-200">
      <div className="px-4 md:px-6 py-3">
        <h1 className="text-base md:text-lg font-normal text-gray-800 mb-3">Work items</h1>
        
        {/* Action Bar */}
        <div className="flex items-center gap-2 md:gap-3 text-xs flex-wrap">
          <select className="border border-gray-300 rounded px-2.5 py-1.5 text-gray-700 bg-white hover:bg-gray-50 cursor-pointer text-xs">
            <option>Recently updated</option>
            <option>Recently created</option>
            <option>Recently completed</option>
          </select>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors font-medium">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="whitespace-nowrap">New Work Item</span>
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="whitespace-nowrap hidden sm:inline">Open in Queries</span>
            <span className="whitespace-nowrap sm:hidden">Queries</span>
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span className="whitespace-nowrap hidden md:inline">Column Options</span>
            <span className="whitespace-nowrap md:hidden">Columns</span>
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors hidden lg:flex">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="whitespace-nowrap">Import Work Items</span>
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors hidden xl:flex">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="whitespace-nowrap">Recycle Bin</span>
          </button>
          
          {/* More Options Menu for Mobile */}
          <button className="flex lg:hidden items-center gap-1 px-2.5 py-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors ml-auto">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkItemsHeader;
