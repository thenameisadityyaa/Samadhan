// src/pages/ReportIssuePage.tsx
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CheckCircle, Locate, ArrowRight, Upload, X } from 'lucide-react';

// Fix leaflet default marker assets
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(delete (L.Icon.Default.prototype as any)._getIconUrl);
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export function ReportIssuePage() {
  const [step, setStep] = useState(1);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const categories: { title: string; key: string; items: string[] }[] = [
    {
      title: 'Core & Public Works',
      key: 'core_public_works',
      items: [
        // Roads & Transport
        'Pothole Repair',
        'Streetlight Installation/Repair',
        'Traffic Signal Malfunction',
        'Damaged Footpaths/Sidewalks',
        'Requests for Speed Breakers',
        'Illegal Encroachment on Roads/Footpaths',
        'Bus Stop Maintenance',
        // Water Supply
        'Leaking Pipes/Water Wastage',
        'Contaminated Water Supply',
        'No Water Supply/Irregular Timings',
        'Request for New Water Connection',
        // Sewage & Drainage
        'Blocked Drains/Sewers',
        'Overflowing Manholes',
        'Damaged Drainage Covers',
        'Request for Cleaning of Open Drains',
      ],
    },
    {
      title: 'Health & Environment',
      key: 'health_environment',
      items: [
        // Waste Management
        'Garbage Not Collected',
        'Overflowing Community Bins',
        'Illegal Dumping of Waste/Debris',
        'Request for Dustbin Installation',
        'Dead Animal Removal',
        // Public Health
        'Stagnant Water',
        'Unsanitary Conditions in Public Toilets',
        'Pest Control/Fumigation Request',
        // Parks & Recreation
        'Damaged Park Equipment',
        'Poor Maintenance of Parks/Gardens',
        'Tree Planting/Trimming Request',
      ],
    },
    {
      title: 'Citizen & Administrative Services',
      key: 'citizen_admin',
      items: [
        // Licenses & Permits
        'Trade License Inquiry/Application',
        "Hawker's Permit Inquiry",
        // Property & Taxes
        'Property Tax Payment Issues',
        'Request for Birth/Death Certificate',
        // Public Safety & Nuisance
        'Noise Pollution Complaints',
        'Stray Animal Menace',
        'Unauthorized Banners/Hoardings',
      ],
    },
  ];

  const setField = (key: keyof typeof form, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value } as typeof form));
  };

  const setContact = (key: keyof typeof form.contact, value: string) => {
    setForm((prev) => ({ ...prev, contact: { ...prev.contact, [key]: value } }));
  };

  const validateStep = (s: number) => {
    const nextErrors: Record<string, string> = {};
    if (s === 1) {
      if (!form.issueCategory) nextErrors.issueType = 'Choose a category';
      else if (!form.issueType) nextErrors.issueType = 'Select a specific service';
    }
    if (s === 2) {
      if (!form.locationText.trim()) nextErrors.locationText = 'Enter address or landmark';
      if (!form.coordinates || Number.isNaN(form.coordinates.lat)) nextErrors.coordinates = 'Pick a point on map';
    }
    if (s === 3) {
      if (!form.description.trim()) nextErrors.description = 'Describe the issue';
      if (form.photos.length === 0) nextErrors.photos = 'Add at least one photo';
    }
    if (s === 4) {
      if (!form.contact.name.trim()) nextErrors.name = 'Enter your name';
      const email = form.contact.email.trim();
      if (!email) nextErrors.email = 'Enter email';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter valid email';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onNext = () => {
    if (validateStep(step)) setStep((p) => Math.min(5, p + 1));
  };
  const onPrev = () => setStep((p) => Math.max(1, p - 1));

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }
    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setField('coordinates', { lat: latitude, lng: longitude });
        reverseGeocode(latitude, longitude);
        if (typeof pos.coords.accuracy === 'number') setAccuracy(pos.coords.accuracy);
        setIsLoadingLocation(false);
        toast.success('Location captured successfully!');
        // eslint-disable-next-line no-console
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        toast.error('Unable to retrieve your location. Please grant permission.');
        // eslint-disable-next-line no-console
        console.error('Geolocation error:', error);
        setIsLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      if (data?.display_name) setField('locationText', data.display_name as string);
    } catch {
      // ignore
    }
  };

  function MapClick() {
    useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setField('coordinates', { lat, lng });
        reverseGeocode(lat, lng);
        setAccuracy(null);
      },
    });
    return null;
  }

  function RecenterMap() {
    const map = useMap();
    map.setView([form.coordinates.lat, form.coordinates.lng]);
    return null;
  }

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setField('photos', [...form.photos, ...files]);
  };
  const removePhoto = (i: number) => setField('photos', form.photos.filter((_, idx) => idx !== i));

  const signIn = () => {
    const n: Record<string, string> = {};
    if (!auth.email.trim()) n.authEmail = 'Email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(auth.email)) n.authEmail = 'Enter valid email';
    if (!auth.password.trim()) n.authPassword = 'Password required';
    setErrors(n);
    if (Object.keys(n).length === 0) setIsAuthenticated(true);
  };

  const submit = async () => {
    if (!isAuthenticated) {
      alert('Please sign in first.');
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        issueType: form.issueType,
        description: form.description,
        location: form.locationText,
        coordinates: form.coordinates,
        urgency: form.urgency,
        contactInfo: form.contact,
        photosCount: form.photos.length,
        userEmail: auth.email || form.contact.email,
      };
      await axios.post('/api/v1/issues', payload);
      toast.success('Report submitted!');
      // reset
      setStep(1);
      setForm({
        issueType: '',
        issueCategory: '',
        locationText: '',
        coordinates: { lat: 12.9716, lng: 77.5946 },
        description: '',
        urgency: 'medium',
        photos: [],
        contact: { name: '', email: '', phone: '' },
      });
    } catch (e) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" />
      {/* Hero */}
      <section className="bg-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Report a Local Issue</h1>
          <p className="text-teal-100 max-w-2xl">Select the issue, mark the location on the map, describe it, and submit. We’ll route it to the right department.</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 bg-brand-page">
        <div className="max-w-5xl mx-auto px-8">
          {/* Progress */}
          <div className="mb-8 flex items-center justify-center gap-3 text-sm">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold ${i <= step ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{i}</div>
                {i < 5 && <div className={`w-10 h-1 ${i < step ? 'bg-teal-500' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
            {/* Step 1 */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Choose Service</h2>
                {errors.issueType && <p className="text-sm text-red-600 mb-3">{errors.issueType}</p>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categories.map((cat) => (
                    <div key={cat.key} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-900">{cat.title}</h3>
                        <input
                          type="radio"
                          name="issueCategory"
                          checked={form.issueCategory === cat.key}
                          onChange={() => setField('issueCategory', cat.key)}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {cat.items.map((label) => (
                          <button
                            key={label}
                            onClick={() => setField('issueType', label)}
                            className={`text-left text-sm px-3 py-2 rounded-md border ${
                              form.issueType === label ? 'border-brand bg-brand-accent/40' : 'border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Mark Location</h2>
                {(errors.locationText || errors.coordinates) && (
                  <div className="mb-3 text-sm text-red-600">
                    {errors.locationText && <p>{errors.locationText}</p>}
                    {errors.coordinates && <p>{errors.coordinates}</p>}
                  </div>
                )}
                <label className="block text-sm font-medium text-slate-700 mb-2">Address / Landmark</label>
                <input value={form.locationText} onChange={(e) => setField('locationText', e.target.value)} placeholder="e.g. MG Road near Metro entrance" className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4" />
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-600">Click on the map to set the exact point</p>
                  <button onClick={getCurrentLocation} disabled={isLoadingLocation} className="inline-flex items-center gap-2 brand-btn px-3 py-2 rounded-md disabled:opacity-50">
                    <Locate size={16} /> {isLoadingLocation ? 'Locating…' : 'Use my location'}
                  </button>
                </div>
                <div className="h-72 w-full rounded-lg overflow-hidden border border-slate-300">
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
                      <Popup>
                        {form.coordinates.lat.toFixed(5)}, {form.coordinates.lng.toFixed(5)}
                      </Popup>
                    </Marker>
                    {accuracy && (
                      <Circle
                        center={[form.coordinates.lat, form.coordinates.lng]}
                        radius={accuracy}
                        pathOptions={{ color: '#3182ce', opacity: 0.4, fillOpacity: 0.08 }}
                      />
                    )}
                  </MapContainer>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Describe the Issue</h2>
                {errors.description && <p className="text-sm text-red-600 mb-3">{errors.description}</p>}
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea value={form.description} onChange={(e) => setField('description', e.target.value)} rows={4} placeholder="What exactly is the problem? How does it affect people?" className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4" />
                <label className="block text-sm font-medium text-slate-700 mb-2">Urgency</label>
                <div className="flex gap-3 mb-4">
                  {(['low', 'medium', 'high'] as const).map((u) => (
                    <button key={u} onClick={() => setField('urgency', u)} className={`px-3 py-2 rounded-md border ${form.urgency === u ? 'border-brand bg-brand-accent/40' : 'border-slate-300'}`}>{u.toUpperCase()}</button>
                  ))}
                </div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Photos (required)</label>
                {errors.photos && <p className="text-sm text-red-600 mb-2">{errors.photos}</p>}
                <div className="border border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50">
                  <input id="photo-input" type="file" accept="image/*" multiple className="hidden" onChange={onUpload} />
                  <label htmlFor="photo-input" className="inline-flex items-center gap-2 cursor-pointer text-slate-700">
                    <Upload size={18} /> Upload images
                  </label>
                  <p className="text-xs text-slate-500 mt-1">or drag & drop here</p>
                </div>
                {form.photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                    {form.photos.map((file, i) => (
                      <div key={i} className="relative">
                        <img src={URL.createObjectURL(file)} alt={`p-${i}`} className="h-24 w-full object-cover rounded" />
                        <button onClick={() => removePhoto(i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Your Contact</h2>
                {(errors.name || errors.email) && (
                  <div className="text-sm text-red-600 mb-3">
                    {errors.name && <p>{errors.name}</p>}
                    {errors.email && <p>{errors.email}</p>}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input value={form.contact.name} onChange={(e) => setContact('name', e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input value={form.contact.email} onChange={(e) => setContact('email', e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone (optional)</label>
                    <input value={form.contact.phone} onChange={(e) => setContact('phone', e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 */}
            {step === 5 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Sign In to Submit</h2>
                {!isAuthenticated ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input value={auth.email} onChange={(e) => setAuth({ ...auth, email: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                      {errors.authEmail && <p className="text-sm text-red-600 mt-1">{errors.authEmail}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                      <input type="password" value={auth.password} onChange={(e) => setAuth({ ...auth, password: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                      {errors.authPassword && <p className="text-sm text-red-600 mt-1">{errors.authPassword}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <button onClick={signIn} className="bg-teal-500 text-white px-4 py-2 rounded-md inline-flex items-center gap-2 w-full md:w-auto">
                        <CheckCircle size={16} /> Sign In
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-700">Signed in. You can submit your report now.</p>
                )}
              </div>
            )}

            {/* Nav */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
              <button onClick={onPrev} disabled={step === 1} className="px-4 py-2 border border-slate-300 rounded-md disabled:opacity-50">Previous</button>
              {step < 5 ? (
                <button onClick={onNext} className="px-4 py-2 brand-btn rounded-md inline-flex items-center gap-2">
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button onClick={submit} disabled={!isAuthenticated || isSubmitting} className="px-4 py-2 brand-btn rounded-md disabled:opacity-50">
                  {isSubmitting ? 'Submitting…' : 'Submit Report'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
