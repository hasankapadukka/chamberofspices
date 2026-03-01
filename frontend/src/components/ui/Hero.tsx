import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    titleLine1: string;
    titleLine2: string;
    titleHighlight?: string;
    subtitle: string;
    bgImage: string;
    showSearch?: boolean;
}

export const Hero = ({ titleLine1, titleLine2, titleHighlight, subtitle, bgImage, showSearch = false }: HeroProps) => {
    return (
        <div className="relative h-screen min-h-[800px] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Hero Background"
                    className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 pt-48 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-6 drop-shadow-xl"
                >
                    {titleLine1}<br />
                    {titleLine2} {titleHighlight && <span className="text-green-400">{titleHighlight}</span>}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl text-lg text-white/90 font-light mb-12 drop-shadow-md whitespace-pre-line"
                >
                    {subtitle}
                </motion.p>

                {/* CTA Buttons — only on Home hero */}
                {showSearch && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link to="/membership" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center gap-2 shadow-lg">
                            Become a Member <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link to="/our-work" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                            Explore Our Work
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
