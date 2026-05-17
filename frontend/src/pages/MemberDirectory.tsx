import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Building2, 
  MapPin, 
  Tag, 
  ShieldCheck, 
  Loader2, 
  X, 
  Send,
  Globe,
  MessageCircle,
  Mail,
  User
} from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../components/ui/Toast';

export const MemberDirectory = () => {
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [sending, setSending] = useState(false);
    const { showToast } = useToast();

    const [inquiryData, setInquiryData] = useState({
        sender_name: '',
        sender_email: '',
        subject: 'B2B Inquiry | Trade Partnership',
        message: ''
    });

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/members/directory`);
                const data = await res.json();
                if (data.success) setMembers(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    const handleInquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/b2b/inquire`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...inquiryData,
                    member_id: selectedMember.id
                })
            });
            const data = await res.json();
            if (data.success) {
                showToast('success', `Inquiry sent to ${selectedMember.name}.`);
                setSelectedMember(null);
                setInquiryData({ sender_name: '', sender_email: '', subject: 'B2B Inquiry | Trade Partnership', message: '' });
            }
        } catch (err) {
            showToast('error', 'Failed to send inquiry.');
        } finally {
            setSending(false);
        }
    };

    const filteredMembers = members.filter(m => 
        (m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         (m.products && m.products.some((p: string) => p.toLowerCase().includes(searchTerm.toLowerCase())))) &&
        (filterType === 'All' || m.type.includes(filterType))
    );

    return (
        <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
            <SEO title="Member Directory | The Ceylon Chamber of Spices" description="Official directory of verified Ceylon Chamber of Spices members." />
            
            <div className="text-center mb-16">
                <span className="text-green-600 font-bold tracking-widest uppercase text-xs">Verified Network</span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">Member Directory</h1>
                <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                    Connect with authenticated Sri Lankan spice producers, exporters, and traders who adhere to the highest industry standards.
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-green-900/5 mb-12 flex flex-col md:flex-row gap-4 border border-green-50">
                <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by company name or spice product..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-4 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-gray-700"
                    />
                </div>
                <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 font-bold text-gray-600 cursor-pointer appearance-none"
                >
                    <option value="All">All Membership Tiers</option>
                    <option value="Platinum">Platinum Members</option>
                    <option value="Gold">Gold Members</option>
                    <option value="SME">SME Members</option>
                </select>
            </div>

            {/* Members Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <div className="col-span-full py-20 flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 animate-spin text-green-600" />
                        <p className="text-gray-400 font-medium">Authenticating Network Directory...</p>
                    </div>
                ) : filteredMembers.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                         <Building2 className="w-16 h-16 mx-auto mb-4 opacity-10" />
                         <p className="text-xl font-bold text-gray-400">No members found matching your search</p>
                    </div>
                ) : filteredMembers.map((member, i) => (
                    <motion.div 
                        key={member.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-8 rounded-[40px] border border-gray-100 hover:border-green-200 hover:shadow-2xl hover:shadow-green-900/5 transition-all group flex flex-col h-full"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-16 bg-gray-50 rounded-[20px] border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-green-700 group-hover:border-green-100 transition-all overflow-hidden">
                                {member.logo_url ? (
                                    <img src={member.logo_url} alt="Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <Building2 className="w-8 h-8" />
                                )}
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                                member.type === 'Platinum Member' ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-500'
                            }`}>
                                {member.type}
                            </div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-green-800 transition-colors uppercase tracking-tight">{member.organization}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                                <MapPin className="w-4 h-4 text-green-600" />
                                {member.business_address || 'Colombo, Sri Lanka'}
                            </div>
                            
                            {member.description && (
                                <p className="text-sm text-gray-500 line-clamp-2 italic font-medium">"{member.description}"</p>
                            )}

                            <div className="space-y-3 pt-4">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Globe className="w-3 h-3" /> Core Export Products
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {member.products && member.products.map((p: string) => (
                                        <span key={p} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold border border-gray-100 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all">
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setSelectedMember(member)}
                            className="w-full mt-10 py-5 bg-gray-900 text-white rounded-[24px] font-bold hover:bg-green-900 transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-900/10 group-hover:scale-[1.02] active:scale-95"
                        >
                            Inquire Now
                            <Send className="w-4 h-4 text-green-400" />
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Inquiry Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMember(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
                        >
                            <motion.div 
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white w-full max-w-2xl rounded-[48px] overflow-hidden shadow-2xl relative"
                            >
                                <div className="absolute top-0 right-0 w-80 h-80 bg-green-50 rounded-full -mr-40 -mt-40 blur-3xl opacity-50" />
                                
                                <div className="relative p-10 md:p-14">
                                    <button 
                                        onClick={() => setSelectedMember(null)}
                                        className="absolute top-8 right-8 p-3 bg-gray-50 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    <div className="flex items-center gap-6 mb-10">
                                        <div className="w-16 h-16 bg-green-900 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-green-900/20">
                                            <Building2 className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Trade Inquiry for</p>
                                            <h2 className="text-3xl font-bold text-gray-900">{selectedMember.organization}</h2>
                                        </div>
                                    </div>

                                    <form onSubmit={handleInquirySubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input 
                                                        type="text" 
                                                        required
                                                        value={inquiryData.sender_name}
                                                        onChange={(e) => setInquiryData({...inquiryData, sender_name: e.target.value})}
                                                        placeholder="John Doe"
                                                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Email</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input 
                                                        type="email" 
                                                        required
                                                        value={inquiryData.sender_email}
                                                        onChange={(e) => setInquiryData({...inquiryData, sender_email: e.target.value})}
                                                        placeholder="john@buyer.com"
                                                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Inquiry Message</label>
                                            <div className="relative">
                                                <MessageCircle className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                                <textarea 
                                                    rows={5}
                                                    required
                                                    value={inquiryData.message}
                                                    onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})}
                                                    placeholder="Specify your requirements, volume, and destination..."
                                                    className="w-full pl-12 pr-6 py-4 rounded-3xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-sm resize-none"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button 
                                                type="submit"
                                                disabled={sending}
                                                className="w-full py-5 bg-green-900 text-white rounded-[24px] font-bold text-lg hover:bg-green-800 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-green-900/20 disabled:opacity-50"
                                            >
                                                {sending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-5 h-5" />}
                                                Broadcast B2B Inquiry
                                            </button>
                                            <p className="text-center mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                                Verified & Secure Trade Communication
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
