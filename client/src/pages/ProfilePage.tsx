// src/pages/ProfilePage.tsx
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const canSave = name.trim() && email.trim() && locationText.trim();

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      if (data?.display_name) setLocationText(data.display_name as string);
    } catch {
      // ignore
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        reverseGeocode(latitude, longitude);
        setIsLocating(false);
        toast.success('Location captured successfully!');
        // eslint-disable-next-line no-console
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        toast.error('Unable to retrieve your location. Please grant permission.');
        // eslint-disable-next-line no-console
        console.error('Geolocation error:', error);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleSave = () => {
    if (!canSave) {
      toast.error('Please fill all fields.');
      return;
    }
    toast.success('Profile saved!');
  };

  return (
    <div className="min-h-screen bg-brand-page">
      <Toaster position="top-right" />
      <section className="bg-teal-500 text-white py-12">
        <div className="max-w-5xl mx-auto px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Complete your profile</h1>
          <p className="text-teal-100 max-w-2xl">Complete your profile to get the most out of Samaadhan. Add your name, email, and location to start reporting issues.</p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-3xl mx-auto px-8">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2" placeholder="e.g. Riya Sharma" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2" placeholder="you@example.com" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-slate-700">Location</label>
                  <button onClick={handleGetLocation} disabled={isLocating} className="brand-btn px-3 py-1.5 rounded-md disabled:opacity-50 text-sm">{isLocating ? 'Locating…' : 'Use my location'}</button>
                </div>
                <input value={locationText} onChange={(e) => setLocationText(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2" placeholder="City, Area or Full address" />
                {coords && (
                  <p className="text-xs text-slate-500 mt-1">Lat: {coords.lat.toFixed(5)}, Lng: {coords.lng.toFixed(5)}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end">
              <button onClick={handleSave} disabled={!canSave} className="brand-btn px-4 py-2 rounded-md disabled:opacity-50">Save Profile</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


