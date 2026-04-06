// src/pages/AdminReportDetailPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
    { id: 1, url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', caption: 'Main pothole view', uploadedAt: new Date('2024-01-15T10:35:00') }
  ],
  internalNotes: [
    { id: 1, note: 'High priority - located on main arterial road', author: 'Admin User', createdAt: new Date('2024-01-15T11:00:00') }
  ],
  statusHistory: [
    { status: 'new', timestamp: new Date('2024-01-15T10:30:00'), note: 'Report submitted by citizen' }
  ]
};

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    new: 'text-blue-700 bg-blue-50 border-blue-200',
    in_progress: 'text-[--india-saffron] bg-orange-50 border-orange-200',
    resolved: 'text-[--india-green] bg-green-50 border-green-200',
  };
  return colors[status] || 'bg-[--civic-gray-100] text-slate-800 border-[--civic-gray-200]';
};

const getStatusLabel = (status: string) => {
  const labels: { [key: string]: string } = { new: 'Incoming', in_progress: 'In Progress', resolved: 'Resolved' };
  return labels[status] || status;
};

const formatDate = (date: Date) => date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export function AdminReportDetailPage() {
  const navigate = useNavigate();
  const { reportId } = useParams();
  const [report, setReport] = useState(mockReport);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [statusChange, setStatusChange] = useState({ status: report?.status || 'new', note: '' });
  const [adminProfile, setAdminProfile] = useState<any>(null);

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) { navigate('/admin/login'); return; }
    setAdminProfile(JSON.parse(adminSession));
    setTimeout(() => setIsLoading(false), 500);
  }, [navigate]);

  if (isLoading) return <div className="min-h-screen bg-[--civic-gray-50] flex flex-col items-center justify-center"><div className="w-12 h-12 border-4 border-[--india-saffron]/30 border-t-[--india-saffron] rounded-full animate-spin mb-4" /><p className="text-[--civic-navy] font-semibold tracking-wide">INITIALIZING WORKSPACE...</p></div>;

  return (
    <div className="min-h-screen bg-[--civic-gray-50] font-sans flex flex-col">
      {/* ── Top Bar ── */}
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
            </div>
            <button onClick={() => navigate('/admin/login')} className="flex items-center gap-1.5 text-xs font-bold text-[#B91C1C] hover:bg-red-50 px-3 py-1.5 rounded transition-colors border border-transparent hover:border-red-100">
              <LogOut size={14} /> SYSTEM DISCONNECT
            </button>
          </div>
        </div>
      </header>

      {/* ── Secondary Nav ── */}
      <div className="bg-white border-b border-[--civic-gray-200] mb-6 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-2 flex items-center gap-6">
          <button onClick={() => navigate('/admin/reports')} className="flex items-center gap-2 text-[10px] font-bold text-[--civic-navy] hover:bg-[--civic-gray-50] px-3 py-1 rounded-sm border border-[--civic-gray-300] uppercase tracking-widest transition-colors"><ArrowLeft size={12} /> BACK TO REGISTRY</button>
          <span className="text-sm font-bold text-[--india-saffron] border-b-2 border-[--india-saffron] py-2 ml-4">Incident Log: #{report.id}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-12 flex-1 flex flex-col w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-sm shadow-sm border border-[--civic-gray-200] p-6">
              <div className="flex justify-between items-start mb-6 border-b border-[--civic-gray-200] pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[--civic-navy] mb-3">{report.issueType} Report</h2>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-sm border uppercase tracking-wider ${getStatusColor(report.status)}`}>{getStatusLabel(report.status)}</span>
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-sm uppercase tracking-wider bg-[#B91C1C] text-white border border-[#B91C1C]`}>CRITICAL PRIORITY</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="h-8 w-8 flex items-center justify-center border border-[--civic-gray-200] rounded-sm hover:bg-[--civic-gray-50] text-[--civic-gray-600]"><Share size={14} /></button>
                  <button className="h-8 w-8 flex items-center justify-center border border-[--civic-gray-200] rounded-sm hover:bg-[--civic-gray-50] text-[--civic-gray-600]"><Download size={14} /></button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] font-bold text-[--civic-gray-400] uppercase tracking-widest mb-2">Detailed Narrative</h3>
                  <p className="text-sm text-slate-800 leading-relaxed p-4 bg-[--civic-gray-50] rounded-sm border border-[--civic-gray-200]">{report.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-[10px] font-bold text-[--civic-gray-400] uppercase tracking-widest mb-2">Location Register</h3>
                    <p className="text-sm font-semibold text-[--civic-navy] flex items-center gap-2"><MapPin size={16} className="text-[--civic-gray-400]"/> {report.location}</p>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[--civic-gray-400] uppercase tracking-widest mb-2">Submission Timestamp</h3>
                    <p className="text-sm font-semibold text-[--civic-navy] flex items-center gap-2"><Calendar size={16} className="text-[--civic-gray-400]"/> {formatDate(report.dateSubmitted)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm shadow-sm border border-[--civic-gray-200] p-6">
               <h3 className="text-[10px] font-bold text-[--civic-gray-400] uppercase tracking-widest mb-4 border-b border-[--civic-gray-200] pb-2">Geospatial Plot</h3>
               <div className="h-64 rounded-sm overflow-hidden border border-[--civic-gray-300]">
                 <MapContainer center={[report.coordinates.lat, report.coordinates.lng]} zoom={16} style={{ height: '100%', width: '100%' }}>
                   <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                   <Marker position={[report.coordinates.lat, report.coordinates.lng]}>
                     <Popup><h3 className="font-bold text-[10px] uppercase tracking-wider text-[--civic-navy]">{report.issueType}</h3></Popup>
                   </Marker>
                 </MapContainer>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-sm shadow-sm border border-[--civic-gray-200] p-6">
              <h3 className="text-[10px] font-bold text-[--civic-gray-400] uppercase tracking-widest mb-4 border-b border-[--civic-gray-200] pb-2">Record Authorization</h3>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[--civic-navy] text-white font-bold rounded-sm hover:bg-[--civic-navy-600] uppercase tracking-widest text-xs transition-colors shadow-sm focus:ring-2 focus:ring-[--civic-navy] focus:ring-offset-2">
                <Edit className="h-4 w-4" /> <span>Update Status</span>
              </button>
            </div>
            
            <div className="bg-white rounded-sm shadow-sm border border-[--civic-gray-200] p-6">
              <h3 className="text-[10px] font-bold text-[--civic-gray-400] uppercase tracking-widest mb-4 border-b border-[--civic-gray-200] pb-2">Citizen Informant</h3>
              <div className="space-y-3">
                <div className="p-3 bg-[--civic-gray-50] border border-[--civic-gray-200] rounded-sm text-sm break-all font-mono">
                  <p className="font-bold text-[--civic-navy] mb-1">{report.citizenInfo.name}</p>
                  <p className="text-slate-600 mb-1">{report.citizenInfo.phone}</p>
                  <p className="text-slate-600">{report.citizenInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
