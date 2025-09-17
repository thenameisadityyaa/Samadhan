// src/pages/AdminSignupPage.tsx
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ShieldPlus, Eye, EyeOff } from 'lucide-react';

export function AdminSignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string;
    inviteCode?: string; 
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with a default admin for testing
  useEffect(() => {
    const existingAdmins = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    if (existingAdmins.length === 0) {
      // Create a default admin for testing
      const defaultAdmin = {
        id: '1',
        name: 'System Administrator',
        email: 'admin@samaadhan.gov',
        password: 'Admin123!',
        createdAt: new Date().toISOString(),
        role: 'admin'
      };
      localStorage.setItem('adminUsers', JSON.stringify([defaultAdmin]));
    }
  }, []);

  const validate = () => {
    const next: { 
      name?: string; 
      email?: string; 
      password?: string; 
      confirmPassword?: string;
      inviteCode?: string; 
    } = {};
    
    // Name validation
    if (!name.trim()) {
      next.name = 'Name is required';
    } else if (name.trim().length < 2) {
      next.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email address';
    } else if (!email.toLowerCase().includes('@samaadhan.gov')) {
      next.email = 'Must use official @samaadhan.gov email';
    }
    
    // Password validation
    if (!password.trim()) {
      next.password = 'Password is required';
    } else if (password.length < 8) {
      next.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])/.test(password)) {
      next.password = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(password)) {
      next.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(password)) {
      next.password = 'Password must contain at least one number';
    } else if (!/(?=.*[@$!%*?&])/.test(password)) {
      next.password = 'Password must contain at least one special character (@$!%*?&)';
    }
    
    // Confirm password validation
    if (!confirmPassword.trim()) {
      next.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      next.confirmPassword = 'Passwords do not match';
    }
    
    // Invite code validation
    if (!inviteCode.trim()) {
      next.inviteCode = 'Invite code is required';
    } else if (inviteCode !== 'ADMIN2024') {
      next.inviteCode = 'Invalid invite code';
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
      // Check if admin already exists
      const existingAdmins = JSON.parse(localStorage.getItem('adminUsers') || '[]');
      const adminExists = existingAdmins.find((admin: any) => admin.email === email.toLowerCase());
      
      if (adminExists) {
        setErrors({ general: 'An admin with this email already exists' });
        setIsLoading(false);
        return;
      }
      
      // Create new admin
      const newAdmin = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase(),
        password: password, // In production, this should be hashed
        createdAt: new Date().toISOString(),
        role: 'admin'
      };
      
      // Save to localStorage
      existingAdmins.push(newAdmin);
      localStorage.setItem('adminUsers', JSON.stringify(existingAdmins));
      
      // Show success message and redirect
      alert('Admin account created successfully! You can now login.');
      navigate('/admin/login');
      
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
            <h1 className="text-3xl font-extrabold text-slate-900">Create Admin Account</h1>
            <p className="text-slate-600 mt-2">Invite-only registration</p>
          </div>

          <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 space-y-5">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <div className={`flex items-center gap-2 border rounded-lg px-3 ${errors.name ? 'border-red-300' : 'border-slate-300'}`}>
                <User className="text-slate-400" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
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
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
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
              <div className="mt-2 text-xs text-slate-500">
                Must contain: 8+ characters, uppercase, lowercase, number, special character
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
              <div className={`flex items-center gap-2 border rounded-lg px-3 ${errors.confirmPassword ? 'border-red-300' : 'border-slate-300'}`}>
                <Lock className="text-slate-400" size={18} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
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
              <div className="mt-2 text-xs text-slate-500">
                Contact system administrator for invite code
                {process.env.NODE_ENV === 'development' && (
                  <span className="text-blue-600 font-medium"> (Dev: Use "ADMIN2024")</span>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full brand-btn text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating Account...
                </>
              ) : (
                'Create Admin Account'
              )}
            </button>
            
            <div className="text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/admin/login')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
