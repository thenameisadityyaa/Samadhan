// src/pages/AdminLoginPage.tsx — Samadhan Civic Design System v3
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ShieldCheck, Eye, EyeOff, ArrowRight, LockKeyhole } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address';
    if (!password.trim()) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setErrors({});
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      if (data.data.user.role !== 'admin') {
        setErrors({ general: 'Unauthorized: Admin access required.' });
        setIsLoading(false);
        return;
      }
      localStorage.setItem('adminSession', JSON.stringify({
        id: data.data.user.id,
        name: data.data.user.name,
        email: data.data.user.email,
        role: data.data.user.role,
        loginTime: new Date().toISOString()
      }));
      localStorage.setItem('adminToken', data.data.token);
      toast.success('System connection established.');
      setTimeout(() => navigate('/admin/dashboard'), 600);
    } catch (error: any) {
      setErrors({ general: error.response?.data?.message || 'Authentication failed. Please verify credentials.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[--civic-navy] font-sans">
      <Toaster position="top-right" />
      <div className="w-full max-w-md mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white flex items-center justify-center mx-auto mb-4 border border-[--civic-gray-200] shadow-sm rounded-sm">
            <ShieldCheck size={32} className="text-[--civic-navy]" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-1 uppercase tracking-widest">Administrator Portal</h1>
          <p className="text-[--civic-gray-400] text-xs font-mono uppercase tracking-wider">Authorized Governmental Access Only</p>
        </div>

        <div className="bg-white rounded-sm p-8 shadow-2xl border-t-4 border-t-[--india-saffron]">
          {errors.general && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={14} className="text-red-700" /> {errors.general}
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[--civic-navy] uppercase tracking-wider mb-2">Government Email ID</label>
              <div className={`flex items-center gap-3 border shadow-sm px-4 py-2 bg-[--civic-gray-50] ${errors.email ? 'border-red-400' : 'border-[--civic-gray-300] focus-within:border-[--civic-navy] focus-within:bg-white'}`}>
                <Mail size={16} className="text-[--civic-gray-500]" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@municipality.gov"
                  className="flex-1 outline-none text-sm text-[--civic-navy] bg-transparent" />
              </div>
              {errors.email && <p className="text-red-600 text-xs mt-1.5 font-bold uppercase tracking-wider">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[--civic-navy] uppercase tracking-wider mb-2">Security Credential</label>
              <div className={`flex items-center gap-3 border shadow-sm px-4 py-2 bg-[--civic-gray-50] ${errors.password ? 'border-red-400' : 'border-[--civic-gray-300] focus-within:border-[--civic-navy] focus-within:bg-white'}`}>
                <LockKeyhole size={16} className="text-[--civic-gray-500]" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" className="flex-1 outline-none text-sm text-[--civic-navy] bg-transparent" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[--civic-gray-400] hover:text-[--civic-navy]">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-xs mt-1.5 font-bold uppercase tracking-wider">{errors.password}</p>}
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full py-3 text-sm font-bold bg-[--civic-navy] text-white hover:bg-[--civic-navy-600] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest shadow-md transition-colors border border-[--civic-navy-700]">
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Authenticating...</>
              ) : (
                <><ShieldCheck size={16} /> Authenticate Session <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-8 space-y-2 border-t border-white/10 pt-6">
          <p className="text-[--civic-gray-400] text-[10px] uppercase tracking-widest font-bold">Public Portal Navigation</p>
          <Link to="/resident/login" className="text-[--civic-gray-300] hover:text-white text-xs font-bold flex items-center justify-center gap-1">
            Access Resident Network <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
