import { Router } from 'express';
import { ContactController } from '@/controllers/contactController';
import { authenticateToken, requireAdmin } from '@/middlewares/auth';
import { asyncHandler } from '@/middlewares/errorHandler';

const router = Router();

// Public contact form
router.post('/', asyncHandler(ContactController.createInquiry));

// Admin routes for managing contact inquiries
router.use(authenticateToken);
router.use(requireAdmin);

router.get('/', asyncHandler(ContactController.getInquiries));
router.get('/:id', asyncHandler(ContactController.getInquiryById));
router.put('/:id/status', asyncHandler(ContactController.updateInquiryStatus));
router.post('/:id/reply', asyncHandler(ContactController.replyToInquiry));

export default router;