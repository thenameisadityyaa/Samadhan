// src/pages/MyReportsPage.tsx
import { Link } from 'react-router-dom';

type ReportItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  createdAt: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
};

const SAMPLE_REPORTS: ReportItem[] = [
  {
    id: 'SR-10293',
    title: 'Pothole near Sector 14 market',
    category: 'Core & Public Works · Roads & Transport',
    location: 'Sector 14, Gurgaon',
    createdAt: '2025-09-06',
    status: 'IN_PROGRESS',
  },
  {
    id: 'SR-10212',
    title: 'Overflowing community bin at Park Avenue',
    category: 'Health & Environment · Waste Management',
    location: 'Park Avenue, Whitefield',
    createdAt: '2025-09-04',
    status: 'OPEN',
  },
  {
    id: 'SR-10177',
    title: 'Streetlight not working outside Block C-3',
    category: 'Core & Public Works · Streetlight',
    location: 'Block C-3, Noida Sector 62',
    createdAt: '2025-09-01',
    status: 'RESOLVED',
  },
];

function StatusBadge({ value }: { value: ReportItem['status'] }) {
  const map = {
    OPEN: 'bg-amber-100 text-amber-800 border-amber-200',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
    RESOLVED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  } as const;
  return <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${map[value]}`}>{value.replace('_', ' ')}</span>;
}

export function MyReportsPage() {
  return (
    <div className="min-h-screen bg-brand-page">
      <section className="bg-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">My Reports</h1>
          <p className="text-teal-100 max-w-2xl">Track the issues you have submitted. This list currently shows sample data.</p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-8">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold">Report ID</th>
                    <th className="text-left px-6 py-3 font-semibold">Title</th>
                    <th className="text-left px-6 py-3 font-semibold">Category</th>
                    <th className="text-left px-6 py-3 font-semibold">Location</th>
                    <th className="text-left px-6 py-3 font-semibold">Created</th>
                    <th className="text-left px-6 py-3 font-semibold">Status</th>
                    <th className="text-left px-6 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_REPORTS.map((r) => (
                    <tr key={r.id} className="border-t border-slate-100">
                      <td className="px-6 py-3 font-mono text-slate-700">{r.id}</td>
                      <td className="px-6 py-3 text-slate-900 font-medium">{r.title}</td>
                      <td className="px-6 py-3 text-slate-600">{r.category}</td>
                      <td className="px-6 py-3 text-slate-600">{r.location}</td>
                      <td className="px-6 py-3 text-slate-600">{r.createdAt}</td>
                      <td className="px-6 py-3"><StatusBadge value={r.status} /></td>
                      <td className="px-6 py-3">
                        <Link to={`/report`} className="text-teal-600 hover:underline">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end">
            <Link to="/report" className="brand-btn px-4 py-2 rounded-md">Create New Report</Link>
          </div>
        </div>
      </section>
    </div>
  );
}


