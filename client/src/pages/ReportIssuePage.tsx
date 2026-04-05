// src/pages/ReportIssuePage.tsx — India Gov Design System v3
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CheckCircle, Locate, ArrowRight, Upload, X, ChevronRight, AlertTriangle } from 'lucide-react';
import { BackToTop } from '../components/ui/BackToTop';

// Fix leaflet default marker assets
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(delete (L.Icon.Default.prototype as any)._getIconUrl);
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

/* ─── Category definitions ─── */
const CATEGORIES: { key: string; title: string; hindiTitle: string; emoji: string; accent: 'saffron' | 'green' | 'navy'; items: string[] }[] = [
  {
    key: 'roads_transport',
    title: 'Roads & Transport',
    hindiTitle: 'सड़क एवं परिवहन',
    emoji: '🛣️',
    accent: 'saffron',
    items: [
      'Pothole Repair',
      'Traffic Signal Malfunction',
      'Damaged Footpaths / Sidewalks',
      'Illegal Encroachment on Roads',
      'Requests for Speed Breakers',
      'Bus Stop Maintenance',
    ],
  },
  {
    key: 'water_drainage',
    title: 'Water & Drainage',
    hindiTitle: 'जल एवं जलनिकासी',
    emoji: '💧',
    accent: 'navy',
    items: [
      'Leaking Pipes / Water Wastage',
      'Contaminated Water Supply',
      'No Water Supply / Irregular Timings',
      'Blocked Drains / Sewers',
      'Overflowing Manholes',
      'Damaged Drainage Covers',
      'Request for New Water Connection',
    ],
  },
  {
    key: 'electricity_lighting',
    title: 'Electricity & Lighting',
    hindiTitle: 'विद्युत एवं प्रकाश',
    emoji: '💡',
    accent: 'saffron',
    items: [
      'Streetlight Not Working',
      'Broken Transformer / Power Failure',
      'Dangerous Loose Wires',
      'Request for New Streetlight',
    ],
  },
  {
    key: 'garbage_sanitation',
    title: 'Garbage & Sanitation',
    hindiTitle: 'कचरा एवं स्वच्छता',
    emoji: '♻️',
    accent: 'green',
    items: [
      'Garbage Not Collected',
      'Overflowing Community Bins',
      'Illegal Dumping of Waste / Debris',
      'Request for Dustbin Installation',
      'Dead Animal Removal',
      'Unsanitary Public Toilets',
    ],
  },
  {
    key: 'health_environment',
    title: 'Health & Environment',
    hindiTitle: 'स्वास्थ्य एवं पर्यावरण',
    emoji: '🌿',
    accent: 'green',
    items: [
      'Stagnant Water / Mosquito Breeding',
      'Pest Control / Fumigation Request',
      'Tree Planting / Trimming Request',
      'Damaged Park Equipment',
      'Poor Park / Garden Maintenance',
      'Air / Noise Pollution Complaint',
    ],
  },
  {
    key: 'admin_services',
    title: 'Civic & Admin Services',
    hindiTitle: 'नागरिक एवं प्रशासनिक सेवाएँ',
    emoji: '🏛️',
    accent: 'navy',
    items: [
      'Trade License Inquiry / Application',
      "Hawker's Permit Inquiry",
      'Property Tax Payment Issue',
      'Birth / Death Certificate Request',
      'Noise Pollution Complaint',
      'Stray Animal Menace',
      'Unauthorized Banners / Hoardings',
    ],
  },
];

const accentBg = (a: string) =>
  a === 'saffron' ? 'bg-[--india-saffron]' : a === 'green' ? 'bg-[--india-green]' : 'bg-[--civic-navy]';
const accentBorder = (a: string) =>
  a === 'saffron' ? 'border-[--india-saffron]' : a === 'green' ? 'border-[--india-green]' : 'border-[--civic-navy]';
const accentText = (a: string) =>
  a === 'saffron' ? 'text-[--india-saffron]' : a === 'green' ? 'text-[--india-green]' : 'text-[--civic-navy]';

