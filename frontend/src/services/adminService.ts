const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface AdminResponse {
    success: boolean;
    message: string;
    data?: any;
    token?: string;
    admin?: any;
}

const getAuthHeader = () => {
    const token = localStorage.getItem('adminToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

async function adminFetch(endpoint: string, options: RequestInit = {}): Promise<AdminResponse> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
            ...options.headers,
        },
    });
    
    if (res.status === 401) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
    }
    
    return res.json();
}

export const adminService = {
    login: (credentials: any) => adminFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    }),
    
    getProfile: () => adminFetch('/admin/me'),
    
    getDashboardStats: () => adminFetch('/admin/dashboard'),
    
    // News Management
    getAllNews: () => adminFetch('/admin/news'),
    createNews: (data: any) => adminFetch('/admin/news', { method: 'POST', body: JSON.stringify(data) }),
    updateNews: (id: number, data: any) => adminFetch(`/admin/news/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteNews: (id: number) => adminFetch(`/admin/news/${id}`, { method: 'DELETE' }),
    
    // Events Management
    getAllEvents: () => adminFetch('/admin/events'),
    createEvent: (data: any) => adminFetch('/admin/events', { method: 'POST', body: JSON.stringify(data) }),
    updateEvent: (id: number, data: any) => adminFetch(`/admin/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteEvent: (id: number) => adminFetch(`/admin/events/${id}`, { method: 'DELETE' }),
    
    // Submissions
    getContacts: () => adminFetch('/admin/contacts'),
    updateContactStatus: (id: number, status: string) => adminFetch(`/admin/contacts/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    }),
    
    getMemberships: () => adminFetch('/admin/membership'),
    updateMembershipStatus: (id: number, status: string) => adminFetch(`/admin/membership/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    }),
    
    getRegistrations: () => adminFetch('/admin/registrations'),
};
