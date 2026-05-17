import React, { useEffect, useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Mail, 
  Calendar, 
  ArrowRight,
  Loader2,
  Clock,
  User,
  ShieldCheck,
  CheckCircle,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../components/ui/Toast';

export const MemberInquiries = () => {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { showToast } = useToast();

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const token = localStorage.getItem('memberToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/member/inquiries`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) setInquiries(data.data);
        } catch (err) {
            showToast('error', 'Failed to fetch messages.');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkRead = async (id: number) => {
        try {
            const token = localStorage.getItem('memberToken');
            await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/member/inquiries/${id}/status`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'read' })
            });
            fetchInquiries();
        } catch (err) {}
    };

    const filtered = inquiries.filter(iq => 
        iq.sender_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        iq.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">B2B Matchmaking Inbox</h1>
                    <p className="text-gray-500 mt-1">Direct inquiries from international buyers and partners.</p>
                </div>
                <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Secure B2B Hub
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by sender or message content..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 transition-all focus:outline-none text-sm"
                    />
                </div>
            </div>

            {/* Inquiries List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-green-600" /></div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-10" />
                        <p className="text-xl font-bold text-gray-400">Your inbox is empty</p>
                        <p className="text-gray-400 mt-1">Inquiries from the Member Directory will appear here.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        <AnimatePresence>
                            {filtered.map((iq, i) => (
                                <motion.div 
                                    key={iq.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`group bg-white rounded-[32px] border transition-all ${
                                        iq.status === 'unread' ? 'border-green-100 shadow-lg shadow-green-900/5 ring-1 ring-green-50' : 'border-gray-50 opacity-80'
                                    } p-6`}
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="md:w-64 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                                                    iq.status === 'unread' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                    {iq.sender_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 line-clamp-1">{iq.sender_name}</h3>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest line-clamp-1">{iq.sender_email}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                    <Calendar className="w-3 h-3" /> {new Date(iq.created_at).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                    <Clock className="w-3 h-3" /> {new Date(iq.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-green-600 uppercase tracking-widest">{iq.subject}</span>
                                                {iq.status === 'unread' && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed italic">"{iq.message}"</p>
                                            <div className="pt-4 flex items-center justify-end gap-3">
                                                {iq.status === 'unread' && (
                                                    <button 
                                                        onClick={() => handleMarkRead(iq.id)}
                                                        className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-bold hover:bg-green-100 transition-all flex items-center gap-2"
                                                    >
                                                        <CheckCircle className="w-4 h-4" /> Mark as Read
                                                    </button>
                                                )}
                                                <button className="px-6 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-green-900 transition-all flex items-center gap-2 group">
                                                    Reply via Email <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};
