// src/pages/SubmitReportPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Card } from '../components/ui/Card'; // Import the new Card
import { Send } from 'lucide-react'; // Import an icon for the button

export function SubmitReportPage() {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    // ... (handleSubmit logic remains the same)
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-sky-400 text-center">
          Report a New Issue
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="issueType" className="block text-sm font-medium text-slate-300 mb-1">
              Type of Issue
            </label>
            <select
              id="issueType"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            >
              <option value="">Select an issue type...</option>
              <option value="Pothole">Pothole</option>
              <option value="Streetlight Outage">Streetlight Outage</option>
              <option value="Waste Management">Waste Management</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              placeholder="Describe the issue in detail..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:bg-slate-500"
          >
            <Send size={18} />
            {isLoading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </Card>
    </div>
  );
}