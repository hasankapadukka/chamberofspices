import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/ui/Hero';
import { ServiceCard, FeatureSection } from '../components/ui/SharedElements';
import { SEO } from '../components/ui/SEO';
import { api } from '../services/api';
import { TrendingUp, Award, BookOpen, Leaf, Heart, Globe, ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, Quote, Calendar } from 'lucide-react';

/* ─── Commodity Slider Card ─── */
const CommodityCard = ({ image, title, badge, category }: any) => (
    <div className="min-w-[300px] md:min-w-[350px] bg-white rounded-2xl overflow-hidden group cursor-pointer border border-gray-100 hover:shadow-xl transition-all">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold shadow-lg text-green-800 border border-white">
                {badge}
            </div>
        </div>
        <div className="pt-4 px-2 pb-2">
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <div className="flex items-center gap-4 text-gray-500 text-xs mt-2">
                <div className="flex items-center gap-1"><Globe className="w-3 h-3" /> {category} Focus</div>
                <div className="flex items-center gap-1"><Leaf className="w-3 h-3 text-green-500" /> Sustainable</div>
            </div>
        </div>
    </div>
);

/* ─── Listing / Commodity Slider ─── */
const ListingSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: 'left' | 'right') => {
        scrollRef.current?.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
    };

    const commodities = [
        { title: "Ceylon Cinnamon", badge: "Origin Certified", category: "Export", image: "/images/cinnamon_plantation.png" },
        { title: "Ceylon Black Pepper", badge: "Premium Quality", category: "Export", image: "/images/pepper_vines.png" },
        { title: "Cloves & Nutmeg", badge: "Organically Grown", category: "Standards", image: "/images/clove_drying.png" },
        { title: "Cardamom & Mace", badge: "Innovation", category: "Research", image: "/images/spice_assortment.png" }
    ];

    return (
        <section className="py-24 bg-green-50/30 border-y border-green-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <h2 className="text-4xl font-medium tracking-tight">Raising the Benchmark<br />for Ceylon Spice Quality</h2>
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <button onClick={() => scroll('left')} className="p-3 rounded-full border border-gray-200 hover:bg-green-600 hover:text-white transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={() => scroll('right')} className="p-3 rounded-full border border-gray-200 hover:bg-green-600 hover:text-white transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
                    {commodities.map((c, i) => <div key={i} className="snap-center"><CommodityCard {...c} /></div>)}
                </div>
            </div>
        </section>
    );
};

