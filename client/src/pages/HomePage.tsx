// src/pages/HomePage.tsx — India Gov Design System v3
import { BackToTop } from '../components/ui/BackToTop';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, Mail, Phone, Facebook, Twitter, Linkedin, Instagram,
  MapPin, Camera, Shield, Bell, TrendingUp, Users, CheckCircle
} from 'lucide-react';
import { useState } from 'react';

/* ── FAQ accordion ── */
const FAQ = ({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) => (
  <div className="border border-[--civic-gray-200] overflow-hidden rounded-sm">
    <button
      onClick={toggle}
      className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-orange-50 transition-colors"
    >
      <span className="font-display font-semibold text-[--civic-navy] text-sm md:text-base">{q}</span>
      <ChevronDown size={18} className={`flex-shrink-0 ml-4 text-[--india-saffron] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && (
      <div className="px-5 pb-5 text-sm text-[--civic-gray-600] leading-relaxed bg-orange-50 border-t border-[--civic-gray-200]">{a}</div>
    )}
  </div>
);

/* ── Service card ── */
const ServiceCard = ({
  icon, title, desc, accent = 'saffron', to
}: { icon: React.ReactNode; title: string; desc: string; accent?: 'saffron' | 'green' | 'navy'; to: string }) => (
  <Link to={to} className={`service-card ${accent === 'green' ? 'green' : accent === 'navy' ? 'navy' : ''} p-6 flex flex-col gap-3 hover:shadow-lg transition-all group block`}>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 ${accent === 'green' ? 'bg-[--india-green]' : accent === 'navy' ? 'bg-[--civic-navy]' : 'bg-[--india-saffron]'}`}>
      {icon}
    </div>
    <div>
      <h3 className="font-display font-bold text-[--civic-navy] mb-1 group-hover:text-[--india-saffron] transition-colors">{title}</h3>
      <p className="text-xs text-[--civic-gray-600] leading-relaxed">{desc}</p>
    </div>
    <span className="text-[--india-saffron] text-xs font-semibold flex items-center gap-1 mt-auto">Access Service <ArrowRight size={12} /></span>
  </Link>
);

/* ── Main Page ── */
export function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const isAuthenticated = typeof window !== 'undefined' && !!localStorage.getItem('userData');
  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  const faqs = [
    { q: 'How do I submit a civic issue?', a: 'Sign in or create a free Resident account, then click "Report Issue". Fill in the category, describe the problem, add a photo if available, and submit. The report goes directly to the relevant municipal department.' },
    { q: 'How long does it take to resolve an issue?', a: 'Response times vary by issue type and municipality, but our data shows that 78% of issues are resolved within 72 hours of submission.' },
    { q: 'Can I track my complaint after submitting?', a: 'Yes! You will receive an email confirmation with a reference ID. Log into your dashboard at any time to see real-time status updates.' },
    { q: 'Is Samadhan free for citizens?', a: 'Absolutely. Samadhan is completely free for citizens. There is no cost to report or track issues.' },
    { q: 'Which cities are currently supported?', a: 'Samadhan is actively expanding. Contact us to onboard your municipality — setup takes less than 48 hours.' },
  ];

  return (
    <div className="text-[--civic-text]">

      {/* ── Announcement Banner ── */}
      {!isAuthenticated && (
        <div className="bg-[--india-green] text-white py-2 px-4 text-center text-xs font-medium" style={{ marginTop: '70px' }}>
          🇮🇳 &nbsp;Samadhan — Empowering Citizens of India &nbsp;|&nbsp; Report civic issues in your city, track resolution in real-time &nbsp;
          <Link to="/resident/signup" className="underline font-bold hover:no-underline">Register Now →</Link>
        </div>
      )}

      {/* ── Hero — Full-bleed with India Gate image ── */}
      <section
        className="relative min-h-[520px] md:min-h-[600px] flex items-center"
        style={{ marginTop: isAuthenticated ? '66px' : '0' }}
      >
        {/* Background: India Gate / Parliament from Unsplash */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80&fit=crop')` }}
        />
        {/* Deep navy overlay with green tint on right */}
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="section-label">राष्ट्रीय नागरिक पोर्टल</span>
                <span className="section-label green">Smart City Mission</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-5">
                Report. Track.<br />
                <span className="text-[--india-saffron]">Resolve.</span>
              </h1>
              <p className="text-white/80 text-base md:text-lg max-w-md mb-8 leading-relaxed">
                Samadhan is India's open civic issue reporting platform — connecting citizens directly to their municipal government for faster, transparent resolution.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/report" className="btn-saffron text-sm font-bold flex items-center gap-2">
                  Report an Issue <ArrowRight size={16} />
                </Link>
                <Link to="/resident/signup" className="btn-outline-white text-sm font-bold">
                  Create Free Account
                </Link>
              </div>
              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-[--india-saffron]" />
                  <span className="text-white/70 text-xs">Free for citizens</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-[--india-saffron]" />
                  <span className="text-white/70 text-xs">48 cities onboard</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-[--india-saffron]" />
                  <span className="text-white/70 text-xs">78% resolved in 72h</span>
                </div>
              </div>
            </div>

            {/* Right: Quick stats panel */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <p className="text-[--india-saffron] font-accent text-xs font-bold uppercase tracking-widest mb-4">Platform Statistics</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '12,400+', label: 'Issues Resolved', color: 'border-[--india-saffron]' },
                    { value: '48', label: 'Cities Onboard', color: 'border-[--india-green]' },
                    { value: '78%', label: 'Resolved in 72h', color: 'border-[--india-saffron]' },
                    { value: '2,500+', label: 'Active Citizens', color: 'border-[--india-green]' },
                  ].map(({ value, label, color }) => (
                    <div key={label} className={`bg-white/10 rounded p-4 border-l-4 ${color}`}>
                      <p className="font-accent text-2xl font-bold text-white">{value}</p>
                      <p className="text-white/60 text-xs mt-1">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[--india-green] animate-pulse" />
                  <span className="text-white/60 text-xs">Live data · Updated in real-time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Access Services (india.gov.in style) ── */}
      <section className="bg-white border-b-4 border-[--india-saffron] py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div>
              <span className="section-label mb-2 inline-block">Citizen Services</span>
              <h2 className="font-display text-2xl font-extrabold text-[--civic-navy]">What would you like to do today?</h2>
            </div>
            <Link to="/report" className="text-[--india-saffron] text-sm font-semibold flex items-center gap-1 hover:underline">
              View all services <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ServiceCard to="/report" icon={<Camera size={22} />} title="Report a Civic Issue" desc="Broken roads, open drains, garbage dumps, power failures, or any public nuisance." accent="saffron" />
            <ServiceCard to="/my-reports" icon={<MapPin size={22} />} title="Track My Complaints" desc="Check the real-time status of all your submitted reports and reference numbers." accent="green" />
            <ServiceCard to="/resident/signup" icon={<Users size={22} />} title="Register as Citizen" desc="Create a free account to report issues, receive status emails and updates." accent="navy" />
            <ServiceCard to="/dashboard" icon={<TrendingUp size={22} />} title="View Issue Analytics" desc="City-wide resolution rates, category breakdowns, and department performance." accent="navy" />
            <ServiceCard to="/about" icon={<Shield size={22} />} title="About the Platform" desc="Learn how Samadhan works, our mission, and the team behind it." accent="green" />
            <ServiceCard to="/report" icon={<Bell size={22} />} title="Emergency Civic Issues" desc="Flag urgent issues — waterlogging, electrical hazards, structural damage." accent="saffron" />
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <span className="section-label mb-3 inline-block">Simple 3-Step Process</span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[--civic-navy]">How Samadhan Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Spot & Report', desc: 'Select a category, snap a photo, drop a GPS pin, and submit in under 60 seconds.', color: 'bg-[--india-saffron]' },
              { step: '02', title: 'Track in Real-Time', desc: 'Your report is instantly routed to the right municipal department. Follow progress via email or dashboard.', color: 'bg-[--civic-navy]' },
              { step: '03', title: 'Issue Resolved', desc: 'Resolve teams act, upload proof, and you receive a resolution confirmation email.', color: 'bg-[--india-green]' },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="bg-white rounded-lg border border-[--civic-gray-200] p-7 shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 ${color}`} />
                <p className={`font-accent text-4xl font-extrabold mb-4 ${color === 'bg-[--india-saffron]' ? 'text-[--india-saffron]' : color === 'bg-[--india-green]' ? 'text-[--india-green]' : 'text-[--civic-navy]'} opacity-20`}>{step}</p>
                <h3 className="font-display font-bold text-[--civic-navy] text-lg mb-2">{title}</h3>
                <p className="text-sm text-[--civic-gray-600] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Banner — Smart City India ── */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=80&fit=crop"
          alt="Smart City India"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[--civic-navy]/90 via-[--civic-navy]/60 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8 md:px-16">
          <div className="max-w-xl">
            <p className="text-[--india-saffron] font-accent text-xs uppercase tracking-widest mb-2 font-bold">Smart City Mission — India</p>
            <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4">Building Better Cities<br />Together with Technology</h2>
            <Link to="/resident/signup" className="btn-saffron inline-flex items-center gap-2 text-sm">
              Join 2,500+ Citizens <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="bg-[--civic-navy] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
          {[
            { value: '12,400+', label: 'Issues Resolved', icon: <CheckCircle size={20} /> },
            { value: '48', label: 'Cities Onboard', icon: <MapPin size={20} /> },
            { value: '78%', label: 'Resolved within 72h', icon: <TrendingUp size={20} /> },
            { value: '2,500+', label: 'Active Citizens', icon: <Users size={20} /> },
          ].map(({ value, label, icon }) => (
            <div key={label} className="px-6 py-4 text-center">
              <div className="text-[--india-saffron] flex justify-center mb-2">{icon}</div>
              <p className="font-accent text-2xl md:text-3xl font-bold">{value}</p>
              <p className="text-white/50 text-xs uppercase tracking-wide mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Platform Capabilities ── */}
      <section className="py-16 bg-white border-b border-[--civic-gray-200]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-1 bg-[--india-saffron]" />
            <div>
              <span className="section-label mb-1 inline-block">Platform</span>
              <h2 className="font-display text-2xl font-extrabold text-[--civic-navy]">Key Capabilities</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Camera size={18} />, title: 'Photo Evidence Upload', desc: 'Citizens attach photo proof via Cloudinary — stored securely, linked to every report.' },
              { icon: <MapPin size={18} />, title: 'GPS Location Tagging', desc: 'Every report is auto-pinned to exact GPS coordinates via the browser geolocation API.' },
              { icon: <Bell size={18} />, title: 'Email Notifications', desc: 'Automated receipts at submission and resolution confirmation sent directly to citizens.' },
              { icon: <Shield size={18} />, title: 'Role-Based Admin Access', desc: 'Separate secured dashboard for municipality admins to manage, assign, and resolve reports.' },
              { icon: <TrendingUp size={18} />, title: 'Analytics Dashboard', desc: 'Resolution rates, department workloads, and issue heatmaps — all in one live view.' },
              { icon: <Users size={18} />, title: 'Community Transparency', desc: 'Citizens can see aggregated issue maps. No anonymous black-box handling of complaints.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="civic-card p-5 flex gap-4">
                <div className="w-9 h-9 rounded bg-orange-100 flex items-center justify-center text-[--india-saffron] flex-shrink-0 mt-0.5">
                  {icon}
                </div>
                <div>
                  <p className="font-semibold text-[--civic-navy] text-sm mb-1">{title}</p>
                  <p className="text-xs text-[--civic-gray-600] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-[--india-saffron]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl md:text-2xl font-extrabold text-white mb-1">Start reporting issues in your city today.</p>
            <p className="text-white/80 text-sm">100% free for all residents. No app download needed.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link to="/resident/signup" className="inline-flex items-center justify-center gap-2 bg-white text-[--india-saffron] font-bold text-sm py-3 px-7 rounded hover:bg-orange-50 transition-colors whitespace-nowrap">
              CREATE FREE ACCOUNT <ArrowRight size={15} />
            </Link>
            <Link to="/report" className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 font-bold text-sm py-3 px-7 rounded transition-colors whitespace-nowrap">
              REPORT AN ISSUE
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-[--civic-gray-50] border-b border-[--civic-gray-200]">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-[--india-saffron]" />
            <h2 className="font-display text-xl font-extrabold text-[--civic-navy]">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQ key={i} q={faq.q} a={faq.a} open={openFaq === i} toggle={() => toggleFaq(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[--civic-navy] text-white/60">
        {/* Tricolor top bar */}
        <div className="tricolor-bar" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-full border-2 border-[--india-saffron] flex items-center justify-center bg-white">
                <span className="text-[--civic-navy] font-extrabold text-xs">स</span>
              </div>
              <p className="font-display text-lg font-extrabold text-white">Samadhan</p>
            </div>
            <p className="text-xs leading-relaxed mb-4 max-w-xs">
              India's civic issue reporting platform. Bridging citizens and municipal governments for faster, transparent issue resolution.
            </p>
            <div className="flex items-center gap-1.5 mb-4">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/40px-Flag_of_India.svg.png" alt="India flag" className="h-4" />
              <span className="text-[--india-saffron] text-xs font-accent font-bold">Made in India 🇮🇳</span>
            </div>
            <div className="flex gap-2">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 border border-white/20 rounded flex items-center justify-center hover:border-[--india-saffron] hover:text-[--india-saffron] transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3 uppercase tracking-widest">Platform</p>
            <ul className="space-y-2 text-xs">
              {[['Report Issue', '/report'], ['My Reports', '/my-reports'], ['Dashboard', '/dashboard'], ['About', '/about']].map(([label, href]) => (
                <li key={label}><Link to={href} className="hover:text-[--india-saffron] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3 uppercase tracking-widest">Contact</p>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2"><Mail size={13} />support@samadhan.gov.in</li>
              <li className="flex items-center gap-2"><Phone size={13} />1800-XXX-XXXX (Toll Free)</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <p>© 2026 Samadhan Platform. Government of India Initiative.</p>
          <p>Built for India's Smart City Mission</p>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}