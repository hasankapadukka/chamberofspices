import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'data', 'chamber.db');

const db = new Database(dbPath);

const tables = ['membership_applications', 'news', 'events', 'leadership', 'contacts'];

tables.forEach(table => {
    try {
        const rows = db.prepare(`SELECT * FROM ${table}`).all();
        rows.forEach(row => {
            Object.values(row).forEach(val => {
                if (typeof val === 'string' && val.toLowerCase().includes('banana')) {
                     console.log(`FOUND IN ${table} [ID: ${row.id}]: ${val}`);
                }
            });
        });
    } catch (e) {}
});

db.close();
