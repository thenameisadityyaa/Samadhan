// src/pages/DashboardPage.tsx — India Gov Design System v3 (Real-time citizen data)
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FileText, Plus, Bell, MapPin, Clock, CheckCircle,
  AlertCircle, TrendingUp, Activity, LogOut, RefreshCw,
  ChevronRight, User, Zap, Flag,
} from 'lucide-react';
import { BackToTop } from '../components/ui/BackToTop';

/* ─── Types ─── */
interface UserData { _id: string; name: string; email: string; role: string; location?: string; createdAt?: string; }
interface Report {
  _id: string; title: string; description: string;
  status: 'Submitted' | 'In Progress' | 'Resolved';
  urgency: 'low' | 'medium' | 'high';
  category?: string; location?: string;
  createdAt: string; images?: string[];
}
interface Stats { total: number; pending: number; inProgress: number; resolved: number; }

/* ─── Helpers ─── */
const statusMeta = (s: string) => {
  if (s === 'Resolved')    return { label: 'Resolved',    bg: 'bg-[--india-green]/10',    text: 'text-[--india-green]',   dot: 'bg-[--india-green]' };
  if (s === 'In Progress') return { label: 'In Progress', bg: 'bg-[--india-saffron]/10',   text: 'text-[--india-saffron]', dot: 'bg-[--india-saffron]' };
  return                          { label: 'Submitted',   bg: 'bg-[--civic-navy]/10',       text: 'text-[--civic-navy]',    dot: 'bg-[--civic-navy]' };
};

const urgencyMeta = (u: string) => {
  if (u === 'high')   return { label: '🔴 High',   text: 'text-red-600' };
  if (u === 'medium') return { label: '🟠 Medium', text: 'text-[--india-saffron]' };
  return                     { label: '🟢 Low',    text: 'text-[--india-green]' };
};

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const initials = (name: string) =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

