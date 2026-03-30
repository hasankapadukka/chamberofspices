import React, { useEffect, useState } from 'react';
import { Hero } from '../components/ui/Hero';
import { SEO } from '../components/ui/SEO';
import { useToast } from '../components/ui/Toast';
import { api } from '../services/api';
import { FileText, Download, Lock } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  type: string;
  size: string;
  is_public: number;
}

export const Resources = () => {
  const { showToast } = useToast();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getResources().then(res => {
      if (res.success && res.data) setResources(res.data);
    }).catch(() => { }).finally(() => setLoading(false));
  }, []);

  const handleDownload = (res: Resource) => {
    if (res.is_public) {
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
        bgImage="/images/spice_assortment.png"
      />
      <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-2xl font-medium mb-2">No resources available yet</p>
            <p>Check back soon for documents and guides.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            {resources.map((res) => (
              <div key={res.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-700 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1 flex items-center gap-2">
                      {res.title}
                      {!res.is_public && <Lock className="w-3 h-3 text-amber-500" title="Members Only" />}
                    </h3>
                    <div className="flex items-center gap-4 text-xs tracking-wide text-gray-500 uppercase font-semibold">
                      <span>{res.type}</span>
                      {res.size && <><span>•</span><span>{res.size}</span></>}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(res)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors ${res.is_public
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    : 'bg-green-700 hover:bg-green-800 text-white'
                    }`}
                >
                  {res.is_public ? (
                    <><Download className="w-4 h-4" /> Download</>
                  ) : (
                    <><Lock className="w-4 h-4" /> Member Login</>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};
