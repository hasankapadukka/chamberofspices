import React from 'react';
import { Hero } from '../components/ui/Hero';
import { SEO } from '../components/ui/SEO';

export const NewsInsights = () => {
  const newsItems = [
    { category: "Industry Updates", date: "March 15, 2026", title: "Record Highs for Ceylon Cinnamon Exports in Q1", image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=2080&auto=format&fit=crop" },
    { category: "Policy Announcements", date: "March 10, 2026", title: "New Subsidy Framework for Organic Certification", image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=2070&auto=format&fit=crop" },
    { category: "Global Market Trends", date: "March 05, 2026", title: "European Demand Surges for Traceable Black Pepper", image: "https://images.unsplash.com/photo-1599909533601-aa539e3e4163?q=80&w=2070&auto=format&fit=crop" },
    { category: "Sustainability Reports", date: "February 28, 2026", title: "2025 Annual Sustainability and Carbon-Footprint Report", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop" }
  ];

  return (
    <>
      <SEO
        title="News & Insights | The Ceylon Chamber of Spices"
        description="Stay updated with industry news, policy announcements, market trends, and sustainability reports."
      />
      <Hero
        titleLine1="News &"
        titleLine2="Insights"
        subtitle="Stay updated with the latest industry developments, market trends, and Chamber announcements."
        bgImage="https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop"
      />
      <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {newsItems.map((item, idx) => (
            <div key={idx} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">
                  <span>{item.category}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-2xl font-medium text-gray-900 group-hover:text-green-700 transition-colors">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
