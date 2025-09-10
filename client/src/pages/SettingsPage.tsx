// src/pages/SettingsPage.tsx
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export function SettingsPage() {
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [shareLocation, setShareLocation] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [publicProfile, setPublicProfile] = useState(false);

  const onSave = () => {
    toast.success('Settings saved');
  };

  const onDelete = () => {
    // Confirmation would be ideal in real app
    toast.error('Account deletion requested');
  };

  return (
    <div className="min-h-screen bg-brand-page">
      <Toaster position="top-right" />
      <section className="bg-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Settings</h1>
          <p className="text-teal-100 max-w-2xl">Manage your preferences for Samaadhan.</p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preference cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appearance */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Appearance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Theme</label>
                  <select value={theme} onChange={(e) => setTheme(e.target.value as typeof theme)} className="w-full border border-slate-300 rounded-lg px-3 py-2">
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value as typeof language)} className="w-full border border-slate-300 rounded-lg px-3 py-2">
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Notifications</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-slate-700">
                  <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} />
                  Email updates about my reports
                </label>
                <label className="flex items-center gap-3 text-slate-700">
                  <input type="checkbox" checked={smsAlerts} onChange={(e) => setSmsAlerts(e.target.checked)} />
                  SMS alerts for critical updates
                </label>
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Privacy</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-slate-700">
                  <input type="checkbox" checked={shareLocation} onChange={(e) => setShareLocation(e.target.checked)} />
                  Allow sharing location with reports
                </label>
                <label className="flex items-center gap-3 text-slate-700">
                  <input type="checkbox" checked={publicProfile} onChange={(e) => setPublicProfile(e.target.checked)} />
                  Make my profile public (show name on reports)
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button onClick={onDelete} className="px-4 py-2 rounded-md border border-red-300 text-red-700">Delete Account</button>
              <button onClick={onSave} className="brand-btn px-4 py-2 rounded-md">Save Changes</button>
            </div>
          </div>

          {/* Sidebar help */}
          <aside className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Tips</h3>
              <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                <li>Use “System” theme to match your device appearance.</li>
                <li>Enable location for precise map selection.</li>
                <li>Keep email alerts on to track progress.</li>
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Need help?</h3>
              <p className="text-sm text-slate-600">Visit Help Center or contact support.</p>
              <a href="/help" className="inline-block mt-3 brand-btn px-3 py-1.5 rounded-md">Open Help Center</a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}


