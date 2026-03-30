import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'data', 'chamber.db');

const db = new Database(dbPath);

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ── Schema ──
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    organization TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    inquiry_type TEXT NOT NULL DEFAULT 'General Inquiry',
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS membership_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    organization TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    membership_type TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS event_registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER,
    event_title TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    organization TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    subscribed INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    summary TEXT,
    content TEXT,
    image_url TEXT,
    published INTEGER NOT NULL DEFAULT 0,
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    event_date TEXT NOT NULL,
    event_time TEXT,
    location TEXT,
    event_type TEXT NOT NULL DEFAULT 'Conference',
    image_url TEXT,
    registration_open INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Document',
    size TEXT,
    file_url TEXT,
    is_public INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS leadership (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Board Member',
    bio TEXT,
    image_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// ── Seed default admin (only if none exist) ──
const adminCount = db.prepare('SELECT COUNT(*) as count FROM admins').get();
if (adminCount.count === 0) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)').run(
    'Administrator', 'admin@chamberofspices.org', hashedPassword, 'super_admin'
  );
  console.log('✅ Default admin created: admin@chamberofspices.org / admin123');
}

// ── Seed sample news (only if none exist) ──
const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get();
if (newsCount.count === 0) {
  const sampleNews = [
    { title: 'Record Highs for Ceylon Cinnamon Exports in Q1', category: 'Industry Updates', summary: 'Sri Lanka\'s cinnamon exports reached historic levels in the first quarter of 2026.', image_url: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=2080&auto=format&fit=crop', published: 1, published_at: '2026-03-15' },
    { title: 'New Subsidy Framework for Organic Certification', category: 'Policy Announcements', summary: 'The government has announced a new framework to subsidize organic certification for small-scale spice farmers.', image_url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=2070&auto=format&fit=crop', published: 1, published_at: '2026-03-10' },
    { title: 'European Demand Surges for Traceable Black Pepper', category: 'Global Market Trends', summary: 'European buyers are increasingly demanding full traceability in black pepper supply chains.', image_url: 'https://images.unsplash.com/photo-1599909533601-aa539e3e4163?q=80&w=2070&auto=format&fit=crop', published: 1, published_at: '2026-03-05' },
    { title: '2025 Annual Sustainability and Carbon-Footprint Report', category: 'Sustainability Reports', summary: 'Our annual report highlights significant progress in reducing the carbon footprint of the spice industry.', image_url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop', published: 1, published_at: '2026-02-28' }
  ];
  const stmt = db.prepare('INSERT INTO news (title, category, summary, image_url, published, published_at) VALUES (?, ?, ?, ?, ?, ?)');
  for (const n of sampleNews) {
    stmt.run(n.title, n.category, n.summary, n.image_url, n.published, n.published_at);
  }
  console.log('✅ Sample news articles seeded');
}

// ── Seed sample events (only if none exist) ──
const eventsCount = db.prepare('SELECT COUNT(*) as count FROM events').get();
if (eventsCount.count === 0) {
  const sampleEvents = [
    { title: 'Annual Ceylon Spice Summit 2026', description: 'The flagship conference for industry leaders to discuss the future of the Sri Lankan spice sector.', event_date: '2026-06-15', event_time: '09:00', location: 'Colombo, Sri Lanka', event_type: 'Conference' },
    { title: 'EU Market Access Workshop', description: 'A practical workshop on understanding European compliance requirements for spice exporters.', event_date: '2026-07-20', event_time: '10:00', location: 'Kandy, Sri Lanka', event_type: 'Workshop' },
    { title: 'Global Spice Trade Roundtable', description: 'A roundtable with international buyers and trade organizations to forge new partnerships.', event_date: '2026-09-10', event_time: '14:00', location: 'Virtual', event_type: 'Roundtable' }
  ];
  const stmt = db.prepare('INSERT INTO events (title, description, event_date, event_time, location, event_type) VALUES (?, ?, ?, ?, ?, ?)');
  for (const e of sampleEvents) {
    stmt.run(e.title, e.description, e.event_date, e.event_time, e.location, e.event_type);
  }
  console.log('✅ Sample events seeded');
}

// ── Seed sample resources (only if none exist) ──
const resourcesCount = db.prepare('SELECT COUNT(*) as count FROM resources').get();
if (resourcesCount.count === 0) {
  const sampleResources = [
    { title: 'National Spice Export Guidelines 2026', type: 'PDF Document', size: '2.4 MB', is_public: 1 },
    { title: 'EU Market Compliance Framework for Cinnamon', type: 'Technical Guide', size: '1.8 MB', is_public: 1 },
    { title: 'Traceability System Implementation Manual', type: 'Toolkit', size: '5.1 MB', is_public: 1 },
    { title: 'Q1 Global Market Pricing Index', type: 'Market Data', size: '800 KB', is_public: 0 },
    { title: 'Bilateral Trade Agreement Tariffs Database', type: 'Database Extract', size: '3.2 MB', is_public: 0 }
  ];
  const stmt = db.prepare('INSERT INTO resources (title, type, size, is_public) VALUES (?, ?, ?, ?)');
  for (const r of sampleResources) {
    stmt.run(r.title, r.type, r.size, r.is_public);
  }
  console.log('✅ Sample resources seeded');
}

// ── Seed leadership (only if none exist) ──
const leadershipCount = db.prepare('SELECT COUNT(*) as count FROM leadership').get();
if (leadershipCount.count === 0) {
  const leaders = [
    { name: 'Mr. Anushka Vidanapathirana', title: 'Chairman', role: 'Executive Committee', bio: 'Leads the strategic vision of the Chamber with over 20 years of experience in the spice industry.', display_order: 1 },
    { name: 'Ms. Dilini Perera', title: 'Vice Chairperson', role: 'Executive Committee', bio: 'Oversees sustainability programs and international trade partnerships.', display_order: 2 },
    { name: 'Mr. Ruwan de Silva', title: 'Secretary General', role: 'Executive Committee', bio: 'Manages daily operations and coordinates between all stakeholder communities.', display_order: 3 },
    { name: 'Dr. Kasun Fernando', title: 'Head of Research', role: 'Advisory Council', bio: 'Leads the research and innovation programs across the spice sector.', display_order: 4 }
  ];
  const stmt = db.prepare('INSERT INTO leadership (name, title, role, bio, display_order) VALUES (?, ?, ?, ?, ?)');
  for (const l of leaders) {
    stmt.run(l.name, l.title, l.role, l.bio, l.display_order);
  }
  console.log('✅ Sample leadership data seeded');
}

export default db;
