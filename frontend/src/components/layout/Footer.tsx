import React, { useState } from 'react';
import { Linkedin, Facebook, Instagram, Send, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../ui/Toast';
import { api } from '../../services/api';

const NewsletterForm = () => {
    const { showToast } = useToast();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            showToast('error', 'Please enter a valid email address.');
            return;
        }
        setLoading(true);
        try {
            const res = await api.subscribeNewsletter(email);
            showToast(res.success ? 'success' : 'error', res.message);
            if (res.success) setEmail('');
        } catch {
            showToast('error', 'Network error. Please try again.');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors" />
            <button type="submit" disabled={loading} className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60 shrink-0">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
        </form>
    );
};

export const FooterCTA = () => (
    <div className="relative h-[500px] w-full overflow-hidden">
        <img
            src="/images/spice_assortment.png"
            alt="Footer Farm"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-green-900/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl md:text-6xl font-medium mb-4">Partner With Us</h2>
            <p className="text-green-50 max-w-2xl mb-8 font-light text-lg">
                Collaborate with development agencies, impact investors, and research institutions to foster sustainability, innovation, and community resilience in Sri Lanka's spice sector.
            </p>
            <Link to="/partner" className="bg-white text-green-900 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors shadow-2xl inline-block">
                Explore Partnership Opportunities
            </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-4 bg-black/20 backdrop-blur-sm">
            <div className="whitespace-nowrap animate-marquee text-white/40 text-4xl md:text-6xl font-light tracking-widest uppercase selection:bg-transparent">
                info@chamberofspices.org  &nbsp; &bull; &nbsp;  info@chamberofspices.org  &nbsp; &bull; &nbsp;  info@chamberofspices.org
            </div>
        </div>
    </div>
);

export const Footer = () => (
    <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {/* Quick Links */}
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">Quick Links</h4>
                    <div className="flex flex-col gap-2 text-sm text-gray-500">
                        <Link to="/about" className="hover:text-green-700 transition-colors">About</Link>
                        <Link to="/membership" className="hover:text-green-700 transition-colors">Membership</Link>
                        <Link to="/events" className="hover:text-green-700 transition-colors">Events</Link>
                        <Link to="/news-insights" className="hover:text-green-700 transition-colors">News & Insights</Link>
                        <Link to="/contact" className="hover:text-green-700 transition-colors">Contact Us</Link>
                        <hr className="my-2 border-gray-100" />
                        <Link to="/member-login" className="text-green-700 font-bold hover:underline">Member Portal</Link>
                        <Link to="/admin/login" className="text-gray-400 hover:text-gray-600 text-xs">Admin Access</Link>
                    </div>
                </div>

                {/* Focus Areas */}
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">Focus Areas</h4>
                    <div className="flex flex-col gap-2 text-sm text-gray-500">
                        <Link to="/industry-standards" className="hover:text-green-700 transition-colors">Industry & Standards</Link>
                        <Link to="/sustainability" className="hover:text-green-700 transition-colors">Sustainability</Link>
                        <Link to="/market-trade" className="hover:text-green-700 transition-colors">Market & Trade</Link>
                        <Link to="/research-innovation" className="hover:text-green-700 transition-colors">Research & Innovation</Link>
                    </div>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">Legal</h4>
                    <div className="flex flex-col gap-2 text-sm text-gray-500">
                        <Link to="/privacy-policy" className="hover:text-green-700 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-green-700 transition-colors">Terms of Use</Link>
                    </div>
                    <div className="flex gap-4 text-gray-400 mt-6">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="w-5 h-5 hover:text-green-700 cursor-pointer transition-colors" /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-green-700 cursor-pointer transition-colors" /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="w-5 h-5 hover:text-green-700 cursor-pointer transition-colors" /></a>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">Newsletter</h4>
                    <p className="text-sm text-gray-500 mb-2">Stay updated with industry news and Chamber announcements.</p>
                    <NewsletterForm />
                </div>
            </div>

            <div className="border-t border-gray-100 pt-8 text-center text-xs text-gray-400 space-y-1">
                <p>© 2026 The Ceylon Chamber of Spices. All Rights Reserved.</p>
                <p>Designed & Developed by <a href="https://www.risolveit.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium transition-colors">RisolveIT</a></p>
            </div>
        </div>
        <div className="mt-12 text-center opacity-[0.03] pointer-events-none">
            <h1 className="text-[12vw] font-bold leading-none tracking-tighter whitespace-nowrap overflow-hidden">THE CEYLON CHAMBER OF SPICES</h1>
        </div>
    </footer>
);
