// src/pages/AdminAnalyticsPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock data for analytics - replace with actual API calls
const mockAnalyticsData = {
  reportsByCategory: [
    { category: 'Pothole', count: 45, percentage: 35, color: '#f59e0b' },
    { category: 'Sanitation', count: 32, percentage: 25, color: '#8b5cf6' },
    { category: 'Streetlight', count: 28, percentage: 22, color: '#f97316' },
    { category: 'Water', count: 15, percentage: 12, color: '#06b6d4' },
    { category: 'Infrastructure', count: 8, percentage: 6, color: '#ef4444' }
  ],
  reportsOverTime: [
    { date: '2024-01-01', count: 12 },
    { date: '2024-01-02', count: 18 },
    { date: '2024-01-03', count: 15 },
    { date: '2024-01-04', count: 22 },
    { date: '2024-01-05', count: 28 },
    { date: '2024-01-06', count: 25 },
    { date: '2024-01-07', count: 31 },
    { date: '2024-01-08', count: 35 },
    { date: '2024-01-09', count: 29 },
    { date: '2024-01-10', count: 33 },
    { date: '2024-01-11', count: 38 },
    { date: '2024-01-12', count: 42 },
    { date: '2024-01-13', count: 39 },
    { date: '2024-01-14', count: 45 },
    { date: '2024-01-15', count: 48 }
  ],
  hotspotData: [
    { lat: 28.6139, lng: 77.2090, intensity: 0.9, category: 'Pothole', count: 12 },
    { lat: 28.6149, lng: 77.2190, intensity: 0.7, category: 'Sanitation', count: 8 },
    { lat: 28.6129, lng: 77.1990, intensity: 0.6, category: 'Streetlight', count: 6 },
    { lat: 28.6159, lng: 77.2290, intensity: 0.8, category: 'Water', count: 10 },
    { lat: 28.6119, lng: 77.1890, intensity: 0.5, category: 'Infrastructure', count: 4 },
    { lat: 28.6169, lng: 77.2390, intensity: 0.4, category: 'Pothole', count: 3 },
    { lat: 28.6109, lng: 77.1790, intensity: 0.3, category: 'Sanitation', count: 2 },
    { lat: 28.6179, lng: 77.2490, intensity: 0.6, category: 'Streetlight', count: 5 }
  ],
  summaryStats: {
    totalReports: 128,
    newThisWeek: 45,
    resolvedThisWeek: 38,
    avgResolutionTime: 3.2,
    topIssueType: 'Pothole',
    mostActiveArea: 'Sector 5'
  }
};

const getIntensityColor = (intensity: number) => {
  if (intensity >= 0.8) return '#ef4444'; // Red - High intensity
  if (intensity >= 0.6) return '#f97316'; // Orange - Medium-High intensity
  if (intensity >= 0.4) return '#f59e0b'; // Yellow - Medium intensity
  if (intensity >= 0.2) return '#10b981'; // Green - Low-Medium intensity
  return '#6b7280'; // Gray - Low intensity
};

