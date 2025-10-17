import React from 'react';
import PropTypes from 'prop-types';

const WorkItemMobileView = ({ workItems, getStateColor, getStateDot, getStateBackground, getAvatarColor, formatDate }) => {
  return (
    <div className="lg:hidden space-y-3">
      {workItems.length > 0 ? (
        workItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-150"
          >
            {/* Card Header */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm" title={item.type}>{item.icon}</span>
                <span className="text-xs font-semibold text-gray-600">#{item.id}</span>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-700 p-1"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                title="More actions"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <div>
                <a 
                  href="#" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline line-clamp-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.title}
                </a>
              </div>

              {/* Details Grid */}
              <div className="space-y-2 text-xs">
                {/* Assigned To */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Assigned To:</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-5 h-5 rounded-full ${getAvatarColor(item.assignedTo)} flex items-center justify-center text-xs font-medium text-white`}
                      title={item.assignedTo}
                    >
                      {item.assignedTo === 'Unassigned' ? '?' : item.assignedTo.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-700">{item.assignedTo}</span>
                  </div>
                </div>

                {/* State */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">State:</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${getStateBackground(item.state)}`}>
                    <span className={`${getStateColor(item.state)} text-xs`}>
                      {getStateDot(item.state)}
                    </span>
                    <span className={`${getStateColor(item.state)} font-medium text-xs`}>
                      {item.state}
                    </span>
                  </span>
                </div>

                {/* Area Path */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Area Path:</span>
                  <span className="text-gray-700 text-right truncate max-w-[60%]">{item.areaPath}</span>
                </div>

                {/* Tags */}
                {item.tags && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">Tags:</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      {item.tags}
                    </span>
                  </div>
                )}

                {/* Comments */}
                {item.comments && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">Comments:</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      {item.comments}
                    </span>
                  </div>
                )}

                {/* Activity Date */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-gray-500 font-medium">Last Activity:</span>
                  <span className="text-gray-700" title={item.activityDate}>{formatDate(item.activityDate)}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center gap-3">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">No work items found</p>
              <p className="text-xs text-gray-500 mt-1">Try adjusting your filters or search criteria</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

WorkItemMobileView.propTypes = {
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
  ).isRequired,
  getStateColor: PropTypes.func.isRequired,
  getStateDot: PropTypes.func.isRequired,
  getStateBackground: PropTypes.func.isRequired,
  getAvatarColor: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default WorkItemMobileView;
