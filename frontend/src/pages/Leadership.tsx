import React, { useState, useEffect } from 'react';
import { Hero } from '../components/ui/Hero';
import { ChevronDown, Shield, Users, ScrollText, Network } from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { api } from '../services/api';

interface Leader {
    id: number;
    name: string;
    title: string;
    role: string;
    bio: string;
    image_url: string;
}

const LeaderCard: React.FC<{ name: string; title: string; image?: string }> = ({ name, title }) => (
    <div className="bg-white p-8 rounded-3xl flex flex-col justify-center items-center text-center hover:shadow-lg transition-shadow border border-green-100 min-h-[140px]">
        <p className="font-bold text-lg mb-2 text-gray-900">{name}</p>
        <p className="text-sm text-green-700 uppercase tracking-widest font-semibold">{title}</p>
    </div>
);

export const Leadership = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [dynamicLeaders, setDynamicLeaders] = useState<Leader[]>([]);

    useEffect(() => {
        api.getLeadership().then(res => {
            if (res.success && res.data) setDynamicLeaders(res.data);
        }).catch(() => { });
    }, []);

    // Static leadership — these are the known leadership (shown first)
    const staticLeaders = [
        { name: 'Mr. Anushka Vidanapathirana', title: 'Chairman' },
        { name: 'Mrs. Lakshmi Jayasinghe', title: 'Vice Chairperson' },
        { name: 'Mr. Hasanka Padukka', title: 'Executive Director' },
        { name: 'Mr. Ravees Dananjaya', title: 'Secretary General' },
        { name: 'Mrs. L.T. Chandrakanthi', title: 'Treasurer' },
    ];

    const governanceStructure = [
        { q: "Governing Board", icon: Shield, a: "The supreme decision-making body of the Chamber, composed of industry veterans, elected officials, and key stakeholders representing the apex interests of Ceylon Spices." },
        { q: "Advisory Council", icon: ScrollText, a: "A consortium of technical experts, researchers, and policy advisors guiding the Board on strategic direction, sustainability frameworks, and global market positioning." },
        { q: "Executive Secretariat", icon: Users, a: "The operational engine of the Chamber located in Colombo, Sri Lanka, responsible for daily administration, member services, and program implementation." },
        { q: "Thematic Committees", icon: Network, a: "Specialized working groups focusing on targeted areas: \n• Market & Trade \n• Standards & Certification \n• Sustainability & Regeneration \n• Community Development" }
    ];

    // Filter dynamic leaders that aren't already in static list
    const additionalLeaders = dynamicLeaders.filter(
        dl => !staticLeaders.some(sl => sl.name === dl.name)
    );

    return (
        <>
            <SEO title="Leadership & Governance | The Ceylon Chamber of Spices" description="Meet the governing leadership and explore the governance structure of The Ceylon Chamber of Spices." />
            <Hero
                titleLine1="Leadership &"
                titleLine2="Governance"
                subtitle="Guided by industry veterans dedicated to strengthening, modernizing, and globalizing Sri Lanka's spice ecosystem."
                bgImage="/images/clove_drying.png"
            />

            <section className="py-24 bg-green-50/50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 text-center">
                    <h2 className="text-4xl font-medium mb-16">Governing Leadership</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {staticLeaders.map((leader, idx) => (
                            <LeaderCard key={`static-${idx}`} name={leader.name} title={leader.title} />
                        ))}
                        {additionalLeaders.map((leader) => (
                            <LeaderCard key={`api-${leader.id}`} name={leader.name} title={leader.title} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 max-w-4xl mx-auto px-4 md:px-8 lg:px-12 bg-white">
                <div className="py-8">
                    <h2 className="text-4xl font-medium mb-4 text-center">Governance Structure</h2>
                    <p className="text-gray-500 mb-12 text-center max-w-2xl mx-auto">The Chamber employs a decentralized yet highly coordinated governance topology to ensure equity, transparency, and action across all sectors of the spice industry.</p>
                    <div className="space-y-6 max-w-2xl mx-auto">
                        {governanceStructure.map((faq, idx) => (
                            <div key={idx} className="border-b border-gray-100 pb-6">
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full flex justify-between items-center text-left text-lg font-medium hover:text-green-700 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <faq.icon className="w-5 h-5 text-green-700" />
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
            </section>
        </>
    );
};
