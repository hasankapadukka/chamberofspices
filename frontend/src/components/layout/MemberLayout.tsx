import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  UserCircle, 
  FileText, 
  LogOut, 
  Menu, 
  X,
  Bell,
  MessageSquare
} from 'lucide-react';

export const MemberLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [member, setMember] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('memberToken');
        const memberData = localStorage.getItem('memberData');
        
        if (!token) {
            navigate('/member-login');
            return;
        }

        if (memberData) {
            setMember(JSON.parse(memberData));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('memberToken');
        localStorage.removeItem('memberData');
        navigate('/member-login');
    };

    const navItems = [
        { name: 'Dashboard', icon: Home, path: '/member/dashboard' },
        { name: 'Market Intelligence', icon: BarChart3, path: '/member/market' },
        { name: 'B2B Inquiries', icon: MessageSquare, path: '/member/inquiries' },
        { name: 'Company Profile', icon: UserCircle, path: '/member/profile' },
        { name: 'Exclusive Reports', icon: FileText, path: '/member/resources' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden font-sans">
            {/* Sidebar */}
            <aside 
                className={`bg-white border-r border-gray-100 transition-all duration-300 z-50 fixed lg:relative h-full ${
                    isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-6 flex items-center justify-between border-b border-gray-50">
                        {isSidebarOpen ? (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-900 rounded-xl flex items-center justify-center text-white font-bold text-xl">C</div>
                                <span className="font-bold text-xl text-gray-900 tracking-tight">Member Link</span>
                            </div>
                        ) : (
                            <div className="w-10 h-10 bg-green-900 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto">C</div>
                        )}
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-gray-400">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex-1 py-8 px-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                                    isActive(item.path) 
                                    ? 'bg-green-50 text-green-700 shadow-sm' 
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-green-700'
                                }`}
                            >
                                <item.icon className={`w-5 h-5 shrink-0 ${isActive(item.path) ? 'text-green-600' : 'text-gray-400'}`} />
                                {isSidebarOpen && <span className="font-bold text-sm tracking-wide">{item.name}</span>}
                            </Link>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-gray-50">
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                        >
                            <LogOut className="w-5 h-5 shrink-0" />
                            {isSidebarOpen && <span className="font-bold text-sm">Log Out</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-8 flex items-center justify-between sticky top-0 z-40">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-green-700 transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900 line-clamp-1">{member?.name || 'Authorized Member'}</p>
                                <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">{member?.member_id || 'ID: PENDING'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-green-300 transition-all">
                                <UserCircle className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
