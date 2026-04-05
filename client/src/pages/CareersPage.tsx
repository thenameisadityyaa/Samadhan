// src/pages/CareersPage.tsx — India Gov Design System v3
import { useState } from 'react';
import {
  Users, Heart, Lightbulb, Globe, Award, ArrowRight, MapPin, Clock,
  Briefcase, Code, Database, Shield, TrendingUp, Coffee, Home,
  BookOpen, Target, CheckCircle, ExternalLink, Send, ChevronDown, ChevronUp,
  Smartphone, DollarSign
} from 'lucide-react';
import { BackToTop } from '../components/ui/BackToTop';

const jobOpenings = [
  {
    id: 1, title: 'Senior Full Stack Developer', department: 'Engineering',
    location: 'Bangalore, India', type: 'Full-time', experience: '3–5 yrs',
    salary: '₹8–15 LPA', posted: '2 days ago', accent: 'saffron',
    icon: <Code size={18} />,
    description: 'Build the next generation of civic engagement platforms with our engineering team.',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    requirements: ['3+ yrs React, Node.js, TypeScript', 'SQL/NoSQL databases', 'Cloud platform experience', 'CI/CD familiarity'],
    responsibilities: ['Build & maintain web applications', 'Code reviews & architecture', 'Mentor junior devs', 'Cross-functional collaboration'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Stock Options'],
  },
  {
    id: 2, title: 'Product Manager', department: 'Product',
    location: 'Mumbai, India', type: 'Full-time', experience: '4–6 yrs',
    salary: '₹12–20 LPA', posted: '1 week ago', accent: 'green',
    icon: <Target size={18} />,
    description: "Lead product strategy for India's leading civic engagement platform.",
    skills: ['Product Management', 'Analytics', 'User Research', 'Agile', 'SaaS'],
    requirements: ['4+ yrs B2B SaaS product management', 'Data-driven decision making', 'Agile methodology', 'Strong stakeholder communication'],
    responsibilities: ['Define product roadmap', 'Deliver features with engineering', 'Conduct user research', 'Analyse product metrics'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Stock Options'],
  },
  {
    id: 3, title: 'UX/UI Designer', department: 'Design',
    location: 'Delhi, India', type: 'Full-time', experience: '2–4 yrs',
    salary: '₹6–12 LPA', posted: '3 days ago', accent: 'navy',
    icon: <Smartphone size={18} />,
    description: 'Create intuitive experiences that make government processes simple for 1.4B Indians.',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Accessibility'],
    requirements: ['2+ yrs UX/UI design', 'Figma / Sketch proficiency', 'Strong design portfolio', 'Accessibility standards'],
    responsibilities: ['Design user interfaces', 'Run usability testing', 'Create wireframes & prototypes', 'Maintain design system'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Design Tools'],
  },
  {
    id: 4, title: 'DevOps Engineer', department: 'Engineering',
    location: 'Pune, India', type: 'Full-time', experience: '3–5 yrs',
    salary: '₹10–18 LPA', posted: '5 days ago', accent: 'saffron',
    icon: <Database size={18} />,
    description: 'Build and operate our cloud infrastructure for high availability at national scale.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Python'],
    requirements: ['3+ yrs DevOps / infra', 'AWS + Docker + Kubernetes', 'CI/CD automation', 'Monitoring & logging tools'],
    responsibilities: ['Design cloud infrastructure', 'Automate deployment', 'Monitor system performance', 'Ensure security compliance'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Stock Options'],
  },
  {
    id: 5, title: 'Business Development Manager', department: 'Sales',
    location: 'Chennai, India', type: 'Full-time', experience: '3–5 yrs',
    salary: '₹8–15 LPA + Commission', posted: '1 week ago', accent: 'green',
    icon: <Globe size={18} />,
    description: 'Drive partnerships with government agencies and municipal corporations across India.',
    skills: ['B2B Sales', 'Government Relations', 'CRM', 'Proposal Writing', 'Negotiation'],
    requirements: ['3+ yrs B2B sales (govt preferred)', 'Government network', 'CRM & proposal experience', 'Knowledge of procurement processes'],
    responsibilities: ['Pursue new opportunities', 'Build govt stakeholder relationships', 'Prepare proposals', 'Negotiate and close deals'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Commission', 'Travel Allowance'],
  },
  {
    id: 6, title: 'Data Scientist', department: 'Analytics',
    location: 'Hyderabad, India', type: 'Full-time', experience: '2–4 yrs',
    salary: '₹9–16 LPA', posted: '4 days ago', accent: 'navy',
    icon: <TrendingUp size={18} />,
    description: "Analyse civic data to help cities make better decisions for their citizens.",
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualisation', 'Statistics'],
    requirements: ['2+ yrs data science', 'Python / R', 'ML & statistical analysis', 'Big data (Spark / Hadoop)'],
    responsibilities: ['Analyse civic dataset', 'Build predictive models', 'Create visualizations', 'Present insights to govt stakeholders'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Stock Options'],
  },
];

const benefits = [
  { icon: <Home size={20} />,     title: 'Remote Work',           desc: 'Work from anywhere in India with flexible hours.' },
  { icon: <DollarSign size={20} />, title: 'Competitive Salary',  desc: 'Industry-leading pay with performance bonuses.' },
  { icon: <BookOpen size={20} />, title: 'Learning Budget',       desc: '₹50,000 annual budget for courses, books & events.' },
  { icon: <Shield size={20} />,   title: 'Health Insurance',      desc: 'Comprehensive coverage for you and your family.' },
  { icon: <Coffee size={20} />,   title: 'Wellness Program',      desc: 'Mental health support, gym memberships & activities.' },
  { icon: <Award size={20} />,    title: 'Stock Options',         desc: 'Equity participation and ownership in the company.' },
];

const accentBg = (a: string) => a === 'saffron' ? 'bg-[--india-saffron]' : a === 'green' ? 'bg-[--india-green]' : 'bg-[--civic-navy]';
const accentText = (a: string) => a === 'saffron' ? 'text-[--india-saffron]' : a === 'green' ? 'text-[--india-green]' : 'text-[--civic-navy]';
const accentBorder = (a: string) => a === 'saffron' ? 'border-t-[--india-saffron]' : a === 'green' ? 'border-t-[--india-green]' : 'border-t-[--civic-navy]';

export function CareersPage() {
  const [openJob, setOpenJob] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', coverLetter: '', portfolio: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="text-[--civic-text]">

      {/* ── Hero ── */}
      <section className="relative min-h-[300px] flex items-center" style={{ marginTop: '66px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-[--civic-navy]/88" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="section-label">Opportunities</span>
            <span className="section-label green">6 Open Roles</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-3">
            Work <span className="text-[--india-saffron]">With Us</span>
          </h1>
          <p className="text-white/70 max-w-xl text-base md:text-lg">
            Join the team building India's civic engagement platform. Be part of the mission — every line of code you write improves a real citizen's life.
          </p>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="py-14 bg-white border-b-4 border-[--india-saffron]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-[--india-saffron]" />
            <div>
              <span className="section-label mb-1 inline-block">Why Samadhan</span>
              <h2 className="font-display text-2xl font-extrabold text-[--civic-navy]">Build Technology That Matters</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: Users,    title: 'Collaboration',  desc: 'Open communication and teamwork across all functions.', accent: 'saffron' },
              { Icon: Heart,    title: 'Real Impact',    desc: 'Your code resolves real civic issues for real citizens.', accent: 'green'   },
              { Icon: Lightbulb,title: 'Innovation',     desc: 'Embrace new tech to solve hard civic challenges.', accent: 'saffron' },
              { Icon: Globe,    title: 'Diversity',      desc: 'Inclusive environment celebrating every perspective.', accent: 'green'   },
            ].map(({ Icon, title, desc, accent }) => (
              <div key={title} className={`civic-card p-5 border-t-4 ${accentBorder(accent)}`}>
                <div className={`w-10 h-10 ${accentBg(accent)} rounded flex items-center justify-center text-white mb-3`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-display font-bold text-[--civic-navy] mb-1">{title}</h3>
                <p className="text-xs text-[--civic-gray-600] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Perks strip ── */}
      <section className="py-14 bg-[#FFF8F0]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-[--india-green]" />
            <div>
              <span className="section-label green mb-1 inline-block">Benefits</span>
              <h2 className="font-display text-2xl font-extrabold text-[--civic-navy]">Perks & Benefits</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map(({ icon, title, desc }) => (
              <div key={title} className="civic-card p-5 flex gap-4">
                <div className="w-9 h-9 bg-orange-100 text-[--india-saffron] rounded flex items-center justify-center flex-shrink-0">{icon}</div>
                <div>
                  <p className="font-semibold text-[--civic-navy] text-sm mb-1">{title}</p>
                  <p className="text-xs text-[--civic-gray-600] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section className="py-14 bg-white border-b border-[--civic-gray-200]">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-[--india-saffron]" />
            <div>
              <span className="section-label mb-1 inline-block">Open Positions</span>
              <h2 className="font-display text-2xl font-extrabold text-[--civic-navy]">Current Openings</h2>
            </div>
          </div>
          <div className="space-y-4">
            {jobOpenings.map((job) => (
              <div key={job.id} className={`civic-card border-l-4 ${accentBorder(job.accent).replace('border-t', 'border-l')}`}>
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded ${accentBg(job.accent)} text-white flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        {job.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-bold text-[--civic-navy]">{job.title}</h3>
                          <span className="bg-[--india-green]/10 text-[--india-green] text-xs font-bold px-2 py-0.5 rounded">{job.type}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[--civic-gray-600] mt-1">
                          <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
                          <span className="flex items-center gap-1"><Briefcase size={11} />{job.department}</span>
                          <span className="flex items-center gap-1"><Clock size={11} />{job.posted}</span>
                          <span className={`font-bold ${accentText(job.accent)}`}>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => setOpenJob(openJob === job.id ? null : job.id)}
                        className="flex items-center gap-1 text-xs font-bold text-[--civic-gray-600] border border-[--civic-gray-200] px-3 py-1.5 rounded hover:bg-[--civic-gray-50] transition-colors"
                      >
                        {openJob === job.id ? <><ChevronUp size={13} /> Hide</> : <><ChevronDown size={13} /> Details</>}
                      </button>
                      <button className={`text-xs font-bold text-white px-4 py-1.5 rounded ${accentBg(job.accent)} transition-opacity hover:opacity-90`}>
                        Apply Now
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-[--civic-gray-600] mt-3 leading-relaxed">{job.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.skills.map((s) => (
                      <span key={s} className="bg-[--civic-gray-100] text-[--civic-gray-600] text-xs px-2.5 py-1 rounded">{s}</span>
                    ))}
                  </div>

                  {openJob === job.id && (
                    <div className="mt-5 pt-5 border-t border-[--civic-gray-200] grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-semibold text-[--civic-navy] text-sm mb-2">Requirements</p>
                        <ul className="space-y-1.5">
                          {job.requirements.map((r) => (
                            <li key={r} className="flex items-start gap-2 text-xs text-[--civic-gray-600]">
                              <CheckCircle size={11} className="text-[--india-green] mt-0.5 flex-shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-[--civic-navy] text-sm mb-2">Responsibilities</p>
                        <ul className="space-y-1.5">
                          {job.responsibilities.map((r) => (
                            <li key={r} className="flex items-start gap-2 text-xs text-[--civic-gray-600]">
                              <CheckCircle size={11} className={`${accentText(job.accent)} mt-0.5 flex-shrink-0`} />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:col-span-2">
                        <p className="font-semibold text-[--civic-navy] text-sm mb-2">Benefits</p>
                        <div className="flex flex-wrap gap-2">
                          {job.benefits.map((b) => (
                            <span key={b} className={`text-xs font-bold text-white px-3 py-1 rounded ${accentBg(job.accent)}`}>{b}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section className="py-14 bg-[--civic-gray-50]">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-[--india-saffron]" />
            <div>
              <span className="section-label mb-1 inline-block">Apply Now</span>
              <h2 className="font-display text-2xl font-extrabold text-[--civic-navy]">Submit Your Application</h2>
            </div>
          </div>
          <div className="bg-white border border-[--civic-gray-200] rounded-lg p-6 shadow-sm">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-[--india-green] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-[--civic-navy] mb-2">Application Received!</h3>
                <p className="text-[--civic-gray-600] text-sm">Thank you — we'll review your application and get back to you within 5 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { field: 'name',  label: 'Full Name',  type: 'text',  required: true  },
                    { field: 'email', label: 'Email',       type: 'email', required: true  },
                    { field: 'phone', label: 'Phone',       type: 'tel',   required: false },
                  ].map(({ field, label, type, required }) => (
                    <div key={field}>
                      <label className="block text-xs font-semibold text-[--civic-navy] mb-1.5">{label}{required && ' *'}</label>
                      <input
                        type={type}
                        required={required}
                        value={(form as any)[field]}
                        onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
                        className="w-full px-3 py-2.5 text-sm border border-[--civic-gray-200] rounded focus:outline-none focus:ring-2 focus:ring-[--india-saffron]/40 focus:border-[--india-saffron]"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-[--civic-navy] mb-1.5">Position *</label>
                    <select
                      required
                      value={form.position}
                      onChange={(e) => setForm(f => ({ ...f, position: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-[--civic-gray-200] rounded focus:outline-none focus:ring-2 focus:ring-[--india-saffron]/40 focus:border-[--india-saffron]"
                    >
                      <option value="">Select a role</option>
                      {jobOpenings.map((j) => <option key={j.id} value={j.title}>{j.title}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[--civic-navy] mb-1.5">Resume/CV * <span className="font-normal text-[--civic-gray-400]">(PDF / DOC)</span></label>
                  <input type="file" required accept=".pdf,.doc,.docx" className="w-full text-sm border border-[--civic-gray-200] rounded px-3 py-2.5" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[--civic-navy] mb-1.5">Cover Letter</label>
                  <textarea
                    value={form.coverLetter}
                    onChange={(e) => setForm(f => ({ ...f, coverLetter: e.target.value }))}
                    rows={4}
                    placeholder="Tell us why you want to work at Samadhan..."
                    className="w-full px-3 py-2.5 text-sm border border-[--civic-gray-200] rounded focus:outline-none focus:ring-2 focus:ring-[--india-saffron]/40 focus:border-[--india-saffron] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[--civic-navy] mb-1.5">Portfolio / GitHub <span className="font-normal text-[--civic-gray-400]">(Optional)</span></label>
                  <input
                    type="url"
                    value={form.portfolio}
                    onChange={(e) => setForm(f => ({ ...f, portfolio: e.target.value }))}
                    placeholder="https://github.com/username"
                    className="w-full px-3 py-2.5 text-sm border border-[--civic-gray-200] rounded focus:outline-none focus:ring-2 focus:ring-[--india-saffron]/40 focus:border-[--india-saffron]"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button type="submit" className="btn-saffron flex items-center gap-2 text-sm">
                    <Send size={15} /> Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[--india-saffron]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl md:text-2xl font-extrabold text-white mb-1">Don't see the right role?</p>
            <p className="text-white/80 text-sm">We're always looking for people who share our mission. Drop us your resume!</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button className="inline-flex items-center gap-2 bg-white text-[--india-saffron] font-bold text-sm py-3 px-7 rounded hover:bg-orange-50 transition-colors">
              Send Your Resume <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
