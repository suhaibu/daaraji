
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import AddResource from './pages/AddResource';
import ResourceDetail from './pages/ResourceDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex bg-stone-50 font-sans rtl" dir="rtl">
        <Sidebar />
        <main className="flex-1 mr-64 p-8 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/library" element={<Library />} />
              <Route path="/add" element={<AddResource />} />
              <Route path="/resource/:id" element={<ResourceDetail />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
