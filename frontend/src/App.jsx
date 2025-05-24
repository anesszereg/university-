import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AcademicCapIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';
import './App.css';

// Import pages
import Courses from './pages/Courses';
import Teachers from './pages/Teachers';
import Students from './pages/Students';

// Navigation Link component with active state
const NavLink = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to === '/courses' && location.pathname === '/');
  
  return (
    <Link 
      to={to} 
      className={`flex items-center py-3 px-4 rounded-lg transition-all duration-300 ${isActive 
        ? 'bg-gradient-to-r from-blue-50 to-violet-50 text-blue-600 font-medium shadow-sm border border-blue-100' 
        : 'text-gray-600 hover:bg-gray-50'}`}
    >
      {icon}
      <span className="ml-2">{children}</span>
      {isActive && (
        <span className="ml-2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"></span>
      )}
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-md mr-3">
                    <AcademicCapIcon className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Course Management</span>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <NavLink to="/courses" icon={<AcademicCapIcon className="h-5 w-5" />}>Courses</NavLink>
                <NavLink to="/teachers" icon={<UserIcon className="h-5 w-5" />}>Teachers</NavLink>
                <NavLink to="/students" icon={<UserGroupIcon className="h-5 w-5" />}>Students</NavLink>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Toaster position="top-right" toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#333333',
              padding: '16px',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E2E8F0',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#FFFFFF',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#FFFFFF',
              },
            },
          }} />
          <Routes>
            <Route path="/courses" element={<Courses />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/students" element={<Students />} />
            <Route path="/" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
