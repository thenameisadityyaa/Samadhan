// src/pages/ViewReportsPage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Report {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  submittedBy?: string;
}

export function ViewReportsPage() {
  // State to hold the reports and loading status
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch data when the component loads
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports');
        setReports(response.data.data); // Set the reports from the API response
      } catch (err) {
        setError('Failed to fetch reports. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchReports();
  }, []); // The empty array [] means this effect runs only once

  // Conditional rendering based on the state
  if (isLoading) {
    return <p className="text-center text-slate-400">Loading reports...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">All Submitted Reports</h1>
      {reports.length === 0 ? (
        <p className="text-center text-slate-400">No reports have been submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {reports.map((report) => (
            <div key={report._id} className="bg-slate-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-sky-400">{report.title}</h2>
                  <p className="text-slate-300 mt-2">{report.description}</p>
                </div>
                <span className="bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {report.status}
                </span>
              </div>
              <div className="text-right text-xs text-slate-500 mt-4">
                {new Date(report.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}