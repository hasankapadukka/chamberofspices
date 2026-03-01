import db from '../db.js';

export const submitContact = (req, res) => {
    const { full_name, organization, email, phone, inquiry_type, message } = req.body;

    if (!full_name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Full name, email, and message are required.' });
    }

    try {
        const stmt = db.prepare(`INSERT INTO contacts (full_name, organization, email, phone, inquiry_type, message) VALUES (?, ?, ?, ?, ?, ?)`);
        const result = stmt.run(full_name, organization || null, email, phone || null, inquiry_type || 'General Inquiry', message);
        res.status(201).json({ success: true, message: 'Your inquiry has been submitted successfully. We will get back to you shortly.', id: result.lastInsertRowid });
    } catch (err) {
        console.error('Contact submission error:', err);
        res.status(500).json({ success: false, message: 'Failed to submit inquiry. Please try again.' });
    }
};

export const getContacts = (req, res) => {
    try {
        const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
        res.json({ success: true, data: contacts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch contacts.' });
    }
};
