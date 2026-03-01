import React from 'react';
import { SEO } from '../components/ui/SEO';

export const Terms = () => (
    <>
        <SEO title="Terms of Use | The Ceylon Chamber of Spices" description="Terms of Use for The Ceylon Chamber of Spices website." />
        <div className="pt-40 pb-24 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
            <h1 className="text-4xl font-medium mb-8">Terms of Use</h1>
            <p className="text-gray-500 mb-6">Last Updated: March 2026</p>

            <div className="prose prose-lg prose-gray max-w-none space-y-6">
                <h2 className="text-2xl font-medium mt-8">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">By accessing and using the website of The Ceylon Chamber of Spices, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use this website.</p>

                <h2 className="text-2xl font-medium mt-8">2. Intellectual Property</h2>
                <p className="text-gray-600 leading-relaxed">All content on this website, including text, graphics, logos, images, and data compilations, is the property of The Ceylon Chamber of Spices and is protected by intellectual property laws. Unauthorized reproduction or redistribution is prohibited.</p>

                <h2 className="text-2xl font-medium mt-8">3. Use of Information</h2>
                <p className="text-gray-600 leading-relaxed">Information provided on this website is for general informational purposes only. While we strive for accuracy, The Ceylon Chamber of Spices makes no warranties regarding the completeness or reliability of any information.</p>

                <h2 className="text-2xl font-medium mt-8">4. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">The Ceylon Chamber of Spices shall not be liable for any direct, indirect, or consequential damages arising from the use of this website.</p>

                <h2 className="text-2xl font-medium mt-8">5. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">These terms shall be governed by and construed in accordance with the laws of Sri Lanka.</p>
            </div>
        </div>
    </>
);
