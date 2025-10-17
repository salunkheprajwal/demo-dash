import React, { useState } from 'react';
import WorkItemsHeader from '../components/workitem/WorkItemsHeader';
import WorkItemsTable from  '../components/workitem/WorkItemsTable';
import WorkItemsFilterBar from '../components/workitem/WorkItemsFilterBar';
import allWorkItems from '../data/workItems';
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
