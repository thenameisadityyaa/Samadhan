// src/components/layout/Navbar.tsx
import { Link } from 'react-router-dom';
import { AlertTriangle, User, Settings, LogOut, HelpCircle, FileText } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-brand-page border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Name */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--brand-primary)' }}>
              <span className="text-white font-bold text-sm">SM</span>
            </div>
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
              <div className="relative group">
                <button className="text-slate-700 font-medium hover:brand-accent transition">
                  Login / Sign Up
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-lg py-2 hidden group-hover:block">
                  <Link to="/resident/login" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    Resident Login
                  </Link>
                  <Link to="/resident/signup" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    Resident Sign Up
                  </Link>
                  <div className="my-1 border-t border-slate-200" />
                  <Link to="/admin/login" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    Admin Login
                  </Link>
                  <Link to="/admin/signup" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    Admin Sign Up
                  </Link>
                </div>
              </div>

              {/* Profile dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-semibold">
                    PR
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-lg py-2 hidden group-hover:block">
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <User size={16} /> Profile
                  </Link>
                  <Link to="/my-reports" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <FileText size={16} /> My Reports
                  </Link>
                  <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Settings size={16} /> Settings
                  </Link>
                  <div className="my-1 border-t border-slate-200" />
                  <Link to="/help" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <HelpCircle size={16} /> Help Center
                  </Link>
                  <Link to="/bug-report" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <AlertTriangle size={16} /> Report a Bug
                  </Link>
                  <button className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
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