// src/pages/AboutPage.tsx — India Gov Design System v3
import { BackToTop } from '../components/ui/BackToTop';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Shield, TrendingUp, Heart } from 'lucide-react';

export function AboutPage() {
  const team = [
    { name: 'Aditya Sharma', role: 'Platform Lead & Backend', init: 'AS', color: 'bg-[--india-saffron]' },
    { name: 'Himashu Kumar', role: 'Frontend & UX Design', init: 'PS', color: 'bg-[--india-green]' },
    { name: 'Abhipsha Giri', role: 'Database & Infrastructure', init: 'RK', color: 'bg-[--civic-navy]' },
    { name: 'Debasish Swain', role: 'Civic Partnerships', init: 'SP', color: 'bg-[--india-saffron]' },
  ];

  const values = [
    { icon: <Shield size={20} />, title: 'Transparency', desc: 'Every report is public-trackable. No black boxes.', color: 'border-t-[--india-saffron]' },
    { icon: <Heart size={20} />, title: 'People-First', desc: 'Designed for every citizen, regardless of tech literacy.', color: 'border-t-[--india-green]' },
    { icon: <TrendingUp size={20} />, title: 'Accountability', desc: 'Data-driven enforcement of municipal response SLAs.', color: 'border-t-[--civic-navy]' },
  ];

  return (
    <div className="text-[--civic-text]">

      {/* ── Hero ── */}
      <section
        className="relative min-h-[300px] flex items-center"
        style={{ marginTop: '66px' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1548013146-72479768bada?w=1400&q=80&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-[--civic-navy]/88" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="section-label">National Civic Portal</span>
            <span className="section-label green">About Us</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
            About <span className="text-[--india-saffron]">Samadhan</span>
          </h1>
          <p className="text-white/70 max-w-xl text-base md:text-lg">
            India's civic issue reporting platform — connecting citizens to their governments, one resolved issue at a time.
          </p>
        </div>
      </section>

      {/* ── Mission / Vision ── */}
      <section className="py-14 bg-white border-b-4 border-[--india-saffron]">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-[--civic-gray-200] rounded-lg p-7 border-t-4 border-t-[--india-saffron]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[--india-saffron] rounded flex items-center justify-center text-white">
                  <Target size={20} />
                </div>
                <h2 className="font-display font-extrabold text-xl text-[--civic-navy]">Our Mission</h2>
              </div>
              <p className="text-[--civic-gray-600] leading-relaxed text-sm">
                To empower every Indian citizen to actively participate in improving their neighbourhood by providing a transparent, accessible, and government-integrated civic issue reporting platform — free for all, accountable to all.
              </p>
            </div>
            <div className="border border-[--civic-gray-200] rounded-lg p-7 border-t-4 border-t-[--india-green]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[--india-green] rounded flex items-center justify-center text-white">
                  <Eye size={20} />
                </div>
                <h2 className="font-display font-extrabold text-xl text-[--civic-navy]">Our Vision</h2>
              </div>
              <p className="text-[--civic-gray-600] leading-relaxed text-sm">
                A Viksit Bharat where every municipality resolves citizen-reported civic issues within a defined SLA — where urban infrastructure keeps pace with the aspirations of 1.4 billion Indians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-14 bg-[#FFF8F0]">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-[--india-saffron]" />
            <div>
              <span className="section-label mb-1 inline-block">Core Principles</span>
              <h2 className="font-display text-2xl font-extrabold text-[--civic-navy]">What We Stand For</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="civic-card p-6">
                <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center text-[--india-saffron] mb-4">{icon}</div>
                <h3 className="font-display font-bold text-[--civic-navy] mb-2">{title}</h3>
                <p className="text-xs text-[--civic-gray-600] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-[--civic-navy] text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
          {[
            ['12,400+', 'Issues Resolved'],
            ['48', 'Cities Onboard'],
            ['78%', 'Resolved in 72h'],
            ['2,500+', 'Active Citizens'],
          ].map(([value, label]) => (
            <div key={label} className="text-center px-6 py-2">
              <p className="font-accent text-2xl font-bold text-[--india-saffron]">{value}</p>
              <p className="text-white/50 text-xs uppercase tracking-wide mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-14 bg-white border-b border-[--civic-gray-200]">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-[--india-green]" />
            <div>
              <span className="section-label green mb-1 inline-block">Our People</span>
              <h2 className="font-display text-2xl font-extrabold text-[--civic-navy]">The Team Behind Samadhan</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {team.map(({ name, role, init, color }) => (
              <div key={name} className="text-center">
                <div className={`w-16 h-16 rounded-lg ${color} flex items-center justify-center mx-auto mb-3 text-white font-accent font-extrabold text-xl shadow`}>
                  {init}
                </div>
                <p className="font-display font-bold text-[--civic-navy] text-sm">{name}</p>
                <p className="text-[--civic-gray-600] text-xs mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[--india-saffron] py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-display text-2xl md:text-3xl font-extrabold text-white mb-2">Ready to make your city better?</p>
          <p className="text-white/80 text-sm mb-6">It's free. It's fast. It matters.</p>
          <Link to="/resident/signup" className="inline-flex items-center gap-2 bg-white text-[--india-saffron] font-extrabold py-3 px-8 rounded hover:bg-orange-50 transition-colors">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
