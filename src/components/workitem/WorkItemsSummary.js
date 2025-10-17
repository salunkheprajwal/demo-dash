import React from 'react';
import PropTypes from 'prop-types';

const WorkItemsSummary = ({ workItems }) => {
  const total = workItems.length;

  const byState = workItems.reduce((acc, item) => {
    acc[item.state] = (acc[item.state] || 0) + 1;
    return acc;
  }, {});

  const byType = workItems.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-2">Work Items Summary</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="text-3xl font-bold text-gray-800">{total}</div>
          <div className="text-xs text-gray-500">Total work items</div>
        </div>

        <div className="flex-1">
          <div className="text-sm font-medium text-gray-700 mb-1">By State</div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(byState).length === 0 && <div className="text-xs text-gray-400">No data</div>}
            {Object.entries(byState).map(([state, count]) => (
              <div key={state} className="px-2 py-1 bg-gray-50 rounded text-xs text-gray-700 font-medium">
                {state}: {count}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="text-sm font-medium text-gray-700 mb-1">By Type</div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(byType).length === 0 && <div className="text-xs text-gray-400">No data</div>}
            {Object.entries(byType).map(([type, count]) => (
              <div key={type} className="px-2 py-1 bg-gray-50 rounded text-xs text-gray-700 font-medium">
                {type}: {count}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

WorkItemsSummary.propTypes = {
  workItems: PropTypes.array,
};

WorkItemsSummary.defaultProps = {
  workItems: [],
};

export default WorkItemsSummary;
