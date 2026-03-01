import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/ui/Hero';
import { ServiceCard } from '../components/ui/SharedElements';
import { SEO } from '../components/ui/SEO';
import { Handshake, Building, LineChart, Globe, Leaf } from 'lucide-react';

export const Partner = () => {
    return (
        <>
            <SEO
                title="Partner With Us | The Ceylon Chamber of Spices"
                description="Collaborate for sector transformation. We welcome development agencies, impact investors, research institutions, and global buyers."
            />
            <Hero
                titleLine1="Collaborate for"
                titleLine2="Sector"
                titleHighlight="Transformation"
                subtitle="We partner with visionary organizations and global agencies to drive systemic change across Sri Lanka's spice ecosystem."
                bgImage="https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=2070&auto=format&fit=crop"
            />
            <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-medium tracking-tight">Who We Partner With</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <ServiceCard icon={Building} title="Development Agencies" description="Collaborate on sector-wide capacity building, infrastructure modernization, and farmer livelihood programs." />
                    <ServiceCard icon={LineChart} title="Impact Investors" description="Identify and fund sustainable, high-yield agribusiness projects and value-addition facilities." />
                    <ServiceCard icon={Handshake} title="Research Institutions" description="Partner on scientific agronomy, climate resilience mapping, and product formulation research." />
                    <ServiceCard icon={Globe} title="Global Buyers" description="Establish direct sourcing channels, secure long-term contracts, and develop tailored quality protocols." />
                    <ServiceCard icon={Leaf} title="Sustainability Partners" description="Co-finance carbon-offset programs and biodiversity restoration within spice-growing belts." />
                </div>

                <div className="bg-green-900 text-white rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-2xl">
                    <h3 className="text-3xl font-medium mb-4">Explore Partnership Opportunities</h3>
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                        Our specialized project management unit is ready to discuss strategic alignments, co-funding opportunities, and institutional collaborations.
                    </p>
                    <Link to="/contact" className="inline-block bg-white text-green-900 px-8 py-4 rounded-full font-bold hover:bg-green-50 transition-colors">
                        Contact Our Secretariat
                    </Link>
                </div>
            </section>
        </>
    );
};
