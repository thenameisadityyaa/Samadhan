// src/pages/MyReportsPage.tsx — India Gov Design System v3 (real API data)
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FileText, Plus, MapPin, Clock, CheckCircle, AlertCircle,
  Activity, Search, Filter, ArrowLeft, RefreshCw, Flag, Image,
} from 'lucide-react';
import { BackToTop } from '../components/ui/BackToTop';

interface Report {
  _id: string; title: string; description: string;
  status: 'Submitted' | 'In Progress' | 'Resolved';
  urgency: 'low' | 'medium' | 'high';
  category?: string; location?: string;
  createdAt: string; updatedAt: string; images?: string[];
}
interface Stats { total: number; pending: number; inProgress: number; resolved: number; }

const statusMeta = (s: string) => {
  if (s === 'Resolved')    return { label: 'Resolved',    bgBadge: 'bg-[--india-green]/10',  textBadge: 'text-[--india-green]',   dot: 'bg-[--india-green]',    icon: <CheckCircle size={12} /> };
  if (s === 'In Progress') return { label: 'In Progress', bgBadge: 'bg-orange-50',            textBadge: 'text-[--india-saffron]', dot: 'bg-[--india-saffron]',  icon: <Activity size={12} /> };
  return                          { label: 'Submitted',   bgBadge: 'bg-[--civic-navy]/8',     textBadge: 'text-[--civic-navy]',    dot: 'bg-[--civic-navy]',     icon: <AlertCircle size={12} /> };
};

const urgencyMeta = (u: string) => {
  if (u === 'high')   return { label: 'High',   color: 'text-red-600',             bg: 'bg-red-50'          };
  if (u === 'medium') return { label: 'Medium', color: 'text-[--india-saffron]',  bg: 'bg-orange-50'       };
  return                     { label: 'Low',    color: 'text-[--india-green]',     bg: 'bg-green-50'        };
};

