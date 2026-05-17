import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { ToastProvider } from './components/ui/Toast';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { MemberLayout } from './components/layout/MemberLayout';

// Public Pages
import { Home } from './pages/Home';
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Leadership = lazy(() => import('./pages/Leadership').then(m => ({ default: m.Leadership })));
const OurWork = lazy(() => import('./pages/OurWork').then(m => ({ default: m.OurWork })));
const Membership = lazy(() => import('./pages/Membership').then(m => ({ default: m.Membership })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const IndustryStandards = lazy(() => import('./pages/IndustryStandards').then(m => ({ default: m.IndustryStandards })));
const Sustainability = lazy(() => import('./pages/Sustainability').then(m => ({ default: m.Sustainability })));
const MarketTrade = lazy(() => import('./pages/MarketTrade').then(m => ({ default: m.MarketTrade })));
const ResearchInnovation = lazy(() => import('./pages/ResearchInnovation').then(m => ({ default: m.ResearchInnovation })));
const NewsInsights = lazy(() => import('./pages/NewsInsights').then(m => ({ default: m.NewsInsights })));
const Events = lazy(() => import('./pages/Events').then(m => ({ default: m.Events })));
const Resources = lazy(() => import('./pages/Resources').then(m => ({ default: m.Resources })));
const Partner = lazy(() => import('./pages/Partner').then(m => ({ default: m.Partner })));
const MemberLogin = lazy(() => import('./pages/MemberLogin').then(m => ({ default: m.MemberLogin })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));
const MemberDirectory = lazy(() => import('./pages/MemberDirectory').then(m => ({ default: m.MemberDirectory })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Admin Pages
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminNews } from './pages/admin/NewsManagement';
import { AdminMemberships } from './pages/admin/MembershipManagement';
import { AdminEvents } from './pages/admin/EventsManagement';
import { AdminInquiries } from './pages/admin/InquiryManagement';
import { PriceManagement } from './pages/admin/PriceManagement';
import { BulletinManagement } from './pages/admin/BulletinManagement';

// Member Pages
import { MemberDashboard } from './pages/member/Dashboard';
import { MemberProfile } from './pages/member/Profile';
import { MemberInquiries } from './pages/member/Inquiries';

// Placeholder for missing Admin pages
const AdminPlaceholder = ({ title }: { title: string }) => (
  <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-gray-200">
    <h2 className="text-2xl font-bold text-gray-400">{title} Management</h2>
    <p className="text-gray-400 mt-2">This module is coming soon in the next phase of development.</p>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Admin Login - No Layout */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Portal - Protected by Layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="memberships" element={<AdminMemberships />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="prices" element={<PriceManagement />} />
              <Route path="bulletin" element={<BulletinManagement />} />
            </Route>

            <Route path="/member" element={<MemberLayout />}>
              <Route index element={<Navigate to="/member/dashboard" replace />} />
              <Route path="dashboard" element={<MemberDashboard />} />
              <Route path="market" element={<AdminPlaceholder title="Market Intelligence" />} />
              <Route path="profile" element={<MemberProfile />} />
              <Route path="inquiries" element={<MemberInquiries />} />
              <Route path="resources" element={<AdminPlaceholder title="Member Resources" />} />
            </Route>

            {/* Public Website */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="leadership" element={<Leadership />} />
              <Route path="our-work" element={<OurWork />} />
              <Route path="membership" element={<Membership />} />
              <Route path="contact" element={<Contact />} />
              <Route path="industry-standards" element={<IndustryStandards />} />
              <Route path="sustainability" element={<Sustainability />} />
              <Route path="market-trade" element={<MarketTrade />} />
              <Route path="research-innovation" element={<ResearchInnovation />} />
              <Route path="news-insights" element={<NewsInsights />} />
              <Route path="events" element={<Events />} />
              <Route path="resources" element={<Resources />} />
              <Route path="member-directory" element={<MemberDirectory />} />
              <Route path="member-login" element={<MemberLogin />} />
              <Route path="partner" element={<Partner />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </HelmetProvider>
  );
}
