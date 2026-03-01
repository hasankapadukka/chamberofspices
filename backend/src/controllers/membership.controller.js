import db from '../db.js';

export const submitApplication = (req, res) => {
    const { full_name, organization, email, phone, membership_type, description } = req.body;

    if (!full_name || !organization || !email || !phone || !membership_type) {
        return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
    }

    try {
        const stmt = db.prepare(`INSERT INTO membership_applications (full_name, organization, email, phone, membership_type, description) VALUES (?, ?, ?, ?, ?, ?)`);
        const result = stmt.run(full_name, organization, email, phone, membership_type, description || null);
        res.status(201).json({ success: true, message: 'Your membership application has been submitted successfully. Our team will review it and contact you within 5 business days.', id: result.lastInsertRowid });
    } catch (err) {
        console.error('Membership submission error:', err);
        res.status(500).json({ success: false, message: 'Failed to submit application. Please try again.' });
    }
};

export const getApplications = (req, res) => {
    try {
        const apps = db.prepare('SELECT * FROM membership_applications ORDER BY created_at DESC').all();
        res.json({ success: true, data: apps });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch applications.' });
    }
};
