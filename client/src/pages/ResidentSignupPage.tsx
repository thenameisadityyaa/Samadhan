// src/pages/ResidentSignupPage.tsx
import { useState } from 'react';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

export function ResidentSignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirm?: string }>({});

  const validate = () => {
    const next: { name?: string; email?: string; password?: string; confirm?: string } = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email';
    if (!password.trim()) next.password = 'Password is required';
    else if (password.length < 6) next.password = 'At least 6 characters';
    if (confirm !== password) next.confirm = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    alert('Resident signup submitted');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="py-16 bg-white">
        <div className="max-w-md mx-auto px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">Create Resident Account</h1>
            <p className="text-slate-600 mt-2">Join Samaadhan and start reporting issues</p>
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
                  placeholder="Your name"
                  className="w-full py-3 outline-none"
                />
              </div>
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <div className={`flex items-center gap-2 border rounded-lg px-3 ${errors.email ? 'border-red-300' : 'border-slate-300'}`}> 
                <Mail className="text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
              <div className={`flex items-center gap-2 border rounded-lg px-3 ${errors.confirm ? 'border-red-300' : 'border-slate-300'}`}> 
                <Lock className="text-slate-400" size={18} />
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-3 outline-none"
                />
              </div>
              {errors.confirm && <p className="text-sm text-red-600 mt-1">{errors.confirm}</p>}
            </div>

            <button type="submit" className="w-full brand-btn text-white font-semibold py-3 rounded-lg inline-flex items-center justify-center gap-2">
              <UserPlus size={18} />
              Create Account
            </button>

            <p className="text-sm text-slate-600 text-center">Already have an account? <a href="/resident/login" className="text-teal-600 hover:underline">Sign in</a></p>
          </form>
        </div>
      </section>
    </div>
  );
}