export function ReportIssuePage() {
  const [step, setStep] = useState(1);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => typeof window !== 'undefined' && (!!localStorage.getItem('token') || !!localStorage.getItem('userData'))
  );
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const [form, setForm] = useState({
    issueType: '' as string,
    issueCategory: '' as string,
    locationText: '' as string,
    coordinates: { lat: 12.9716, lng: 77.5946 }, // default Bangalore
    description: '' as string,
    urgency: 'medium' as 'low' | 'medium' | 'high',
    photos: [] as File[],
    contact: { name: '', email: '', phone: '' },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [auth, setAuth] = useState({ email: '', password: '' });

  const selectedCat = CATEGORIES.find((c) => c.key === form.issueCategory);

  const setField = (key: keyof typeof form, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value } as typeof form));
  };
  const setContact = (key: keyof typeof form.contact, value: string) => {
    setForm((prev) => ({ ...prev, contact: { ...prev.contact, [key]: value } }));
  };

  const validateStep = (s: number) => {
    const nextErrors: Record<string, string> = {};
    if (s === 1) {
      if (!form.issueCategory) nextErrors.issueType = 'Select a service category first';
      else if (!form.issueType) nextErrors.issueType = 'Select a specific issue from the list';
    }
    if (s === 2) {
      if (!form.locationText.trim()) nextErrors.locationText = 'Enter address or landmark';
      if (!form.coordinates || Number.isNaN(form.coordinates.lat)) nextErrors.coordinates = 'Pick a point on the map';
    }
    if (s === 3) {
      if (!form.description.trim()) nextErrors.description = 'Describe the issue';
    }
    if (s === 4) {
      if (!form.contact.name.trim()) nextErrors.name = 'Enter your name';
      const email = form.contact.email.trim();
      if (!email) nextErrors.email = 'Enter your email';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onNext = () => { if (validateStep(step)) setStep((p) => Math.min(5, p + 1)); };
  const onPrev = () => setStep((p) => Math.max(1, p - 1));

  const getCurrentLocation = () => {
    if (!navigator.geolocation) { toast.error('Geolocation not supported.'); return; }
    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setField('coordinates', { lat: latitude, lng: longitude });
        reverseGeocode(latitude, longitude);
        if (typeof pos.coords.accuracy === 'number') setAccuracy(pos.coords.accuracy);
        setIsLoadingLocation(false);
        toast.success('Location captured!');
      },
      () => { toast.error('Unable to get location. Please grant permission.'); setIsLoadingLocation(false); },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      if (data?.display_name) setField('locationText', data.display_name as string);
    } catch { /* ignore */ }
  };

  function MapClick() {
    useMapEvents({ click(e) { setField('coordinates', { lat: e.latlng.lat, lng: e.latlng.lng }); reverseGeocode(e.latlng.lat, e.latlng.lng); setAccuracy(null); } });
    return null;
  }
  function RecenterMap() { const map = useMap(); map.setView([form.coordinates.lat, form.coordinates.lng]); return null; }

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setField('photos', [...form.photos, ...files].slice(0, 5));
  };
  const removePhoto = (i: number) => setField('photos', form.photos.filter((_, idx) => idx !== i));

  const signIn = async () => {
    const n: Record<string, string> = {};
    if (!auth.email.trim()) n.authEmail = 'Email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(auth.email)) n.authEmail = 'Enter valid email';
    if (!auth.password.trim()) n.authPassword = 'Password required';
    setErrors(n);
    if (Object.keys(n).length !== 0) return;
    try {
      const { data } = await axios.post('/api/auth/login', { email: auth.email, password: auth.password });
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('userData', JSON.stringify({ name: data.data.user?.name || auth.email.split('@')[0], email: auth.email }));
      setIsAuthenticated(true);
    } catch (error: any) {
      setErrors({ authEmail: error.response?.data?.message || 'Login failed' });
    }
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', form.issueType || 'Issue Report');
      formData.append('description', form.description);
      formData.append('location', form.locationText);
      formData.append('coordinates', JSON.stringify(form.coordinates));
      formData.append('urgency', form.urgency);
      formData.append('category', selectedCat?.title || form.issueCategory);
      form.photos.forEach((photo) => formData.append('photos', photo));

      await axios.post('/api/reports', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Report submitted successfully!');
      setStep(1);
      setForm({ issueType: '', issueCategory: '', locationText: '', coordinates: { lat: 12.9716, lng: 77.5946 }, description: '', urgency: 'medium', photos: [], contact: { name: '', email: '', phone: '' } });
    } catch (e: any) {
      if (e.response?.status === 401) {
        toast.error('Session expired. Please sign in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setStep(5);
      } else {
        toast.error('Submission failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ['Service', 'Location', 'Details', 'Contact', 'Submit'];

  return (
    <div className="min-h-screen" style={{ background: '#FAFBFF' }}>
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' } }} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ marginTop: '66px' }}>
        {/* Tricolor top accent */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #FF9933 0% 33.33%, #ffffff 33.33% 66.66%, #138808 66.66% 100%)' }} />
        <div
          className="relative bg-cover bg-center py-12 md:py-16"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400&q=80&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-[--civic-navy]/88" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="section-label">नागरिक सेवा</span>
              <span className="section-label green">Citizen Portal</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
              Report a <span className="text-[--india-saffron]">Civic Issue</span>
            </h1>
            <p className="text-white/70 max-w-xl text-sm md:text-base">
              Select the issue, pin the location on the map, describe the problem, and submit. We route it directly to the right municipal department.
            </p>
          </div>
        </div>
      </section>

      {/* ── Form body ── */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-6 md:px-10">

          {/* Progress stepper */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              {stepLabels.map((label, idx) => {
                const i = idx + 1;
                const isDone = i < step;
                const isActive = i === step;
                return (
                  <div key={i} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded flex items-center justify-center font-bold text-sm transition-all ${
                        isDone ? 'bg-[--india-green] text-white' :
                        isActive ? 'bg-[--india-saffron] text-white shadow-md' :
                        'bg-[--civic-gray-200] text-[--civic-gray-400]'
                      }`}>
                        {isDone ? '✓' : i}
                      </div>
                      <span className={`hidden sm:block text-xs font-semibold mt-1 ${isActive ? 'text-[--india-saffron]' : isDone ? 'text-[--india-green]' : 'text-[--civic-gray-400]'}`}>
                        {label}
                      </span>
                    </div>
                    {idx < stepLabels.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-1 transition-colors ${i < step ? 'bg-[--india-green]' : 'bg-[--civic-gray-200]'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-[--civic-gray-200] rounded-lg shadow-sm">
            {/* Step bar */}
            <div className="h-1 rounded-t-lg" style={{ background: `linear-gradient(to right, #FF9933 ${((step - 1) / 4) * 100}%, #E2E8F0 ${((step - 1) / 4) * 100}%)` }} />

            <div className="p-6 md:p-8">

              {/* ─── STEP 1: Service Category ─── */}
              {step === 1 && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-8 w-1 bg-[--india-saffron]" />
                    <div>
                      <h2 className="font-display text-xl font-extrabold text-[--civic-navy]">Choose Service Category</h2>
                      <p className="text-xs text-[--civic-gray-600]">First select the broad category, then pick the specific issue</p>
                    </div>
                  </div>

                  {errors.issueType && (
                    <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3 mb-4">
                      <AlertTriangle size={15} className="flex-shrink-0" />
                      {errors.issueType}
                    </div>
                  )}

                  {/* Category grid — STEP 1a: pick broad category */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {CATEGORIES.map((cat) => {
                      const isSelected = form.issueCategory === cat.key;
                      return (
                        <button
                          key={cat.key}
                          onClick={() => { setField('issueCategory', cat.key); setField('issueType', ''); }}
                          className={`relative border-2 rounded-lg p-3 text-left transition-all group ${
                            isSelected
                              ? `${accentBorder(cat.accent)} bg-orange-50`
                              : 'border-[--civic-gray-200] hover:border-[--civic-gray-400] bg-white'
                          }`}
                        >
                          {isSelected && (
                            <div className={`absolute top-0 right-0 w-5 h-5 rounded-bl rounded-tr-md flex items-center justify-center text-white text-xs ${accentBg(cat.accent)}`}>
                              ✓
                            </div>
                          )}
                          <span className="text-2xl block mb-1.5">{cat.emoji}</span>
                          <p className={`font-semibold text-xs leading-tight ${isSelected ? accentText(cat.accent) : 'text-[--civic-navy]'}`}>{cat.title}</p>
                          <p className="text-[--civic-gray-400] text-[10px] mt-0.5">{cat.hindiTitle}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* STEP 1b: pick specific issue — only shows after broad category selected */}
                  {selectedCat && (
                    <div className="border border-[--civic-gray-200] rounded-lg overflow-hidden">
                      <div className={`px-4 py-3 flex items-center gap-2 ${accentBg(selectedCat.accent)}`}>
                        <span className="text-white font-bold text-sm">{selectedCat.emoji} {selectedCat.title}</span>
                        <span className="text-white/70 text-xs">— Select the specific issue below</span>
                      </div>
                      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white">
                        {selectedCat.items.map((item) => (
                          <button
                            key={item}
                            onClick={() => setField('issueType', item)}
                            className={`flex items-center gap-2 text-left text-xs px-3 py-2.5 rounded border transition-all ${
                              form.issueType === item
                                ? `${accentBorder(selectedCat.accent)} ${accentBg(selectedCat.accent)} text-white font-semibold`
                                : 'border-[--civic-gray-200] text-[--civic-text] hover:bg-[--civic-gray-50]'
                            }`}
                          >
                            <ChevronRight size={13} className="flex-shrink-0 opacity-60" />
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─── STEP 2: Location ─── */}
              {step === 2 && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-8 w-1 bg-[--india-saffron]" />
                    <div>
                      <h2 className="font-display text-xl font-extrabold text-[--civic-navy]">Mark Location</h2>
                      <p className="text-xs text-[--civic-gray-600]">Drop a pin or use your GPS location</p>
                    </div>
                  </div>
                  {(errors.locationText || errors.coordinates) && (
                    <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3 mb-4">
                      <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
                      <div>{errors.locationText && <p>{errors.locationText}</p>}{errors.coordinates && <p>{errors.coordinates}</p>}</div>
                    </div>
                  )}
                  <label className="block text-sm font-semibold text-[--civic-navy] mb-1.5">Address / Landmark</label>
                  <input
                    value={form.locationText}
                    onChange={(e) => setField('locationText', e.target.value)}
                    placeholder="e.g. MG Road near Metro entrance, Bangalore"
                    className="w-full border border-[--civic-gray-200] focus:border-[--india-saffron] focus:ring-2 focus:ring-[--india-saffron]/20 rounded px-4 py-2.5 mb-4 outline-none text-sm transition-colors"
                  />
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[--civic-gray-600]">Click on the map to set the exact point, or drag the marker</p>
                    <button
                      onClick={getCurrentLocation}
                      disabled={isLoadingLocation}
                      className="btn-saffron text-xs py-2 px-4 disabled:opacity-50 flex items-center gap-1.5"
                    >
                      <Locate size={13} />
                      {isLoadingLocation ? 'Locating…' : 'Use GPS'}
                    </button>
                  </div>
                  <div className="h-72 w-full rounded overflow-hidden border border-[--civic-gray-200]">
                    <MapContainer center={[form.coordinates.lat, form.coordinates.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                      <MapClick />
                      <RecenterMap />
                      <Marker
                        position={[form.coordinates.lat, form.coordinates.lng]}
                        draggable
                        eventHandlers={{
                          dragend: (e) => {
                            const target = e.target as unknown as { getLatLng: () => { lat: number; lng: number } };
                            const m = target.getLatLng();
                            setField('coordinates', { lat: m.lat, lng: m.lng });
                            reverseGeocode(m.lat, m.lng);
                            setAccuracy(null);
                          },
                        }}
                      >
                        <Popup>{form.coordinates.lat.toFixed(5)}, {form.coordinates.lng.toFixed(5)}</Popup>
                      </Marker>
                      {accuracy && (
                        <Circle center={[form.coordinates.lat, form.coordinates.lng]} radius={accuracy} pathOptions={{ color: '#FF9933', opacity: 0.4, fillOpacity: 0.08 }} />
                      )}
                    </MapContainer>
                  </div>
                  {accuracy && (
                    <p className="mt-2 text-xs text-[--india-green]">📍 GPS accuracy: ±{Math.round(accuracy)} metres</p>
                  )}
                </div>
              )}

              {/* ─── STEP 3: Details ─── */}
              {step === 3 && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-8 w-1 bg-[--india-saffron]" />
                    <div>
                      <h2 className="font-display text-xl font-extrabold text-[--civic-navy]">Describe the Issue</h2>
                      <p className="text-xs text-[--civic-gray-600]">Photos help resolve issues faster</p>
                    </div>
                  </div>
                  {errors.description && (
                    <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3 mb-4">
                      <AlertTriangle size={15} className="flex-shrink-0" />{errors.description}
                    </div>
                  )}
                  <label className="block text-sm font-semibold text-[--civic-navy] mb-1.5">Description *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setField('description', e.target.value)}
                    rows={4}
                    placeholder="What exactly is the problem? Since when? Who is affected?"
                    className="w-full border border-[--civic-gray-200] focus:border-[--india-saffron] focus:ring-2 focus:ring-[--india-saffron]/20 rounded px-4 py-3 mb-5 outline-none text-sm transition-colors resize-none"
                  />
                  <label className="block text-sm font-semibold text-[--civic-navy] mb-2">Urgency Level</label>
                  <div className="flex gap-3 mb-6">
                    {(['low', 'medium', 'high'] as const).map((u) => (
                      <button
                        key={u}
                        onClick={() => setField('urgency', u)}
                        className={`flex-1 py-2.5 rounded border-2 text-sm font-semibold capitalize transition-all ${
                          form.urgency === u
                            ? u === 'high' ? 'border-red-500 bg-red-50 text-red-700'
                              : u === 'medium' ? 'border-[--india-saffron] bg-orange-50 text-amber-700'
                              : 'border-[--india-green] bg-green-50 text-green-700'
                            : 'border-[--civic-gray-200] text-[--civic-gray-600] hover:border-[--civic-gray-400]'
                        }`}
                      >
                        {u === 'high' ? '🔴' : u === 'medium' ? '🟠' : '🟢'} {u}
                      </button>
                    ))}
                  </div>
                  <label className="block text-sm font-semibold text-[--civic-navy] mb-2">
                    Photos <span className="font-normal text-[--civic-gray-400]">(optional, up to 5)</span>
                  </label>
                  <div className="border-2 border-dashed border-[--india-saffron]/40 rounded p-8 text-center bg-orange-50/50 hover:bg-orange-50 transition-colors cursor-pointer">
                    <input id="photo-input" type="file" accept="image/*" multiple className="hidden" onChange={onUpload} />
                    <label htmlFor="photo-input" className="flex flex-col items-center gap-2 cursor-pointer">
                      <Upload size={28} className="text-[--india-saffron]" />
                      <span className="text-sm font-semibold text-[--india-saffron]">Upload Photos / Evidence</span>
                      <span className="text-xs text-[--civic-gray-400]">JPG, PNG — up to 5 images</span>
                    </label>
                  </div>
                  {form.photos.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-3">
                      {form.photos.map((file, i) => (
                        <div key={i} className="relative">
                          <img src={URL.createObjectURL(file)} alt={`p-${i}`} className="h-20 w-full object-cover rounded border border-[--civic-gray-200]" />
                          <button onClick={() => removePhoto(i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ─── STEP 4: Contact ─── */}
              {step === 4 && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-8 w-1 bg-[--india-saffron]" />
                    <div>
                      <h2 className="font-display text-xl font-extrabold text-[--civic-navy]">Your Contact Details</h2>
                      <p className="text-xs text-[--civic-gray-600]">We'll send status updates and confirmation to your email</p>
                    </div>
                  </div>
                  {(errors.name || errors.email) && (
                    <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3 mb-4">
                      <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
                      <div>{errors.name && <p>{errors.name}</p>}{errors.email && <p>{errors.email}</p>}</div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { field: 'name' as const,  label: 'Full Name *',   type: 'text',  ph: 'Rahul Kumar' },
                      { field: 'email' as const, label: 'Email Address *', type: 'email', ph: 'rahul@gmail.com' },
                      { field: 'phone' as const, label: 'Mobile Number', type: 'tel',   ph: '+91 98XXXXXXXX' },
                    ].map(({ field, label, type, ph }) => (
                      <div key={field}>
                        <label className="block text-xs font-semibold text-[--civic-navy] mb-1.5">{label}</label>
                        <input
                          type={type}
                          value={form.contact[field]}
                          onChange={(e) => setContact(field, e.target.value)}
                          placeholder={ph}
                          className="w-full border border-[--civic-gray-200] focus:border-[--india-saffron] focus:ring-2 focus:ring-[--india-saffron]/20 rounded px-4 py-2.5 outline-none text-sm transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Summary preview */}
                  <div className="mt-5 bg-[--civic-gray-50] border border-[--civic-gray-200] rounded p-4">
                    <p className="text-xs font-bold text-[--civic-navy] uppercase tracking-widest mb-3">Report Summary</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[--civic-gray-600]">
                      <div><span className="font-semibold text-[--civic-navy]">Category: </span>{selectedCat?.title || '—'}</div>
                      <div><span className="font-semibold text-[--civic-navy]">Issue: </span>{form.issueType || '—'}</div>
                      <div className="sm:col-span-2"><span className="font-semibold text-[--civic-navy]">Location: </span>{form.locationText || '—'}</div>
                      <div><span className="font-semibold text-[--civic-navy]">Urgency: </span><span className="capitalize">{form.urgency}</span></div>
                      <div><span className="font-semibold text-[--civic-navy]">Photos: </span>{form.photos.length} attached</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 5: Submit ─── */}
              {step === 5 && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-8 w-1 bg-[--india-saffron]" />
                    <div>
                      <h2 className="font-display text-xl font-extrabold text-[--civic-navy]">
                        {!isAuthenticated ? 'Sign In to Submit' : '✅ Ready to Submit!'}
                      </h2>
                      <p className="text-xs text-[--civic-gray-600]">
                        {!isAuthenticated ? 'Enter your credentials to attach this report to your account.' : 'Your report is ready. Click Submit below.'}
                      </p>
                    </div>
                  </div>
                  {!isAuthenticated ? (
                    <div className="max-w-md">
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-semibold text-[--civic-navy] mb-1.5">Email</label>
                          <input
                            value={auth.email}
                            onChange={(e) => setAuth({ ...auth, email: e.target.value })}
                            className="w-full border border-[--civic-gray-200] focus:border-[--india-saffron] rounded px-4 py-2.5 outline-none text-sm"
                          />
                          {errors.authEmail && <p className="text-xs text-red-600 mt-1">{errors.authEmail}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[--civic-navy] mb-1.5">Password</label>
                          <input
                            type="password"
                            value={auth.password}
                            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
                            className="w-full border border-[--civic-gray-200] focus:border-[--india-saffron] rounded px-4 py-2.5 outline-none text-sm"
                          />
                          {errors.authPassword && <p className="text-xs text-red-600 mt-1">{errors.authPassword}</p>}
                        </div>
                      </div>
                      <button onClick={signIn} className="btn-saffron flex items-center gap-2 text-sm">
                        <CheckCircle size={15} /> Sign In & Continue
                      </button>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[--india-green] flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-[--civic-navy] mb-0.5">You're signed in!</p>
                        <p className="text-sm text-[--civic-gray-600]">Click Submit below. You'll receive an email confirmation with your report reference number.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="mt-8 flex items-center justify-between border-t border-[--civic-gray-200] pt-6">
                <button
                  onClick={onPrev}
                  disabled={step === 1}
                  className="px-5 py-2.5 border border-[--civic-gray-200] rounded text-[--civic-navy] text-sm font-semibold hover:border-[--civic-gray-400] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                {step < 5 ? (
                  <button onClick={onNext} className="btn-saffron text-sm flex items-center gap-2 py-2.5 px-6">
                    Next Step <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    onClick={submit}
                    disabled={!isAuthenticated || isSubmitting}
                    className="btn-saffron text-sm flex items-center gap-2 py-2.5 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Submitting…</>
                    ) : (
                      <>🚀 Submit Report</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Info strip */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { emoji: '📧', title: 'Email Confirmation', desc: 'Receive a reference ID immediately.' },
              { emoji: '📍', title: 'GPS Pinpoint', desc: 'Location routed to right department.' },
              { emoji: '🔄', title: 'Track in Real-Time', desc: 'Monitor progress from your dashboard.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white border border-[--civic-gray-200] rounded p-4 flex items-start gap-3">
                <span className="text-xl">{emoji}</span>
                <div>
                  <p className="font-semibold text-[--civic-navy] text-sm">{title}</p>
                  <p className="text-xs text-[--civic-gray-600]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
