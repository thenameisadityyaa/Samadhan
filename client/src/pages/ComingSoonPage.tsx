// src/pages/ComingSoonPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Clock, 
  Star, 
  ArrowLeft,
  Bell,
  Mail,
  CheckCircle,
  Zap,
  Users,
  Shield
} from 'lucide-react';
import logo from '/public/logo.svg';

export function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set launch date to more than 2 years from now (2 years and 3 months)
  const launchDate = new Date();
  launchDate.setFullYear(launchDate.getFullYear() + 2);
  launchDate.setMonth(launchDate.getMonth() + 3);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ years, days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const features = [
    {
      icon: <Zap className="text-yellow-500" size={24} />,
      title: "Lightning Fast",
      description: "Report issues in seconds with our optimized mobile interface"
    },
    {
      icon: <Users className="text-blue-500" size={24} />,
      title: "Community Driven",
      description: "Connect with neighbors and work together for better communities"
    },
    {
      icon: <Shield className="text-green-500" size={24} />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #14b8a6 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #0d9488 0%, transparent 50%)`
        }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white hover:text-teal-300 transition">
            <img src={logo} alt="Samadhan Logo" className="w-8 h-8" />
            <span>Samadhan</span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white hover:text-teal-300 transition"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 rounded-full px-4 py-2 mb-6">
              <Smartphone className="text-teal-300" size={20} />
              <span className="text-teal-300 font-medium">Mobile App</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-teal-200 to-teal-400 bg-clip-text text-transparent">
              Coming Soon!
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get ready for the most powerful civic engagement experience on your mobile device. 
              The future of community building is just around the corner.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Clock className="text-teal-400" size={24} />
              <h2 className="text-2xl font-bold text-teal-300">Launch Countdown</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
              {[
                { label: 'Years', value: timeLeft.years },
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-slate-300 uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Preview */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-teal-300">What to Expect</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-white">{feature.title}</h4>
                  <p className="text-slate-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notify Me Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bell className="text-yellow-400" size={24} />
              <h3 className="text-2xl font-bold text-white">Get Notified</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Be the first to know when our mobile app launches. Get early access and exclusive updates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white/15 transition-all"
                />
              </div>
              <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                <Mail size={20} />
                Notify Me
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-400">
              <CheckCircle size={16} />
              <span>No spam, unsubscribe anytime</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="text-yellow-400 fill-current" size={20} />
              <span className="text-slate-300">Join thousands of excited users</span>
            </div>
            <div className="flex items-center justify-center gap-8 text-slate-400">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2,500+</div>
                <div className="text-sm">Web Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.8★</div>
                <div className="text-sm">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400">
            © 2023 Samadhan. All rights reserved. • Made with ❤️ for better civic engagement.
          </p>
        </div>
      </footer>
    </div>
  );
}
