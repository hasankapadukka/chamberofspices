import db from '../db.js';

// ── Public: Get leadership ordered by display_order ──
export const getPublicLeadership = (req, res) => {
    try {
        const leaders = db.prepare('SELECT id, name, title, role, bio, image_url FROM leadership ORDER BY display_order ASC').all();
        res.json({ success: true, data: leaders });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch leadership.' });
    }
};

// ── Admin: Get all leadership ──
export const getAllLeadership = (req, res) => {
    try {
        const leaders = db.prepare('SELECT * FROM leadership ORDER BY display_order ASC').all();
        res.json({ success: true, data: leaders });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch leadership.' });
    }
};

// ── Admin: Create leadership entry ──
export const createLeader = (req, res) => {
    const { name, title, role, bio, image_url, display_order } = req.body;
    if (!name || !title) return res.status(400).json({ success: false, message: 'Name and title are required.' });

    try {
        const stmt = db.prepare('INSERT INTO leadership (name, title, role, bio, image_url, display_order) VALUES (?, ?, ?, ?, ?, ?)');
        const result = stmt.run(name, title, role || 'Board Member', bio || null, image_url || null, display_order || 0);
        res.status(201).json({ success: true, message: 'Leadership entry created.', id: result.lastInsertRowid });
    } catch (err) {
        console.error('Create leader error:', err);
        res.status(500).json({ success: false, message: 'Failed to create leadership entry.' });
    }
};

// ── Admin: Update leadership entry ──
export const updateLeader = (req, res) => {
    const { id } = req.params;
    const { name, title, role, bio, image_url, display_order } = req.body;

    try {
        const existing = db.prepare('SELECT * FROM leadership WHERE id = ?').get(id);
        if (!existing) return res.status(404).json({ success: false, message: 'Leadership entry not found.' });

        db.prepare('UPDATE leadership SET name = ?, title = ?, role = ?, bio = ?, image_url = ?, display_order = ? WHERE id = ?')
            .run(name || existing.name, title || existing.title, role || existing.role, bio ?? existing.bio, image_url ?? existing.image_url, display_order ?? existing.display_order, id);

        res.json({ success: true, message: 'Leadership entry updated.' });
    } catch (err) {
        console.error('Update leader error:', err);
        res.status(500).json({ success: false, message: 'Failed to update leadership entry.' });
    }
};

// ── Admin: Delete leadership entry ──
export const deleteLeader = (req, res) => {
    const { id } = req.params;
    try {
        const result = db.prepare('DELETE FROM leadership WHERE id = ?').run(id);
        if (result.changes === 0) return res.status(404).json({ success: false, message: 'Entry not found.' });
        res.json({ success: true, message: 'Leadership entry deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete leadership entry.' });
    }
};
