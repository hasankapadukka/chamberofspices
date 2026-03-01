import db from '../db.js';

export const subscribe = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    try {
        const stmt = db.prepare('INSERT OR IGNORE INTO newsletter_subscribers (email) VALUES (?)');
        const result = stmt.run(email);
        if (result.changes === 0) {
            return res.json({ success: true, message: 'You are already subscribed!' });
        }
        res.status(201).json({ success: true, message: 'Successfully subscribed to our newsletter!' });
    } catch (err) {
        console.error('Newsletter subscription error:', err);
        res.status(500).json({ success: false, message: 'Failed to subscribe. Please try again.' });
    }
};
