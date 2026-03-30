import React, { useEffect, useState } from 'react';
import { Hero } from '../components/ui/Hero';
import { SEO } from '../components/ui/SEO';
import { api } from '../services/api';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  summary: string;
  image_url: string;
  published_at: string;
}

export const NewsInsights = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Industry Updates', 'Policy Announcements', 'Global Market Trends', 'Sustainability Reports'];

  useEffect(() => {
    api.getNews().then(res => {
      if (res.success && res.data) setNews(res.data);
    }).catch(() => { }).finally(() => setLoading(false));
  }, []);

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
        bgImage="/images/spice_assortment.png"
      />
      <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-green-700 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-2xl font-medium mb-2">No articles yet</p>
            <p>Check back soon for news and updates.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {news.filter(item => activeCategory === 'All' || item.category === activeCategory).map((item) => (
              <div key={item.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                <div className="aspect-video overflow-hidden">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">
                    <span>{item.category}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">{item.published_at ? new Date(item.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900 group-hover:text-green-700 transition-colors mb-2">{item.title}</h3>
                  {item.summary && <p className="text-gray-500 text-sm leading-relaxed">{item.summary}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};
