// src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      <Navbar />
      <main className="pt-16"> {/* Add padding-top for fixed navbar */}
        <Outlet />
      </main>
    </div>
  );
}