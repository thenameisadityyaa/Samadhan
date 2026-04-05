// src/pages/ProfilePage.tsx — India Gov Design System v3
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {
  User, Mail, MapPin, Save, ArrowLeft, Camera,
  Shield, LogOut, Edit3, Bell, CheckCircle,
  FileText, Phone, Calendar,
} from 'lucide-react';
import { BackToTop } from '../components/ui/BackToTop';

const initials = (name: string) =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

interface UserData {
  _id: string; name: string; email: string; role: string;
  location?: string; phone?: string; createdAt?: string;
}

interface Stats { total: number; pending: number; inProgress: number; resolved: number; }

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-[--india-saffron]' : 'bg-[--civic-gray-200]'}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
  </button>
);

export function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false });

  // Editable fields
  const [editName, setEditName] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const token = localStorage.getItem('token');

  const fetchData = useCallback(async () => {
    if (!token) { navigate('/resident/login'); return; }
    try {
      const [meRes, myRes] = await Promise.all([
        axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/reports/my', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (meRes.data.success) {
        const u = meRes.data.data;
        setUser(u);
        setEditName(u.name || '');
        setEditLocation(u.location || '');
        setEditPhone(u.phone || '');
      }
      if (myRes.data.success) setStats(myRes.data.data.stats);
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/resident/login');
      } else {
        const raw = localStorage.getItem('userData');
        if (raw) { try { const p = JSON.parse(raw); setUser(p); setEditName(p.name || ''); setEditLocation(p.location || ''); } catch { /* ignore */ } }
      }
    }
  }, [token, navigate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) { toast.error('Geolocation not supported'); return; }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
          const data = await res.json();
          if (data?.display_name) setEditLocation(data.display_name);
        } catch { /* ignore */ }
        setIsLocating(false);
        toast.success('Location captured!');
      },
      () => { toast.error('Could not get location'); setIsLocating(false); },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleSave = async () => {
    if (!editName.trim()) { toast.error('Name is required'); return; }
    setIsSaving(true);
    try {
      const { data } = await axios.put('/api/auth/profile', 
        { name: editName.trim(), location: editLocation.trim(), phone: editPhone.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setUser(data.data);
        localStorage.setItem('userData', JSON.stringify(data.data));
        setIsEditing(false);
        toast.success('Profile updated!');
      }
    } catch {
      toast.error('Failed to save. Try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePic(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const displayName = user?.name || 'Citizen';
  const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' }) : '—';

  return (
    <div className="min-h-screen" style={{ background: '#F4F6FA', marginTop: '66px' }}>
      <Toaster position="top-right" />

      {/* Tricolor bar + page banner */}
      <div className="bg-white border-b border-[--civic-gray-200]">
        <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #FF9933 0% 33.33%, #ffffff 33.33% 66.66%, #138808 66.66% 100%)' }} />
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-[--civic-gray-600] hover:text-[--civic-navy] text-sm font-medium transition-colors">
            <ArrowLeft size={15} /> Back to Dashboard
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs font-semibold text-red-500 border border-red-100 px-3 py-1.5 rounded hover:bg-red-50 transition-colors">
            <LogOut size={12} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left: Avatar card ── */}
        <aside className="lg:col-span-1 space-y-5">
          <div className="bg-white border border-[--civic-gray-200] rounded-lg overflow-hidden">
            {/* Navy top */}
            <div className="bg-[--civic-navy] h-16 relative" />
            <div className="px-5 pb-5">
              {/* Avatar */}
              <div className="relative -mt-8 mb-3 inline-block">
                <div className="w-16 h-16 rounded-full border-4 border-white bg-[--india-saffron] flex items-center justify-center overflow-hidden shadow-md">
                  {profilePic
                    ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                    : <span className="font-accent font-black text-white text-xl">{initials(displayName)}</span>
                  }
                </div>
                <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-[--india-saffron] rounded-full flex items-center justify-center cursor-pointer border-2 border-white">
                  <Camera size={11} className="text-white" />
                  <input type="file" accept="image/*" onChange={handlePicChange} className="hidden" />
                </label>
              </div>

              <h3 className="font-display font-bold text-[--civic-navy] text-lg leading-tight">{displayName}</h3>
              <p className="text-[--civic-gray-500] text-xs mb-1">{user?.email}</p>
              <div className="flex items-center gap-1.5 mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${user?.role === 'admin' ? 'bg-[--india-saffron]/15 text-[--india-saffron]' : 'bg-[--india-green]/10 text-[--india-green]'}`}>
                  {user?.role === 'admin' ? '⭐ Admin' : '🇮🇳 Citizen'}
                </span>
              </div>
              {user?.location && (
                <p className="flex items-center gap-1 text-xs text-[--civic-gray-500]">
                  <MapPin size={10} className="flex-shrink-0 text-[--india-saffron]" />
                  {user.location.slice(0, 50)}{user.location.length > 50 ? '…' : ''}
                </p>
              )}
              <p className="flex items-center gap-1 text-xs text-[--civic-gray-400] mt-1">
                <Calendar size={10} className="flex-shrink-0" /> Member since {memberSince}
              </p>
            </div>
          </div>

          {/* Stats mini */}
          <div className="bg-white border border-[--civic-gray-200] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[--civic-gray-200] bg-[--civic-gray-50]">
              <p className="text-xs font-bold text-[--civic-navy] uppercase tracking-widest">My Report Stats</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-[--civic-gray-100]">
              {[
                { label: 'Total',       value: stats.total,      color: 'text-[--civic-navy]' },
                { label: 'Submitted',   value: stats.pending,    color: 'text-[--civic-navy]' },
                { label: 'In Progress', value: stats.inProgress, color: 'text-[--india-saffron]' },
                { label: 'Resolved',    value: stats.resolved,   color: 'text-[--india-green]' },
              ].map(({ label, value, color }) => (
                <div key={label} className="p-3 text-center">
                  <p className={`font-accent font-black text-xl ${color}`}>{value}</p>
                  <p className="text-[--civic-gray-400] text-[10px]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-white border border-[--civic-gray-200] rounded-lg overflow-hidden">
            {[
              { to: '/my-reports', icon: <FileText size={13} />, label: 'My Reports' },
              { to: '/report',     icon: <CheckCircle size={13} />, label: 'Report Issue' },
              { to: '/dashboard',  icon: <Shield size={13} />, label: 'Dashboard' },
            ].map(({ to, icon, label }) => (
              <Link key={to} to={to} className="flex items-center gap-2 px-4 py-3 text-[--civic-navy] hover:bg-[--civic-gray-50] text-sm border-b border-[--civic-gray-100] last:border-0 transition-colors">
                <span className="text-[--india-saffron]">{icon}</span>{label}
              </Link>
            ))}
          </div>
        </aside>

        {/* ── Right: Forms ── */}
        <main className="lg:col-span-2 space-y-5">

          {/* Personal info */}
          <div className="bg-white border border-[--civic-gray-200] rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-[--civic-gray-200] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-5 w-1 bg-[--india-saffron]" />
                <p className="font-semibold text-[--civic-navy] text-sm">Personal Information</p>
              </div>
              <button
                onClick={() => { setIsEditing(!isEditing); if (isEditing) { setEditName(user?.name || ''); setEditLocation(user?.location || ''); setEditPhone(user?.phone || ''); } }}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border transition-colors ${isEditing ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-[--india-saffron] text-[--india-saffron] hover:bg-orange-50'}`}
              >
                <Edit3 size={11} /> {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: 'Full Name *',    icon: <User size={14} />,  value: editName,     setter: setEditName,     type: 'text',  ph: 'Your full name' },
                { label: 'Email Address',  icon: <Mail size={14} />,  value: user?.email || '', setter: () => {}, type: 'email', ph: '', readOnly: true },
                { label: 'Phone Number',   icon: <Phone size={14} />, value: editPhone,    setter: setEditPhone,    type: 'tel',   ph: '+91 98XXXXXXXX' },
              ].map(({ label, icon, value, setter, type, ph, readOnly }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-[--civic-navy] mb-1.5">{label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[--civic-gray-400]">{icon}</span>
                    <input
                      type={type}
                      value={value}
                      onChange={(e) => !readOnly && setter(e.target.value)}
                      disabled={!isEditing || readOnly}
                      placeholder={ph}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-[--civic-gray-200] rounded focus:outline-none focus:ring-2 focus:ring-[--india-saffron]/30 focus:border-[--india-saffron] disabled:bg-[--civic-gray-50] disabled:text-[--civic-gray-500] transition-colors"
                    />
                  </div>
                </div>
              ))}

              {/* Location */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[--civic-navy]">Location</label>
                  {isEditing && (
                    <button onClick={handleGetLocation} disabled={isLocating} className="text-xs text-[--india-saffron] font-semibold hover:underline disabled:opacity-50">
                      {isLocating ? 'Locating…' : '📍 Use GPS'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[--civic-gray-400]" />
                  <input
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    disabled={!isEditing}
                    placeholder="City, Area or full address"
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-[--civic-gray-200] rounded focus:outline-none focus:ring-2 focus:ring-[--india-saffron]/30 focus:border-[--india-saffron] disabled:bg-[--civic-gray-50] disabled:text-[--civic-gray-500] transition-colors"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 pt-2 border-t border-[--civic-gray-100]">
                  <button onClick={() => setIsEditing(false)} className="text-sm text-[--civic-gray-600] px-4 py-2 border border-[--civic-gray-200] rounded hover:bg-[--civic-gray-50]">
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={isSaving} className="btn-saffron text-sm flex items-center gap-1.5 py-2 px-5 disabled:opacity-60">
                    {isSaving ? <><div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Saving…</> : <><Save size={13} />Save Changes</>}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Notification prefs */}
          <div className="bg-white border border-[--civic-gray-200] rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-[--civic-gray-200] flex items-center gap-2">
              <div className="h-5 w-1 bg-[--india-green]" />
              <p className="font-semibold text-[--civic-navy] text-sm"><Bell size={12} className="inline mr-1.5" />Notification Preferences</p>
            </div>
            <div className="divide-y divide-[--civic-gray-100]">
              {[
                { key: 'email' as const, label: 'Email Notifications', desc: 'Status updates to your email' },
                { key: 'push'  as const, label: 'Push Notifications',  desc: 'In-browser alerts' },
                { key: 'sms'   as const, label: 'SMS Notifications',   desc: 'Updates via text message' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-[--civic-navy]">{label}</p>
                    <p className="text-xs text-[--civic-gray-400]">{desc}</p>
                  </div>
                  <Toggle checked={notifications[key]} onChange={(v) => setNotifications(n => ({ ...n, [key]: v }))} />
                </div>
              ))}
            </div>
          </div>

          {/* Account actions */}
          <div className="bg-white border border-[--civic-gray-200] rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-[--civic-gray-200] flex items-center gap-2">
              <div className="h-5 w-1 bg-[--civic-navy]" />
              <p className="font-semibold text-[--civic-navy] text-sm"><Shield size={12} className="inline mr-1.5" />Account</p>
            </div>
            <div className="p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 border border-red-100 bg-red-50 hover:bg-red-100 rounded transition-colors text-sm font-semibold"
              >
                <LogOut size={15} />
                Sign Out of Samadhan
              </button>
            </div>
          </div>
        </main>
      </div>

      <BackToTop />
    </div>
  );
}
