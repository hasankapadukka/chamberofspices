const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse {
    success: boolean;
    message: string;
    id?: number;
    data?: any;
    token?: string;
    admin?: any;
}

async function apiPost(endpoint: string, data: Record<string, any>): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

async function apiGet(endpoint: string): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}${endpoint}`);
    return res.json();
}

export const api = {
    // Public form submissions
    submitContact: (data: Record<string, any>) => apiPost('/contact', data),
    submitMembership: (data: Record<string, any>) => apiPost('/membership', data),
    registerEvent: (data: Record<string, any>) => apiPost('/events/register', data),
    subscribeNewsletter: (email: string) => apiPost('/newsletter', { email }),

    // Public content
    getNews: () => apiGet('/news'),
    getEvents: () => apiGet('/events'),
    getResources: () => apiGet('/resources'),
    getLeadership: () => apiGet('/leadership'),
};
