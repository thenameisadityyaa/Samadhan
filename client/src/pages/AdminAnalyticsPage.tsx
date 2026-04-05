// src/pages/AdminAnalyticsPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Filter, 
  Download, 
  Calendar,
  LogOut,
  ArrowLeft,
  PieChart,
  Activity,
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const mockAnalyticsData = {
  reportsByCategory: [
    { category: 'Pothole', count: 45, percentage: 35, color: '#f59e0b' },
    { category: 'Sanitation', count: 32, percentage: 25, color: '#8b5cf6' },
    { category: 'Streetlight', count: 28, percentage: 22, color: '#f97316' },
    { category: 'Water', count: 15, percentage: 12, color: '#0ea5e9' },
    { category: 'Infrastructure', count: 8, percentage: 6, color: '#ef4444' }
  ],
  reportsOverTime: [
    { date: '2024-01-01', count: 12 }, { date: '2024-01-02', count: 18 },
    { date: '2024-01-03', count: 15 }, { date: '2024-01-04', count: 22 },
    { date: '2024-01-05', count: 28 }, { date: '2024-01-06', count: 25 },
    { date: '2024-01-07', count: 31 }, { date: '2024-01-08', count: 35 },
    { date: '2024-01-09', count: 29 }, { date: '2024-01-10', count: 33 },
    { date: '2024-01-11', count: 38 }, { date: '2024-01-12', count: 42 },
    { date: '2024-01-13', count: 39 }, { date: '2024-01-14', count: 45 },
    { date: '2024-01-15', count: 48 }
  ],
  hotspotData: [
    { lat: 28.6139, lng: 77.2090, intensity: 0.9, category: 'Pothole', count: 12 },
    { lat: 28.6149, lng: 77.2190, intensity: 0.7, category: 'Sanitation', count: 8 },
    { lat: 28.6129, lng: 77.1990, intensity: 0.6, category: 'Streetlight', count: 6 },
    { lat: 28.6159, lng: 77.2290, intensity: 0.8, category: 'Water', count: 10 },
    { lat: 28.6119, lng: 77.1890, intensity: 0.5, category: 'Infrastructure', count: 4 }
  ],
  summaryStats: {
    totalReports: 128, newThisWeek: 45, resolvedThisWeek: 38,
    avgResolutionTime: 3.2, topIssueType: 'Pothole', mostActiveArea: 'Sector 5'
  }
};

const getIntensityColor = (intensity: number) => {
  if (intensity >= 0.8) return '#B91C1C';
  if (intensity >= 0.6) return '#EA580C';
  if (intensity >= 0.4) return '#F59E0B';
  if (intensity >= 0.2) return '#059669';
  return '#6B7280';
};
const getIntensitySize = (intensity: number) => Math.max(8, intensity * 20);

const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }: any) => (
  <div className="bg-white rounded-sm shadow-sm border border-[--civic-gray-200] p-6 relative overflow-hidden group">
    <div className={`absolute top-0 left-0 w-1 h-full ${color}`} />
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-[--civic-gray-500] uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold text-[--civic-navy] mt-1 font-display">{value}</p>
        {trend && <p className="text-xs font-bold text-[--india-green] mt-1">{trend}</p>}
        {subtitle && <p className="text-xs text-[--civic-gray-400] mt-1">{subtitle}</p>}
      </div>
      <div className={`p-4 rounded-sm bg-[--civic-gray-50] border border-[--civic-gray-200]`}>
        <Icon className="h-6 w-6 text-[--civic-navy]" />
      </div>
    </div>
  </div>
);

