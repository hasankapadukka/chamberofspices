import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'data', 'chamber.db');

const db = new Database(dbPath);

console.log('--- Syncing Data & Categories ---');

// 1. Update News Categories (Already mostly done, but ensuring consistency)
const newsUpdates = [
    { old: 'General', new: 'Industry Updates' }
];

// 2. Update Event Types to match prompt
const eventTypeUpdates = [
    { title: 'Annual Ceylon Spice Summit 2026', type: 'Annual Spice Forum' },
    { title: 'EU Market Access Workshop', type: 'Farmer Workshops' },
    { title: 'Global Spice Trade Roundtable', type: 'Trade Roundtables' }
];

// Apply News Category Updates
for (const update of newsUpdates) {
    db.prepare('UPDATE news SET category = ? WHERE category = ?').run(update.new, update.old);
}

// Apply Event Type Updates
const eventStmt = db.prepare('UPDATE events SET event_type = ? WHERE title = ?');
for (const update of eventTypeUpdates) {
    eventStmt.run(update.type, update.title);
}

// Add a new sample event for "International Delegations"
const delegationEvent = db.prepare('SELECT id FROM events WHERE event_type = ?').get('International Delegations');
if (!delegationEvent) {
    db.prepare('INSERT INTO events (title, description, event_date, event_time, location, event_type, registration_open) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .run('Vietnam Spice Delegation Visit', 'A high-level trade delegation from Vietnam visiting Sri Lanka for bilateral spice trade consultations.', '2026-10-05', '09:00', 'Colombo, Sri Lanka', 'International Delegations', 1);
    console.log('✅ Added International Delegations event');
}

console.log('✅ Synchronized News Categories and Event Types');

db.close();
console.log('--- Sync Done ---');
