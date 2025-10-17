import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WorkItemMobileView from './WorkItemTableMobileView';

const WorkItemsTable = ({ workItems }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const getStateColor = (state) => {
    const colors = {
      'Active': 'text-blue-600',
      'New': 'text-gray-500',
      'Design': 'text-purple-600',
      'Resolved': 'text-green-600',
      'Closed': 'text-gray-400',
    };
    return colors[state] || 'text-gray-600';
  };

  const getStateDot = (state) => {
    return state === 'Active' ? '●' : '○';
  };

  const getStateBackground = (state) => {
    const backgrounds = {
      'Active': 'bg-blue-50',
      'New': 'bg-gray-50',
      'Design': 'bg-purple-50',
      'Resolved': 'bg-green-50',
      'Closed': 'bg-gray-100',
    };
    return backgrounds[state] || 'bg-gray-50';
  };

  const getAvatarColor = (name) => {
    if (name === 'Unassigned') return 'bg-gray-400';
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
      'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        return `Today ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
      } else if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
      } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Table View - Hidden on Mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-xs min-w-[1000px]">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr className="text-left">
              <th className="px-3 py-2 font-medium text-gray-600 w-12">
                <span className="cursor-pointer hover:text-gray-900">ID</span>
              </th>
              <th className="px-3 py-2 font-medium text-gray-600 min-w-[280px]">
                <span className="cursor-pointer hover:text-gray-900">Title</span>
              </th>
              <th className="px-3 py-2 font-medium text-gray-600 min-w-[140px]">
                <span className="cursor-pointer hover:text-gray-900">Assigned To</span>
              </th>
              <th className="px-3 py-2 font-medium text-gray-600 min-w-[100px]">
                <span className="cursor-pointer hover:text-gray-900">State</span>
              </th>
              <th className="px-3 py-2 font-medium text-gray-600 min-w-[120px]">
                <span className="cursor-pointer hover:text-gray-900">Area Path</span>
              </th>
              <th className="px-3 py-2 font-medium text-gray-600 min-w-[100px]">
                <span className="cursor-pointer hover:text-gray-900">Tags</span>
              </th>
              <th className="px-3 py-2 font-medium text-gray-600 min-w-[80px] text-center">
                <span className="cursor-pointer hover:text-gray-900">Comments</span>
              </th>
              <th className="px-3 py-2 font-medium text-gray-600 min-w-[140px]">
                <span className="cursor-pointer hover:text-gray-900">Activity Date</span>
              </th>
              <th className="px-3 py-2 font-medium text-gray-600 w-8"></th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {workItems.length > 0 ? (
              workItems.map((item) => (
                <tr
                  key={item.id}
                  className="transition-all duration-150 hover:bg-gray-50"
                >
                  <td className="px-3 py-2.5 text-gray-600 font-medium">
                    {item.id}
                  </td>

                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm flex-shrink-0" title={item.type}>
                        {item.icon}
                      </span>
                      <a 
                        href="#" 
                        className="text-blue-600 hover:text-blue-700 hover:underline line-clamp-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.title}
                      </a>
                    </div>
                  </td>

                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-6 h-6 rounded-full ${getAvatarColor(item.assignedTo)} flex items-center justify-center text-xs font-medium text-white flex-shrink-0`}
                        title={item.assignedTo}
                      >
                        {item.assignedTo === 'Unassigned' ? '?' : item.assignedTo.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700 truncate">{item.assignedTo}</span>
                    </div>
                  </td>

                  <td className="px-3 py-2.5">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${getStateBackground(item.state)}`}>
                      <span className={`${getStateColor(item.state)} text-xs`}>
                        {getStateDot(item.state)}
                      </span>
                      <span className={`${getStateColor(item.state)} font-medium`}>
                        {item.state}
                      </span>
                    </span>
                  </td>

                  <td className="px-3 py-2.5 text-gray-600 truncate">
                    {item.areaPath}
                  </td>

                  <td className="px-3 py-2.5">
                    {item.tags ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {item.tags}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  <td className="px-3 py-2.5 text-center">
                    {item.comments ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                        {item.comments}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap" title={item.activityDate}>
                    {formatDate(item.activityDate)}
                  </td>

                  <td className="px-3 py-2.5">
                    <button 
                      className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1 rounded transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      title="More actions"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">No work items found</p>
                      <p className="text-xs text-gray-500 mt-1">Try adjusting your filters or search criteria</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Separate Component */}
      <WorkItemMobileView
        workItems={workItems}
        getStateColor={getStateColor}
        getStateDot={getStateDot}
        getStateBackground={getStateBackground}
        getAvatarColor={getAvatarColor}
        formatDate={formatDate}
      />
    </div>
  );
};

WorkItemsTable.propTypes = {
  workItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.node,
      type: PropTypes.string,
      assignedTo: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      areaPath: PropTypes.string.isRequired,
      tags: PropTypes.string,
      comments: PropTypes.number,
      activityDate: PropTypes.string.isRequired,
    })
  ),
};

WorkItemsTable.defaultProps = {
  workItems: [],
};

export default WorkItemsTable;