const CategoryChart = ({ data }: { data: any[] }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-[--civic-navy] uppercase tracking-widest border-b border-[--civic-gray-200] pb-2 mb-4">Operations by Category</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between group">
            <div className="flex items-center space-x-3 w-1/3">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-bold text-[--civic-navy] tracking-wide">{item.category}</span>
            </div>
            <div className="flex items-center space-x-3 w-2/3">
              <div className="flex-1 bg-[--civic-gray-100] rounded-sm h-1.5 overflow-hidden">
                <div className="h-full rounded-sm" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
              </div>
              <span className="text-xs font-bold text-[--civic-navy] w-8 text-right font-mono">{item.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TimeSeriesChart = ({ data }: { data: any[] }) => {
  const maxCount = Math.max(...data.map(d => d.count));
  return (
    <div className="mt-6">
      <div className="flex items-end space-x-1 h-48 border-b-2 border-l-2 border-[--civic-gray-200] px-2 p-4 relative pt-8">
        {data.map((item, index) => {
          const height = `${(item.count / maxCount) * 100}%`;
          return (
            <div key={index} className="flex-1 flex flex-col justify-end items-center group relative h-full">
              <div className="w-full bg-[--civic-navy] hover:bg-[--india-saffron] transition-colors max-w-[24px] rounded-t-sm" style={{ height }} />
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-black text-white text-[10px] py-1 px-2 rounded-sm whitespace-nowrap z-10 transition-opacity">
                {item.count} reports<br/>{new Date(item.date).toLocaleDateString('en-GB')}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] font-bold text-[--civic-gray-400] mt-2 px-2 uppercase tracking-wider">
        <span>{new Date(data[0].date).toLocaleDateString('en-GB')}</span>
        <span>{new Date(data[data.length - 1].date).toLocaleDateString('en-GB')}</span>
      </div>
    </div>
  );
};

export function AdminAnalyticsPage() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('This Month');
  const [adminProfile, setAdminProfile] = useState<any>(null);

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
      return;
    }
    setAdminProfile(JSON.parse(adminSession));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

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
            <Link to="/admin/reports" className="text-sm font-semibold text-[--civic-gray-600] hover:text-[--civic-navy] py-2 transition-colors">Master Report Registry</Link>
            <span className="text-sm font-bold text-[--india-saffron] border-b-2 border-[--india-saffron] py-2">Strategic Analytics</span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="py-1 px-3 border border-[--civic-gray-300] rounded-sm text-xs font-bold focus:outline-none focus:border-[--civic-navy] text-[--civic-navy] uppercase tracking-widest bg-white"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>Last Quarter</option>
              <option>Year to Date</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-1 bg-[--civic-navy] text-white hover:bg-[--civic-navy-700] rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-sm transition-colors border border-[--civic-navy-700]">
              <Download size={12} /> EXPORT PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-12 flex-1 flex flex-col w-full space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Inductions" value={mockAnalyticsData.summaryStats.totalReports} icon={BarChart3} color="bg-[--civic-navy]" trend="+12% from last period" subtitle="Active tracking records" />
          <StatCard title="Resolution Velocity" value={`${mockAnalyticsData.summaryStats.avgResolutionTime} days`} icon={Clock} color="bg-[--india-saffron]" trend="-0.5 days avg" subtitle="Incident closure rate" />
          <StatCard title="Priority Sector" value={mockAnalyticsData.summaryStats.mostActiveArea} icon={MapPin} color="bg-[#B91C1C]" subtitle={`${mockAnalyticsData.summaryStats.topIssueType} major concern`} />
          <StatCard title="Resolution Accuracy" value="94.2%" icon={CheckCircle} color="bg-[--india-green]" trend="+2.1% improvement" subtitle="Valid successful closures" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white rounded-sm shadow-sm border border-[--civic-gray-200] p-6">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-[--civic-gray-200]">
              <h2 className="text-sm font-bold text-[--civic-navy] uppercase tracking-widest">Engagement Frequency</h2>
              <TrendIndicator />
            </div>
            <TimeSeriesChart data={mockAnalyticsData.reportsOverTime} />
          </div>

          {/* Categories */}
          <div className="bg-white rounded-sm shadow-sm border border-[--civic-gray-200] p-6">
            <CategoryChart data={mockAnalyticsData.reportsByCategory} />
          </div>
        </div>

        {/* Intelligence Map */}
        <div className="bg-white rounded-sm shadow-sm border border-[--civic-gray-200] p-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[--civic-gray-200]">
            <h2 className="text-sm font-bold text-[--civic-navy] uppercase tracking-widest">Geospatial Hotspots</h2>
          </div>
          <div className="h-[400px] rounded-sm overflow-hidden border border-[--civic-gray-300]">
            <MapContainer center={[28.6139, 77.2090]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              {mockAnalyticsData.hotspotData.map((hotspot, index) => (
                <CircleMarker
                  key={index}
                  center={[hotspot.lat, hotspot.lng]}
                  radius={getIntensitySize(hotspot.intensity)}
                  pathOptions={{
                    fillColor: getIntensityColor(hotspot.intensity),
                    fillOpacity: 0.7,
                    color: '#ffffff',
                    weight: 2
                  }}
                >
                  <Popup>
                    <div className="p-2 border border-[--civic-gray-200] rounded-sm bg-white shadow-xl">
                      <h4 className="font-bold text-[10px] uppercase tracking-wider text-[--civic-navy] mb-1">{hotspot.category} Zone</h4>
                      <p className="text-xs text-[--civic-gray-500] font-mono">Intensity: {(hotspot.intensity * 100).toFixed(0)}%</p>
                      <p className="text-xs text-[--civic-gray-500] font-mono">Active Cases: {hotspot.count}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

const TrendIndicator = () => (
  <div className="flex items-center space-x-2 text-[10px] font-bold text-[--india-green] border border-green-200 bg-green-50 px-2 py-1 rounded-sm uppercase tracking-wider">
    <TrendingUp size={12} />
    <span>Positive Trend Predicted</span>
  </div>
);
