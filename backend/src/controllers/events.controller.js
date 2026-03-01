import db from '../db.js';

export const registerForEvent = (req, res) => {
    const { event_title, full_name, email, phone, organization } = req.body;

    if (!event_title || !full_name || !email) {
        return res.status(400).json({ success: false, message: 'Event title, full name, and email are required.' });
    }

    try {
        const stmt = db.prepare(`INSERT INTO event_registrations (event_title, full_name, email, phone, organization) VALUES (?, ?, ?, ?, ?)`);
        const result = stmt.run(event_title, full_name, email, phone || null, organization || null);
        res.status(201).json({ success: true, message: 'You have been registered for the event. A confirmation email will be sent shortly.', id: result.lastInsertRowid });
    } catch (err) {
        console.error('Event registration error:', err);
        res.status(500).json({ success: false, message: 'Failed to register. Please try again.' });
    }
};

export const getRegistrations = (req, res) => {
    try {
        const regs = db.prepare('SELECT * FROM event_registrations ORDER BY created_at DESC').all();
        res.json({ success: true, data: regs });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch registrations.' });
    }
};
