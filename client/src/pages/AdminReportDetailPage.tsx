// src/pages/AdminReportDetailPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Save,
  MessageSquare,
  LogOut,
  Eye,
  Download,
  Share
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

// Mock data - replace with actual API calls
const mockReport = {
  id: 'RPT-001',
  issueType: 'Pothole',
  location: 'Main Market Road, Sector 5, New Delhi',
  coordinates: { lat: 28.6139, lng: 77.2090 },
  dateSubmitted: new Date('2024-01-15T10:30:00'),
  status: 'new',
  assignedTo: 'Public Works Dept',
  priority: 'high',
  description: 'Large pothole causing traffic issues and potential vehicle damage. The pothole is approximately 2 feet deep and 3 feet wide, located in the middle of the main road. Multiple vehicles have reported damage to their tires and suspension systems.',
  citizenInfo: {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    address: '123 Gandhi Nagar, New Delhi'
  },
  images: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      caption: 'Main pothole view from street level',
      uploadedAt: new Date('2024-01-15T10:35:00')
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      caption: 'Close-up view showing depth',
      uploadedAt: new Date('2024-01-15T10:36:00')
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      caption: 'Traffic impact view',
      uploadedAt: new Date('2024-01-15T10:37:00')
    }
  ],
  internalNotes: [
    {
      id: 1,
      note: 'High priority - located on main arterial road',
      author: 'Admin User',
      createdAt: new Date('2024-01-15T11:00:00')
    },
    {
      id: 2,
      note: 'Similar issue reported nearby in RPT-045',
      author: 'Admin User',
      createdAt: new Date('2024-01-15T11:15:00')
    }
  ],
  statusHistory: [
    {
      status: 'new',
      timestamp: new Date('2024-01-15T10:30:00'),
      note: 'Report submitted by citizen'
    }
  ]
};

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    resolved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
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
    high: 'text-red-600 bg-red-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-green-600 bg-green-50'
  };
  return colors[priority] || 'text-gray-600 bg-gray-50';
};

const getPriorityLabel = (priority: string) => {
  const labels: { [key: string]: string } = {
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority'
  };
  return labels[priority] || priority;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
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

const ImageViewer = ({ images }: { images: any[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="relative max-w-4xl max-h-full p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <XCircle className="h-8 w-8" />
          </button>
          <img
            src={images[selectedImage].url}
            alt={images[selectedImage].caption}
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute bottom-4 left-4 right-4 text-white text-center">
            <p className="text-lg font-medium">{images[selectedImage].caption}</p>
            <p className="text-sm opacity-75">
              {selectedImage + 1} of {images.length}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <img
          src={images[selectedImage].url}
          alt={images[selectedImage].caption}
          className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setIsFullscreen(true)}
        />
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-70"
        >
          <Eye className="h-4 w-4" />
        </button>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {selectedImage + 1} of {images.length}
        </div>
      </div>
      
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                selectedImage === index ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      <div className="text-sm text-slate-600">
        <p className="font-medium">{images[selectedImage].caption}</p>
        <p>Uploaded {formatTimeAgo(images[selectedImage].uploadedAt)}</p>
      </div>
    </div>
  );
};

export function AdminReportDetailPage() {
  const navigate = useNavigate();
  const { reportId } = useParams();
  const [report, setReport] = useState(mockReport);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [statusChange, setStatusChange] = useState({
    status: report?.status || 'new',
    note: ''
  });

  useEffect(() => {
    // Check admin authentication
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
      return;
    }

    // Simulate loading report data
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [navigate, reportId]);

  const handleStatusChange = (newStatus: string) => {
    setStatusChange(prev => ({ ...prev, status: newStatus }));
  };

  const handleSaveStatus = () => {
    // In a real app, this would make an API call
    const updatedReport = {
      ...report,
      status: statusChange.status,
      statusHistory: [
        ...report.statusHistory,
        {
          status: statusChange.status,
          timestamp: new Date(),
          note: statusChange.note || `Status changed to ${getStatusLabel(statusChange.status)}`
        }
      ]
    };
    setReport(updatedReport);
    setIsEditing(false);
    setStatusChange({ status: statusChange.status, note: '' });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const note = {
      id: Date.now(),
      note: newNote.trim(),
      author: 'Current Admin',
      createdAt: new Date()
    };
    
    setReport(prev => ({
      ...prev,
      internalNotes: [...prev.internalNotes, note]
    }));
    setNewNote('');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading report details...</p>
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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/reports')}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Reports</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Report Details</h1>
                <p className="mt-2 text-slate-600">Report ID: {report.id}</p>
              </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Information Block */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    {report.issueType} Report
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(report.status)}`}>
                      {getStatusLabel(report.status)}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(report.priority)}`}>
                      {getPriorityLabel(report.priority)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                    <Share className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-1">Description</h3>
                  <p className="text-slate-900">{report.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-1">Location</h3>
                    <p className="text-slate-900 flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span>{report.location}</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-1">Date Submitted</h3>
                    <p className="text-slate-900 flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>{formatDate(report.dateSubmitted)}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-1">Assigned To</h3>
                  <p className="text-slate-900">{report.assignedTo}</p>
                </div>
              </div>
            </div>

            {/* Image Viewer */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Report Images</h2>
              <ImageViewer images={report.images} />
            </div>

            {/* Exact Location Map */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Exact Location</h2>
              <div className="h-64 rounded-lg overflow-hidden">
                <MapContainer
                  center={[report.coordinates.lat, report.coordinates.lng]}
                  zoom={16}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[report.coordinates.lat, report.coordinates.lng]}>
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold text-sm mb-1">{report.issueType}</h3>
                        <p className="text-xs text-slate-600">{report.location}</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Admin Action Panel */}
          <div className="space-y-6">
            {/* Status Management */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Status Management</h2>
              
              {!isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Current Status</label>
                    <div className={`px-3 py-2 rounded-lg border ${getStatusColor(report.status)}`}>
                      {getStatusLabel(report.status)}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Change Status</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">New Status</label>
                    <select
                      value={statusChange.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Status Note</label>
                    <textarea
                      value={statusChange.note}
                      onChange={(e) => setStatusChange(prev => ({ ...prev, note: e.target.value }))}
                      placeholder="Add a note about this status change..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveStatus}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Department Assignment */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Department Assignment</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Assigned To</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="Public Works Dept">Public Works Dept</option>
                  <option value="Sanitation Dept">Sanitation Dept</option>
                  <option value="Electrical Dept">Electrical Dept</option>
                  <option value="Water Dept">Water Dept</option>
                  <option value="Highway Dept">Highway Dept</option>
                </select>
              </div>
            </div>

            {/* Citizen Information */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Citizen Information</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-900">{report.citizenInfo.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-900">{report.citizenInfo.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-900">{report.citizenInfo.phone}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                  <span className="text-slate-900">{report.citizenInfo.address}</span>
                </div>
              </div>
            </div>

            {/* Internal Notes */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Internal Notes</h2>
              
              <div className="space-y-3 mb-4">
                {report.internalNotes.map((note) => (
                  <div key={note.id} className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-slate-900 text-sm">{note.note}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500">By {note.author}</span>
                      <span className="text-xs text-slate-500">{formatTimeAgo(note.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add an internal note..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <button
                  onClick={handleAddNote}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Add Note</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
