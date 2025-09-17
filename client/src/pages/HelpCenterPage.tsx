// src/pages/HelpCenterPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: 'How do I report a civic issue?',
    a: 'Go to Report Issue from the navbar, choose a service, mark the location on the map, add a description and photos, then submit.',
  },
  {
    q: 'Why does location access fail?',
    a: 'Ensure you grant location permission, are on HTTPS or localhost, and that VPN or system settings are not blocking location.',
  },
  {
    q: 'Are photos required?',
    a: 'Yes. Photos help validate and route your report faster. You can upload multiple images.',
  },
  {
    q: 'How can I track my reports?',
    a: 'Open My Reports from your profile menu to view status and history.',
  },
];

export function HelpCenterPage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-brand-page">
      <section className="bg-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Help Center</h1>
          <p className="text-teal-100 max-w-2xl">Get answers, tips, and guidance for using Samadhan.</p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <input
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                  placeholder="Search help articles (coming soon)"
                />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Frequently Asked Questions</h2>
              <div className="divide-y divide-slate-200">
                {FAQS.map((f, i) => (
                  <div key={i} className="py-3">
                    <button
                      className="w-full text-left flex items-center justify-between gap-3"
                      onClick={() => setExpanded(expanded === i ? null : i)}
                    >
                      <span className="font-medium text-slate-900">{f.q}</span>
                      <span className="text-slate-500">{expanded === i ? '-' : '+'}</span>
                    </button>
                    {expanded === i && (
                      <p className="mt-2 text-slate-700 text-sm">{f.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Guides</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>Marking accurate locations with the map</li>
                <li>Choosing the right service category</li>
                <li>What to include in photos and description</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link to="/report" className="brand-btn px-3 py-2 rounded-md text-center">Report an Issue</Link>
                <Link to="/bug-report" className="px-3 py-2 rounded-md border border-slate-300 text-slate-700 text-center">Report a Bug</Link>
                <Link to="/my-reports" className="px-3 py-2 rounded-md border border-slate-300 text-slate-700 text-center">My Reports</Link>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Contact Support</h3>
              <p className="text-sm text-slate-700">Email us at support@samaadhan.org</p>
              <p className="text-sm text-slate-700">Mon–Fri, 9am–6pm IST</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}


