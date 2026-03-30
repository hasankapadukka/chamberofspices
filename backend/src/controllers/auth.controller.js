import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../middleware/auth.js';

export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    try {
        const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email);

        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const isMatch = bcrypt.compareSync(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login successful.',
            token,
            admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
    }
};

export const getMe = (req, res) => {
    try {
        const admin = db.prepare('SELECT id, name, email, role, created_at FROM admins WHERE id = ?').get(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found.' });
        }
        res.json({ success: true, data: admin });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch profile.' });
    }
};
