import React from 'react';
import { Hero } from '../components/ui/Hero';
import { ServiceCard } from '../components/ui/SharedElements';
import { FlaskConical, CloudSun, Cog, GraduationCap, Database } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const ResearchInnovation = () => {
  return (
    <>
      <SEO
        title="Research & Innovation | The Ceylon Chamber of Spices"
        description="Driving value addition and future-ready production in the spice industry."
      />
      <Hero
        titleLine1="Research &"
        titleLine2="Innovation"
        subtitle="Driving Value Addition and Future-Ready Production."
        bgImage="/images/pepper_vines.png"
      />
      <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-green-700 font-medium mb-2">Future Forward</p>
          <h2 className="text-4xl font-medium tracking-tight">Innovation Pillars</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard icon={FlaskConical} title="Product Diversification" description="Researching new value-added products like essential oils, oleoresins, and extracts." />
          <ServiceCard icon={CloudSun} title="Climate-Resilient Varieties" description="Developing spice cultivars that withstand changing weather patterns and pests." />
          <ServiceCard icon={Cog} title="Processing Innovation" description="Modernizing drying, grinding, and packaging technologies to preserve volatile oils." />
          <ServiceCard icon={GraduationCap} title="Academic Collaboration" description="Partnering with universities and scientific institutes for applied agronomic research." />
          <ServiceCard icon={Database} title="Data-Driven Sector Planning" description="Utilizing satellite imagery and yield data to forecast national production." />
        </div>
      </section>
    </>
  );
};
