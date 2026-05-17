import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  TrendingUp, 
  History, 
  Loader2,
  DollarSign,
  Tag
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { motion } from 'framer-motion';

export const PriceManagement = () => {
    const [prices, setPrices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        spice_name: 'Cinnamon',
        grade: 'AL',
        price: '',
        unit: 'per kg'
    });

    useEffect(() => {
        fetchPrices();
    }, []);

    const fetchPrices = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/prices`);
            const data = await res.json();
            if (data.success) setPrices(data.data);
        } catch (err) {
            showToast('error', 'Failed to fetch prices.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/prices`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                showToast('success', 'Price index updated.');
                fetchPrices();
                setFormData({ ...formData, price: '' });
            }
        } catch (err) {
            showToast('error', 'Update failed.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this historical record?')) return;
        try {
            await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/prices/${id}`, {
                method: 'DELETE'
            });
            fetchPrices();
        } catch (err) {}
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Commodity Price Hub</h1>
                <p className="text-gray-500 mt-1">Manage official Chamber price indices for global markets.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Update Panel */}
                <div className="lg:col-span-1 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm h-fit space-y-8">
                    <div className="flex items-center gap-4 text-gray-900 font-bold text-lg">
                        <div className="w-10 h-10 bg-green-900 rounded-xl flex items-center justify-center text-white">
                            <Plus className="w-5 h-5" />
                        </div>
                        New Price Entry
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Spice Variety</label>
                            <select 
                                value={formData.spice_name}
                                onChange={(e) => setFormData({...formData, spice_name: e.target.value})}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
                            >
                                <option>Cinnamon</option>
                                <option>Black Pepper</option>
                                <option>Cloves</option>
                                <option>Cardamom</option>
                                <option>Nutmeg</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Grade / Quality</label>
                            <input 
                                type="text" 
                                value={formData.grade}
                                onChange={(e) => setFormData({...formData, grade: e.target.value})}
                                placeholder="e.g. AL, H1, FAQ"
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price (LKR)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="number" 
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                        placeholder="5200"
                                        className="w-full pl-10 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Unit</label>
                                <input 
                                    type="text" 
                                    value={formData.unit}
                                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={saving}
                            className="w-full py-4 bg-green-900 text-white rounded-2xl font-bold hover:bg-green-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            Update Price Index
                        </button>
                    </form>
                </div>

                {/* History Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                         <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                            <History className="w-6 h-6 text-green-700" />
                            Recent Price History
                        </h2>
                    </div>

                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date Reported</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Commodity</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price Index</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr><td colSpan={4} className="p-20 text-center"><Loader2 className="w-10 h-10 animate-spin text-green-600 mx-auto" /></td></tr>
                                ) : prices.length === 0 ? (
                                    <tr><td colSpan={4} className="p-20 text-center text-gray-400 font-medium">No records found.</td></tr>
                                ) : prices.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-bold text-gray-900">{new Date(p.recorded_date).toLocaleDateString()}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(p.recorded_date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-700">
                                                    <Tag className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{p.spice_name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{p.grade || 'Standard'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-bold text-green-700">LKR {p.price.toLocaleString()}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">{p.unit}</p>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button 
                                                onClick={() => handleDelete(p.id)}
                                                className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
