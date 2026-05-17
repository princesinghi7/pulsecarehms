import React from 'react';
import { Activity, Sun, Moon, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight text-primary">Pulse<span className="text-foreground">Care</span></span>
            </Link>
          </div>
          <div className="hidden md:flex md:gap-x-6">
            <a href="/#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="/#departments" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Departments</a>
            <a href="/#doctors" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Doctors</a>
            <a href="/#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-muted transition-colors focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <div className="hidden md:flex gap-2">
              <Link to="/login" className="text-sm font-medium hover:text-primary px-4 py-2">Log in</Link>
              <Link to="/register" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors shadow-sm">Book Appointment</Link>
            </div>
            <button className="md:hidden p-2 rounded-md hover:bg-muted focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
