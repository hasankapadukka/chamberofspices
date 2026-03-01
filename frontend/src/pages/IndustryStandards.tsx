import React from 'react';
import { Hero } from '../components/ui/Hero';
import { ServiceCard } from '../components/ui/SharedElements';
import { ShieldCheck, MapPin, ScanLine, Globe, CheckSquare } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const IndustryStandards = () => {
  return (
    <>
      <SEO
        title="Industry & Standards | The Ceylon Chamber of Spices"
        description="Raising the benchmark for Ceylon Spice quality through benchmarking, traceability, and global compliance."
      />
      <Hero
        titleLine1="Industry &"
        titleLine2="Standards"
        subtitle="Raising the Benchmark for Ceylon Spice Quality."
        bgImage="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
      />
      <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-green-700 font-medium mb-2">Quality Assurance</p>
          <h2 className="text-4xl font-medium tracking-tight">Global Benchmarks</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard icon={ShieldCheck} title="Quality Benchmarking" description="Establishing unified quality metrics for export-grade Ceylon spices." />
          <ServiceCard icon={MapPin} title="Origin Protection" description="Safeguarding the geographical indication and authenticity of Ceylon branded spices." />
          <ServiceCard icon={ScanLine} title="Traceability Systems" description="Implementing farm-to-fork tracking systems to ensure transparency and accountability." />
          <ServiceCard icon={Globe} title="International Compliance" description="Guiding members through EU, USDA, and other global regulatory frameworks." />
          <ServiceCard icon={CheckSquare} title="Food Safety Frameworks" description="Promoting HACCP, ISO 22000, and GMP standards across processing facilities." />
        </div>
      </section>
    </>
  );
};
