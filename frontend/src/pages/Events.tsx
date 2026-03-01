import React, { useState } from 'react';
import { Hero } from '../components/ui/Hero';
import { SEO } from '../components/ui/SEO';
import { useToast } from '../components/ui/Toast';
import { api } from '../services/api';
import { Calendar, MapPin, Clock, X, Loader2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EventItem {
  title: string;
  date: string;
  location: string;
  type: string;
}

const EventRegistrationModal: React.FC<{ event: EventItem; onClose: () => void }> = ({ event, onClose }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', organization: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.full_name.trim()) e.full_name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api.registerEvent({ ...form, event_title: event.title });
      if (res.success) {
        showToast('success', res.message);
        onClose();
      } else {
        showToast('error', res.message);
      }
    } catch {
      showToast('error', 'Network error. Please try again.');
    }
    setLoading(false);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        <h3 className="text-2xl font-medium mb-2">Register Interest</h3>
        <p className="text-gray-500 text-sm mb-6">{event.title} — {event.date}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Full Name *</label>
            <input type="text" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className={inputClass('full_name')} placeholder="Your name" />
            {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email *</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass('email')} placeholder="john@example.com" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass('phone')} placeholder="+94 ..." />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Organization</label>
              <input type="text" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} className={inputClass('organization')} placeholder="Company" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-green-700 text-white font-medium py-3 rounded-xl hover:bg-green-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Registering...</> : <><Send className="w-4 h-4" /> Confirm Registration</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const events: EventItem[] = [
    { title: "Annual Spice Forum 2026", date: "October 15-16, 2026", location: "BMICH, Colombo", type: "Conference" },
    { title: "European Buyer Trade Roundtable", date: "August 22, 2026", location: "Virtual", type: "Trade Roundtable" },
    { title: "Matale Region Farmer Workshop", date: "July 10, 2026", location: "Matale City Hall", type: "Farmer Workshop" },
    { title: "Incoming Japanese Trade Delegation", date: "June 05, 2026", location: "Chamber HQ, Colombo", type: "International Delegation" }
  ];

  return (
    <>
      <SEO title="Events | The Ceylon Chamber of Spices" description="Join our upcoming Annual Spice Forum, trade roundtables, farmer workshops, and international delegations." />
      <Hero
        titleLine1="Industry"
        titleLine2="Events"
        subtitle="Connect, learn, and grow at our conferences, workshops, and international trade roundtables."
        bgImage="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
      />
      <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="space-y-6">
          {events.map((event, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-green-100 transition-all">
              <div>
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full mb-4">{event.type}</span>
                <h3 className="text-2xl font-medium mb-3">{event.title}</h3>
                <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> 09:00 AM - 05:00 PM</div>
                </div>
              </div>
              <button onClick={() => setSelectedEvent(event)} className="bg-green-700 text-white px-8 py-3 rounded-full font-medium hover:bg-green-800 transition-colors whitespace-nowrap">
                Register Interest
              </button>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedEvent && <EventRegistrationModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      </AnimatePresence>
    </>
  );
};
