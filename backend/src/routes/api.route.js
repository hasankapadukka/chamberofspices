import { Router } from 'express';
import { submitContact, getContacts } from '../controllers/contact.controller.js';
import { submitApplication, getApplications } from '../controllers/membership.controller.js';
import { registerForEvent, getRegistrations } from '../controllers/events.controller.js';
import { subscribe } from '../controllers/newsletter.controller.js';

const router = Router();

// Contact
router.post('/contact', submitContact);
router.get('/contact', getContacts);

// Membership
router.post('/membership', submitApplication);
router.get('/membership', getApplications);

// Events
router.post('/events/register', registerForEvent);
router.get('/events/registrations', getRegistrations);

// Newsletter
router.post('/newsletter', subscribe);

export default router;
