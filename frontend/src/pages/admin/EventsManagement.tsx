import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Loader2,
  Clock,
  Filter
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../components/ui/Toast';

export const AdminEvents = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { showToast } = useToast();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await adminService.getAllEvents();
            if (res.success) setEvents(res.data);
        } catch (err) {
            showToast('error', 'Failed to fetch events.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            const res = await adminService.deleteEvent(id);
            if (res.success) {
                showToast('success', 'Event deleted successfully.');
                fetchEvents();
            }
        } catch (err) {
            showToast('error', 'Failed to delete event.');
        }
    };

    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
                    <p className="text-gray-500 mt-1">Organize forums, workshops, and trade delegations.</p>
                </div>
                <button className="bg-green-700 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-800 transition-all flex items-center gap-2 shadow-lg shadow-green-900/10">
                    <Plus className="w-5 h-5" />
                    Add New Event
                </button>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search events by title or location..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 transition-all focus:outline-none"
                    />
                </div>
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
                        <p className="text-gray-400 font-medium">Fetching events...</p>
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-gray-400">
                        <Calendar className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="text-xl font-bold">No events found</p>
                        <p className="mt-1">Create your first Chamber event to get started.</p>
                    </div>
                ) : (
                    filteredEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
                            <div className="h-40 relative overflow-hidden">
                                <img src={event.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-green-700 shadow-sm">
                                    {event.type}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{event.title}</h3>
                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4 text-green-600" />
                                        {new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <Clock className="w-4 h-4 text-green-600" />
                                        {event.time}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <MapPin className="w-4 h-4 text-green-600" />
                                        <span className="truncate">{event.location}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        <Users className="w-4 h-4" />
                                        {event.registrationsCount || 0} Registered
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(event.id)}
                                            className="p-2 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
