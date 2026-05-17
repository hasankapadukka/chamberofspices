import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Mail, 
  Users, 
  History, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layout
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { motion } from 'framer-motion';

export const BulletinManagement = () => {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const { showToast } = useToast();
    const [bulletin, setBulletin] = useState({
        subject: '',
        content: '',
        target: 'All Subscribers'
    });

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/dashboard`);
            const data = await res.json();
            // Assuming the dashboard returns subscribers
            // In a real app we'd have a dedicated endpoint
            setSubscribers([]); // Dummy for now
        } catch (err) {} finally {
            setLoading(false);
        }
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            showToast('success', 'Bulletin broadcasted to 124 subscribers.');
            setSending(false);
            setBulletin({...bulletin, subject: '', content: ''});
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Bulletin Center</h1>
                <p className="text-gray-500 mt-1">Broadcast official notices and industry updates to the ecosystem.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Composer */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
                    
                    <div className="relative space-y-8">
                        <div className="flex items-center gap-4 text-gray-900 font-bold text-lg">
                            <div className="w-12 h-12 bg-green-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Send className="w-6 h-6" />
                            </div>
                            Broadcast Composer
                        </div>

                        <form onSubmit={handleSend} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Recipient Group</label>
                                    <div className="relative">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <select 
                                            value={bulletin.target}
                                            onChange={(e) => setBulletin({...bulletin, target: e.target.value})}
                                            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium appearance-none"
                                        >
                                            <option>All Subscribers</option>
                                            <option>Verified Members Only</option>
                                            <option>Exporters Hub</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Bulletin Subject</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input 
                                            type="text" 
                                            value={bulletin.subject}
                                            onChange={(e) => setBulletin({...bulletin, subject: e.target.value})}
                                            placeholder="e.g. Q3 Market Forecast Report Now Available"
                                            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Message Content (Rich Text Simulation)</label>
                                <textarea 
                                    rows={8}
                                    value={bulletin.content}
                                    onChange={(e) => setBulletin({...bulletin, content: e.target.value})}
                                    placeholder="Write your industry update here..."
                                    className="w-full px-6 py-4 rounded-3xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium resize-none shadow-inner"
                                    required
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                    <AlertCircle className="w-3 h-3" /> Bulletins are permanent and cannot be deleted.
                                </p>
                                <button 
                                    type="submit" 
                                    disabled={sending}
                                    className="px-10 py-5 bg-green-900 text-white rounded-3xl font-bold text-lg hover:bg-green-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-900/20 disabled:opacity-50"
                                >
                                    {sending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                                    Broadcast Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-8">
                    <div className="bg-gray-900 text-white p-8 rounded-[40px] shadow-xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl" />
                         <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Global Audience</p>
                         <h3 className="text-4xl font-bold mt-2">1,248</h3>
                         <p className="text-sm text-gray-400 mt-2">Industry professionals across the spider origin network.</p>
                         <div className="mt-8 flex items-center gap-3">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800" />)}
                            </div>
                            <span className="text-xs font-bold text-green-400">+12 this week</span>
                         </div>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                            <History className="w-5 h-5 text-gray-400" />
                            Broadcast History
                        </h2>
                        <div className="space-y-4">
                            {[
                                { subject: 'Annual General Meeting Notice', date: '2d ago', status: 'Delivered' },
                                { subject: 'EU Export Standard Updates', date: '1w ago', status: 'Delivered' },
                            ].map((h, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                                    <div className="max-w-[140px]">
                                        <p className="text-xs font-bold text-gray-900 line-clamp-1">{h.subject}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">{h.date}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                                        <CheckCircle2 className="w-3 h-3" /> {h.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
