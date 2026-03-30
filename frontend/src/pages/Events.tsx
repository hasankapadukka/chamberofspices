import React, { useEffect, useState } from 'react';
import { Hero } from '../components/ui/Hero';
import { SEO } from '../components/ui/SEO';
import { useToast } from '../components/ui/Toast';
import { api } from '../services/api';
import { Calendar, MapPin, Tag, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EventItem {
  id: number;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
  event_type: string;
  image_url: string;
  registration_open: number;
}

const RegistrationModal = ({ event, onClose }: { event: EventItem; onClose: () => void }) => {
  const { showToast } = useToast();
  const [form, setForm] = useState({ event_title: event.title, event_id: event.id, full_name: '', email: '', phone: '', organization: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email) {
      showToast('error', 'Name and email are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.registerEvent(form);
      showToast(res.success ? 'success' : 'error', res.message);
      if (res.success) onClose();
    } catch {
      showToast('error', 'Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        <h3 className="text-2xl font-medium mb-2">Register for Event</h3>
        <p className="text-green-700 font-medium text-sm mb-6">{event.title}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name *" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
          <input type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
          <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
          <input type="text" placeholder="Organization (optional)" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
          <button type="submit" disabled={loading} className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : 'Register Interest'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [activeType, setActiveType] = useState('All');

  const eventTypes = ['All', 'Annual Spice Forum', 'Trade Roundtables', 'Farmer Workshops', 'International Delegations'];

  useEffect(() => {
    api.getEvents().then(res => {
      if (res.success && res.data) setEvents(res.data);
    }).catch(() => { }).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Events | The Ceylon Chamber of Spices" description="Join conferences, workshops, and trade roundtables shaping the future of Sri Lanka's spice industry." />
      <Hero
        titleLine1="Industry"
        titleLine2="Events"
        subtitle="Connect, learn, and grow at our conferences, workshops, and international trade roundtables."
        bgImage="/images/clove_drying.png"
      />
      <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 mb-12">
          {eventTypes.map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeType === type ? 'bg-green-700 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {type}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-2xl font-medium mb-2">No upcoming events</p>
            <p>Check back soon for new events and conferences.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {events.filter(event => activeType === 'All' || event.event_type === activeType).map((event) => (
              <div key={event.id} className="bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-lg transition-all flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">{event.event_type}</span>
                    {!event.registration_open && <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">Closed</span>}
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-3">{event.title}</h3>
                  {event.description && <p className="text-gray-500 text-sm leading-relaxed mb-4">{event.description}</p>}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-green-600" />{new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}{event.event_time && ` · ${event.event_time}`}</div>
                    {event.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-600" />{event.location}</div>}
                  </div>
                </div>
                {event.registration_open ? (
                  <button onClick={() => setSelectedEvent(event)} className="shrink-0 bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors self-start">
                    Register Interest
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </section>
      <AnimatePresence>
        {selectedEvent && <RegistrationModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      </AnimatePresence>
    </>
  );
};