export function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'Submitted' | 'In Progress' | 'Resolved'>('all');

  const token = localStorage.getItem('token');

  const fetchData = useCallback(async (showSpinner = false) => {
    if (!token) { navigate('/resident/login'); return; }
    if (showSpinner) setRefreshing(true);

    try {
      const [meRes, myRes] = await Promise.all([
        axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/reports/my', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (meRes.data.success) setUser(meRes.data.data);
      if (myRes.data.success) {
        setReports(myRes.data.data.reports);
        setStats(myRes.data.data.stats);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        navigate('/resident/login');
      } else {
        // Fallback to localStorage user data so UI still shows something
        const raw = localStorage.getItem('userData');
        if (raw) {
          try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
        }
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token, navigate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const id = setInterval(() => fetchData(), 30000);
    return () => clearInterval(id);
  }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const filteredReports = activeTab === 'all' ? reports : reports.filter(r => r.status === activeTab);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFBFF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[--india-saffron]/30 border-t-[--india-saffron] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[--civic-gray-600] text-sm">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const displayName = user?.name || 'Citizen';
  const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' }) : '—';

  return (
    <div className="min-h-screen pt-4" style={{ background: '#F4F6FA' }}>

      {/* ── Page banner (NOT a navbar) ── */}
      <div className="bg-white border-[--civic-gray-200]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded bg-[--india-saffron] flex items-center justify-center font-accent font-black text-base text-white shadow flex-shrink-0">
              {initials(displayName)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="bg-[--india-saffron]/10 text-[--india-saffron] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-[--india-saffron]/20">
                  {user?.role === 'admin' ? '⭐ Admin' : '🇮🇳 Citizen'}
                </span>
                <span className="text-[--civic-gray-400] text-[10px]">{user?.email}</span>
              </div>
              <h1 className="font-display text-xl font-extrabold text-[--civic-navy]">
                नमस्ते, <span className="text-[--india-saffron]">{displayName}</span>!
              </h1>
              <p className="text-[--civic-gray-400] text-xs">Member since {memberSince}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 text-xs font-semibold text-[--civic-gray-600] border border-[--civic-gray-200] px-3 py-2 rounded hover:bg-[--civic-gray-50] transition-colors disabled:opacity-50"
            >
              <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="bg-[--civic-gray-50] border-b border-[--civic-gray-200]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[--civic-gray-200]">
            {[
              { icon: <FileText size={15} />, label: 'Total',       value: stats.total,      color: 'text-[--civic-navy]',    bg: 'bg-[--civic-navy]/5' },
              { icon: <Clock size={15} />,    label: 'Submitted',   value: stats.pending,    color: 'text-[--civic-navy]',    bg: 'bg-[--civic-navy]/5' },
              { icon: <Activity size={15} />, label: 'In Progress', value: stats.inProgress, color: 'text-[--india-saffron]', bg: 'bg-orange-50' },
              { icon: <CheckCircle size={15} />, label: 'Resolved', value: stats.resolved,   color: 'text-[--india-green]',   bg: 'bg-green-50' },
            ].map(({ icon, label, value, color, bg }) => (
              <div key={label} className="px-4 py-4 text-center">
                <div className={`w-7 h-7 rounded ${bg} ${color} flex items-center justify-center mx-auto mb-1.5`}>{icon}</div>
                <p className={`font-accent text-xl font-black ${color}`}>{value}</p>
                <p className="text-[--civic-gray-400] text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ── Sidebar: Quick Actions ── */}
        <aside className="lg:col-span-1 space-y-4">

          {/* CTA: New Report */}
          <Link to="/report" className="block bg-[--india-saffron] text-white rounded-lg p-4 shadow hover:bg-orange-500 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-bold text-sm mb-0.5">Report New Issue</p>
                <p className="text-white/70 text-xs">नई समस्या रिपोर्ट करें</p>
              </div>
              <div className="w-9 h-9 bg-white/20 rounded flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Plus size={18} className="text-white" />
              </div>
            </div>
          </Link>

          {/* Quick actions card */}
          <div className="bg-white border border-[--civic-gray-200] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[--civic-gray-200] bg-[--civic-gray-50]">
              <p className="font-semibold text-[--civic-navy] text-sm">Quick Actions</p>
            </div>
            <div className="divide-y divide-[--civic-gray-100]">
              {[
                { to: '/report',   icon: <Plus size={14} />,        label: 'Submit Report',    color: 'text-[--india-saffron]' },
                { to: '/profile',  icon: <User size={14} />,        label: 'My Profile',       color: 'text-[--civic-navy]' },
                { to: '/my-reports',  icon: <Activity size={14} />,    label: 'Browse All Reports', color: 'text-[--india-green]' },
                { to: '/settings', icon: <Bell size={14} />,        label: 'Notifications',    color: 'text-[--civic-gray-600]' },
              ].map(({ to, icon, label, color }) => (
                <Link key={to} to={to} className="flex items-center gap-3 px-4 py-3 text-[--civic-navy] hover:bg-[--civic-gray-50] transition-colors group">
                  <span className={`${color} flex-shrink-0`}>{icon}</span>
                  <span className="text-sm font-medium flex-1">{label}</span>
                  <ChevronRight size={12} className="text-[--civic-gray-300] group-hover:text-[--civic-gray-500] transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Civic tip */}
          <div className="bg-[--civic-navy] text-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-[--india-saffron]" />
              <p className="font-bold text-xs uppercase tracking-wider text-[--india-saffron]">Civic Tip</p>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Adding a clear photo and exact GPS location can reduce issue resolution time by up to 60%.
            </p>
          </div>

          {/* Resolution rate */}
          {stats.total > 0 && (
            <div className="bg-white border border-[--civic-gray-200] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[--civic-navy]">Resolution Rate</p>
                <p className="font-accent font-bold text-[--india-green]">{Math.round((stats.resolved / stats.total) * 100)}%</p>
              </div>
              <div className="h-2 bg-[--civic-gray-100] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[--india-green] rounded-full transition-all duration-700"
                  style={{ width: `${Math.round((stats.resolved / stats.total) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-[--civic-gray-400] mt-2">{stats.resolved} of {stats.total} issues resolved</p>
            </div>
          )}
        </aside>

        {/* ── Main: Reports ── */}
        <main className="lg:col-span-3 space-y-5">

          {/* Tab bar */}
          <div className="bg-white border border-[--civic-gray-200] rounded-lg overflow-hidden">
            <div className="flex items-center border-b border-[--civic-gray-200]">
              {(['all', 'Submitted', 'In Progress', 'Resolved'] as const).map((tab) => {
                const count = tab === 'all' ? stats.total : tab === 'Submitted' ? stats.pending : tab === 'In Progress' ? stats.inProgress : stats.resolved;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-2 text-xs font-semibold border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-[--india-saffron] text-[--india-saffron]'
                        : 'border-transparent text-[--civic-gray-600] hover:text-[--civic-navy]'
                    }`}
                  >
                    {tab === 'all' ? 'All' : tab}
                    <span className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      activeTab === tab ? 'bg-[--india-saffron] text-white' : 'bg-[--civic-gray-100] text-[--civic-gray-600]'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
              <div className="px-4">
                <Link to="/report" className="btn-saffron text-xs py-1.5 px-3 flex items-center gap-1">
                  <Plus size={12} /> New
                </Link>
              </div>
            </div>

            {/* Reports list */}
            {filteredReports.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 bg-[--civic-gray-100] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Flag size={24} className="text-[--civic-gray-400]" />
                </div>
                <p className="font-display font-bold text-[--civic-navy] mb-1">
                  {activeTab === 'all' ? 'No Reports Yet' : `No ${activeTab} Reports`}
                </p>
                <p className="text-xs text-[--civic-gray-400] mb-4">
                  {activeTab === 'all' ? "You haven't submitted any civic issue reports yet." : `You have no ${activeTab.toLowerCase()} reports.`}
                </p>
                <Link to="/report" className="btn-saffron text-xs py-2 px-5 inline-flex items-center gap-1.5">
                  <Plus size={13} /> Submit Your First Report
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[--civic-gray-100]">
                {filteredReports.map((r) => {
                  const sm = statusMeta(r.status);
                  const um = urgencyMeta(r.urgency);
                  return (
                    <div key={r._id} className="p-5 hover:bg-[--civic-gray-50] transition-colors">
                      <div className="flex items-start gap-3">
                        {/* Status dot */}
                        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${sm.dot}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h4 className="font-semibold text-[--civic-navy] text-sm truncate">{r.title}</h4>
                            {r.category && (
                              <span className="text-[10px] font-bold bg-[--civic-gray-100] text-[--civic-gray-600] px-2 py-0.5 rounded">{r.category}</span>
                            )}
                          </div>
                          <p className="text-xs text-[--civic-gray-600] line-clamp-2 mb-2.5">{r.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-xs">
                            {r.location && (
                              <span className="flex items-center gap-1 text-[--civic-gray-400]">
                                <MapPin size={10} /> {r.location.slice(0, 40)}{r.location.length > 40 ? '…' : ''}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-[--civic-gray-400]">
                              <Clock size={10} /> {timeAgo(r.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded ${sm.bg} ${sm.text} flex items-center gap-1`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
                            {sm.label}
                          </span>
                          <span className={`text-xs font-semibold ${um.text}`}>{um.label}</span>
                          {r.images && r.images.length > 0 && (
                            <span className="text-[10px] text-[--civic-gray-400]">📷 {r.images.length} photo{r.images.length > 1 ? 's' : ''}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Activity timeline */}
          {reports.length > 0 && (
            <div className="bg-white border border-[--civic-gray-200] rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-[--civic-gray-200] flex items-center gap-2">
                <TrendingUp size={14} className="text-[--india-saffron]" />
                <p className="font-semibold text-[--civic-navy] text-sm">Recent Activity</p>
              </div>
              <div className="divide-y divide-[--civic-gray-100]">
                {reports.slice(0, 5).map((r) => {
                  const sm = statusMeta(r.status);
                  return (
                    <div key={r._id} className="px-5 py-3 flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full ${sm.bg} ${sm.text} flex items-center justify-center flex-shrink-0`}>
                        {r.status === 'Resolved' ? <CheckCircle size={13} /> : r.status === 'In Progress' ? <Activity size={13} /> : <AlertCircle size={13} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[--civic-navy] truncate">{r.title}</p>
                        <p className="text-[10px] text-[--civic-gray-400]">{sm.label} · {timeAgo(r.createdAt)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      <BackToTop />
    </div>
  );
}
