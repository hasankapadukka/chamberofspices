import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  Users, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X,
  Bell,
  User as UserIcon,
  ShieldCheck,
  BarChart3
} from 'lucide-react';

export const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [admin, setAdmin] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const adminData = localStorage.getItem('adminData');
        
        if (!token) {
            navigate('/admin/login');
            return;
        }

        if (adminData) {
            setAdmin(JSON.parse(adminData));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'News & Insights', icon: Newspaper, path: '/admin/news' },
        { name: 'Commodity Prices', icon: BarChart3, path: '/admin/prices' },
        { name: 'Bulletin Center', icon: Bell, path: '/admin/bulletin' },
        { name: 'Events', icon: Calendar, path: '/admin/events' },
        { name: 'Memberships', icon: Users, path: '/admin/memberships' },
        { name: 'Inquiries', icon: MessageSquare, path: '/admin/inquiries' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden">
            {/* Sidebar */}
            <aside 
                className={`bg-green-900 text-white transition-all duration-300 z-50 fixed lg:relative h-full ${
                    isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-6 flex items-center justify-between border-b border-green-800">
                        {isSidebarOpen ? (
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-8 h-8 text-green-400" />
                                <span className="font-bold text-xl tracking-tight">C.C.S Admin</span>
                            </div>
                        ) : (
                            <ShieldCheck className="w-8 h-8 mx-auto text-green-400" />
                        )}
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-green-200">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex-1 py-8 px-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                                    isActive(item.path) 
                                    ? 'bg-green-800 text-white shadow-lg' 
                                    : 'text-green-200 hover:bg-green-800/50 hover:text-white'
                                }`}
                            >
                                <item.icon className="w-5 h-5 shrink-0" />
                                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                            </Link>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-green-800">
                        <button 
                            onClick={handleLogout}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 hover:text-red-400 transition-all`}
                        >
                            <LogOut className="w-5 h-5 shrink-0" />
                            {isSidebarOpen && <span className="font-medium">Sign Out</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <header className="bg-white border-b border-gray-100 py-4 px-8 flex items-center justify-between sticky top-0 z-40">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-green-700 transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <button className="p-2 text-gray-400 hover:text-green-700 transition-colors relative">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900">{admin?.name || 'Administrator'}</p>
                                <p className="text-xs text-green-600 font-medium uppercase tracking-wider">{admin?.role || 'Admin'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 border-2 border-green-50">
                                <UserIcon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
