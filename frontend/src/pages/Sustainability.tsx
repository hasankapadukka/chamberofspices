import React from 'react';
import { Hero } from '../components/ui/Hero';
import { ServiceCard } from '../components/ui/SharedElements';
import { Leaf, Sprout, Wind, ShieldAlert, BadgeCheck } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const Sustainability = () => {
  return (
    <>
      <SEO
        title="Sustainability & Regeneration | The Ceylon Chamber of Spices"
        description="Leading regenerative and climate-smart spice production in Sri Lanka."
      />
      <Hero
        titleLine1="Sustainability &"
        titleLine2="Regeneration"
        subtitle="Leading Regenerative and Climate-Smart Spice Production."
        bgImage="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop"
      />
      <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-green-700 font-medium mb-2">Environmental Stewardship</p>
          <h2 className="text-4xl font-medium tracking-tight">Regenerative Practices</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard icon={Sprout} title="Soil Health Restoration" description="Promoting organic inputs and cover cropping to maintain soil vitality." />
          <ServiceCard icon={Leaf} title="Biodiversity Conservation" description="Protecting endemic flora and fauna within and around spice plantations." />
          <ServiceCard icon={Wind} title="Carbon-Smart Farming" description="Reducing the carbon footprint of production through advanced agronomy." />
          <ServiceCard icon={ShieldAlert} title="Ethical Sourcing" description="Ensuring fair labor practices and equitable income distribution across the chain." />
          <ServiceCard icon={BadgeCheck} title="Sustainable Export Positioning" description="Marketing Ceylon spices as the global standard for eco-conscious consumers." />
        </div>
      </section>
    </>
  );
};
