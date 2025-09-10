// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { SubmitReportPage } from './pages/SubmitReportPage';
import { ViewReportsPage } from './pages/ViewReportsPage'; // 1. Import the new page
import { ProfilePage } from './pages/ProfilePage';
import { MyReportsPage } from './pages/MyReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpCenterPage } from './pages/HelpCenterPage';

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
          <Route path="/submit" element={<SubmitReportPage />} />
          <Route path="/reports" element={<ViewReportsPage />} /> {/* 2. Add the new route */}
          <Route path="/my-reports" element={<MyReportsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;