const getIntensitySize = (intensity: number) => {
  return Math.max(8, intensity * 20); // Scale from 8 to 20 pixels
};

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend, 
  subtitle 
}: {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  trend?: string;
  subtitle?: string;
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 mt-1">{trend}</p>
        )}
        {subtitle && (
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

const CategoryChart = ({ data }: { data: any[] }) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Reports by Category</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-slate-700">{item.category}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-32 bg-slate-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{ 
                    width: `${item.percentage}%`, 
                    backgroundColor: item.color 
                  }}
                />
              </div>
              <span className="text-sm font-medium text-slate-900 w-12 text-right">
                {item.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrendChart = ({ data }: { data: any[] }) => {
  const maxCount = Math.max(...data.map(item => item.count));
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Reports Over Time</h3>
      <div className="h-64 flex items-end space-x-1">
        {data.map((item, index) => {
          const height = (item.count / maxCount) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t"
                style={{ height: `${height}%` }}
              />
              <div className="text-xs text-slate-500 mt-2 transform -rotate-45 origin-left">
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HotspotMarker = ({ data }: { data: any }) => {
  const color = getIntensityColor(data.intensity);
  const size = getIntensitySize(data.intensity);
  
  return (
    <CircleMarker
      center={[data.lat, data.lng]}
      radius={size}
      pathOptions={{
        fillColor: color,
        color: color,
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.6
      }}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-semibold text-sm mb-1">{data.category} Hotspot</h3>
          <p className="text-xs text-slate-600 mb-2">{data.count} reports in this area</p>
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: color }}
            />
            <span className="text-xs">
              Intensity: {Math.round(data.intensity * 100)}%
            </span>
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
};

export function AdminAnalyticsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const [analyticsData] = useState(mockAnalyticsData);

  useEffect(() => {
    // Check admin authentication
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
      return;
    }

    // Simulate loading analytics data
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/admin/login');
  };

  const filteredHotspots = selectedCategory === 'all' 
    ? analyticsData.hotspotData 
    : analyticsData.hotspotData.filter(spot => spot.category === selectedCategory);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Pothole', label: 'Pothole' },
    { value: 'Sanitation', label: 'Sanitation' },
    { value: 'Streetlight', label: 'Streetlight' },
    { value: 'Water', label: 'Water' },
    { value: 'Infrastructure', label: 'Infrastructure' }
  ];

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading analytics...</p>
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
              <h1 className="text-3xl font-bold text-slate-900">Analytics & Insights</h1>
              <p className="mt-2 text-slate-600">Data-driven insights for strategic planning</p>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-4">
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
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
                  className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg"
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
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Reports"
            value={analyticsData.summaryStats.totalReports}
            icon={BarChart3}
            color="bg-blue-500"
            trend="+12% from last month"
          />
          <StatCard
            title="New This Week"
            value={analyticsData.summaryStats.newThisWeek}
            icon={Activity}
            color="bg-green-500"
            subtitle="Reports submitted"
          />
          <StatCard
            title="Resolved This Week"
            value={analyticsData.summaryStats.resolvedThisWeek}
            icon={CheckCircle}
            color="bg-purple-500"
            subtitle="Issues fixed"
          />
          <StatCard
            title="Avg Resolution Time"
            value={`${analyticsData.summaryStats.avgResolutionTime} days`}
            icon={Clock}
            color="bg-orange-500"
            subtitle="Time to resolve"
          />
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter Analytics</span>
            </h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Issue Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Top Issue Type</label>
              <div className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg">
                <span className="text-slate-900 font-medium">{analyticsData.summaryStats.topIssueType}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* GIS Hotspot Map */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">GIS Hotspot Analysis</h2>
            <div className="h-96 rounded-lg overflow-hidden">
              <MapContainer
                center={[28.6139, 77.2090]} // Delhi coordinates
                zoom={12}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredHotspots.map((hotspot, index) => (
                  <HotspotMarker key={index} data={hotspot} />
                ))}
              </MapContainer>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span>Showing {filteredHotspots.length} hotspots</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>High</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span>Medium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Low</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <CategoryChart data={analyticsData.reportsByCategory} />
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <TrendChart data={analyticsData.reportsOverTime} />
        </div>

        {/* Insights & Recommendations */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Insights & Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h3 className="font-semibold text-red-800">High Priority Area</h3>
                </div>
                <p className="text-sm text-red-700">
                  Sector 5 shows the highest concentration of pothole reports. 
                  Consider scheduling immediate road maintenance in this area.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-yellow-600" />
                  <h3 className="font-semibold text-yellow-800">Trending Up</h3>
                </div>
                <p className="text-sm text-yellow-700">
                  Sanitation issues have increased 25% this week. 
                  Review garbage collection schedules in affected areas.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Improvement</h3>
                </div>
                <p className="text-sm text-green-700">
                  Average resolution time decreased by 0.5 days this month. 
                  Keep up the good work!
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Resource Allocation</h3>
                </div>
                <p className="text-sm text-blue-700">
                  Consider deploying additional Public Works teams to 
                  high-intensity areas during peak reporting periods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
