import React from 'react';
import { Hero } from '../components/ui/Hero';
import { SEO } from '../components/ui/SEO';
import { useToast } from '../components/ui/Toast';
import { FileText, Download, Lock } from 'lucide-react';

export const Resources = () => {
  const { showToast } = useToast();

  const resources = [
    { title: "National Spice Export Guidelines 2026", type: "PDF Document", size: "2.4 MB", public: true },
    { title: "EU Market Compliance Framework for Cinnamon", type: "Technical Guide", size: "1.8 MB", public: true },
    { title: "Traceability System Implementation Manual", type: "Toolkit", size: "5.1 MB", public: true },
    { title: "Q1 Global Market Pricing Index", type: "Market Data", size: "800 KB", public: false },
    { title: "Bilateral Trade Agreement Tariffs Database", type: "Database Extract", size: "3.2 MB", public: false },
  ];

  const handleDownload = (res: typeof resources[0]) => {
    if (res.public) {
      showToast('info', `Download for "${res.title}" will be available soon. This is a preview version of the platform.`);
    } else {
      showToast('error', 'This resource is available to Chamber members only. Please log in or apply for membership.');
    }
  };

  return (
    <>
      <SEO title="Resources | The Ceylon Chamber of Spices" description="Download guidelines, technical manuals, toolkits, and market data for the Sri Lankan spice industry." />
      <Hero
        titleLine1="Industry"
        titleLine2="Resources"
        subtitle="Access official guidelines, technical manuals, compliance frameworks, and exclusive member data."
        bgImage="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2070&auto=format&fit=crop"
      />
      <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          {resources.map((res, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-700 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1 flex items-center gap-2">
                    {res.title}
                    {!res.public && <Lock className="w-3 h-3 text-amber-500" title="Members Only" />}
                  </h3>
                  <div className="flex items-center gap-4 text-xs tracking-wide text-gray-500 uppercase font-semibold">
                    <span>{res.type}</span>
                    <span>•</span>
                    <span>{res.size}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDownload(res)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors ${res.public
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  : 'bg-green-700 hover:bg-green-800 text-white'
                  }`}
              >
                {res.public ? (
                  <><Download className="w-4 h-4" /> Download</>
                ) : (
                  <><Lock className="w-4 h-4" /> Member Login</>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
