import React from 'react';
import { Hero } from '../components/ui/Hero';
import { FeatureSection, ServiceCard } from '../components/ui/SharedElements';
import { SEO } from '../components/ui/SEO';
import { Globe, ShieldCheck, Zap, Heart, Leaf, Network, Eye, Target } from 'lucide-react';

export const About = () => {
    return (
        <>
            <SEO
                title="About Us | The Ceylon Chamber of Spices"
                description="Learn about The Ceylon Chamber of Spices — the national apex body unifying Sri Lanka's spice sector through collaboration and strategic foresight."
            />

            <Hero
                titleLine1="About The"
                titleLine2="Ceylon Chamber of Spices"
                subtitle="The centralized institutional body unifying Sri Lanka's spice sector through collaboration and strategic foresight."
                bgImage="https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=2070&auto=format&fit=crop"
            />

            {/* Our Story & Vision */}
            <FeatureSection
                title="Our Heritage & Vision"
                subtitle="Unifying the Value Chain"
                features={[
                    {
                        label: "HISTORY",
                        number: "01",
                        heading: "Our Story",
                        description: "Sri Lanka's spice heritage dates back centuries, with global recognition for authenticity, purity, and quality. However, fragmented value chains and global market challenges demand structured coordination.\n\nThe Ceylon Chamber of Spices was established to unify and strengthen the industry through collaboration, policy advocacy, and sustainability leadership.",
                        image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=2080&auto=format&fit=crop"
                    },
                    {
                        label: "FUTURE",
                        number: "02",
                        heading: "Our Vision",
                        description: "To position Sri Lanka as the world's most trusted sustainable and regenerative spice origin.\n\nOur Mission:\nTo unite stakeholders across the spice value chain, enhance global market access, strengthen institutional coordination, and promote innovation and regenerative agriculture.",
                        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop"
                    }
                ]}
            />

            {/* Vision & Mission Isolated */}
            <section className="py-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-green-900 text-white p-10 rounded-3xl">
                        <Eye className="w-8 h-8 text-green-300 mb-4" />
                        <h3 className="text-2xl font-medium mb-4">Vision</h3>
                        <p className="text-green-100 leading-relaxed">To position Sri Lanka as the world's most trusted sustainable and regenerative spice origin.</p>
                    </div>
                    <div className="bg-green-50 p-10 rounded-3xl border border-green-100">
                        <Target className="w-8 h-8 text-green-700 mb-4" />
                        <h3 className="text-2xl font-medium mb-4">Mission</h3>
                        <p className="text-gray-600 leading-relaxed">To unite stakeholders across the spice value chain, enhance global market access, strengthen institutional coordination, and promote innovation and regenerative agriculture.</p>
                    </div>
                </div>
            </section>

            {/* Core Objectives */}
            <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto bg-gray-50/50 rounded-3xl mb-24">
                <div className="text-center mb-16">
                    <p className="text-green-700 font-medium mb-2">Pillars of Action</p>
                    <h2 className="text-4xl font-medium tracking-tight">Core Objectives</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ServiceCard icon={Network} title="Value Chain Coordination" description="Strengthen alignment between growers, producers, and exporters to ensure fair value distribution." />
                    <ServiceCard icon={ShieldCheck} title="Quality & Traceability" description="Improve operational quality benchmarks and implement transparent traceability frameworks." />
                    <ServiceCard icon={Globe} title="Export Expansion" description="Support members with market intelligence, global trade missions, and origin branding campaigns." />
                    <ServiceCard icon={Zap} title="Policy Advocacy" description="Advocate progressive policies and represent industry interests in structural dialogues with ministries." />
                    <ServiceCard icon={Leaf} title="Regenerative Farming" description="Promote climate-smart agriculture and environmental sustainability at the origin level." />
                    <ServiceCard icon={Heart} title="Community Empowerment" description="Empower rural communities through capacity building and scalable income improvement programs." />
                </div>
            </section>
        </>
    );
};
