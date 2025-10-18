import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/shared/Sidebar';
import Navbar from './components/shared/Navbar';
import WorkItemsPage from './screens/WorkItemsPage';

const App = () => {
  // Manage sidebar open state here so Navbar and Sidebar can coordinate
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar onMenuToggle={() => setSidebarOpen(open => !open)} />
        <div className="flex flex-1">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-6 min-h-screen overflow-auto">
            <Routes>
              <Route path="/" element={<WorkItemsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
