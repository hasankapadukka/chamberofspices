import React, { useEffect, useState } from 'react';
import { 
  Download, 
  TrendingUp, 
  ArrowUpRight, 
  Users, 
  Award,
  CreditCard,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import { useToast } from '../../components/ui/Toast';
import { Link } from 'react-router-dom';

// Premium Chart Component with dynamic gradients
const MarketChart = ({ data }: { data: any[] }) => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#15803d" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#15803d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{fontSize: 10, fill: '#94a3b8'}}
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{fontSize: 10, fill: '#94a3b8'}}
          dx={-10}
        />
        <Tooltip 
          contentStyle={{ 
            borderRadius: '16px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
          }} 
        />
        <Area 
          type="monotone" 
          dataKey="price" 
          stroke="#15803d" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorPrice)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const MemberDashboard = () => {
  const [member, setMember] = useState<any>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRenew, setShowRenew] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const data = localStorage.getItem('memberData');
    if (data) setMember(JSON.parse(data));

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('memberToken');
        
        // Fetch Resources
        const resEnv = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/members/resources`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const resData = await resEnv.json();
        if (resData.success) setResources(resData.data);

        // Fetch Prices
        const priceEnv = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/prices`);
        const pData = await priceEnv.json();
        if (pData.success && pData.data.length > 0) {
            const formatted = pData.data.slice(0, 7).reverse().map((p: any) => ({
                name: new Date(p.recorded_date).toLocaleDateString([], {month: 'short', day: 'numeric'}),
                price: p.price
            }));
            setPrices(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const generateCertificate = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Add border
    doc.setDrawColor(21, 128, 61);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);
    
    // Add content
    doc.setTextColor(21, 128, 61);
    doc.setFontSize(40);
    doc.text('CERTIFICATE OF MEMBERSHIP', 148.5, 50, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text('This is to certify that', 148.5, 75, { align: 'center' });
    
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text(member?.organization || 'MEMBER ORGANIZATION', 148.5, 95, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('is a verified and active member of', 148.5, 115, { align: 'center' });
    
    doc.setTextColor(21, 128, 61);
    doc.setFontSize(22);
    doc.text('THE CEYLON CHAMBER OF SPICES', 148.5, 130, { align: 'center' });
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(12);
    doc.text(`Member ID: ${member?.member_id || 'N/A'}`, 148.5, 150, { align: 'center' });
    doc.text(`Issued Date: ${new Date().toLocaleDateString()}`, 148.5, 160, { align: 'center' });
    
    doc.save(`CCS_Certificate_${member?.member_id}.pdf`);
    showToast('success', 'Certificate generated successfully.');
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome back, <span className="text-green-700">{member?.name?.split(' ')[0] || 'Member'}</span>
          </h1>
          <p className="text-gray-500 mt-1">Your hub for market intelligence and global spice trade.</p>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={generateCertificate}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 hover:border-green-200 hover:bg-green-50 transition-all shadow-sm group"
            >
                <Award className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                Download Certificate
            </button>
            <div className="px-6 py-3 bg-green-900 text-white rounded-2xl text-sm font-bold shadow-lg shadow-green-900/20">
                LKR Price Index: Active
            </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Membership</p>
                <div className="flex items-end gap-2 mt-2">
                    <h3 className="text-3xl font-bold text-gray-900">Standard</h3>
                    <span className="text-xs font-bold text-green-600 mb-1">Tier 1</span>
                </div>
                <button 
                    onClick={() => setShowRenew(true)} 
                    className="mt-6 flex items-center gap-2 text-xs font-bold text-green-700 hover:underline"
                >
                    Renew Subscription <ChevronRight className="w-3 h-3" />
                </button>
            </div>
        </div>
        
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Member Directory</p>
                <div className="flex items-end gap-2 mt-2">
                    <h3 className="text-3xl font-bold text-gray-900">Public</h3>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                    </div>
                </div>
                <Link to="/member-directory" className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-700 hover:underline">
                    View Your Listing <ExternalLink className="w-3 h-3" />
                </Link>
            </div>
        </div>

        <div className="bg-green-900 p-8 rounded-[40px] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-20 blur-3xl group-hover:scale-110 transition-transform duration-700" />
            <div className="relative">
                <p className="text-[10px] font-bold text-green-200 uppercase tracking-widest">Market Exposure</p>
                <h3 className="text-3xl font-bold mt-2">Global</h3>
                <p className="text-sm text-green-100/60 mt-2 font-medium">Positioned in the world's most trusted spice origin.</p>
                <div className="mt-6 flex items-center gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold">+12% YoY Inquiry Growth</span>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Marketplace Intel */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Market Intelligence Index</h2>
              <p className="text-sm text-gray-500 mt-1">LKR per Unit • Weekly Trend Analysis</p>
            </div>
          </div>
          
          <MarketChart data={prices.length > 0 ? prices : [
            { name: 'Mon', price: 2400 },
            { name: 'Tue', price: 1398 },
            { name: 'Wed', price: 9800 },
            { name: 'Thu', price: 3908 },
            { name: 'Fri', price: 4800 },
            { name: 'Sat', price: 3800 },
            { name: 'Sun', price: 4300 },
          ]} />
        </div>

        {/* Exclusive Resources */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FileText className="w-6 h-6 text-green-600" />
            Industry Insights
          </h2>
          <p className="text-sm text-gray-500 mb-8 font-medium">Restricted access reports for certified members.</p>
          
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            {loading ? (
              <p className="text-sm text-gray-400">Loading industry insights...</p>
            ) : resources.length === 0 ? (
              <p className="text-sm text-gray-400">No exclusive resources available yet.</p>
            ) : resources.map((res, i) => (
              <div key={res.id} className="group flex items-center justify-between p-4 rounded-3xl bg-gray-50 border border-transparent hover:border-green-100 hover:bg-green-50/50 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-green-600 shadow-sm transition-colors ring-1 ring-gray-100 group-hover:ring-green-100">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-green-800 transition-colors line-clamp-1">{res.title}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-0.5">{res.type} • {res.size || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-4 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-[20px] text-xs font-bold uppercase tracking-widest transition-all">
            View Research Library
          </button>
        </div>
      </div>

      {/* Renewal Modal Simulation */}
      <AnimatePresence>
        {showRenew && (
            <>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowRenew(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white w-full max-w-lg rounded-[48px] p-10 shadow-2xl overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
                
                        <div className="relative">
                            <div className="w-16 h-16 bg-green-900 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl">
                                <CreditCard className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">Membership Renewal</h3>
                            <p className="text-gray-500 mt-2 mb-8 font-medium">Securing your verified status for the next 12 months.</p>

                            <div className="space-y-6">
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Standard Tier Plan</p>
                                        <p className="text-xs text-gray-400 mt-1">Annual subscription fee</p>
                                    </div>
                                    <span className="text-xl font-bold text-gray-900">LKR 45,000</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Card Details</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input type="text" placeholder="#### #### #### ####" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all font-mono" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="MM/YY" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all font-mono" />
                                        <input type="text" placeholder="CVC" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all font-mono" />
                                    </div>
                                </div>

                                <button 
                                    onClick={() => {
                                        showToast('success', 'Payment successful! Membership extended.');
                                        setShowRenew(false);
                                    }}
                                    className="w-full bg-green-900 text-white py-5 rounded-3xl font-bold text-lg hover:bg-green-800 transition-all shadow-xl shadow-green-900/20 active:scale-[0.98]"
                                >
                                    Complete Payment
                                </button>
                                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                    Encrypted & Powered by CCS Finance Hub
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </>
        )}
      </AnimatePresence>
    </div>
  );
};
