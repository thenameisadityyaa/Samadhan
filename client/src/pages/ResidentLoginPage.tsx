// src/pages/ResidentLoginPage.tsx — Samadhan Civic Design System v2
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export function ResidentLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validate = () => {
    const n: typeof errors = {};
    if (!email.trim()) n.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) n.email = 'Enter a valid email';
    if (!password.trim()) n.password = 'Password is required';
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors({ general: data.message || 'Login failed. Please try again.' });
        setLoading(false);
        return;
      }
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('userData', JSON.stringify({
        name: data.data.user?.name || email.split('@')[0],
        email,
        location: data.data.user?.location || '',
        lastLogin: new Date().toISOString()
      }));
      toast.success('Welcome back!');
      setTimeout(() => navigate('/dashboard'), 600);
    } catch {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-right" />

      {/* Left panel — branding */}
      <div className="hidden lg:flex w-1/2 bg-[--civic-navy] relative overflow-hidden flex-col justify-center items-center p-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[--civic-navy] to-[--civic-teal]/30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[--civic-teal] opacity-10 blur-3xl" />
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-2xl bg-[--civic-teal]/20 border border-[--civic-teal]/30 flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={40} className="text-[--civic-teal]" />
          </div>
          <h1 className="font-display text-4xl font-extrabold text-white mb-4">Welcome Back</h1>
          <p className="text-slate-300 text-base leading-relaxed max-w-sm">
            Sign in to track your reports, get status updates, and keep making your city better.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            {[['12,400+', 'Issues Resolved'], ['78%', 'In 72 Hours'], ['4.8★', 'User Rating']].map(([val, lbl]) => (
              <div key={lbl} className="rounded-xl bg-white/10 p-4">
                <p className="font-accent text-xl font-bold text-[--civic-teal]">{val}</p>
                <p className="text-xs text-slate-400 mt-1">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center bg-[--civic-gray-50] p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <Link to="/" className="text-[--civic-teal] text-sm font-medium hover:underline">← Back to Home</Link>
            <h2 className="font-display text-3xl font-extrabold text-[--civic-navy] mt-6 mb-2">Sign In</h2>
            <p className="text-[--civic-gray-600] text-sm">New here? <Link to="/resident/signup" className="text-[--civic-teal] font-semibold hover:underline">Create a free account</Link></p>
          </div>

          {errors.general && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
              <span className="mt-0.5">⚠️</span>
              {errors.general}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[--civic-navy] mb-2">Email Address</label>
              <div className={`flex items-center gap-3 bg-white border-2 rounded-xl px-4 py-3 transition-colors ${errors.email ? 'border-red-400' : 'border-[--civic-gray-200] focus-within:border-[--civic-teal]'}`}>
                <Mail size={18} className="text-[--civic-gray-400] flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 outline-none bg-transparent text-sm text-[--civic-text]"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[--civic-navy] mb-2">Password</label>
              <div className={`flex items-center gap-3 bg-white border-2 rounded-xl px-4 py-3 transition-colors ${errors.password ? 'border-red-400' : 'border-[--civic-gray-200] focus-within:border-[--civic-teal]'}`}>
                <Lock size={18} className="text-[--civic-gray-400] flex-shrink-0" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 outline-none bg-transparent text-sm text-[--civic-text]"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-[--civic-gray-400] hover:text-[--civic-navy] transition">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="brand-btn w-full py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Signing in...</>
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-[--civic-gray-400]">
            Are you an admin? <Link to="/admin/login" className="text-[--civic-gray-600] font-semibold hover:underline">Admin Login →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}