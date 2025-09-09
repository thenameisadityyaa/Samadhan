// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ReportIssuePage } from './pages/ReportIssuePage';
import { BugReportPage } from './pages/BugReportPage';
import { ContributionsPage } from './pages/ContributionsPage';
import { CareersPage } from './pages/CareersPage';
import { SubmitReportPage } from './pages/SubmitReportPage';
import { ViewReportsPage } from './pages/ViewReportsPage'; // 1. Import the new page

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
          <Route path="/submit" element={<SubmitReportPage />} />
          <Route path="/reports" element={<ViewReportsPage />} /> {/* 2. Add the new route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;