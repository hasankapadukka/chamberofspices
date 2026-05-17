import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Loader2,
  Calendar,
  Newspaper
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../components/ui/Toast';

export const AdminNews = () => {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { showToast } = useToast();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const res = await adminService.getAllNews();
            if (res.success) setNews(res.data);
        } catch (err) {
            showToast('error', 'Failed to fetch news articles.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;
        
        try {
            const res = await adminService.deleteNews(id);
            if (res.success) {
                showToast('success', 'Article deleted successfully.');
                fetchNews();
            }
        } catch (err) {
            showToast('error', 'Failed to delete article.');
        }
    };

    const filteredNews = news.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">News & Insights</h1>
                    <p className="text-gray-500 mt-1">Manage public articles, industry updates, and policy announcements.</p>
                </div>
                <button className="bg-green-700 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-800 transition-all flex items-center gap-2 shadow-lg shadow-green-900/10">
                    <Plus className="w-5 h-5" />
                    Create New Article
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by title or category..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 transition-all focus:outline-none"
                    />
                </div>
                <button className="px-6 py-3 border border-gray-100 rounded-xl flex items-center gap-2 text-gray-600 hover:bg-gray-50 transition-all font-medium">
                    <Filter className="w-5 h-5" />
                    Filter
                </button>
            </div>

            {/* News Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
                        <p className="text-gray-400 font-medium">Fetching articles...</p>
                    </div>
                ) : filteredNews.length === 0 ? (
                    <div className="p-20 text-center text-gray-400">
                        <Newspaper className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="text-xl font-bold">No articles found</p>
                        <p className="mt-1">Try adjusting your search or create a new article.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Article</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredNews.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                                    <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="max-w-xs md:max-w-md">
                                                    <p className="font-bold text-gray-900 truncate">{item.title}</p>
                                                    <p className="text-xs text-gray-400 line-clamp-1">{item.summary}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.published ? (
                                                <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-wider">
                                                    <CheckCircle className="w-4 h-4" /> Published
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                                                    <XCircle className="w-4 h-4" /> Draft
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(item.published_at || item.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-gray-400 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all" title="View">
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all" 
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
