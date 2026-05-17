import db from '../db.js';

export const submitB2BInquiry = (req, res) => {
    const { member_id, sender_name, sender_email, subject, message } = req.body;
    if (!member_id || !sender_name || !sender_email || !message) {
        return res.status(400).json({ success: false, message: 'Required fields missing.' });
    }

    try {
        const stmt = db.prepare('INSERT INTO b2b_inquiries (member_id, sender_name, sender_email, subject, message) VALUES (?, ?, ?, ?, ?)');
        stmt.run(member_id, sender_name, sender_email, subject || 'B2B Inquiry', message);
        res.json({ success: true, message: 'Inquiry sent to Member portal.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to send inquiry.' });
    }
};

export const getMemberInquiries = (req, res) => {
    const memberId = req.member.id; // From memberAuthMiddleware
    try {
        const inquiries = db.prepare('SELECT * FROM b2b_inquiries WHERE member_id = ? ORDER BY created_at DESC').all(memberId);
        res.json({ success: true, data: inquiries });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch inquiries.' });
    }
};

export const updateB2BStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        db.prepare('UPDATE b2b_inquiries SET status = ? WHERE id = ?').run(status, id);
        res.json({ success: true, message: 'Status updated.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update status.' });
    }
};
