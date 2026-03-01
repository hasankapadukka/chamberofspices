import React from 'react';

// Reusable Service Card (Used for Pillars, Services)
export const ServiceCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-green-100 hover:shadow-xl hover:shadow-green-50/50 transition-all duration-300">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white text-green-600 transition-colors">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>
    </div>
);

// Reusable Feature Section (Split image and text layout)
interface FeatureSectionProps {
    title: string;
    subtitle?: string;
    features: {
        label: string;
        number: string;
        heading: string;
        description: string;
        image: string;
    }[];
}

export const FeatureSection = ({ title, subtitle, features }: FeatureSectionProps) => {
    return (
        <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                {subtitle && <p className="text-green-700 font-medium mb-2">{subtitle}</p>}
                <h2 className="text-4xl md:text-5xl font-medium mb-4 tracking-tight whitespace-pre-line">{title}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, idx) => (
                    <div key={idx} className={`space-y-4 ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}>
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group border border-gray-100">
                            <img
                                src={feature.image}
                                alt={feature.heading}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-800 tracking-wider">
                                {feature.label}
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-4xl font-light text-green-200">{feature.number}</span>
                            <div>
                                <h3 className="text-2xl font-medium mb-2">{feature.heading}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