/* ─── HOME PAGE ─── */
export const Home = () => {
    const [latestNews, setLatestNews] = useState<any[]>([]);

    useEffect(() => {
        api.getNews().then(res => {
            if (res.success && res.data) {
                setLatestNews(res.data.slice(0, 3));
            }
        }).catch(() => { });
    }, []);

    return (
        <>
            <SEO
                title="Ceylon Chamber of Spices | Official Spice Industry Apex Body of Sri Lanka"
                description="The Ceylon Chamber of Spices unites farmers, exporters, and policymakers to position Sri Lanka as a global leader in sustainable, premium spice production."
                keywords="Ceylon Cinnamon, Sri Lanka spices, spice exports Sri Lanka, sustainable spices, regenerative agriculture Sri Lanka"
            />

            {/* ── HERO ── */}
            <Hero
                titleLine1="Empowering Sri Lanka's"
                titleLine2=""
                titleHighlight="Spice Future"
                subtitle="Uniting farmers, exporters, industry leaders, and policymakers to position Sri Lanka as the world's most trusted sustainable spice origin."
                bgImage="/images/spice_assortment.png"
                showSearch={true}
            />

            {/* ── WHO WE ARE ── */}
            <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-green-700 font-medium mb-2">Who We Are</p>
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">The National Apex Body for Sri Lanka's Spice Industry</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            The Ceylon Chamber of Spices is an independent, industry-led institution dedicated to strengthening, modernizing, and globalizing Sri Lanka's spice ecosystem.
                        </p>
                        <p className="text-gray-500 leading-relaxed mb-8">
                            Sri Lanka has long been recognized globally for premium spices including Ceylon Cinnamon, Black Pepper, Cloves, Nutmeg, Mace, and coconut-based products. The Chamber serves as the collective voice and strategic anchor connecting farmers, exporters, processors, researchers, financial institutions, development partners, and government stakeholders.
                        </p>
                        <Link to="/about" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:gap-3 transition-all">
                            Learn more about us <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                        <img src="/images/cinnamon_plantation.png" alt="Ceylon Spices" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* ── FIVE STRATEGIC PILLARS ── */}
            <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto bg-gray-50/50 rounded-3xl">
                <div className="text-center mb-16">
                    <p className="text-green-700 font-medium mb-2">Our Focus</p>
                    <h2 className="text-4xl font-medium mb-4 text-gray-900">Driving Sector Transformation<br />Through Five Strategic Pillars</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ServiceCard icon={TrendingUp} title="1. Market Competitiveness" description="Connecting exporters with global buyers and trade fairs. Expanding trade missions and enforcing structural trade intelligence." />
                    <ServiceCard icon={Award} title="2. Standards & Certification" description="Paving the way for organic certification, sustainability compliance, food safety frameworks, and traceability systems." />
                    <ServiceCard icon={BookOpen} title="3. Innovation & Research" description="Driving product diversification, resilience modeling, and processing innovation through rigorous academic collaboration." />
                    <ServiceCard icon={Leaf} title="4. Regenerative & Sustainable Production" description="Championing climate-smart farming, soil restoration, biodiversity conservation, and carbon-neutral supply chains." />
                    <ServiceCard icon={Heart} title="5. Community & Inclusive Growth" description="Empowering rural communities through capacity building, fair income distribution, and inclusive farmer development programs." />
                </div>
                <div className="text-center mt-12">
                    <Link to="/our-work" className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-full font-medium hover:bg-green-800 transition-colors">
                        Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* ── OUR IMPACT VISION ── */}
            <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">Building a Resilient, Inclusive, and<br />Globally Competitive Spice Ecosystem</h2>
                    <p className="text-gray-500 max-w-3xl mx-auto mb-12">Our long-term positioning focuses on transforming Sri Lanka's spice sector into a sustainable global benchmark.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {[
                        "Stronger farmer incomes",
                        "Global origin branding",
                        "Sustainability leadership",
                        "Policy influence",
                        "Structured international trade access"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-green-50/80 rounded-xl border border-green-100">
                            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                            <span className="font-medium text-gray-800">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── COMMODITY SLIDER ── */}
            <ListingSection />

            {/* ── LATEST NEWS ── */}
            {latestNews.length > 0 && (
                <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="text-green-700 font-medium mb-2">Stay Updated</p>
                            <h2 className="text-4xl font-medium tracking-tight">Latest News & Insights</h2>
                        </div>
                        <Link to="/news" className="text-green-700 font-semibold hover:underline hidden md:block">
                            View all news
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {latestNews.map((news) => (
                            <Link key={news.id} to="/news" className="group">
                                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                                    <img src={news.image_url} alt={news.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-800">
                                        {news.category}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(news.published_at).toLocaleDateString()}
                                </div>
                                <h3 className="text-xl font-medium group-hover:text-green-700 transition-colors line-clamp-2">{news.title}</h3>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* ── LEADERSHIP MESSAGE ── */}
            <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative rounded-3xl overflow-hidden aspect-square max-h-[500px]">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" alt="Chairman" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <Quote className="w-10 h-10 text-green-200 mb-4" />
                        <h2 className="text-3xl font-medium mb-6">Message from the Chairman</h2>
                        <p className="text-gray-600 leading-relaxed mb-4 italic text-lg">
                            "Sri Lanka's spice heritage is a gift from centuries of cultivation, craftsmanship, and care. Today, the Ceylon Chamber of Spices stands as the collective voice of an industry poised for transformation. Together, we will build a future where our spices are synonymous with quality, sustainability, and trust on the global stage."
                        </p>
                        <div className="mt-8">
                            <p className="font-bold text-lg">Mr. Anushka Vidanapathirana</p>
                            <p className="text-green-700 text-sm uppercase tracking-widest">Chairman, The Ceylon Chamber of Spices</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CALL TO ACTION ── */}
            <section className="py-24 px-4 md:px-8 lg:px-12">
                <div className="max-w-5xl mx-auto bg-green-900 text-white rounded-3xl p-12 md:p-16 text-center shadow-2xl">
                    <h2 className="text-4xl md:text-5xl font-medium mb-4">Join the Movement to Shape<br />the Future of Ceylon Spices</h2>
                    <p className="text-green-100 max-w-2xl mx-auto mb-10 text-lg">
                        Whether you are a farmer, exporter, researcher, or development partner — your voice matters.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/membership" className="bg-white text-green-900 px-8 py-4 rounded-full font-bold hover:bg-green-50 transition-colors inline-block">
                            Apply for Membership
                        </Link>
                        <Link to="/partner" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors inline-block">
                            Partner With Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};
