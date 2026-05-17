import React, { useEffect, useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle,
  Clock,
  Loader2,
  Building2,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../components/ui/Toast';

export const AdminInquiries = () => {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { showToast } = useToast();

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const res = await adminService.getContacts();
            if (res.success) setInquiries(res.data);
        } catch (err) {
            showToast('error', 'Failed to fetch inquiries.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        try {
            const res = await adminService.updateContactStatus(id, status);
            if (res.success) {
                showToast('success', `Inquiry marked as ${status}.`);
                fetchInquiries();
            }
        } catch (err) {
            showToast('error', 'Failed to update status.');
        }
    };

    const filteredInquiries = inquiries.filter(iq => 
        iq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        iq.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        iq.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Inquiry Management</h1>
                <p className="text-gray-500 mt-1">Review and respond to messages from the public and potential partners.</p>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search inquiries by name, org or content..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 transition-all focus:outline-none"
                    />
                </div>
            </div>

            {/* Inquiries List */}
            <div className="grid gap-6">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
                        <p className="text-gray-400 font-medium">Fetching inquiries...</p>
                    </div>
                ) : filteredInquiries.length === 0 ? (
                    <div className="py-20 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="text-xl font-bold">No inquiries found</p>
                        <p className="mt-1">Messages from the Contact form will appear here.</p>
                    </div>
                ) : (
                    filteredInquiries.map((iq) => (
                        <div key={iq.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row gap-8 hover:shadow-md transition-all">
                            <div className="md:w-1/3 space-y-4">
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                        iq.status === 'read' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                                    }`}>
                                        {iq.status}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900 mt-2">{iq.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                        <Building2 className="w-4 h-4" /> {iq.organization}
                                    </div>
                                </div>
                                <div className="space-y-2 pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <Mail className="w-4 h-4" /> {iq.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <Phone className="w-4 h-4" /> {iq.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <Calendar className="w-4 h-4" /> {new Date(iq.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{iq.inquiry_type}</span>
                                    <p className="text-gray-600 mt-2 text-sm leading-relaxed italic">"{iq.message}"</p>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-50">
                                    {iq.status === 'unread' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(iq.id, 'read')}
                                            className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-bold hover:bg-green-100 transition-all flex items-center gap-2"
                                        >
                                            <CheckCircle className="w-4 h-4" /> Mark as Read
                                        </button>
                                    )}
                                    <button className="p-2 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
