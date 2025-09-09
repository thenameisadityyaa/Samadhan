// src/components/layout/Navbar.tsx
import { Link } from 'react-router-dom';
import { AlertTriangle, Users, TrendingUp } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Name */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VIX</span>
            </div>
            <span>Samaadhan</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-slate-600 font-medium hover:text-teal-600 transition">
              About
            </Link>
            <Link to="/bug-report" className="text-slate-600 font-medium hover:text-teal-600 transition">
              Report a Bug
            </Link>
            <Link to="/contributions" className="text-slate-600 font-medium hover:text-teal-600 transition">
              Our contributions
            </Link>
            <Link to="/careers" className="text-slate-600 font-medium hover:text-teal-600 transition">
              Work with us
            </Link>
            <Link to="/report" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
              Report Issue
            </Link>
          </div>

          {/* Counters and Auth Links */}
          <div className="flex items-center space-x-6">
            {/* Counters */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center gap-1 text-sm">
                <AlertTriangle className="text-red-500" size={16} />
                <span className="font-semibold text-slate-700">905</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Users className="text-blue-500" size={16} />
                <span className="font-semibold text-slate-700">1.2K</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="text-green-500" size={16} />
                <span className="font-semibold text-slate-700">2.5K</span>
              </div>
            </div>

            {/* Auth Links */}
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-slate-600 font-medium hover:text-teal-600 transition">
                Login
              </Link>
              <Link to="/register" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}