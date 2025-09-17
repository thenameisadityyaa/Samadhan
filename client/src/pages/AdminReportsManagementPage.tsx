// src/pages/AdminReportsManagementPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  Eye, 
  Edit, 
  MoreVertical,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  LogOut,
  ArrowLeft
} from 'lucide-react';

// Mock data - replace with actual API calls
const mockReports = [
  {
    id: 'RPT-001',
    issueType: 'Pothole',
    location: 'Main Market Road, Sector 5',
    dateSubmitted: new Date('2024-01-15T10:30:00'),
    status: 'new',
    assignedTo: 'Public Works Dept',
    description: 'Large pothole causing traffic issues',
    priority: 'high'
  },
  {
    id: 'RPT-002',
    issueType: 'Sanitation',
    location: 'Gandhi Nagar, Block A',
    dateSubmitted: new Date('2024-01-14T14:20:00'),
    status: 'in_progress',
    assignedTo: 'Sanitation Dept',
    description: 'Garbage not being collected regularly',
    priority: 'medium'
  },
  {
    id: 'RPT-003',
    issueType: 'Streetlight',
    location: 'Park Street, Near Central Park',
    dateSubmitted: new Date('2024-01-13T18:45:00'),
    status: 'new',
    assignedTo: 'Electrical Dept',
    description: 'Streetlight has been out for 2 days',
    priority: 'medium'
  },
  {
    id: 'RPT-004',
    issueType: 'Water',
    location: 'Sector 12, Block B',
    dateSubmitted: new Date('2024-01-12T09:15:00'),
    status: 'resolved',
    assignedTo: 'Water Dept',
    description: 'Water pipe burst causing flooding',
    priority: 'high'
  },
  {
    id: 'RPT-005',
    issueType: 'Infrastructure',
    location: 'MG Road, Near Mall',
    dateSubmitted: new Date('2024-01-11T16:30:00'),
    status: 'rejected',
    assignedTo: 'Public Works Dept',
    description: 'Sidewalk tiles are broken and dangerous',
    priority: 'low'
  },
  {
    id: 'RPT-006',
    issueType: 'Pothole',
    location: 'Highway Road, Km 15',
    dateSubmitted: new Date('2024-01-10T11:00:00'),
    status: 'in_progress',
    assignedTo: 'Highway Dept',
    description: 'Multiple potholes on highway',
    priority: 'high'
  },
  {
    id: 'RPT-007',
    issueType: 'Sanitation',
    location: 'Market Area, Sector 8',
    dateSubmitted: new Date('2024-01-09T13:45:00'),
    status: 'new',
    assignedTo: 'Sanitation Dept',
    description: 'Sewage overflow in market area',
    priority: 'high'
  },
  {
    id: 'RPT-008',
    issueType: 'Streetlight',
    location: 'Residential Area, Block C',
    dateSubmitted: new Date('2024-01-08T20:15:00'),
    status: 'resolved',
    assignedTo: 'Electrical Dept',
    description: 'Streetlight not working in residential area',
    priority: 'medium'
  }
];

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    new: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const getStatusLabel = (status: string) => {
  const labels: { [key: string]: string } = {
    new: 'New',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    rejected: 'Rejected'
  };
  return labels[status] || status;
};

const getPriorityColor = (priority: string) => {
  const colors: { [key: string]: string } = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-green-600'
  };
  return colors[priority] || 'text-gray-600';
};

