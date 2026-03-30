import React from 'react';
import { Hero } from '../components/ui/Hero';
import { ServiceCard } from '../components/ui/SharedElements';
import { Plane, Users, Presentation, LineChart, Target } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const MarketTrade = () => {
  return (
    <>
      <SEO
        title="Market & Trade | The Ceylon Chamber of Spices"
        description="Expanding global market access for Ceylon spices through trade missions and buyer engagement."
      />
      <Hero
        titleLine1="Market &"
        titleLine2="Trade"
        subtitle="Expanding Global Market Access for Premium Ceylon Spices."
        bgImage="/images/clove_drying.png"
      />
      <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-green-700 font-medium mb-2">Global Reach</p>
          <h2 className="text-4xl font-medium tracking-tight">Trade Facilitation</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard icon={Plane} title="Trade Missions" description="Organizing outbound delegations to key destination markets." />
          <ServiceCard icon={Users} title="Buyer Engagement" description="Facilitating B2B matchmaking between exporters and international buyers." />
          <ServiceCard icon={Presentation} title="Trade Fair Representation" description="Securing national pavilions and prime placement at global food expos." />
          <ServiceCard icon={LineChart} title="Export Intelligence" description="Providing members with market demand analytics, pricing trends, and tariff guides." />
          <ServiceCard icon={Target} title="Origin Branding Initiatives" description="Running unified marketing campaigns to solidify the 'Ceylon' brand globally." />
        </div>
      </section>
    </>
  );
};
