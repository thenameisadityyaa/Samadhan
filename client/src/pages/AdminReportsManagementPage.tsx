// src/pages/AdminReportsManagementPage.tsx — India Gov Design System v3
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Filter, Download, ArrowRight, Activity, Search, RefreshCw, LogOut, Loader2 } from 'lucide-react';
import axios from 'axios';

const formatTimeAgo = (date: Date) => {
  const diffInMinutes = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60));
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const hrs = Math.floor(diffInMinutes / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export function AdminReportsManagementPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [adminProfile, setAdminProfile] = useState<any>(null);

  const fetchReports = async (showSpinner = false) => {
    if (showSpinner) setIsRefreshing(true);
    try {
      const adminToken = localStorage.getItem('adminToken');
      const { data } = await axios.get('/api/reports', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const formatted = data.data.map((r: any) => ({
        id: r._id,
        title: r.title,
        type: r.category || 'General',
        urgency: r.urgency || 'low',
        status: r.status === 'Submitted' ? 'new' : r.status === 'In Progress' ? 'in_progress' : 'resolved',
        location: r.location || 'Location Not Provided',
        createdAt: new Date(r.createdAt),
        description: r.description
      }));
      setReports(formatted.sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    const adminToken = localStorage.getItem('adminToken');
    if (!adminSession || !adminToken) {
      navigate('/admin/login');
      return;
    }
    try { setAdminProfile(JSON.parse(adminSession)); } catch {}
    fetchReports();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[--civic-gray-50] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[--india-saffron]/30 border-t-[--india-saffron] rounded-full animate-spin mb-4" />
        <p className="text-[--civic-navy] font-semibold tracking-wide">INITIALIZING WORKSPACE...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[--civic-gray-50] font-sans flex flex-col">
      {/* ── Top Bar (Admin Standard) ── */}
      <header className="bg-white border-b border-[--civic-gray-200] sticky top-0 z-50">
        <div className="h-1 w-full bg-[--civic-navy]" />
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[--civic-navy] text-white flex items-center justify-center font-bold font-display rounded-sm">AD</div>
            <div>
              <h1 className="text-sm font-bold text-[--civic-navy] leading-none mb-1 uppercase tracking-widest">Samadhan Command Center</h1>
              <p className="text-[10px] text-[--civic-gray-600] font-medium tracking-wide">Central Civic Administration Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right border-r border-[--civic-gray-200] pr-4">
              <p className="text-xs font-bold text-[--civic-navy]">{adminProfile?.name || 'Administrator'}</p>
              <p className="text-[10px] text-[--civic-gray-400] uppercase tracking-wider">{adminProfile?.email}</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs font-bold text-[#B91C1C] hover:bg-red-50 px-3 py-1.5 rounded transition-colors border border-transparent hover:border-red-100">
              <LogOut size={14} /> SYSTEM DISCONNECT
            </button>
          </div>
        </div>
      </header>

      {/* ── Secondary Nav & Action Bar ── */}
      <div className="bg-white border-b border-[--civic-gray-200] mb-6 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-2 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-6">
            <Link to="/admin/dashboard" className="text-sm font-semibold text-[--civic-gray-600] hover:text-[--civic-navy] py-2 transition-colors">Operations Dashboard</Link>
            <span className="text-sm font-bold text-[--india-saffron] border-b-2 border-[--india-saffron] py-2">Master Report Registry</span>
            <Link to="/admin/analytics" className="text-sm font-semibold text-[--civic-gray-600] hover:text-[--civic-navy] py-2 transition-colors">Strategic Analytics</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-12 flex-1 flex flex-col w-full">
        {/* Controls */}
        <div className="bg-white border border-[--civic-gray-200] rounded-sm p-4 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-3/4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--civic-gray-400]" />
              <input
                type="text"
                placeholder="Search by Docket ID or Keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[--civic-gray-300] rounded-sm text-sm focus:border-[--civic-navy] focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-[--civic-gray-500]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-48 py-2 px-3 border border-[--civic-gray-300] rounded-sm text-sm focus:border-[--civic-navy] focus:outline-none text-[--civic-navy] font-medium"
              >
                <option value="all">Status: ALL</option>
                <option value="new">Status: INCOMING</option>
                <option value="in_progress">Status: IN PROGRESS</option>
                <option value="resolved">Status: RESOLVED</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button onClick={() => fetchReports(true)} disabled={isRefreshing} className="flex items-center gap-2 px-4 py-2 bg-[--civic-gray-100] text-[--civic-navy] hover:bg-[--civic-gray-200] rounded-sm text-xs font-bold uppercase tracking-widest border border-[--civic-gray-200] transition-colors disabled:opacity-50">
              {isRefreshing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />} SYNC
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[--civic-navy] text-white hover:bg-[--civic-navy-700] rounded-sm text-xs font-bold uppercase tracking-widest shadow-sm transition-colors">
              <Download size={14} /> EXPORT CSV
            </button>
          </div>
        </div>

        {/* Dense Table */}
        <div className="bg-white border border-[--civic-gray-200] rounded-sm shadow-sm overflow-hidden flex-1 overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[--civic-gray-50] border-b border-[--civic-gray-200]">
              <tr>
                <th className="px-5 py-4 text-[10px] font-bold text-[--civic-gray-500] uppercase tracking-widest w-[100px]">Docket ID</th>
                <th className="px-5 py-4 text-[10px] font-bold text-[--civic-gray-500] uppercase tracking-widest">Incident Details</th>
                <th className="px-5 py-4 text-[10px] font-bold text-[--civic-gray-500] uppercase tracking-widest w-[150px]">Status</th>
                <th className="px-5 py-4 text-[10px] font-bold text-[--civic-gray-500] uppercase tracking-widest w-[150px]">Urgency</th>
                <th className="px-5 py-4 text-[10px] font-bold text-[--civic-gray-500] uppercase tracking-widest w-[120px]">Time Log</th>
                <th className="px-5 py-4 text-[10px] font-bold text-[--civic-gray-500] uppercase tracking-widest text-right w-[100px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[--civic-gray-100]">
              {filteredReports.map((r) => (
                <tr key={r.id} className="hover:bg-[--civic-gray-50] transition-colors group">
                  <td className="px-5 py-3">
                    <span className="text-xs font-mono font-semibold text-[--civic-navy]">#{r.id.slice(-6).toUpperCase()}</span>
                  </td>
                  <td className="px-5 py-3 min-w-[250px]">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-[13px] truncate max-w-sm">{r.title}</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 max-w-sm truncate">{r.location}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {r.status === 'new' && <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-200 uppercase tracking-wider">Incoming</span>}
                    {r.status === 'in_progress' && <span className="text-[10px] font-bold text-[--india-saffron] bg-orange-50 px-2 py-0.5 rounded-sm border border-orange-200 uppercase tracking-wider">In Progress</span>}
                    {r.status === 'resolved' && <span className="text-[10px] font-bold text-[--india-green] bg-green-50 px-2 py-0.5 rounded-sm border border-green-200 uppercase tracking-wider">Resolved</span>}
                  </td>
                  <td className="px-5 py-3">
                    {r.urgency === 'high' && <span className="text-[10px] font-bold text-white bg-[#B91C1C] px-2 py-0.5 rounded-sm uppercase tracking-wider">Critical</span>}
                    {r.urgency === 'medium' && <span className="text-[10px] font-bold text-slate-800 bg-[--india-saffron] px-2 py-0.5 rounded-sm uppercase tracking-wider border border-orange-500">Elevated</span>}
                    {r.urgency === 'low' && <span className="text-[10px] font-bold text-slate-800 bg-[--civic-gray-200] px-2 py-0.5 rounded-sm uppercase tracking-wider">Routine</span>}
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-[11px] text-slate-600 font-medium">
                      {new Date(r.createdAt).toLocaleDateString('en-GB')}<br/>
                      <span className="text-[10px] text-slate-400">{formatTimeAgo(r.createdAt)}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => navigate(`/admin/reports/${r.id}`)} className="text-[10px] font-bold uppercase tracking-wider text-[--civic-navy] bg-white border border-[--civic-gray-300] hover:border-[--civic-navy] hover:bg-[--civic-gray-50] transition-colors px-3 py-1.5 rounded-sm shadow-sm flex items-center justify-center gap-1 w-full">
                      Open <ArrowRight size={10} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <Activity size={32} className="mx-auto text-[--civic-gray-300] mb-3" />
                    <p className="text-sm font-semibold text-slate-600">No records found matching criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
