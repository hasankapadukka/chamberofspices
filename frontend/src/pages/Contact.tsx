import React, { useState } from 'react';
import { Hero } from '../components/ui/Hero';
import { SEO } from '../components/ui/SEO';
import { useToast } from '../components/ui/Toast';
import { api } from '../services/api';
import { MapPin, Mail, Phone, Send, Loader2 } from 'lucide-react';

export const Contact = () => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        full_name: '', organization: '', email: '', phone: '', inquiry_type: 'General Inquiry', message: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.full_name.trim()) e.full_name = 'Full name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
        if (!form.message.trim()) e.message = 'Message is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const res = await api.submitContact(form);
            if (res.success) {
                showToast('success', res.message);
                setForm({ full_name: '', organization: '', email: '', phone: '', inquiry_type: 'General Inquiry', message: '' });
                setErrors({});
            } else {
                showToast('error', res.message);
            }
        } catch {
            showToast('error', 'Network error. Please check your connection and try again.');
        }
        setLoading(false);
    };

    const inputClass = (field: string) =>
        `w-full px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-green-500 focus:ring-green-500'} focus:outline-none focus:ring-1 transition-colors`;

    return (
        <>
            <SEO title="Contact Us | The Ceylon Chamber of Spices" description="Reach out to the Chamber for membership inquiries, partnership opportunities, or policy consultations." />
            <Hero
                titleLine1="Get In"
                titleLine2="Touch"
                subtitle="Reach out to the Chamber for membership inquiries, partnership opportunities, or policy consultations."
                bgImage="/images/spice_assortment.png"
            />

            <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-4xl font-medium tracking-tight mb-8">Contact Information</h2>
                        <p className="text-gray-500 mb-12">
                            The Ceylon Chamber of Spices is the national apex body dedicated to the industry. Our secretariat is available during standard business hours.
                        </p>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-full bg-green-50 flex items-center justify-center text-green-700">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Headquarters</h3>
                                    <p className="text-gray-500 text-sm mt-1">The Ceylon Chamber of Spices<br />Colombo, Sri Lanka</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-full bg-green-50 flex items-center justify-center text-green-700">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Email Us</h3>
                                    <p className="text-gray-500 text-sm mt-1">info@chamberofspices.org</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-full bg-green-50 flex items-center justify-center text-green-700">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Call Us</h3>
                                    <p className="text-gray-500 text-sm mt-1">+94 XXX XXX XXX</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
                        <h3 className="text-2xl font-medium mb-6">Send an Inquiry</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Full Name *</label>
                                    <input type="text" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className={inputClass('full_name')} placeholder="John Doe" />
                                    {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Organization / Company</label>
                                    <input type="text" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} className={inputClass('organization')} placeholder="Company Name" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Email Address *</label>
                                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass('email')} placeholder="john@example.com" />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass('phone')} placeholder="+94 77 ..." />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Inquiry Type *</label>
                                <select value={form.inquiry_type} onChange={e => setForm({ ...form, inquiry_type: e.target.value })} className={inputClass('inquiry_type') + ' bg-white'}>
                                    <option>General Inquiry</option>
                                    <option>Membership Application</option>
                                    <option>Partnership/Investment</option>
                                    <option>Policy & Advocacy</option>
                                    <option>Media Query</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Message *</label>
                                <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className={inputClass('message') + ' resize-none'} placeholder="How can we help you?" />
                                {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                            </div>

                            <button type="submit" disabled={loading} className="w-full bg-green-700 text-white font-medium py-4 rounded-xl hover:bg-green-800 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-60">
                                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};
