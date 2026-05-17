import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { memberAuthMiddleware } from '../middleware/memberAuth.js';

// Auth
import { login, getMe } from '../controllers/auth.controller.js';
import { memberLogin, updateProfile } from '../controllers/memberAuth.controller.js';

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
import { getPublicMembers } from '../controllers/directory.controller.js';

// Admin content CRUD
import { getAllNews, createNews, updateNews, deleteNews } from '../controllers/news.controller.js';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '../controllers/events-admin.controller.js';
import { getAllResources, createResource, updateResource, deleteResource, getMemberResources } from '../controllers/resources.controller.js';
import { getAllLeadership, createLeader, updateLeader, deleteLeader } from '../controllers/leadership.controller.js';

// Admin dashboard
import { getDashboard, updateContactStatus, updateMembershipStatus, getSubscribers } from '../controllers/dashboard.controller.js';
import { getPrices, updatePrice, deletePrice } from '../controllers/commodity.controller.js';
import { submitB2BInquiry, getMemberInquiries, updateB2BStatus } from '../controllers/b2b.controller.js';

const router = Router();

// ════════════════════════════════════════════
//  PUBLIC ROUTES (no auth needed)
// ════════════════════════════════════════════

// Auth
router.post('/auth/login', login);
router.post('/auth/member/login', memberLogin);

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
router.get('/members/directory', getPublicMembers);
router.get('/prices', getPrices);
router.post('/b2b/inquire', submitB2BInquiry);
router.get('/members/resources', memberAuthMiddleware, getMemberResources);

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

// Admin: Prices
router.get('/admin/prices', getPrices);
router.post('/admin/prices', updatePrice);
router.delete('/admin/prices/:id', deletePrice);

// Member Portal Routes
router.use('/member', memberAuthMiddleware);
router.get('/member/dashboard', (req, res) => res.json({ success: true, member: req.member }));
router.put('/member/profile', updateProfile);
router.get('/member/inquiries', getMemberInquiries);
router.get('/member/resources', getMemberResources);
router.put('/member/inquiries/:id/status', updateB2BStatus);

export default router;
