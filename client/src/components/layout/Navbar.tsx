// src/components/layout/Navbar.tsx — India Gov Design System v3
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, User, Settings, LogOut, HelpCircle, FileText, LayoutDashboard, ChevronDown, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const loginRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) setLoginOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setProfileOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home',          to: '/' },
    { label: 'About',         to: '/about' },
    { label: 'Contributions', to: '/contributions' },
    { label: 'Work with us',  to: '/careers' },
  ];

  const isActive = (to: string) => location.pathname === to;

  return (
    <>
      {/* ── Scroll Progress Bar (india.gov.in-style) — fixed, saffron, grows with scroll %  ── */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="fixed top-0 left-0 right-0 z-[100]">
        {/* ── Main Navbar ── */}
        <nav className="bg-[--civic-navy] shadow-md">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-14">

            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              {/* Ashoka Chakra-inspired mark */}
              <div className="w-8 h-8 rounded-full border-2 border-[--india-saffron] flex items-center justify-center bg-white flex-shrink-0">
                <span className="text-[--civic-navy] font-extrabold text-xs font-accent">स</span>
              </div>
              <div className="leading-none">
                <span className="font-display font-extrabold text-white text-base tracking-tight block">Samadhan</span>
                <span className="text-[--india-saffron] text-[9px] font-accent uppercase tracking-widest">Civic Portal — India</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive(to)
                      ? 'border-[--india-saffron] text-[--india-saffron] font-semibold'
                      : 'border-transparent text-white/80 hover:text-white hover:border-white/30'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Report Issue CTA — saffron */}
              <Link
                to="/report"
                className="hidden md:inline-flex items-center gap-1.5 bg-[--india-saffron] hover:bg-[--india-saffron-700] text-white font-bold text-xs py-2 px-4 rounded transition-colors"
                style={{ letterSpacing: '0.05em' }}
              >
                REPORT ISSUE
              </Link>

              {/* Login dropdown */}
              <div ref={loginRef} className="relative hidden md:block">
                <button
                  onClick={() => { setLoginOpen(o => !o); setProfileOpen(false); }}
                  className="flex items-center gap-1 text-sm text-white/80 hover:text-white font-medium transition-colors py-4"
                >
                  Login / Sign Up
                  <ChevronDown size={14} className={`transition-transform ${loginOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute right-0 top-full w-52 bg-white border border-[--civic-gray-200] shadow-lg py-1 rounded transition-all duration-150 ${loginOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  <p className="px-4 pt-2 pb-1 text-xs font-bold text-[--civic-gray-400] uppercase tracking-widest">Resident</p>
                  <Link to="/resident/login"  onClick={() => setLoginOpen(false)} className="block px-4 py-2 text-sm text-[--civic-navy] hover:bg-orange-50 transition-colors">Sign In</Link>
                  <Link to="/resident/signup" onClick={() => setLoginOpen(false)} className="block px-4 py-2 text-sm text-[--civic-navy] hover:bg-orange-50 transition-colors">Create Account</Link>
                  <div className="my-1 border-t border-[--civic-gray-200]" />
                  <p className="px-4 pt-2 pb-1 text-xs font-bold text-[--civic-gray-400] uppercase tracking-widest">Admin</p>
                  <Link to="/admin/login"     onClick={() => setLoginOpen(false)} className="block px-4 py-2 text-sm text-[--civic-navy] hover:bg-orange-50 transition-colors">Admin Login</Link>
                </div>
              </div>

              {/* Profile avatar */}
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => { setProfileOpen(o => !o); setLoginOpen(false); }}
                  className="w-8 h-8 rounded-full bg-[--india-green] flex items-center justify-center text-white text-xs font-bold font-accent hover:bg-[--india-green-700] transition-colors border-2 border-white/20"
                >
                  PR
                </button>
                <div className={`absolute right-0 top-full w-52 bg-white border border-[--civic-gray-200] shadow-lg py-1 rounded transition-all duration-150 ${profileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  <Link to="/dashboard"  onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-[--civic-navy] hover:bg-orange-50 transition-colors"><LayoutDashboard size={14} />Dashboard</Link>
                  <Link to="/profile"    onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-[--civic-navy] hover:bg-orange-50 transition-colors"><User size={14} />Profile</Link>
                  <Link to="/my-reports" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-[--civic-navy] hover:bg-orange-50 transition-colors"><FileText size={14} />My Reports</Link>
                  <Link to="/settings"   onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-[--civic-navy] hover:bg-orange-50 transition-colors"><Settings size={14} />Settings</Link>
                  <div className="my-1 border-t border-[--civic-gray-200]" />
                  <Link to="/help"       onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-[--civic-navy] hover:bg-orange-50 transition-colors"><HelpCircle size={14} />Help Center</Link>
                  <Link to="/bug-report" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-[--civic-navy] hover:bg-orange-50 transition-colors"><AlertTriangle size={14} />Report a Bug</Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"><LogOut size={14} />Logout</button>
                </div>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                className="md:hidden w-8 h-8 flex items-center justify-center text-white hover:text-[--india-saffron] transition-colors"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-[--civic-navy-800] border-t border-white/10">
          <div className="divide-y divide-white/10">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`block px-6 py-3.5 text-sm font-medium ${isActive(to) ? 'text-[--india-saffron]' : 'text-white/80'}`}
              >
                {label}
              </Link>
            ))}
            <div className="px-6 py-4 flex flex-col gap-3">
              <Link to="/report" className="inline-flex justify-center items-center bg-[--india-saffron] text-white font-bold text-xs py-2.5 px-5 rounded" style={{ letterSpacing: '0.05em' }}>
                REPORT ISSUE
              </Link>
              <Link to="/resident/login"  className="text-sm text-white/70 py-1">Resident Login</Link>
              <Link to="/resident/signup" className="text-sm text-white/70 py-1">Create Account</Link>
              <Link to="/admin/login"     className="text-sm text-white/40 py-1 text-xs">Admin Login</Link>
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  );
}