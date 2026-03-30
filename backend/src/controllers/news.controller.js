import db from '../db.js';

// ── Public: Get published news ──
export const getPublicNews = (req, res) => {
    try {
        const news = db.prepare('SELECT id, title, category, summary, image_url, published_at FROM news WHERE published = 1 ORDER BY published_at DESC').all();
        res.json({ success: true, data: news });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch news.' });
    }
};

// ── Admin: Get all news ──
export const getAllNews = (req, res) => {
    try {
        const news = db.prepare('SELECT * FROM news ORDER BY created_at DESC').all();
        res.json({ success: true, data: news });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch news.' });
    }
};

// ── Admin: Create news article ──
export const createNews = (req, res) => {
    const { title, category, summary, content, image_url, published } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required.' });

    try {
        const stmt = db.prepare('INSERT INTO news (title, category, summary, content, image_url, published, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
        const result = stmt.run(title, category || 'General', summary || null, content || null, image_url || null, published ? 1 : 0, published ? new Date().toISOString() : null);
        res.status(201).json({ success: true, message: 'News article created.', id: result.lastInsertRowid });
    } catch (err) {
        console.error('Create news error:', err);
        res.status(500).json({ success: false, message: 'Failed to create news article.' });
    }
};

// ── Admin: Update news article ──
export const updateNews = (req, res) => {
    const { id } = req.params;
    const { title, category, summary, content, image_url, published } = req.body;

    try {
        const existing = db.prepare('SELECT * FROM news WHERE id = ?').get(id);
        if (!existing) return res.status(404).json({ success: false, message: 'Article not found.' });

        const publishedAt = published && !existing.published ? new Date().toISOString() : existing.published_at;

        db.prepare('UPDATE news SET title = ?, category = ?, summary = ?, content = ?, image_url = ?, published = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
            .run(title || existing.title, category || existing.category, summary ?? existing.summary, content ?? existing.content, image_url ?? existing.image_url, published !== undefined ? (published ? 1 : 0) : existing.published, publishedAt, id);

        res.json({ success: true, message: 'News article updated.' });
    } catch (err) {
        console.error('Update news error:', err);
        res.status(500).json({ success: false, message: 'Failed to update news article.' });
    }
};

// ── Admin: Delete news article ──
export const deleteNews = (req, res) => {
    const { id } = req.params;
    try {
        const result = db.prepare('DELETE FROM news WHERE id = ?').run(id);
        if (result.changes === 0) return res.status(404).json({ success: false, message: 'Article not found.' });
        res.json({ success: true, message: 'News article deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete news article.' });
    }
};
