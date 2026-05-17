import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'data', 'chamber.db');

const db = new Database(dbPath);

const tables = ['news', 'events', 'leadership', 'membership_applications', 'members'];

tables.forEach(table => {
    try {
        const rows = db.prepare(`SELECT * FROM ${table}`).all();
        console.log(`--- Table: ${table} ---`);
        rows.forEach(row => {
            Object.keys(row).forEach(key => {
                if (key.includes('url') || key.includes('image') || key.includes('logo')) {
                    if (row[key] && row[key].includes('unsplash')) {
                         console.log(`[${row.id || 'N/A'}] ${key}: ${row[key]}`);
                    }
                }
            });
        });
    } catch (e) {
        // console.log(`Table ${table} not found or error.`);
    }
});

db.close();
