import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Newspaper, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
  </div>
);

export const AdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminService.getDashboardStats().then(res => {
            if (res.success) setStats(res.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-green-200 rounded-full animate-bounce"></div>
          <p className="text-gray-400 font-medium">Loading Statistics...</p>
        </div>
      </div>
    );

    const summaryCards = [
        { title: 'Total Members', value: stats?.membersCount || 0, icon: Users, color: 'bg-blue-500', trend: 12 },
        { title: 'News Articles', value: stats?.newsCount || 0, icon: Newspaper, color: 'bg-purple-500', trend: 5 },
        { title: 'Upcoming Events', value: stats?.eventsCount || 0, icon: Calendar, color: 'bg-green-500', trend: 2 },
        { title: 'New Inquiries', value: stats?.contactsCount || 0, icon: MessageSquare, color: 'bg-amber-500', trend: -8 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Operations Overview</h1>
                <p className="text-gray-500 mt-1">Real-time statistics for The Ceylon Chamber of Spices portal.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryCards.map((card, i) => <StatCard key={i} {...card} />)}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Submissions */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900 flex items-center gap-2">
                           <Clock className="w-5 h-5 text-green-600" />
                           Recent Activity
                        </h2>
                        <button className="text-green-700 text-sm font-bold hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {stats?.recentActivity?.map((item: any, i: number) => (
                           <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-gray-100">
                                   <ArrowUpRight className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-gray-900">{item.action}</p>
                                   <p className="text-xs text-gray-400">{item.time}</p>
                                </div>
                              </div>
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.type}</span>
                           </div>
                        )) || (
                          <div className="p-12 text-center text-gray-400">
                             No recent activity recorded.
                          </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions / Integration Status */}
                <div className="space-y-6">
                    <div className="bg-green-900 text-white rounded-3xl p-6 shadow-xl shadow-green-900/20 relative overflow-hidden">
                        <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
                        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                        <div className="space-y-3 relative z-10">
                            <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-left border border-white/10 transition-all text-sm font-medium">
                                Create News Article
                            </button>
                            <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-left border border-white/10 transition-all text-sm font-medium">
                                Add New Event
                            </button>
                            <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-left border border-white/10 transition-all text-sm font-medium">
                                Export Member List
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                        <h2 className="font-bold text-gray-900 mb-4">System Status</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span className="text-sm text-gray-600">Database Engine</span>
                                </div>
                                <span className="text-xs font-bold text-green-700">Healthy</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span className="text-sm text-gray-600">API Gateway</span>
                                </div>
                                <span className="text-xs font-bold text-green-700">Online</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-amber-500" />
                                    <span className="text-sm text-gray-600">Storage Usage</span>
                                </div>
                                <span className="text-xs font-bold text-amber-700">72% Full</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
