// src/pages/AdminLoginPage.tsx
import { useState } from 'react';
import { Mail, Lock, ShieldCheck } from 'lucide-react';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = 'Admin email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email';
    if (!password.trim()) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    alert('Admin login submitted');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="py-16 bg-white">
        <div className="max-w-md mx-auto px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Login</h1>
            <p className="text-slate-600 mt-2">Authorized personnel only</p>
          </div>

          <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Admin Email</label>
              <div className={`flex items-center gap-2 border rounded-lg px-3 ${errors.email ? 'border-red-300' : 'border-slate-300'}`}> 
                <Mail className="text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@samaadhan.gov"
                  className="w-full py-3 outline-none"
                />
              </div>
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className={`flex items-center gap-2 border rounded-lg px-3 ${errors.password ? 'border-red-300' : 'border-slate-300'}`}> 
                <Lock className="text-slate-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-3 outline-none"
                />
              </div>
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            <button type="submit" className="w-full brand-btn text-white font-semibold py-3 rounded-lg inline-flex items-center justify-center gap-2">
              <ShieldCheck size={18} />
              Sign In as Admin
            </button>

            <p className="text-xs text-slate-500 text-center">Access is monitored and restricted.</p>
          </form>
        </div>
      </section>
    </div>
  );
}
