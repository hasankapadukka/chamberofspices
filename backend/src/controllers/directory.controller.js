import db from '../db.js';

export const getPublicMembers = (req, res) => {
    try {
        const members = db.prepare('SELECT id, full_name as name, organization, membership_type as type, description as products FROM membership_applications WHERE status = ?').all('approved');
        
        // Transform data to match frontend expectations if needed
        const transformedMembers = members.map(m => ({
            ...m,
            location: 'Sri Lanka', // Default for now
            products: m.products ? m.products.split(',').map((p) => p.trim()) : ['Spices']
        }));

        res.json({ success: true, data: transformedMembers });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch directory.' });
    }
};
