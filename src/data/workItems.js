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

const filterOptions = {
  types: ['Bug', 'Task', 'User Story', 'Epic', 'Feature'],
  assignees: ['Nitin Arde', 'Chetana Patil', 'Rahul Bendre', 'Prajwal Salunkhe', 'Unassigned'],
  states: ['New', 'Active', 'Resolved', 'Closed', 'Design'],
  areas: ['Dibba Delivery', 'Dibba Admin', 'Dibba Rider'],
  tags: ['Frontend', 'Backend', 'API', 'UI/UX', 'Database', 'Mobile', 'Critical']
};

export { allWorkItems, filterOptions };

export default allWorkItems;
