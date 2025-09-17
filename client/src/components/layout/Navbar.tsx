// src/components/layout/Navbar.tsx
import { Link } from 'react-router-dom';
import { AlertTriangle, User, Settings, LogOut, HelpCircle, FileText } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import logo from '/public/logo.svg';

export function Navbar() {
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [loginHoverTimeout, setLoginHoverTimeout] = useState<number | null>(null);
  const [profileHoverTimeout, setProfileHoverTimeout] = useState<number | null>(null);
  
  const loginDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Login dropdown handlers
  const handleLoginClick = () => {
    setLoginDropdownOpen(!loginDropdownOpen);
    setProfileDropdownOpen(false); // Close other dropdown
  };

  const handleLoginMouseEnter = () => {
    if (loginHoverTimeout) {
      clearTimeout(loginHoverTimeout);
    }
    setLoginDropdownOpen(true);
  };

  const handleLoginMouseLeave = () => {
    const timeout = setTimeout(() => {
      setLoginDropdownOpen(false);
    }, 300); // 300ms delay
    setLoginHoverTimeout(timeout);
  };

  // Profile dropdown handlers
  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
    setLoginDropdownOpen(false); // Close other dropdown
  };

  const handleProfileMouseEnter = () => {
    if (profileHoverTimeout) {
      clearTimeout(profileHoverTimeout);
    }
    setProfileDropdownOpen(true);
  };

  const handleProfileMouseLeave = () => {
    const timeout = setTimeout(() => {
      setProfileDropdownOpen(false);
    }, 300); // 300ms delay
    setProfileHoverTimeout(timeout);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-brand-page border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Name */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <img src={logo} alt="Samadhan Logo" className="w-8 h-8 rounded-full" />
            <span className="brand-accent">Samadhan</span>
          </Link>

          {/* Navigation Links (minimal) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-700 font-medium hover:text-teal-600 transition">Home</Link>
            <Link to="/about" className="text-slate-700 font-medium hover:text-teal-600 transition">About</Link>
            <Link to="/contributions" className="text-slate-700 font-medium hover:text-teal-600 transition">Our contributions</Link>
            <Link to="/careers" className="text-slate-700 font-medium hover:text-teal-600 transition">Work with us</Link>
            <Link to="/report" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">Report Issue</Link>
          </div>

          {/* Auth/Profile */}
          <div className="flex items-center space-x-4">
              {/* Login/Signup unified dropdown */}
              <div 
                ref={loginDropdownRef}
                className="relative"
                onMouseEnter={handleLoginMouseEnter}
                onMouseLeave={handleLoginMouseLeave}
              >
                <button 
                  onClick={handleLoginClick}
                  className="text-slate-700 font-medium hover:brand-accent transition"
                >
                  Login / Sign Up
                </button>
                <div className={`absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-lg py-2 transition-all duration-200 ${
                  loginDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                  <Link 
                    to="/resident/login" 
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setLoginDropdownOpen(false)}
                  >
                    Resident Login
                  </Link>
                  <Link 
                    to="/resident/signup" 
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setLoginDropdownOpen(false)}
                  >
                    Resident Sign Up
                  </Link>
                  <div className="my-1 border-t border-slate-200" />
                  <Link 
                    to="/admin/login" 
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setLoginDropdownOpen(false)}
                  >
                    Admin Login
                  </Link>
                  <Link 
                    to="/admin/signup" 
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setLoginDropdownOpen(false)}
                  >
                    Admin Sign Up
                  </Link>
                </div>
              </div>

              {/* Profile dropdown */}
              <div 
                ref={profileDropdownRef}
                className="relative"
                onMouseEnter={handleProfileMouseEnter}
                onMouseLeave={handleProfileMouseLeave}
              >
                <button 
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-semibold">
                    PR
                  </div>
                </button>
                <div className={`absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-lg py-2 transition-all duration-200 ${
                  profileDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <User size={16} /> Profile
                  </Link>
                  <Link 
                    to="/my-reports" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <FileText size={16} /> My Reports
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Settings size={16} /> Settings
                  </Link>
                  <div className="my-1 border-t border-slate-200" />
                  <Link 
                    to="/help" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <HelpCircle size={16} /> Help Center
                  </Link>
                  <Link 
                    to="/bug-report" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <AlertTriangle size={16} /> Report a Bug
                  </Link>
                  <button 
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </nav>
  );
}