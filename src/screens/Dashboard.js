import React from 'react';
import WorkItemsSummary from '../components/workitem/WorkItemsSummary';
import allWorkItems from '../data/workItems';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-700">
          This is your project management dashboard. You can add widgets, charts, or project stats here.
        </p>
      </div>

      <div>
        <WorkItemsSummary workItems={allWorkItems} />
      </div>
    </div>
  );
};

export default Dashboard;
