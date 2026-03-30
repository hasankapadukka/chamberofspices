import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';

// Auth
import { login, getMe } from '../controllers/auth.controller.js';

// Public form submissions
import { submitContact, getContacts } from '../controllers/contact.controller.js';
import { submitApplication, getApplications } from '../controllers/membership.controller.js';
import { registerForEvent, getRegistrations } from '../controllers/events.controller.js';
import { subscribe } from '../controllers/newsletter.controller.js';

// Public content
import { getPublicNews } from '../controllers/news.controller.js';
import { getPublicEvents } from '../controllers/events-admin.controller.js';
import { getPublicResources } from '../controllers/resources.controller.js';
import { getPublicLeadership } from '../controllers/leadership.controller.js';

// Admin content CRUD
import { getAllNews, createNews, updateNews, deleteNews } from '../controllers/news.controller.js';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '../controllers/events-admin.controller.js';
import { getAllResources, createResource, updateResource, deleteResource } from '../controllers/resources.controller.js';
import { getAllLeadership, createLeader, updateLeader, deleteLeader } from '../controllers/leadership.controller.js';

// Admin dashboard
import { getDashboard, updateContactStatus, updateMembershipStatus, getSubscribers } from '../controllers/dashboard.controller.js';

const router = Router();

// ════════════════════════════════════════════
//  PUBLIC ROUTES (no auth needed)
// ════════════════════════════════════════════

// Auth
router.post('/auth/login', login);

// Form submissions
router.post('/contact', submitContact);
router.post('/membership', submitApplication);
router.post('/events/register', registerForEvent);
router.post('/newsletter', subscribe);

// Public content (read-only)
router.get('/news', getPublicNews);
router.get('/events', getPublicEvents);
router.get('/resources', getPublicResources);
router.get('/leadership', getPublicLeadership);

// ════════════════════════════════════════════
//  ADMIN ROUTES (JWT required)
// ════════════════════════════════════════════
router.use('/admin', authMiddleware);

// Admin profile
router.get('/admin/me', getMe);

// Dashboard
router.get('/admin/dashboard', getDashboard);

// Submissions management
router.get('/admin/contacts', getContacts);
router.put('/admin/contacts/:id/status', updateContactStatus);

router.get('/admin/membership', getApplications);
router.put('/admin/membership/:id/status', updateMembershipStatus);

router.get('/admin/registrations', getRegistrations);

router.get('/admin/subscribers', getSubscribers);

// News CRUD
router.get('/admin/news', getAllNews);
router.post('/admin/news', createNews);
router.put('/admin/news/:id', updateNews);
router.delete('/admin/news/:id', deleteNews);

// Events CRUD
router.get('/admin/events', getAllEvents);
router.post('/admin/events', createEvent);
router.put('/admin/events/:id', updateEvent);
router.delete('/admin/events/:id', deleteEvent);

// Resources CRUD
router.get('/admin/resources', getAllResources);
router.post('/admin/resources', createResource);
router.put('/admin/resources/:id', updateResource);
router.delete('/admin/resources/:id', deleteResource);

// Leadership CRUD
router.get('/admin/leadership', getAllLeadership);
router.post('/admin/leadership', createLeader);
router.put('/admin/leadership/:id', updateLeader);
router.delete('/admin/leadership/:id', deleteLeader);

export default router;
