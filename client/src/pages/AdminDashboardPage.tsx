// src/pages/AdminDashboardPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { BarChart3, Clock, CheckCircle, AlertTriangle, MapPin, Activity, LogOut } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock data - replace with actual API calls
const mockReports = [
  {
    id: 1,
    title: 'Pothole on Main Market Road',
    type: 'pothole',
    status: 'new',
    location: { lat: 28.6139, lng: 77.2090 },
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    description: 'Large pothole causing traffic issues'
  },
  {
    id: 2,
    title: 'Garbage accumulation in Sector 5',
    type: 'garbage',
    status: 'in_progress',
    location: { lat: 28.6149, lng: 77.2190 },
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    description: 'Garbage not being collected regularly'
  },
  {
    id: 3,
    title: 'Streetlight not working near Park',
    type: 'streetlight',
    status: 'new',
    location: { lat: 28.6129, lng: 77.1990 },
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    description: 'Streetlight has been out for 2 days'
  },
  {
    id: 4,
    title: 'Water leakage in Block A',
    type: 'water',
    status: 'in_progress',
    location: { lat: 28.6159, lng: 77.2290 },
    createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    description: 'Water pipe burst causing flooding'
  },
  {
    id: 5,
    title: 'Broken sidewalk on MG Road',
    type: 'infrastructure',
    status: 'new',
    location: { lat: 28.6119, lng: 77.1890 },
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    description: 'Sidewalk tiles are broken and dangerous'
  }
];

const getIssueTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    pothole: '#f59e0b', // yellow
    garbage: '#8b5cf6', // purple
    streetlight: '#f97316', // orange
    water: '#06b6d4', // cyan
    infrastructure: '#ef4444', // red
    default: '#6b7280' // gray
  };
  return colors[type] || colors.default;
};

const getIssueTypeIcon = (type: string) => {
  const icons: { [key: string]: string } = {
    pothole: '🕳️',
    garbage: '🗑️',
    streetlight: '💡',
    water: '💧',
    infrastructure: '🏗️',
    default: '📍'
  };
  return icons[type] || icons.default;
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
};

const KPICard = ({ title, value, icon: Icon, color, trend }: {
  title: string;
  value: number;
  icon: any;
  color: string;
  trend?: string;
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 mt-1">{trend}</p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

const ActivityItem = ({ report }: { report: any }) => (
  <div className="flex items-start space-x-3 py-3 border-b border-slate-100 last:border-b-0">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
        <span className="text-sm">{getIssueTypeIcon(report.type)}</span>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-slate-900 capitalize">
        {report.type.replace('_', ' ')} reported
      </p>
      <p className="text-sm text-slate-600 truncate">{report.title}</p>
      <p className="text-xs text-slate-500">{formatTimeAgo(report.createdAt)}</p>
    </div>
  </div>
);

const MapMarker = ({ report }: { report: any }) => {
  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${getIssueTypeColor(report.type)};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 10px;
    ">${getIssueTypeIcon(report.type)}</div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  return (
    <Marker position={[report.location.lat, report.location.lng]} icon={customIcon}>
      <Popup>
        <div className="p-2">
          <h3 className="font-semibold text-sm mb-1">{report.title}</h3>
          <p className="text-xs text-slate-600 mb-2">{report.description}</p>
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              report.status === 'new' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {report.status === 'new' ? 'New' : 'In Progress'}
            </span>
            <button 
              onClick={() => navigate(`/admin/reports/${report.id}`)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [reports] = useState(mockReports);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check admin authentication
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
      return;
    }

    // Parse session data
    try {
      const sessionData = JSON.parse(adminSession);
      if (!sessionData.id || !sessionData.email) {
        localStorage.removeItem('adminSession');
        navigate('/admin/login');
        return;
      }
    } catch (error) {
      localStorage.removeItem('adminSession');
      navigate('/admin/login');
      return;
    }

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/admin/login');
  };

  // Calculate KPIs
  const newReports = reports.filter(r => r.status === 'new').length;
  const inProgressReports = reports.filter(r => r.status === 'in_progress').length;
  const resolvedThisMonth = 56; // Mock data
  const totalPending = newReports + inProgressReports;

  // Get recent activity (last 5 reports)
  const recentActivity = reports
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  // Get pending reports for map
  const pendingReports = reports.filter(r => r.status === 'new' || r.status === 'in_progress');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="mt-2 text-slate-600">Monitor and manage civic issues in real-time</p>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-4">
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/admin/reports')}
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Reports
                </button>
                <button
                  onClick={() => navigate('/admin/analytics')}
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Analytics
                </button>
              </nav>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="New Reports"
            value={newReports}
            icon={AlertTriangle}
            color="bg-red-500"
            trend="+2 from yesterday"
          />
          <KPICard
            title="In Progress"
            value={inProgressReports}
            icon={Clock}
            color="bg-yellow-500"
          />
          <KPICard
            title="Resolved This Month"
            value={resolvedThisMonth}
            icon={CheckCircle}
            color="bg-green-500"
            trend="+12% from last month"
          />
          <KPICard
            title="Total Pending"
            value={totalPending}
            icon={BarChart3}
            color="bg-blue-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-slate-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Live Map Overview</h2>
                </div>
                <p className="text-sm text-slate-600 mt-1">
                  {pendingReports.length} pending reports across the city
                </p>
              </div>
              <div className="h-96">
                <MapContainer
                  center={[28.6139, 77.2090]} // Delhi coordinates
                  zoom={12}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-b-lg"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {pendingReports.map((report) => (
                    <MapMarker key={report.id} report={report} />
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-slate-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
                </div>
                <p className="text-sm text-slate-600 mt-1">
                  Latest reports from citizens
                </p>
              </div>
              <div className="px-6 py-4">
                {recentActivity.length > 0 ? (
                  <div className="space-y-0">
                    {recentActivity.map((report) => (
                      <ActivityItem key={report.id} report={report} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button 
                onClick={() => navigate('/admin/reports')}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
              >
                <BarChart3 className="h-5 w-5" />
                <span>Manage Reports</span>
              </button>
              <button 
                onClick={() => navigate('/admin/analytics')}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors"
              >
                <Activity className="h-5 w-5" />
                <span>View Analytics</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                <CheckCircle className="h-5 w-5" />
                <span>Bulk Actions</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors">
                <Activity className="h-5 w-5" />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
