import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/layout/DashboardLayout';
import PatientDashboard from './pages/PatientDashboard';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<><Navbar theme={theme} toggleTheme={toggleTheme} /><Home /></>} />
            <Route path="/login" element={<><Navbar theme={theme} toggleTheme={toggleTheme} /><Login /></>} />
            <Route path="/register" element={<><Navbar theme={theme} toggleTheme={toggleTheme} /><Register /></>} />
            <Route path="/dashboard/patient" element={<DashboardLayout role="patient"><PatientDashboard /></DashboardLayout>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
