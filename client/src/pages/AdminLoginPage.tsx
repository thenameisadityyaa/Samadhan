// src/pages/AdminLoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email address';
    }
    if (!password.trim()) {
      next.password = 'Password is required';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Get stored admin users
      const storedAdmins = JSON.parse(localStorage.getItem('adminUsers') || '[]');
      
      // Find admin with matching email
      const admin = storedAdmins.find((admin: any) => 
        admin.email === email.toLowerCase()
      );
      
      if (!admin) {
        setErrors({ general: 'No admin account found with this email' });
        setIsLoading(false);
        return;
      }
      
      // Check password (in production, this should be hashed comparison)
      if (admin.password !== password) {
        setErrors({ general: 'Invalid password' });
        setIsLoading(false);
        return;
      }
      
      // Store admin session
      localStorage.setItem('adminSession', JSON.stringify({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        loginTime: new Date().toISOString()
      }));
      
      // Redirect to dashboard
      navigate('/admin/dashboard');
      
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
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
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}
            
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
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full brand-btn text-white font-semibold py-3 rounded-lg inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Sign In as Admin
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/admin/signup')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Create one here
                </button>
              </p>
            </div>

            <p className="text-xs text-slate-500 text-center">Access is monitored and restricted.</p>
            
            {/* Development helper - remove in production */}
            {import.meta.env.DEV && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800 font-medium mb-2">Development Test Account:</p>
                <p className="text-xs text-blue-700">Email: admin@samaadhan.gov</p>
                <p className="text-xs text-blue-700">Password: Admin123!</p>
                <button
                  onClick={() => {
                    setEmail('admin@samaadhan.gov');
                    setPassword('Admin123!');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-1"
                >
                  Fill test credentials
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
