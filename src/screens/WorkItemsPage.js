import React, { useState } from 'react';
import WorkItemsHeader from '../components/WorkItemsHeader';
import WorkItemsTable from  '../components/WorkItemsTable';
import WorkItemsFilterBar from '../components/WorkItemsFilterBar';

const allWorkItems = [
  {
    id: 1,
    title: 'Identified and logged defects in Restaurant app',
    assignedTo: 'Nitin Arde',
    state: 'Active',
    areaPath: 'Dibba Delivery',
    activityDate: '10/15/2025 1:10:05 PM',
    comments: '',
    type: 'Bug',
    tags: 'Frontend',
  },
  {
    id: 2,
    title: 'Location API causing crashes in client app',
    assignedTo: 'Unassigned',
    state: 'New',
    areaPath: 'Dibba Delivery',
    activityDate: '10/15/2025 12:41:27 PM',
    comments: '',
    type: 'Bug',
    tags: 'API',
  },
  {
    id: 3,
    title: 'Admin Panel: Fix Tax Field Validation Bug on Admin Panel Form',
    assignedTo: 'Unassigned',
    state: 'New',
    areaPath: 'Dibba Delivery',
    activityDate: '10/15/2025 10:22:29 AM',
    comments: '',
    type: 'Task',
    tags: 'UI/UX',
  },
  {
    id: 4,
    title: 'Identify and log defects',
    assignedTo: 'Chetana Patil',
    state: 'Active',
    areaPath: 'Dibba Delivery',
    activityDate: '10/15/2025 10:22:29 AM',
    comments: '',
    type: 'Task',
    tags: 'Backend',
  },
  {
    id: 5,
    title: 'Creating the universal apk',
    assignedTo: 'Prajwal Salunkhe',
    state: 'New',
    areaPath: 'Dibba Delivery',
    activityDate: '10/15/2025 9:06:45 AM',
    comments: '1',
    type: 'Task',
    tags: 'Frontend',
  },
];
const WorkItemsPage = () => {
  const [filteredItems, setFilteredItems] = useState(allWorkItems);

  const handleFilterChange = (filters) => {
    let filtered = [...allWorkItems];

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.assignedTo.toLowerCase().includes(keyword) ||
        item.id.toString().includes(keyword)
      );
    }

    if (filters.types.length > 0) {
      filtered = filtered.filter(item => filters.types.includes(item.type));
    }

    if (filters.assignees.length > 0) {
      filtered = filtered.filter(item => filters.assignees.includes(item.assignedTo));
    }

    if (filters.states.length > 0) {
      filtered = filtered.filter(item => filters.states.includes(item.state));
    }

    if (filters.areas.length > 0) {
      filtered = filtered.filter(item => filters.areas.includes(item.areaPath));
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(item => filters.tags.includes(item.tags));
    }

    setFilteredItems(filtered);
  };

  return (
    <div className="flex flex-col bg-white">
      <WorkItemsHeader />
      <WorkItemsFilterBar onFilterChange={handleFilterChange} />
      <div className="p-4">
        <WorkItemsTable workItems={filteredItems} />
      </div>
    </div>
  );
};

export default WorkItemsPage;
