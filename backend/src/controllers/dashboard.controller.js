import db from '../db.js';

export const getDashboard = (req, res) => {
    try {
        const contacts = db.prepare('SELECT COUNT(*) as total FROM contacts').get();
        const newContacts = db.prepare("SELECT COUNT(*) as total FROM contacts WHERE status = 'new'").get();
        const members = db.prepare('SELECT COUNT(*) as total FROM membership_applications').get();
        const pendingMembers = db.prepare("SELECT COUNT(*) as total FROM membership_applications WHERE status = 'pending'").get();
        const registrations = db.prepare('SELECT COUNT(*) as total FROM event_registrations').get();
        const subscribers = db.prepare('SELECT COUNT(*) as total FROM newsletter_subscribers').get();
        const newsCount = db.prepare('SELECT COUNT(*) as total FROM news').get();
        const eventsCount = db.prepare('SELECT COUNT(*) as total FROM events').get();

        // Recent submissions (last 10)
        const recentContacts = db.prepare('SELECT id, full_name, email, inquiry_type, status, created_at FROM contacts ORDER BY created_at DESC LIMIT 10').all();
        const recentMembers = db.prepare('SELECT id, full_name, organization, membership_type, status, created_at FROM membership_applications ORDER BY created_at DESC LIMIT 10').all();

        res.json({
            success: true,
            data: {
                stats: {
                    total_contacts: contacts.total,
                    new_contacts: newContacts.total,
                    total_members: members.total,
                    pending_members: pendingMembers.total,
                    total_registrations: registrations.total,
                    total_subscribers: subscribers.total,
                    total_news: newsCount.total,
                    total_events: eventsCount.total
                },
                recent: {
                    contacts: recentContacts,
                    members: recentMembers
                }
            }
        });
    } catch (err) {
        console.error('Dashboard error:', err);
        res.status(500).json({ success: false, message: 'Failed to load dashboard.' });
    }
};

// ── Admin: Update contact status ──
export const updateContactStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, message: 'Status is required.' });

    try {
        const result = db.prepare('UPDATE contacts SET status = ? WHERE id = ?').run(status, id);
        if (result.changes === 0) return res.status(404).json({ success: false, message: 'Contact not found.' });
        res.json({ success: true, message: 'Contact status updated.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update status.' });
    }
};

// ── Admin: Update membership status ──
export const updateMembershipStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, message: 'Status is required.' });

    try {
        const result = db.prepare('UPDATE membership_applications SET status = ? WHERE id = ?').run(status, id);
        if (result.changes === 0) return res.status(404).json({ success: false, message: 'Application not found.' });
        res.json({ success: true, message: 'Application status updated.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update status.' });
    }
};

// ── Admin: Get newsletter subscribers ──
export const getSubscribers = (req, res) => {
    try {
        const subscribers = db.prepare('SELECT * FROM newsletter_subscribers ORDER BY created_at DESC').all();
        res.json({ success: true, data: subscribers });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch subscribers.' });
    }
};
