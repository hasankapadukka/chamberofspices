import React, { useEffect, useState } from 'react';
import { 
  User, 
  Building2, 
  MapPin, 
  Tag, 
  Save, 
  Loader2, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../components/ui/Toast';

export const MemberProfile = () => {
    const [member, setMember] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        const data = localStorage.getItem('memberData');
        if (data) {
            setMember(JSON.parse(data));
        }
        setLoading(false);
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('memberToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/member/profile`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(member)
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('memberData', JSON.stringify(member));
                showToast('success', 'Profile updated successfully.');
            } else {
                showToast('error', data.message);
            }
        } catch (err) {
            showToast('error', 'Failed to save profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-green-600" /></div>;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8 pb-20"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your public presence in the Chamber directory.</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-2xl border border-green-100">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Verified Member</span>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Visual Identity */}
                <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 text-gray-900 font-bold text-lg">
                        <div className="w-10 h-10 bg-green-900 rounded-xl flex items-center justify-center text-white">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                        Visual Identity
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-32 h-32 rounded-[24px] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-2 shrink-0 overflow-hidden relative group">
                            {member?.logo_url ? (
                                <img src={member.logo_url} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <ImageIcon className="w-8 h-8 opacity-20" />
                                    <span className="text-[10px] font-bold uppercase">Logo</span>
                                </>
                            )}
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Company Logo URL</label>
                                <input 
                                    type="text" 
                                    value={member?.logo_url || ''} 
                                    onChange={(e) => setMember({...member, logo_url: e.target.value})}
                                    placeholder="https://your-website.com/logo.png"
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
                                />
                                <p className="text-[10px] text-gray-400 italic ml-1 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> External URLs only for demonstration.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Organization Details */}
                <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center gap-4 text-gray-900 font-bold text-lg">
                        <div className="w-10 h-10 bg-green-900 rounded-xl flex items-center justify-center text-white">
                            <Building2 className="w-5 h-5" />
                        </div>
                        Business Details
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Registered Name</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="text" 
                                    value={member?.organization || ''} 
                                    onChange={(e) => setMember({...member, organization: e.target.value})}
                                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Business Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="text" 
                                    value={member?.business_address || ''} 
                                    onChange={(e) => setMember({...member, business_address: e.target.value})}
                                    placeholder="Plot 45, Industrial Zone, Colombo"
                                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
                                />
                            </div>
                        </div>
                        <div className="col-span-full space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Trade Description (Directory Bio)</label>
                            <textarea 
                                rows={4}
                                value={member?.description || ''} 
                                onChange={(e) => setMember({...member, description: e.target.value})}
                                placeholder="Describe your focus products and core values..."
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium resize-none"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button 
                        type="submit"
                        disabled={saving}
                        className="bg-green-700 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-800 transition-all flex items-center gap-3 shadow-lg shadow-green-900/10 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Changes
                    </button>
                </div>
            </form>
        </motion.div>
    );
};
