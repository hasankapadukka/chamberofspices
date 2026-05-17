import db from '../db.js';

export const getPrices = (req, res) => {
    try {
        const prices = db.prepare('SELECT * FROM commodity_prices ORDER BY recorded_date DESC').all();
        res.json({ success: true, data: prices });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch prices.' });
    }
};

export const updatePrice = (req, res) => {
    const { spice_name, grade, price, unit } = req.body;
    if (!spice_name || !price || !unit) {
        return res.status(400).json({ success: false, message: 'Spice name, price and unit are required.' });
    }

    try {
        // We'll insert a new record for historical tracking
        const stmt = db.prepare('INSERT INTO commodity_prices (spice_name, grade, price, unit) VALUES (?, ?, ?, ?)');
        stmt.run(spice_name, grade || null, price, unit);
        res.json({ success: true, message: 'Price updated and archived.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update price.' });
    }
};

export const deletePrice = (req, res) => {
    const { id } = req.params;
    try {
        db.prepare('DELETE FROM commodity_prices WHERE id = ?').run(id);
        res.json({ success: true, message: 'Price record deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete record.' });
    }
};
