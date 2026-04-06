// src/pages/ContributionsPage.tsx — India Gov Design System v3
import { CheckCircle, MapPin, Users, TrendingUp, Award, Star, Globe, ArrowRight, ExternalLink } from 'lucide-react';
import { BackToTop } from '../components/ui/BackToTop';

const contributions = [
  {
    id: 1,
    title: 'Bangalore Smart City Initiative',
    location: 'Bangalore, Karnataka',
    date: '2023',
    category: 'Infrastructure',
    accent: 'saffron',
    description: 'Partnered with BBMP to digitize civic issue reporting. Implemented real-time tracking for 500+ daily reports.',
    impact: { issuesResolved: 2500, citizensReached: 15000, responseTime: '24 hrs', satisfaction: '4.8/5' },
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=400&fit=crop',
    achievements: ['Reduced resolution time by 60%', 'Citizen engagement up 300%', '95% issue tracking accuracy'],
  },
  {
    id: 2,
    title: 'Delhi Road Safety Campaign',
    location: 'New Delhi',
    date: '2023',
    category: 'Safety',
    accent: 'green',
    description: 'Launched road safety reporting system with Delhi Traffic Police. Citizens report potholes, broken signals, and hazards instantly.',
    impact: { issuesResolved: 1800, citizensReached: 25000, responseTime: '12 hrs', satisfaction: '4.6/5' },
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=400&fit=crop',
    achievements: ['Prevented 50+ accidents', 'Improved road monitoring', 'Enhanced emergency coordination'],
  },
  {
    id: 3,
    title: 'Mumbai Waste Management',
    location: 'Mumbai, Maharashtra',
    date: '2023',
    category: 'Environment',
    accent: 'navy',
    description: "Transformed waste collection for Mumbai's 12M residents. GPS tracking for garbage trucks + real-time collection status.",
    impact: { issuesResolved: 3200, citizensReached: 12000000, responseTime: '6 hrs', satisfaction: '4.7/5' },
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=400&fit=crop',
    achievements: ['Missed collections down 80%', 'Recycling rates up 40%', 'Citizen satisfaction up significantly'],
  },
  {
    id: 4,
    title: 'Chennai Water Crisis Management',
    location: 'Chennai, Tamil Nadu',
    date: '2023',
    category: 'Utilities',
    accent: 'saffron',
    description: 'Emergency water supply reporting during Chennai\'s crisis. Citizens report leaks, quality issues, and supply problems.',
    impact: { issuesResolved: 1200, citizensReached: 8000, responseTime: '4 hrs', satisfaction: '4.9/5' },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    achievements: ['Water wastage down 30%', 'Emergency response time improved', 'Enhanced water quality monitoring'],
  },
  {
    id: 5,
    title: 'Pune Smart Parking System',
    location: 'Pune, Maharashtra',
    date: '2023',
    category: 'Transportation',
    accent: 'green',
    description: 'Smart parking management with real-time availability updates and digital payment integration.',
    impact: { issuesResolved: 900, citizensReached: 20000, responseTime: '2 hrs', satisfaction: '4.5/5' },
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
    achievements: ['Parking search time down 50%', 'Parking revenue up 25%', 'Improved city-center traffic flow'],
  },
  {
    id: 6,
    title: 'Kolkata Street Lighting Upgrade',
    location: 'Kolkata, West Bengal',
    date: '2023',
    category: 'Infrastructure',
    accent: 'navy',
    description: 'Smart street lighting with automatic fault detection and citizen reporting integration.',
    impact: { issuesResolved: 1500, citizensReached: 18000, responseTime: '8 hrs', satisfaction: '4.6/5' },
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop',
    achievements: ['Energy consumption down 35%', 'Improved street safety', 'Enhanced maintenance efficiency'],
  },
];

const accentColor = (accent: string) =>
  accent === 'saffron' ? 'border-t-[--india-saffron]' : accent === 'green' ? 'border-t-[--india-green] border-t-[3px]' : 'border-t-[--civic-navy] border-t-[3px]';
const accentBg = (accent: string) =>
  accent === 'saffron' ? 'bg-[--india-saffron]' : accent === 'green' ? 'bg-[--india-green]' : 'bg-[--civic-navy]';
const accentText = (accent: string) =>
  accent === 'saffron' ? 'text-[--india-saffron]' : accent === 'green' ? 'text-[--india-green]' : 'text-[--civic-navy]';

