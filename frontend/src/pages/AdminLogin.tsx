import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { adminService } from '../services/adminService';
import { useToast } from '../components/ui/Toast';
import { SEO } from '../components/ui/SEO';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return showToast('error', 'Please fill in all fields.');

    setLoading(true);
    try {
      const res = await adminService.login({ email, password });
      if (res.success && res.token) {
        localStorage.setItem('adminToken', res.token);
        localStorage.setItem('adminData', JSON.stringify(res.admin));
        showToast('success', 'Logged in successfully.');
        navigate('/admin/dashboard');
      } else {
        showToast('error', res.message || 'Invalid credentials.');
      }
    } catch (err) {
      showToast('error', 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <SEO title="Admin Login | The Ceylon Chamber of Spices" description="Admin login for The Ceylon Chamber of Spices management portal." />
      
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-green-900 text-white shadow-xl mb-6">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Chamber Admin</h1>
          <p className="text-gray-500 mt-2">Secure management portal access</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-green-900/10 border border-green-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  placeholder="admin@chamberofspices.org"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-900 text-white py-4 rounded-2xl font-bold hover:bg-green-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-green-900/20 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Log In to Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-gray-50 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Authorized Access Only</p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-sm text-gray-400">
          © 2026 The Ceylon Chamber of Spices. All rights reserved.
        </p>
      </div>
    </div>
  );
};
