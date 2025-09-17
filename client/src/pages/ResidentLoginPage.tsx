// src/pages/ResidentLoginPage.tsx
import { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function ResidentLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ 
    email?: string; 
    password?: string; 
    general?: string 
  }>({});

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
        nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        nextErrors.email = 'Enter a valid email address';
    }
    if (!password.trim()) {
        nextErrors.password = 'Password is required';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      // Send the data to your backend API's login endpoint
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the backend returns an error (e.g., wrong password), show it
        throw new Error(data.message || 'Something went wrong');
      }

      // On success, save the token and redirect the user
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token); // Save the JWT
      navigate('/dashboard'); // Redirect to the user's dashboard

    } catch (error: any) {
      // Catch any network errors or errors from the backend
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <section className="w-full max-w-md mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Resident Login</h1>
          <p className="text-slate-600 mt-2">Access your Samadhan account</p>
        </div>

        <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 space-y-5">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center text-sm">
              {errors.general}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <div className={`flex items-center gap-2 border rounded-lg px-3 ${errors.email ? 'border-red-300' : 'border-slate-300'}`}>
              <Mail className="text-slate-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full py-3 outline-none bg-transparent"
                disabled={isLoading}
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
                className="w-full py-3 outline-none bg-transparent"
                disabled={isLoading}
              />
            </div>
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg inline-flex items-center justify-center gap-2 transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>

          <p className="text-sm text-slate-600 text-center">
            Don't have an account?{' '}
            <Link to="/resident/signup" className="text-blue-600 hover:underline font-medium">
              Create one
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}