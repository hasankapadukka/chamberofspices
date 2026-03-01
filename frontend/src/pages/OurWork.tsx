import React from 'react';
import { Hero } from '../components/ui/Hero';
import { ServiceCard } from '../components/ui/SharedElements';
import { ShieldCheck, TrendingUp, BookOpen, Leaf, Heart } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const OurWork = () => {
    return (
        <>
            <SEO title="Our Work | The Ceylon Chamber of Spices" description="Strengthening every link in the spice value chain through policy advocacy, market development, and sustainability programs." />
            <Hero
                titleLine1="Strengthening Every Link"
                titleLine2="in the"
                titleHighlight="Spice Value Chain"
                subtitle="We action our vision through five core pillars, designed to support farmers, protect standards, and expand global market reach."
                bgImage="https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=2096&auto=format&fit=crop"
            />

            <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-green-700 font-medium mb-2">Our Strategic Focus</p>
                    <h2 className="text-4xl font-medium tracking-tight">Initiatives & Programs</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <ServiceCard
                        icon={ShieldCheck}
                        title="1. Policy Advocacy"
                        description="Representing industry interests in structured dialogues with ministries, regulatory authorities, and international trade organizations to ensure a progressive operating environment."
                    />
                    <ServiceCard
                        icon={TrendingUp}
                        title="2. Market Development"
                        description="Connecting exporters with global buyers, organizing international trade missions, and providing actionable export intelligence to expand Ceylon Spices globally."
                    />
                    <ServiceCard
                        icon={BookOpen}
                        title="3. Standards & Certification"
                        description="Providing hands-on guidance for organic certification, sustainability compliance, food safety frameworks, and robust origin traceability systems."
                    />
                    <ServiceCard
                        icon={Heart}
                        title="4. Farmer Empowerment"
                        description="Executing dedicated capacity building, income improvement strategies, and technical training to ensure the economic health of the growers."
                    />
                    <ServiceCard
                        icon={Leaf}
                        title="5. Sustainability Programs"
                        description="Leading the transition to climate-smart farming, biodiversity conservation, and regenerative agricultural practices at the plantation level."
                    />
                </div>
            </section>
        </>
    );
};
