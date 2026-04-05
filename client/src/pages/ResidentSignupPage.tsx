// src/pages/ResidentSignupPage.tsx — Samadhan Civic Design System v2
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export function ResidentSignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirm?: string }>({});

  const validate = () => {
    const n: typeof errors = {};
    if (!name.trim()) n.name = 'Full name is required';
    if (!email.trim()) n.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) n.email = 'Enter a valid email';
    if (!password.trim()) n.password = 'Password is required';
    else if (password.length < 6) n.password = 'At least 6 characters';
    if (confirm !== password) n.confirm = 'Passwords do not match';
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post('/api/auth/resident-signup', { name, email, password });
      toast.success('Account created! Redirecting to login…');
      setTimeout(() => navigate('/resident/login'), 1200);
    } catch (err: any) {
      if (err.response?.status === 409) toast.error('Email already registered.');
      else toast.error('Signup failed. Please try again.');
    }
  };

  const perks = ['Free forever for citizens', 'Real-time issue tracking', 'Email updates on every change', 'GPS-tagged reports'];

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-right" />

      {/* Left panel — form */}
      <div className="flex-1 flex items-center justify-center bg-[--civic-gray-50] p-6 md:p-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <Link to="/" className="text-[--civic-teal] text-sm font-medium hover:underline">← Back to Home</Link>
            <h2 className="font-display text-3xl font-extrabold text-[--civic-navy] mt-6 mb-2">Create Your Account</h2>
            <p className="text-[--civic-gray-600] text-sm">Already have one? <Link to="/resident/login" className="text-[--civic-teal] font-semibold hover:underline">Sign in</Link></p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[--civic-navy] mb-2">Full Name</label>
              <div className={`flex items-center gap-3 bg-white border-2 rounded-xl px-4 py-3 transition-colors ${errors.name ? 'border-red-400' : 'border-[--civic-gray-200] focus-within:border-[--civic-teal]'}`}>
                <User size={18} className="text-[--civic-gray-400] flex-shrink-0" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name"
                  className="flex-1 outline-none bg-transparent text-sm text-[--civic-text]" />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[--civic-navy] mb-2">Email Address</label>
              <div className={`flex items-center gap-3 bg-white border-2 rounded-xl px-4 py-3 transition-colors ${errors.email ? 'border-red-400' : 'border-[--civic-gray-200] focus-within:border-[--civic-teal]'}`}>
                <Mail size={18} className="text-[--civic-gray-400] flex-shrink-0" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                  className="flex-1 outline-none bg-transparent text-sm text-[--civic-text]" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[--civic-navy] mb-2">Password</label>
              <div className={`flex items-center gap-3 bg-white border-2 rounded-xl px-4 py-3 transition-colors ${errors.password ? 'border-red-400' : 'border-[--civic-gray-200] focus-within:border-[--civic-teal]'}`}>
                <Lock size={18} className="text-[--civic-gray-400] flex-shrink-0" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Min 6 characters" className="flex-1 outline-none bg-transparent text-sm text-[--civic-text]" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-[--civic-gray-400] hover:text-[--civic-navy]">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-sm font-semibold text-[--civic-navy] mb-2">Confirm Password</label>
              <div className={`flex items-center gap-3 bg-white border-2 rounded-xl px-4 py-3 transition-colors ${errors.confirm ? 'border-red-400' : 'border-[--civic-gray-200] focus-within:border-[--civic-teal]'}`}>
                <Lock size={18} className="text-[--civic-gray-400] flex-shrink-0" />
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Re-enter password"
                  className="flex-1 outline-none bg-transparent text-sm text-[--civic-text]" />
              </div>
              {errors.confirm && <p className="text-red-500 text-xs mt-1.5">{errors.confirm}</p>}
            </div>

            <button type="submit" className="brand-btn w-full py-3.5 text-base">
              Create Account <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Right panel — branding */}
      <div className="hidden lg:flex w-1/2 bg-[--civic-navy] flex-col justify-center items-center p-16 relative overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 bg-gradient-to-br from-[--civic-navy] to-[--civic-navy-700] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[--civic-teal] opacity-10 blur-3xl" />
        <div className="relative z-10 text-center">
          <h2 className="font-display text-4xl font-extrabold text-white mb-4">Join Samadhan</h2>
          <p className="text-slate-300 text-base mb-12 max-w-sm leading-relaxed">
            Become part of India's fastest growing civic engagement network.
          </p>
          <ul className="space-y-4 text-left">
            {perks.map(p => (
              <li key={p} className="flex items-center gap-3 text-slate-200 text-sm">
                <div className="w-6 h-6 rounded-full bg-[--civic-teal] flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={14} className="text-white" />
                </div>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