const getPriorityLabel = (priority: string) => {
  const labels: { [key: string]: string } = {
    high: 'High',
    medium: 'Medium',
    low: 'Low'
  };
  return labels[priority] || priority;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const FilterDropdown = ({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium text-slate-700">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const SortableHeader = ({ 
  label, 
  sortKey, 
  currentSort, 
  onSort 
}: {
  label: string;
  sortKey: string;
  currentSort: { key: string; direction: 'asc' | 'desc' };
  onSort: (key: string) => void;
}) => {
  const isActive = currentSort.key === sortKey;
  const direction = isActive ? currentSort.direction : null;

  return (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-50"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <div className="flex flex-col">
          {direction === 'asc' ? (
            <ArrowUp className="h-3 w-3" />
          ) : direction === 'desc' ? (
            <ArrowDown className="h-3 w-3" />
          ) : (
            <ArrowUpDown className="h-3 w-3 text-slate-300" />
          )}
        </div>
      </div>
    </th>
  );
};

export function AdminReportsManagementPage() {
  const navigate = useNavigate();
  const [reports] = useState(mockReports);
  const [filteredReports, setFilteredReports] = useState(mockReports);
  const [filters, setFilters] = useState({
    status: '',
    issueType: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  });
  const [sort, setSort] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'dateSubmitted',
    direction: 'desc'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check admin authentication
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
      return;
    }

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    let filtered = [...reports];

    // Apply filters
    if (filters.status) {
      filtered = filtered.filter(report => report.status === filters.status);
    }
    if (filters.issueType) {
      filtered = filtered.filter(report => report.issueType === filters.issueType);
    }
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(report => report.dateSubmitted >= fromDate);
    }
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(report => report.dateSubmitted <= toDate);
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(report => 
        report.id.toLowerCase().includes(searchTerm) ||
        report.location.toLowerCase().includes(searchTerm) ||
        report.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sort.key as keyof typeof a];
      let bValue = b[sort.key as keyof typeof b];

      if (sort.key === 'dateSubmitted') {
        aValue = new Date(aValue as string);
        bValue = new Date(bValue as string);
      }

      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredReports(filtered);
  }, [reports, filters, sort]);

  const handleSort = (key: string) => {
    setSort(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      issueType: '',
      dateFrom: '',
      dateTo: '',
      search: ''
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/admin/login');
  };

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const issueTypeOptions = [
    { value: 'Pothole', label: 'Pothole' },
    { value: 'Sanitation', label: 'Sanitation' },
    { value: 'Streetlight', label: 'Streetlight' },
    { value: 'Water', label: 'Water' },
    { value: 'Infrastructure', label: 'Infrastructure' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading reports...</p>
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
              <h1 className="text-3xl font-bold text-slate-900">Reports Management</h1>
              <p className="mt-2 text-slate-600">Manage and track all civic issue reports</p>
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
                  className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg"
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
        {/* Filtering Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter Reports</span>
            </h2>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search by ID, location, or description..."
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <FilterDropdown
              label="Status"
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
              options={statusOptions}
              placeholder="All Statuses"
            />

            {/* Issue Type Filter */}
            <FilterDropdown
              label="Issue Type"
              value={filters.issueType}
              onChange={(value) => handleFilterChange('issueType', value)}
              options={issueTypeOptions}
              placeholder="All Types"
            />

            {/* Date Range */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-slate-700">Date Range</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
            <span>Showing {filteredReports.length} of {reports.length} reports</span>
            <button className="flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <SortableHeader
                    label="Report ID"
                    sortKey="id"
                    currentSort={sort}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    label="Issue Type"
                    sortKey="issueType"
                    currentSort={sort}
                    onSort={handleSort}
                  />
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Location
                  </th>
                  <SortableHeader
                    label="Date Submitted"
                    sortKey="dateSubmitted"
                    currentSort={sort}
                    onSort={handleSort}
                  />
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {report.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {report.issueType}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 max-w-xs truncate">
                      {report.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {formatDate(report.dateSubmitted)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {getStatusLabel(report.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {report.assignedTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-medium ${getPriorityColor(report.priority)}`}>
                        {getPriorityLabel(report.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => navigate(`/admin/reports/${report.id}`)}
                          className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </button>
                        <button className="text-slate-600 hover:text-slate-900">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-4">
                <Filter className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No reports found</h3>
              <p className="text-slate-600">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
