import db from '../db.js';

// ── Public: Get all events ──
export const getPublicEvents = (req, res) => {
    try {
        const events = db.prepare('SELECT id, title, description, event_date, event_time, location, event_type, image_url, registration_open FROM events ORDER BY event_date ASC').all();
        res.json({ success: true, data: events });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch events.' });
    }
};

// ── Admin: Get all events with registration counts ──
export const getAllEvents = (req, res) => {
    try {
        const events = db.prepare(`
      SELECT e.*, COUNT(r.id) as registration_count
      FROM events e LEFT JOIN event_registrations r ON r.event_id = e.id
      GROUP BY e.id ORDER BY e.event_date DESC
    `).all();
        res.json({ success: true, data: events });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch events.' });
    }
};

// ── Admin: Create event ──
export const createEvent = (req, res) => {
    const { title, description, event_date, event_time, location, event_type, image_url, registration_open } = req.body;
    if (!title || !event_date) return res.status(400).json({ success: false, message: 'Title and date are required.' });

    try {
        const stmt = db.prepare('INSERT INTO events (title, description, event_date, event_time, location, event_type, image_url, registration_open) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        const result = stmt.run(title, description || null, event_date, event_time || null, location || null, event_type || 'Conference', image_url || null, registration_open !== undefined ? (registration_open ? 1 : 0) : 1);
        res.status(201).json({ success: true, message: 'Event created.', id: result.lastInsertRowid });
    } catch (err) {
        console.error('Create event error:', err);
        res.status(500).json({ success: false, message: 'Failed to create event.' });
    }
};

// ── Admin: Update event ──
export const updateEvent = (req, res) => {
    const { id } = req.params;
    const { title, description, event_date, event_time, location, event_type, image_url, registration_open } = req.body;

    try {
        const existing = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
        if (!existing) return res.status(404).json({ success: false, message: 'Event not found.' });

        db.prepare('UPDATE events SET title = ?, description = ?, event_date = ?, event_time = ?, location = ?, event_type = ?, image_url = ?, registration_open = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
            .run(title || existing.title, description ?? existing.description, event_date || existing.event_date, event_time ?? existing.event_time, location ?? existing.location, event_type || existing.event_type, image_url ?? existing.image_url, registration_open !== undefined ? (registration_open ? 1 : 0) : existing.registration_open, id);

        res.json({ success: true, message: 'Event updated.' });
    } catch (err) {
        console.error('Update event error:', err);
        res.status(500).json({ success: false, message: 'Failed to update event.' });
    }
};

// ── Admin: Delete event ──
export const deleteEvent = (req, res) => {
    const { id } = req.params;
    try {
        const result = db.prepare('DELETE FROM events WHERE id = ?').run(id);
        if (result.changes === 0) return res.status(404).json({ success: false, message: 'Event not found.' });
        res.json({ success: true, message: 'Event deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete event.' });
    }
};
