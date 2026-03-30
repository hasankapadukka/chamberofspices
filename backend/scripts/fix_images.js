import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'data', 'chamber.db');

const db = new Database(dbPath);

console.log('--- Fixing News Images ---');

const updates = [
    {
        title: 'Record Highs for Ceylon Cinnamon Exports in Q1',
        image_url: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=2080&auto=format&fit=crop'
    },
    {
        title: '2025 Annual Sustainability and Carbon-Footprint Report',
        image_url: '/images/clove_drying.png'
    }
];

const stmt = db.prepare('UPDATE news SET image_url = ? WHERE title = ?');

for (const update of updates) {
    const result = stmt.run(update.image_url, update.title);
    if (result.changes > 0) {
        console.log(`✅ Updated: ${update.title}`);
    } else {
        console.log(`❌ Not found: ${update.title}`);
    }
}

db.close();
console.log('--- Done ---');
