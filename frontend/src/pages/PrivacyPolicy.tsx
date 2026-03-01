import React from 'react';
import { SEO } from '../components/ui/SEO';

export const PrivacyPolicy = () => (
    <>
        <SEO title="Privacy Policy | The Ceylon Chamber of Spices" description="Privacy Policy of The Ceylon Chamber of Spices." />
        <div className="pt-40 pb-24 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
            <h1 className="text-4xl font-medium mb-8">Privacy Policy</h1>
            <p className="text-gray-500 mb-6">Last Updated: March 2026</p>

            <div className="prose prose-lg prose-gray max-w-none space-y-6">
                <h2 className="text-2xl font-medium mt-8">1. Information We Collect</h2>
                <p className="text-gray-600 leading-relaxed">We collect personal information that you voluntarily provide when you fill out forms on our website, including membership applications, contact inquiries, event registrations, and partnership requests. This may include your name, organization, email address, phone number, and inquiry details.</p>

                <h2 className="text-2xl font-medium mt-8">2. How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed">Your information is used to process membership applications, respond to inquiries, send event notifications, and facilitate partnership engagements. We do not sell, trade, or share your personal data with third parties without your consent, except as required by law.</p>

                <h2 className="text-2xl font-medium mt-8">3. Data Security</h2>
                <p className="text-gray-600 leading-relaxed">We implement industry-standard security measures to protect your personal information. All data transmission uses HTTPS encryption and access is restricted to authorized Chamber staff only.</p>

                <h2 className="text-2xl font-medium mt-8">4. Cookies</h2>
                <p className="text-gray-600 leading-relaxed">Our website may use cookies to enhance user experience. You can control cookie preferences through your browser settings.</p>

                <h2 className="text-2xl font-medium mt-8">5. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">If you have questions about this Privacy Policy, please contact us at <strong>info@chamberofspices.org</strong>.</p>
            </div>
        </div>
    </>
);
