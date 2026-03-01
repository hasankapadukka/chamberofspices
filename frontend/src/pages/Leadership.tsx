import React, { useState } from 'react';
import { Hero } from '../components/ui/Hero';
import { ChevronDown, Shield, Users, ScrollText, Network } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const Leadership = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const governanceStructure = [
        { q: "Governing Board", icon: Shield, a: "The supreme decision-making body of the Chamber, composed of industry veterans, elected officials, and key stakeholders representing the apex interests of Ceylon Spices." },
        { q: "Advisory Council", icon: ScrollText, a: "A consortium of technical experts, researchers, and policy advisors guiding the Board on strategic direction, sustainability frameworks, and global market positioning." },
        { q: "Executive Secretariat", icon: Users, a: "The operational engine of the Chamber located in Colombo, Sri Lanka, responsible for daily administration, member services, and program implementation." },
        { q: "Thematic Committees", icon: Network, a: "Specialized working groups focusing on targeted areas: \n• Market & Trade \n• Standards & Certification \n• Sustainability & Regeneration \n• Community Development" }
    ];

    return (
        <>
            <SEO title="Leadership & Governance | The Ceylon Chamber of Spices" description="Meet the governing leadership and explore the governance structure of The Ceylon Chamber of Spices." />
            <Hero
                titleLine1="Leadership &"
                titleLine2="Governance"
                subtitle="Guided by industry veterans dedicated to strengthening, modernizing, and globalizing Sri Lanka's spice ecosystem."
                bgImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="py-24 bg-green-50/50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 text-center">
                    <h2 className="text-4xl font-medium mb-16">Governing Leadership</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

                        <div className="bg-white p-8 rounded-3xl flex flex-col items-center gap-6 text-center hover:shadow-lg transition-shadow border border-green-100">
                            <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden bg-gray-200 border-4 border-green-50">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="font-bold text-lg mb-1">Mr. Anushka Vidanapathirana</p>
                                <p className="text-sm text-green-700 uppercase tracking-widest">Chairman</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl flex flex-col items-center gap-6 text-center hover:shadow-lg transition-shadow border border-green-100">
                            <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden bg-gray-200 border-4 border-green-50">
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="font-bold text-lg mb-1">Mrs. Lakshmi Jayasinghe</p>
                                <p className="text-sm text-green-700 uppercase tracking-widest">Vice Chairperson</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl flex flex-col items-center gap-6 text-center hover:shadow-lg transition-shadow border border-green-100">
                            <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden bg-gray-200 border-4 border-green-50">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="font-bold text-lg mb-1">Mr. Hasanka Padukka</p>
                                <p className="text-sm text-green-700 uppercase tracking-widest">Executive Director</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl flex flex-col items-center gap-6 text-center hover:shadow-lg transition-shadow border border-green-100">
                            <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden bg-gray-200 border-4 border-green-50">
                                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="font-bold text-lg mb-1">Mr. Ravees Dananjaya</p>
                                <p className="text-sm text-green-700 uppercase tracking-widest">Secretary General</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl flex flex-col items-center gap-6 text-center hover:shadow-lg transition-shadow border border-green-100">
                            <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden bg-gray-200 border-4 border-green-50">
                                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="font-bold text-lg mb-1">Mrs. L.T. Chandrakanthi</p>
                                <p className="text-sm text-green-700 uppercase tracking-widest">Treasurer</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 bg-white">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:h-full min-h-[400px]">
                        <img
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                            alt="Governance"
                            className="absolute inset-0 w-full h-full object-cover brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 to-transparent" />
                    </div>

                    <div className="py-8">
                        <h2 className="text-4xl font-medium mb-4">Governance Structure</h2>
                        <p className="text-gray-500 mb-12">The Chamber employs a decentralized yet highly coordinated governance topology to ensure equity, transparency, and action across all sectors of the spice industry.</p>
                        <div className="space-y-6">
                            {governanceStructure.map((faq, idx) => (
                                <div key={idx} className="border-b border-gray-100 pb-6">
                                    <button
                                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                        className="w-full flex justify-between items-center text-left text-lg font-medium hover:text-green-700 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <faq.icon className="w-5 h-5 text-gray-400" />
                                            {faq.q}
                                        </div>
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`grid transition-all duration-300 ease-in-out ${openIndex === idx ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <p className="text-gray-500 text-sm leading-relaxed pl-8 whitespace-pre-line">{faq.a}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
