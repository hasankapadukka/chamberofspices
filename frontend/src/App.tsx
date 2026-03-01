import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/layout/Navbar';
import { Footer, FooterCTA } from './components/layout/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { ToastProvider } from './components/ui/Toast';
import { BackToTop } from './components/ui/BackToTop';

// Eagerly loaded core page
import { Home } from './pages/Home';

// Lazy-loaded pages for performance
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
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));

// Loading skeleton
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <div className="font-sans text-gray-900 bg-white selection:bg-green-900 selection:text-white">
            <Navbar />

            <main className="min-h-screen">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/leadership" element={<Leadership />} />
                  <Route path="/our-work" element={<OurWork />} />
                  <Route path="/membership" element={<Membership />} />
                  <Route path="/contact" element={<Contact />} />

                  <Route path="/industry-standards" element={<IndustryStandards />} />
                  <Route path="/sustainability" element={<Sustainability />} />
                  <Route path="/market-trade" element={<MarketTrade />} />
                  <Route path="/research-innovation" element={<ResearchInnovation />} />
                  <Route path="/news-insights" element={<NewsInsights />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/partner" element={<Partner />} />

                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            <FooterCTA />
            <Footer />
            <BackToTop />
          </div>
        </Router>
      </ToastProvider>
    </HelmetProvider>
  );
}