const timeAgo = (iso: string) => {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (d === 0) return 'Today';
  if (d === 1) return 'Yesterday';
  return `${d} days ago`;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

// Unique reference-like ID from Mongo ID
const refId = (id: string) => `SR-${id.slice(-6).toUpperCase()}`;

export function MyReportsPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const token = localStorage.getItem('token');

  const fetchReports = useCallback(async (spinner = false) => {
    if (!token) { navigate('/resident/login'); return; }
    if (spinner) setRefreshing(true);
    try {
      const res = await axios.get('/api/reports/my', { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.success) {
        setReports(res.data.data.reports);
        setStats(res.data.data.stats);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/resident/login');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token, navigate]);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  const filtered = reports.filter(r => {
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || (r.category || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchUrgency = urgencyFilter === 'all' || r.urgency === urgencyFilter;
    return matchSearch && matchStatus && matchUrgency;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ marginTop: '66px', background: '#F4F6FA' }}>
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[--india-saffron]/30 border-t-[--india-saffron] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[--civic-gray-600] text-sm">Loading your reports…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#F4F6FA', marginTop: '66px' }}>

      {/* Page banner */}
      <div className="bg-white border-b border-[--civic-gray-200]">
        <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #FF9933 0% 33.33%, #ffffff 33.33% 66.66%, #138808 66.66% 100%)' }} />
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <Link to="/dashboard" className="flex items-center gap-1.5 text-[--civic-gray-500] hover:text-[--civic-navy] text-xs font-medium mb-1.5 transition-colors">
              <ArrowLeft size={12} /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="section-label">मेरी रिपोर्ट</span>
              <span className="section-label green">{stats.total} Total</span>
            </div>
            <h1 className="font-display text-2xl font-extrabold text-[--civic-navy]">
              My <span className="text-[--india-saffron]">Reports</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-end">
            <button
              onClick={() => fetchReports(true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 text-xs font-semibold text-[--civic-gray-600] border border-[--civic-gray-200] px-3 py-2 rounded hover:bg-[--civic-gray-50] transition-colors disabled:opacity-50"
            >
              <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
            <Link to="/report" className="btn-saffron text-xs flex items-center gap-1.5 py-2 px-4">
              <Plus size={13} /> New Report
            </Link>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-white border-b border-[--civic-gray-200]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-4 divide-x divide-[--civic-gray-200]">
            {[
              { label: 'Total',       value: stats.total,      icon: <FileText size={14} />,    color: 'text-[--civic-navy]' },
              { label: 'Submitted',   value: stats.pending,    icon: <AlertCircle size={14} />, color: 'text-[--civic-navy]' },
              { label: 'In Progress', value: stats.inProgress, icon: <Activity size={14} />,   color: 'text-[--india-saffron]' },
              { label: 'Resolved',    value: stats.resolved,   icon: <CheckCircle size={14} />, color: 'text-[--india-green]' },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className="py-4 text-center">
                <div className={`${color} flex justify-center mb-1`}>{icon}</div>
                <p className={`font-accent font-black text-xl ${color}`}>{value}</p>
                <p className="text-[--civic-gray-400] text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">

        {/* Filters */}
        <div className="bg-white border border-[--civic-gray-200] rounded-lg p-4 mb-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[--civic-gray-400]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or category…"
              className="w-full pl-9 pr-3 py-2 text-sm border border-[--civic-gray-200] rounded focus:outline-none focus:ring-2 focus:ring-[--india-saffron]/30 focus:border-[--india-saffron]"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={13} className="text-[--civic-gray-400] flex-shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-[--civic-gray-200] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[--india-saffron]/30 text-[--civic-navy]"
            >
              <option value="all">All Status</option>
              <option value="Submitted">Submitted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="text-xs border border-[--civic-gray-200] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[--india-saffron]/30 text-[--civic-navy]"
            >
              <option value="all">All Urgency</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-[--civic-gray-200] rounded-lg py-20 text-center">
            <div className="w-16 h-16 bg-[--civic-gray-100] rounded-full flex items-center justify-center mx-auto mb-4">
              <Flag size={28} className="text-[--civic-gray-300]" />
            </div>
            <p className="font-display font-bold text-[--civic-navy] mb-1">
              {reports.length === 0 ? 'No Reports Yet' : 'No Matching Reports'}
            </p>
            <p className="text-xs text-[--civic-gray-400] mb-5">
              {reports.length === 0 ? 'You haven\'t submitted any civic issue reports.' : 'Try adjusting your search or filters.'}
            </p>
            {reports.length === 0 && (
              <Link to="/report" className="btn-saffron text-xs inline-flex items-center gap-1.5 py-2.5 px-6">
                <Plus size={13} /> Submit First Report
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r) => {
              const sm = statusMeta(r.status);
              const um = urgencyMeta(r.urgency);
              const isOpen = expanded === r._id;
              return (
                <div key={r._id} className="bg-white border border-[--civic-gray-200] rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
                  <button
                    onClick={() => setExpanded(isOpen ? null : r._id)}
                    className="w-full text-left p-5"
                  >
                    <div className="flex items-start gap-3">
                      {/* Status dot */}
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${sm.dot}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-[--civic-gray-400] font-bold">{refId(r._id)}</span>
                          <h3 className="font-semibold text-[--civic-navy] text-sm truncate">{r.title}</h3>
                          {r.category && (
                            <span className="text-[10px] font-bold bg-[--civic-gray-100] text-[--civic-gray-600] px-2 py-0.5 rounded">{r.category}</span>
                          )}
                        </div>
                        <p className="text-xs text-[--civic-gray-600] line-clamp-1 mb-2">{r.description}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[--civic-gray-400]">
                          {r.location && (
                            <span className="flex items-center gap-1"><MapPin size={9} />{r.location.slice(0, 45)}{r.location.length > 45 ? '…' : ''}</span>
                          )}
                          <span className="flex items-center gap-1"><Clock size={9} />{formatDate(r.createdAt)} · {timeAgo(r.createdAt)}</span>
                          {r.images && r.images.length > 0 && (
                            <span className="flex items-center gap-1"><Image size={9} />{r.images.length} photo{r.images.length > 1 ? 's' : ''}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded ${sm.bgBadge} ${sm.textBadge}`}>
                          {sm.icon}{sm.label}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${um.bg} ${um.color}`}>
                          {um.label}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="border-t border-[--civic-gray-100] px-5 py-4 bg-[--civic-gray-50]">
                      <p className="text-sm text-[--civic-gray-600] mb-3 leading-relaxed">{r.description}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                        <div><p className="font-semibold text-[--civic-navy] mb-0.5">Status</p><p className={sm.textBadge}>{sm.label}</p></div>
                        <div><p className="font-semibold text-[--civic-navy] mb-0.5">Urgency</p><p className={um.color}>{um.label}</p></div>
                        <div><p className="font-semibold text-[--civic-navy] mb-0.5">Category</p><p className="text-[--civic-gray-600]">{r.category || '—'}</p></div>
                        <div><p className="font-semibold text-[--civic-navy] mb-0.5">Submitted</p><p className="text-[--civic-gray-600]">{formatDate(r.createdAt)}</p></div>
                        <div><p className="font-semibold text-[--civic-navy] mb-0.5">Last Updated</p><p className="text-[--civic-gray-600]">{formatDate(r.updatedAt)}</p></div>
                        <div><p className="font-semibold text-[--civic-navy] mb-0.5">Reference ID</p><p className="font-mono text-[--civic-gray-600]">{refId(r._id)}</p></div>
                      </div>
                      {r.images && r.images.length > 0 && (
                        <div className="mt-4">
                          <p className="font-semibold text-[--civic-navy] text-xs mb-2">Photos</p>
                          <div className="flex gap-2 flex-wrap">
                            {r.images.map((url, i) => (
                              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                                <img src={url} alt={`img-${i}`} className="h-20 w-28 object-cover rounded border border-[--civic-gray-200] hover:opacity-90" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-8 bg-[--india-saffron] rounded-lg px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-white">Have another issue to report?</p>
            <p className="text-white/70 text-xs">Every report you submit directly helps your community.</p>
          </div>
          <Link to="/report" className="bg-white text-[--india-saffron] text-sm font-bold px-6 py-2.5 rounded flex items-center gap-2 hover:bg-orange-50 transition-colors flex-shrink-0">
            <Plus size={15} /> Submit New Report
          </Link>
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
