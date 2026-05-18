import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
    name: string;
    path: string;
}

interface NavGroup {
    name: string;
    links: NavLink[];
}

const Dropdown: React.FC<{ group: NavGroup, isActiveGroup: boolean, isActivePath: (path: string) => boolean }> = ({ group, isActiveGroup, isActivePath }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="relative group py-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                className={`flex items-center gap-1 hover:text-green-400 transition-colors ${isActiveGroup ? 'text-green-400' : ''}`}
                aria-expanded={isHovered}
                aria-haspopup="true"
            >
                {group.name}
                <ChevronDown className={`w-4 h-4 transition-transform ${isHovered ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden py-2"
                        role="menu"
                    >
                        {group.links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`block px-5 py-2.5 text-sm hover:bg-white/10 hover:text-green-400 transition-colors ${isActivePath(link.path) ? 'text-green-400 bg-white/5' : ''}`}
                                onClick={() => setIsHovered(false)}
                                role="menuitem"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Close mobile menu on Escape key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) setIsOpen(false);
    }, [isOpen]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const navGroups: NavGroup[] = [
        {
            name: 'The Chamber',
            links: [
                { name: 'About Us', path: '/about' },
                { name: 'Leadership & Governance', path: '/leadership' },
                { name: 'Our Work', path: '/our-work' }
            ]
        },
        {
            name: 'Focus Areas',
            links: [
                { name: 'Industry & Standards', path: '/industry-standards' },
                { name: 'Sustainability & Regeneration', path: '/sustainability' },
                { name: 'Market & Trade', path: '/market-trade' },
                { name: 'Research & Innovation', path: '/research-innovation' }
            ]
        },
        {
            name: 'Insights & Events',
            links: [
                { name: 'News & Insights', path: '/news-insights' },
                { name: 'Events', path: '/events' },
                { name: 'Resources', path: '/resources' }
            ]
        }
    ];

    const singleLinks: NavLink[] = [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Partner With Us', path: '/partner' }
    ];

    const isActive = (path: string) => location.pathname === path;
    const isGroupActive = (links: NavLink[]) => links.some(link => isActive(link.path));

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-6 px-4 md:px-8 xl:px-12 transition-all duration-300" role="navigation" aria-label="Main Navigation">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 xl:gap-8 bg-black/85 backdrop-blur-lg border border-white/10 rounded-full px-6 py-2.5 shadow-2xl">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl shrink-0" aria-label="Home — The Ceylon Chamber of Spices">
                    <Leaf className="w-6 h-6 text-green-400" />
                    <span className="tracking-tight hidden sm:block">The Ceylon Chamber of Spices</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden xl:flex items-center gap-6 xl:gap-8 text-white/90 text-sm font-medium">
                    {navGroups.map(group => <Dropdown key={group.name} group={group} isActiveGroup={isGroupActive(group.links)} isActivePath={isActive} />)}
                    {singleLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`hover:text-green-400 transition-colors ${isActive(link.path) ? 'text-green-400' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="hidden xl:flex items-center gap-5 xl:gap-6 shrink-0">
                    <Link to="/member-login" className="text-white/80 hover:text-green-400 text-sm font-semibold transition-all">
                        Member Login
                    </Link>
                    <Link to="/membership" className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-green-700 hover:shadow-lg hover:shadow-green-950/20 active:scale-95 transition-all duration-200 inline-block">
                        Become a Member
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="xl:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="absolute top-24 left-4 right-4 bg-black/95 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col text-white xl:hidden border border-white/10 max-h-[75vh]"
                        role="menu"
                    >
                        <div className="p-6 overflow-y-auto flex flex-col gap-6">
                            {/* Home Link */}
                            <Link
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-bold pl-2 border-l-2 ${isActive('/') ? 'border-green-400 text-green-400' : 'border-transparent'}`}
                                role="menuitem"
                            >
                                Home
                            </Link>

                            {navGroups.map(group => (
                                <div key={group.name} className="flex flex-col gap-3">
                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{group.name}</span>
                                    {group.links.map(link => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-lg font-medium pl-2 border-l-2 ${isActive(link.path) ? 'border-green-400 text-green-400' : 'border-transparent'}`}
                                            role="menuitem"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                            <div className="flex flex-col gap-3 mt-2">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Other</span>
                                {singleLinks.map(link => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-lg font-medium pl-2 border-l-2 ${isActive(link.path) ? 'border-green-400 text-green-400' : 'border-transparent'}`}
                                        role="menuitem"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2 mt-4 shrink-0">
                                <Link to="/member-login" onClick={() => setIsOpen(false)} className="border border-white/20 text-center text-white w-full py-4 rounded-xl font-bold">
                                    Member Login
                                </Link>
                                <Link to="/membership" onClick={() => setIsOpen(false)} className="bg-green-600 text-center text-white w-full py-4 rounded-xl font-bold">
                                    Become a Member
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
