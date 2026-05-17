import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer, FooterCTA } from './Footer';
import { BackToTop } from '../ui/BackToTop';

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
  </div>
);

export const PublicLayout = () => {
    return (
        <div className="font-sans text-gray-900 bg-white selection:bg-green-900 selection:text-white">
            <Navbar />
            <main className="min-h-screen">
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </main>
            <FooterCTA />
            <Footer />
            <BackToTop />
        </div>
    );
};