export function ContributionsPage() {
  const testimonials = [
    { quote: 'Samadhan has revolutionised how we handle citizen complaints. Response time improved by 60%.', name: 'Mayor Sharma', org: 'Bangalore Municipal Corporation', init: 'MS', color: 'bg-[--india-saffron]' },
    { quote: 'The platform transformed our waste management system. Citizens are more engaged and efficiency improved dramatically.', name: 'Akshay Kumar', org: 'Mumbai Municipal Corporation', init: 'AK', color: 'bg-[--civic-navy]' },
    { quote: "Samadhan's smart parking solution reduced traffic congestion in our city centre by 40%. A game-changer for urban mobility.", name: 'Vikram Patel', org: 'Pune City Development Authority', init: 'VP', color: 'bg-[--india-green]' },
  ];

  return (
    <div className="text-[--civic-text]">

      {/* ── Hero ── */}
      <section className="relative min-h-[300px] flex items-center" style={{ marginTop: '66px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400&q=80&fit=crop')` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="section-label">Impact Portfolio</span>
            <span className="section-label green">6 Cities</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-3">
            Our <span className="text-[--india-saffron]">Contributions</span>
          </h1>
          <p className="text-white/70 max-w-xl text-base md:text-lg">
            How Samadhan has transformed civic engagement across India — making cities smarter and communities stronger.
          </p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-[--civic-navy] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-6 gap-0 divide-x divide-white/10">
          {[
            { icon: <Award size={18} />,       value: '6',       label: 'Projects'         },
            { icon: <CheckCircle size={18} />, value: '11,100+', label: 'Issues Resolved'   },
            { icon: <Users size={18} />,       value: '12M+',    label: 'Citizens Reached'  },
            { icon: <Star size={18} />,        value: '4.7/5',   label: 'Avg. Satisfaction' },
            { icon: <Globe size={18} />,       value: '6',       label: 'Cities Served'     },
            { icon: <TrendingUp size={18} />,  value: '65%',     label: 'Faster Response'   },
          ].map(({ icon, value, label }) => (
            <div key={label} className="text-center px-4 py-3">
              <div className="text-[--india-saffron] flex justify-center mb-1">{icon}</div>
              <p className="font-accent text-xl font-bold">{value}</p>
              <p className="text-white/50 text-xs uppercase tracking-wide mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="py-16 bg-white border-b-4 border-[--india-saffron]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-1 bg-[--india-saffron]" />
            <div>
              <span className="section-label mb-1 inline-block">Featured Projects</span>
              <h2 className="font-display text-2xl font-extrabold text-[--civic-navy]">City-by-City Impact</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {contributions.map((p) => (
              <div key={p.id} className={`civic-card overflow-hidden border-t-4 ${accentColor(p.accent)}`}>
                <div className="relative h-52 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-3 left-3 text-xs font-bold text-white px-2.5 py-1 rounded ${accentBg(p.accent)}`}>{p.category}</span>
                  <span className="absolute top-3 right-3 text-xs font-bold text-white bg-[--india-green] px-2.5 py-1 rounded">✓ Completed</span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <MapPin size={13} className="text-white/80" />
                    <span className="text-white text-xs font-medium">{p.location}</span>
                    <span className="text-white/60 text-xs">· {p.date}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-[--civic-navy] text-lg mb-1.5">{p.title}</h3>
                  <p className="text-sm text-[--civic-gray-600] mb-4 leading-relaxed">{p.description}</p>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {Object.entries(p.impact).map(([key, val]) => (
                      <div key={key} className="bg-[--civic-gray-50] rounded p-2.5 text-center border border-[--civic-gray-200]">
                        <p className={`font-accent font-bold text-sm ${accentText(p.accent)}`}>{String(val).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
                        <p className="text-[--civic-gray-400] text-xs capitalize mt-0.5">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      </div>
                    ))}
                  </div>
                  <ul className="mb-4 space-y-1">
                    {p.achievements.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-xs text-[--civic-gray-600]">
                        <CheckCircle size={12} className="text-[--india-green] flex-shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full flex items-center justify-center gap-2 text-xs font-bold py-2.5 text-white rounded ${accentBg(p.accent)}`}>
                    View Case Study <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-14 bg-[#FFF8F0]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-[--india-green]" />
            <div>
              <span className="section-label green mb-1 inline-block">Partners Say</span>
              <h2 className="font-display text-2xl font-extrabold text-[--civic-navy]">What City Officials Are Saying</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ quote, name, org, init, color }) => (
              <div key={name} className="bg-white border border-[--civic-gray-200] rounded-lg p-6">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-[--india-saffron] fill-[--india-saffron]" />)}
                </div>
                <p className="text-sm text-[--civic-gray-600] italic leading-relaxed mb-4">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded ${color} text-white text-xs font-bold font-accent flex items-center justify-center`}>{init}</div>
                  <div>
                    <p className="font-semibold text-[--civic-navy] text-sm">{name}</p>
                    <p className="text-[--civic-gray-400] text-xs">{org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[--india-saffron]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl md:text-2xl font-extrabold text-white mb-1">Ready to make your city smarter?</p>
            <p className="text-white/80 text-sm">Join a growing number of municipalities transforming civic engagement with Samadhan.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button className="inline-flex items-center justify-center gap-2 bg-white text-[--india-saffron] font-bold text-sm py-3 px-7 rounded hover:bg-orange-50 transition-colors">
              Partner With Us <ArrowRight size={15} />
            </button>
            <button className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 font-bold text-sm py-3 px-7 rounded transition-colors">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
