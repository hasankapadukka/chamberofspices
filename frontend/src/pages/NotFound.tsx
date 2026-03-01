import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { Home } from 'lucide-react';

export const NotFound = () => (
    <>
        <SEO title="Page Not Found | The Ceylon Chamber of Spices" description="The page you are looking for does not exist." />
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24">
            <h1 className="text-[10rem] font-bold text-green-100 leading-none select-none">404</h1>
            <h2 className="text-3xl font-medium mb-4 -mt-8">Page Not Found</h2>
            <p className="text-gray-500 max-w-md mb-8">The page you are looking for doesn't exist or has been moved.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-full font-medium hover:bg-green-800 transition-colors">
                <Home className="w-4 h-4" /> Return Home
            </Link>
        </div>
    </>
);
