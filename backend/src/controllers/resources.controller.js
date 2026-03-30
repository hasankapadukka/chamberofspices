import db from '../db.js';

// ── Public: Get all resources ──
export const getPublicResources = (req, res) => {
    try {
        const resources = db.prepare('SELECT id, title, type, size, is_public FROM resources ORDER BY created_at DESC').all();
        res.json({ success: true, data: resources });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch resources.' });
    }
};

// ── Admin: Get all resources ──
export const getAllResources = (req, res) => {
    try {
        const resources = db.prepare('SELECT * FROM resources ORDER BY created_at DESC').all();
        res.json({ success: true, data: resources });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch resources.' });
    }
};

// ── Admin: Create resource ──
export const createResource = (req, res) => {
    const { title, type, size, file_url, is_public } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required.' });

    try {
        const stmt = db.prepare('INSERT INTO resources (title, type, size, file_url, is_public) VALUES (?, ?, ?, ?, ?)');
        const result = stmt.run(title, type || 'Document', size || null, file_url || null, is_public !== undefined ? (is_public ? 1 : 0) : 1);
        res.status(201).json({ success: true, message: 'Resource created.', id: result.lastInsertRowid });
    } catch (err) {
        console.error('Create resource error:', err);
        res.status(500).json({ success: false, message: 'Failed to create resource.' });
    }
};

// ── Admin: Update resource ──
export const updateResource = (req, res) => {
    const { id } = req.params;
    const { title, type, size, file_url, is_public } = req.body;

    try {
        const existing = db.prepare('SELECT * FROM resources WHERE id = ?').get(id);
        if (!existing) return res.status(404).json({ success: false, message: 'Resource not found.' });

        db.prepare('UPDATE resources SET title = ?, type = ?, size = ?, file_url = ?, is_public = ? WHERE id = ?')
            .run(title || existing.title, type || existing.type, size ?? existing.size, file_url ?? existing.file_url, is_public !== undefined ? (is_public ? 1 : 0) : existing.is_public, id);

        res.json({ success: true, message: 'Resource updated.' });
    } catch (err) {
        console.error('Update resource error:', err);
        res.status(500).json({ success: false, message: 'Failed to update resource.' });
    }
};

// ── Admin: Delete resource ──
export const deleteResource = (req, res) => {
    const { id } = req.params;
    try {
        const result = db.prepare('DELETE FROM resources WHERE id = ?').run(id);
        if (result.changes === 0) return res.status(404).json({ success: false, message: 'Resource not found.' });
        res.json({ success: true, message: 'Resource deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete resource.' });
    }
};
