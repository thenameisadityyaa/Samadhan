// src/pages/AdminSignupPage.tsx
import { useState } from 'react';
import { Mail, Lock, User, ShieldPlus } from 'lucide-react';

export function AdminSignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; inviteCode?: string }>({});

  const validate = () => {
    const next: { name?: string; email?: string; password?: string; inviteCode?: string } = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email';
    if (!password.trim()) next.password = 'Password is required';
    else if (password.length < 8) next.password = 'At least 8 characters';
    if (!inviteCode.trim()) next.inviteCode = 'Invite code is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    alert('Admin signup submitted');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="py-16 bg-white">
        <div className="max-w-md mx-auto px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">Create Admin Account</h1>
            <p className="text-slate-600 mt-2">Invite-only registration</p>
          </div>

          <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <div className={`flex items-center gap-2 border rounded-lg px-3 ${errors.name ? 'border-red-300' : 'border-slate-300'}`}>
                <User className="text-slate-400" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Admin name"
                  className="w-full py-3 outline-none"
                />
              </div>
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Official Email</label>
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
                  placeholder="Strong password"
                  className="w-full py-3 outline-none"
                />
              </div>
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Invite Code</label>
              <div className={`flex items-center gap-2 border rounded-lg px-3 ${errors.inviteCode ? 'border-red-300' : 'border-slate-300'}`}>
                <ShieldPlus className="text-slate-400" size={18} />
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="Enter invite code"
                  className="w-full py-3 outline-none"
                />
              </div>
              {errors.inviteCode && <p className="text-sm text-red-600 mt-1">{errors.inviteCode}</p>}
            </div>

            <button type="submit" className="w-full brand-btn text-white font-semibold py-3 rounded-lg">
              Create Admin Account
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
