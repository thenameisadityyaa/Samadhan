// src/pages/AdminDashboardPage.tsx — India Gov Design System v3
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { BarChart3, Clock, CheckCircle, AlertTriangle, MapPin, LogOut, ArrowRight, Activity, Filter, RefreshCw } from 'lucide-react';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Civic map marker style
const createCustomMarker = (color: string, iconStr: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 22px; height: 22px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(26,42,108,0.3);
        display: flex; align-items: center; justify-content: center;
        color: white; font-size: 10px; font-weight: bold;
      ">${iconStr}</div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
};

const getUrgencyMeta = (urgency: string) => {
  if (urgency === 'high') return { label: 'CRITICAL', color: 'text-white bg-[#B91C1C]', border: 'border-[#B91C1C] border-l-4', hex: '#B91C1C' };
  if (urgency === 'medium') return { label: 'ELEVATED', color: 'text-white bg-[--india-saffron]', border: 'border-[--india-saffron] border-l-4', hex: '#FF9933' };
  return { label: 'ROUTINE', color: 'text-white bg-[--india-green]', border: 'border-[--india-green] border-l-4', hex: '#138808' };
};

const formatTimeAgo = (date: Date) => {
  const diffInMinutes = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60));
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const hrs = Math.floor(diffInMinutes / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

// Check if a report SLA is breached (> 72 hours and not resolved)
const isSlaBreached = (createdAt: Date, status: string) => {
  if (status === 'resolved') return false;
  const diffHours = (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60);
  return diffHours > 72;
};

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [adminProfile, setAdminProfile] = useState<any>(null);

  const fetchReports = async (showSpinner = false) => {
    if (showSpinner) setIsRefreshing(true);
    try {
      const adminToken = localStorage.getItem('adminToken');
      // Simulated API response format handling due to missing mock data setup in some cases
      const { data } = await axios.get('/api/reports', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const formatted = data.data.map((r: any) => ({
        id: r._id,
        title: r.title,
        type: r.category || 'General',
        urgency: r.urgency || 'low',
        status: r.status === 'Submitted' ? 'new' : r.status === 'In Progress' ? 'in_progress' : 'resolved',
        location: { lat: r.coordinates?.lat || 28.6139, lng: r.coordinates?.lng || 77.2090 },
        address: r.location || 'Location Not Provided',
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

  // KPIs
  const totalReports = reports.length;
  const newReports = reports.filter(r => r.status === 'new').length;
  const inProgressReports = reports.filter(r => r.status === 'in_progress').length;
  const resolvedReports = reports.filter(r => r.status === 'resolved').length;
  const slaBreachedCount = reports.filter(r => isSlaBreached(r.createdAt, r.status)).length;

  const pendingReports = reports.filter(r => r.status !== 'resolved');
  const urgentQueue = pendingReports.filter(r => r.urgency === 'high').slice(0, 5);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[--civic-gray-50] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[--india-saffron]/30 border-t-[--india-saffron] rounded-full animate-spin mb-4" />
        <p className="text-[--civic-navy] font-semibold tracking-wide">INITIALIZING WORKSPACE...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[--civic-gray-50] font-sans">
      
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
      <div className="bg-white border-b border-[--civic-gray-200] mb-6">
        <div className="max-w-[1400px] mx-auto px-6 py-2 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-[--india-saffron] border-b-2 border-[--india-saffron] py-2">Operations Dashboard</span>
            <Link to="/admin/reports" className="text-sm font-semibold text-[--civic-gray-600] hover:text-[--civic-navy] py-2 transition-colors">Master Report Registry</Link>
            <Link to="/admin/analytics" className="text-sm font-semibold text-[--civic-gray-600] hover:text-[--civic-navy] py-2 transition-colors">Strategic Analytics</Link>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => fetchReports(true)} disabled={isRefreshing} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[--civic-gray-100] text-[--civic-navy] rounded border border-[--civic-gray-200] hover:bg-[--civic-gray-200] transition-colors uppercase tracking-widest disabled:opacity-50">
              <RefreshCw size={12} className={isRefreshing ? "animate-spin" : ""} /> Sync Data
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-12">
        
        {/* ── Key Performance Indicators ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white border border-[--civic-gray-200] rounded-sm p-4 shadow-sm border-l-4 border-l-[--civic-navy]">
            <p className="text-[10px] uppercase font-bold tracking-widest text-[--civic-gray-500] mb-1">Total Docket</p>
            <p className="text-2xl font-black text-[--civic-navy] font-accent">{totalReports}</p>
          </div>
          <div className="bg-white border border-[--civic-gray-200] rounded-sm p-4 shadow-sm border-l-4 border-l-[#3B82F6]">
            <p className="text-[10px] uppercase font-bold tracking-widest text-[--civic-gray-500] mb-1">Incoming</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-black text-slate-800 font-accent">{newReports}</p>
              <div className="h-2 w-2 rounded-full bg-[#3B82F6] mb-2 animate-pulse" />
            </div>
          </div>
          <div className="bg-white border border-[--civic-gray-200] rounded-sm p-4 shadow-sm border-l-4 border-l-[--india-saffron]">
            <p className="text-[10px] uppercase font-bold tracking-widest text-[--civic-gray-500] mb-1">In Processing</p>
            <p className="text-2xl font-black text-slate-800 font-accent">{inProgressReports}</p>
          </div>
          <div className="bg-white border border-[--civic-gray-200] rounded-sm p-4 shadow-sm border-l-4 border-l-[--india-green]">
            <p className="text-[10px] uppercase font-bold tracking-widest text-[--civic-gray-500] mb-1">Resolved (YTD)</p>
            <p className="text-2xl font-black text-slate-800 font-accent">{resolvedReports}</p>
          </div>
          <div className="bg-white border border-red-200 rounded-sm p-4 shadow-sm border-l-4 border-l-red-600 bg-red-50/30">
            <p className="text-[10px] uppercase font-bold tracking-widest text-red-700 mb-1 flex items-center gap-1">
              <AlertTriangle size={10} /> SLA Breached (&gt;72h)
            </p>
            <p className="text-2xl font-black text-red-700 font-accent">{slaBreachedCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* ── Left Column: Operations Map & Feed ── */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Live Operations Map */}
            <div className="bg-white border border-[--civic-gray-200] rounded-sm overflow-hidden shadow-sm">
              <div className="px-5 py-3 border-b border-[--civic-gray-200] bg-[--civic-gray-50] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[--civic-navy]" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[--civic-navy]">Live Operations Grid</h2>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-[--civic-gray-500]">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-[#B91C1C]" /> Critical</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-[--india-saffron]" /> Elevated</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-[--india-green]" /> Routine</span>
                </div>
              </div>
              <div className="h-[400px] w-full bg-[--civic-gray-100]">
                <MapContainer center={[28.6139, 77.2090]} zoom={12} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                  <TileLayer
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap &copy; CartoDB'
                  />
                  {pendingReports.map((report) => (
                    <Marker key={report.id} position={[report.location.lat, report.location.lng]} icon={createCustomMarker(getUrgencyMeta(report.urgency).hex, '!')}>
                      <Popup className="civic-popup">
                        <div className="p-1 min-w-[200px]">
                          <div className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-sm inline-block mb-1.5 bg-[${getUrgencyMeta(report.urgency).hex}]`}>
                            {getUrgencyMeta(report.urgency).label}
                          </div>
                          <h3 className="font-bold text-xs text-[--civic-navy] mb-1 leading-tight">{report.title}</h3>
                          <p className="text-[10px] text-[--civic-gray-500] mb-2 border-b border-[--civic-gray-100] pb-2 line-clamp-2">{report.address}</p>
                          <button onClick={() => navigate(`/admin/reports/${report.id}`)} className="text-[10px] font-bold text-[--india-saffron] hover:text-[--india-saffron-700] flex items-center gap-1 uppercase tracking-wider">
                            Inspect Docket <ArrowRight size={10} />
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Structured Recent Activity Log */}
            <div className="bg-white border border-[--civic-gray-200] rounded-sm shadow-sm overflow-hidden auto-rows-min">
              <div className="px-5 py-3 border-b border-[--civic-gray-200] bg-[--civic-gray-50] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-[--civic-navy]" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[--civic-navy]">System Activity Log</h2>
                </div>
                <Link to="/admin/reports" className="text-[10px] font-bold uppercase tracking-wider text-[--india-saffron] hover:underline flex items-center gap-1">
                  View Full Registry <ArrowRight size={10} />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white uppercase text-[10px] font-bold text-[--civic-gray-500] border-b border-[--civic-gray-200]">
                    <tr>
                      <th className="px-5 py-3 tracking-wider">Docket ID / Title</th>
                      <th className="px-5 py-3 tracking-wider">Category</th>
                      <th className="px-5 py-3 tracking-wider">Status</th>
                      <th className="px-5 py-3 tracking-wider">Time LOG</th>
                      <th className="px-5 py-3 text-right tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[--civic-gray-100]">
                    {reports.slice(0, 8).map((r) => (
                      <tr key={r.id} className="hover:bg-[--civic-gray-50] transition-colors group">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-[--civic-gray-400]">#{r.id.slice(-6).toUpperCase()}</span>
                            <span className="font-semibold text-slate-800 text-xs truncate max-w-[200px]">{r.title}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">{r.type}</span>
                        </td>
                        <td className="px-5 py-3">
                          {r.status === 'new' && <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-200 uppercase">Incoming</span>}
                          {r.status === 'in_progress' && <span className="text-[10px] font-bold text-[--india-saffron] bg-orange-50 px-2 py-0.5 rounded-sm border border-orange-200 uppercase">In Progress</span>}
                          {r.status === 'resolved' && <span className="text-[10px] font-bold text-[--india-green] bg-green-50 px-2 py-0.5 rounded-sm border border-green-200 uppercase">Resolved</span>}
                        </td>
                        <td className="px-5 py-3 text-[10px] text-slate-500 font-mono">
                          {formatTimeAgo(r.createdAt)}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button onClick={() => navigate(`/admin/reports/${r.id}`)} className="text-[10px] font-bold uppercase tracking-wider text-[--civic-gray-400] group-hover:text-[--india-saffron] transition-colors border border-transparent group-hover:border-[--india-saffron]/30 px-2 py-1 rounded">
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                    {reports.length === 0 && (
                      <tr><td colSpan={5} className="px-5 py-10 text-center text-xs text-slate-500">No records found in registry.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Right Column: Urgent Queue ── */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Urgent Queue Panel */}
            <div className="bg-white border border-[#B91C1C]/30 rounded-sm shadow-sm flex flex-col h-full auto-rows-min pb-4">
              <div className="px-5 py-4 border-b border-[#B91C1C]/20 bg-red-50/50">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#B91C1C] flex items-center gap-2">
                  <AlertTriangle size={16} /> Urgent Intervention
                </h2>
                <p className="text-[10px] text-[#B91C1C]/70 font-semibold mt-1 uppercase tracking-wider">Prioritize These Dockets</p>
              </div>
              <div className="divide-y divide-[--civic-gray-100] flex-1">
                {urgentQueue.map((r) => {
                  const slaBreach = isSlaBreached(r.createdAt, r.status);
                  return (
                    <div key={r.id} className="p-4 hover:bg-[--civic-gray-50] transition-colors">
                      <div className="flex items-start justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-[#B91C1C] bg-red-50 px-1 border border-red-100 rounded-sm">#{r.id.slice(-5).toUpperCase()}</span>
                        <span className="text-[10px] font-semibold text-slate-500">{formatTimeAgo(r.createdAt)}</span>
                      </div>
                      <h4 className="text-[13px] font-bold text-slate-900 leading-snug mb-1 line-clamp-2">{r.title}</h4>
                      <p className="text-[10px] text-slate-500 mb-3 truncate flex items-center gap-1"><MapPin size={10} /> {r.address}</p>
                      <div className="flex items-center justify-between">
                        {slaBreach ? (
                          <span className="text-[9px] font-bold text-white bg-[#B91C1C] px-1.5 py-0.5 rounded-sm uppercase tracking-wider animate-pulse">SLA Breached</span>
                        ) : (
                          <span className="text-[9px] font-bold text-[#B91C1C] bg-red-50 px-1.5 py-0.5 rounded-sm uppercase tracking-wider border border-red-200">SLA Active</span>
                        )}
                        <button onClick={() => navigate(`/admin/reports/${r.id}`)} className="text-[10px] font-bold text-[--civic-navy] hover:underline">ACTION &rarr;</button>
                      </div>
                    </div>
                  );
                })}
                {urgentQueue.length === 0 && (
                  <div className="px-5 py-8 text-center text-slate-500 text-xs flex flex-col items-center">
                    <CheckCircle size={20} className="mb-2 text-[--india-green]" />
                    No critical issues pending.
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}

