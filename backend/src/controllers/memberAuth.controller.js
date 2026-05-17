import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../middleware/auth.js';

export const memberLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    try {
        const member = db.prepare('SELECT * FROM membership_applications WHERE email = ? AND status = ?').get(email, 'approved');

        if (!member) {
            return res.status(401).json({ success: false, message: 'Invalid email or account not approved.' });
        }

        if (!member.password) {
            return res.status(401).json({ success: false, message: 'Password not set. Please contact the administrator.' });
        }

        const isMatch = bcrypt.compareSync(password, member.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { id: member.id, email: member.email, name: member.full_name, type: 'member', member_id: member.member_id },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login successful.',
            token,
            member: { 
                id: member.id, 
                name: member.full_name, 
                email: member.email, 
                organization: member.organization,
                member_id: member.member_id,
                logo_url: member.logo_url,
                business_address: member.business_address,
                description: member.description,
                membership_type: member.membership_type
            }
        });
    } catch (err) {
        console.error('Member Login error:', err);
        res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
    }
};

export const updateProfile = (req, res) => {
    const memberId = req.member.id;
    const { organization, business_address, description, logo_url } = req.body;

    try {
        db.prepare('UPDATE membership_applications SET organization = ?, business_address = ?, description = ?, logo_url = ? WHERE id = ?')
          .run(organization, business_address, description, logo_url, memberId);
        res.json({ success: true, message: 'Profile updated successfully.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update profile.' });
    }
};
