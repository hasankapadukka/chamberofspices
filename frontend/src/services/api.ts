const API_BASE = 'http://localhost:5000/api';

interface ApiResponse {
    success: boolean;
    message: string;
    id?: number;
}

async function apiRequest(endpoint: string, data: Record<string, any>): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export const api = {
    submitContact: (data: Record<string, any>) => apiRequest('/contact', data),
    submitMembership: (data: Record<string, any>) => apiRequest('/membership', data),
    registerEvent: (data: Record<string, any>) => apiRequest('/events/register', data),
    subscribeNewsletter: (email: string) => apiRequest('/newsletter', { email })
};
