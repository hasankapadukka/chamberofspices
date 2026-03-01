import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/ui/Hero';
import { ServiceCard } from '../components/ui/SharedElements';
import { SEO } from '../components/ui/SEO';
import { useToast } from '../components/ui/Toast';
import { api } from '../services/api';
import { ChevronDown, Users, Factory, Plane, Building2, CheckCircle2, ArrowRight, Send, Loader2 } from 'lucide-react';

export const Membership = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const [form, setForm] = useState({
        full_name: '', organization: '', email: '', phone: '', membership_type: 'Farmer Members', description: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const membershipCategories = [
        { q: "Farmer Members", icon: Users, a: "Designed for individual growers and farmer organizations. Gain access to capacity building, income improvement strategies, and technical training directly from origin experts." },
        { q: "SME & Processor Members", icon: Factory, a: "For small and medium processing companies. Benefits include guidance on organic certification, sustainability compliance, food safety audits, and traceability systems." },
        { q: "Exporter Members", icon: Plane, a: "Support for licensed exporters and large-scale traders. Participate in trade missions, international buyer engagement, global policy advocacy, and origin branding initiatives." },
        { q: "Institutional & Associate Members", icon: Building2, a: "For financial institutions, research bodies, and development agencies seeking to collaborate on sector-wide research, value addition, and agricultural development." }
    ];

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.full_name.trim()) e.full_name = 'Full name is required';
        if (!form.organization.trim()) e.organization = 'Organization is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
        if (!form.phone.trim()) e.phone = 'Phone number is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const res = await api.submitMembership(form);
            if (res.success) {
                showToast('success', res.message);
                setForm({ full_name: '', organization: '', email: '', phone: '', membership_type: 'Farmer Members', description: '' });
                setShowForm(false);
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
            <SEO title="Membership | The Ceylon Chamber of Spices" description="Join the movement to shape the future of Ceylon Spices. Explore membership categories and benefits." />
            <Hero
                titleLine1="Become a"
                titleLine2="Chamber"
                titleHighlight="Member"
                subtitle="Join the movement to shape the future of Ceylon Spices. Connect with industry leaders, access critical data, and drive policy advocacy."
                bgImage="https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=2080&auto=format&fit=crop"
            />

            <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 bg-white">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side — Form or CTA Image */}
                    {!showForm ? (
                        <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:h-full min-h-[500px]">
                            <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop" alt="Spice Market" className="absolute inset-0 w-full h-full object-cover brightness-90" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white">
                                <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
                                <p className="text-sm text-white/80 mb-4">Submit your application online and gain immediate access to sector benefits upon approval.</p>
                                <button onClick={() => setShowForm(true)} className="bg-green-500 hover:bg-green-600 w-full text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2">
                                    Apply Now <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
                            <h3 className="text-2xl font-medium mb-6">Membership Application</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Full Name *</label>
                                    <input type="text" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className={inputClass('full_name')} placeholder="Your full name" />
                                    {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Organization / Company *</label>
                                    <input type="text" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} className={inputClass('organization')} placeholder="Company name" />
                                    {errors.organization && <p className="text-red-500 text-xs">{errors.organization}</p>}
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Email *</label>
                                        <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass('email')} placeholder="john@example.com" />
                                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Phone *</label>
                                        <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass('phone')} placeholder="+94 77 ..." />
                                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Membership Type *</label>
                                    <select value={form.membership_type} onChange={e => setForm({ ...form, membership_type: e.target.value })} className={inputClass('membership_type') + ' bg-white'}>
                                        <option>Farmer Members</option>
                                        <option>SME & Processor Members</option>
                                        <option>Exporter Members</option>
                                        <option>Institutional & Associate Members</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">About Your Organization</label>
                                    <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputClass('description') + ' resize-none'} placeholder="Brief description of your organization and why you'd like to join..." />
                                </div>
                                <button type="submit" disabled={loading} className="w-full bg-green-700 text-white font-medium py-4 rounded-xl hover:bg-green-800 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-60">
                                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><Send className="w-4 h-4" /> Submit Application</>}
                                </button>
                                <button type="button" onClick={() => setShowForm(false)} className="w-full text-gray-500 text-sm hover:text-gray-700 mt-2">← Back to overview</button>
                            </form>
                        </div>
                    )}

                    {/* Right Side — Categories */}
                    <div className="py-8">
                        <h2 className="text-4xl font-medium mb-4">Membership Categories</h2>
                        <p className="text-gray-500 mb-12">We offer specialized membership tiers tailored to specific stakeholders in the spice ecosystem.</p>
                        <div className="space-y-6">
                            {membershipCategories.map((faq, idx) => (
                                <div key={idx} className="border-b border-gray-100 pb-6">
                                    <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex justify-between items-center text-left text-lg font-medium hover:text-green-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <faq.icon className="w-5 h-5 text-gray-400" />
                                            {faq.q}
                                        </div>
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`grid transition-all duration-300 ease-in-out ${openIndex === idx ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <p className="text-gray-500 text-sm leading-relaxed pl-8">{faq.a}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto bg-gray-50/50 rounded-3xl mb-24">
                <div className="text-center mb-16">
                    <p className="text-green-700 font-medium mb-2">Why Join?</p>
                    <h2 className="text-4xl font-medium tracking-tight">Membership Benefits</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ServiceCard icon={CheckCircle2} title="Policy Advocacy" description="Direct representation in structural dialogues and legislation affecting the spice industry." />
                    <ServiceCard icon={CheckCircle2} title="Market Intelligence" description="Exclusive access to international trade data, export figures, and origin demand analytics." />
                    <ServiceCard icon={CheckCircle2} title="Trade Networking" description="Engage in B2B matchmaking, trade missions, and international buyer roundtables." />
                    <ServiceCard icon={CheckCircle2} title="Certification Support" description="Receive technical guidance on maintaining global compliance, organic standards, and food safety." />
                    <ServiceCard icon={CheckCircle2} title="Capacity Building" description="Specialized training on sustainable agronomy, post-harvest practices, and value addition." />
                    <ServiceCard icon={CheckCircle2} title="Voting Rights" description="Eligible membership categories participate directly in Chamber leadership and governance." />
                </div>
            </section>
        </>
    );
};
