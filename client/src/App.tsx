// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ReportIssuePage } from './pages/ReportIssuePage';
import { BugReportPage } from './pages/BugReportPage';
import { ContributionsPage } from './pages/ContributionsPage';
import { CareersPage } from './pages/CareersPage';
import { ResidentLoginPage } from './pages/ResidentLoginPage';
import { ResidentSignupPage } from './pages/ResidentSignupPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminSignupPage } from './pages/AdminSignupPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminReportsManagementPage } from './pages/AdminReportsManagementPage';
import { AdminReportDetailPage } from './pages/AdminReportDetailPage';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage';
import { SubmitReportPage } from './pages/SubmitReportPage';
import { ViewReportsPage } from './pages/ViewReportsPage'; // 1. Import the new page
import { ProfilePage } from './pages/ProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { MyReportsPage } from './pages/MyReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { ComingSoonPage } from './pages/ComingSoonPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/report" element={<ReportIssuePage />} />
          <Route path="/bug-report" element={<BugReportPage />} />
          <Route path="/contributions" element={<ContributionsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          {/* Auth Routes */}
          <Route path="/resident/login" element={<ResidentLoginPage />} />
          <Route path="/resident/signup" element={<ResidentSignupPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/signup" element={<AdminSignupPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/reports" element={<AdminReportsManagementPage />} />
          <Route path="/admin/reports/:reportId" element={<AdminReportDetailPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/submit" element={<SubmitReportPage />} />
          <Route path="/reports" element={<ViewReportsPage />} /> {/* 2. Add the new route */}
          <Route path="/my-reports" element={<MyReportsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="*" element={
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-700">
              <h1 className="text-5xl font-extrabold mb-4">404</h1>
              <p className="text-lg">Page not found.</p>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;