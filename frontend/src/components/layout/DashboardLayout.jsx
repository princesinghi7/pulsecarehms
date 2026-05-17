import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Activity, Home, Calendar, FileText, Settings, 
  LogOut, Menu, Bell, Search, User as UserIcon, X, Users
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = {
    patient: [
      { name: 'Dashboard', icon: Home, path: '/dashboard/patient' },
      { name: 'Appointments', icon: Calendar, path: '/dashboard/appointments' },
      { name: 'Medical Records', icon: FileText, path: '/dashboard/records' },
      { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
    ],
    doctor: [
      { name: 'Dashboard', icon: Home, path: '/dashboard/doctor' },
      { name: 'Schedule', icon: Calendar, path: '/dashboard/schedule' },
      { name: 'Patients', icon: Users, path: '/dashboard/patients' },
      { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
    ]
  };

  const role = user?.role || 'patient';
  const links = navItems[role] || navItems.patient;

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r shadow-sm transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link to="/" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">Pulse<span className="text-primary">Care</span></span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="flex flex-col justify-between h-[calc(100vh-4rem)] overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {links.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="px-3 mt-auto pt-4 border-t">
            <button onClick={handleLogout} className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-card border-b shadow-sm z-10">
          <div className="flex items-center flex-1">
            <button 
              className="p-2 -ml-2 mr-2 lg:hidden rounded-md text-muted-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden sm:flex max-w-md w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="block w-full pl-10 pr-3 py-2 border bg-muted/50 border-transparent rounded-lg focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden sm:block">{user?.name || 'User'}</span>
            <Link to="/dashboard/settings" className="p-2 text-muted-foreground hover:text-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-destructive ring-2 ring-card"></span>
            </Link>
            <Link to="/dashboard/settings" className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
              <span className="text-sm font-bold text-primary">{user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
            </Link>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
