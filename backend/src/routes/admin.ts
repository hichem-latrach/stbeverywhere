import { Router } from 'express';
import { AdminController } from '@/controllers/adminController';
import { authenticateToken, requireAdmin } from '@/middlewares/auth';
import { asyncHandler } from '@/middlewares/errorHandler';

const router = Router();

// All routes require admin authentication
router.use(authenticateToken);
router.use(requireAdmin);

// User management
router.get('/users', asyncHandler(AdminController.getUsers));
router.get('/users/:id', asyncHandler(AdminController.getUserById));
router.put('/users/:id/status', asyncHandler(AdminController.updateUserStatus));
router.delete('/users/:id', asyncHandler(AdminController.deleteUser));

// Request management
router.get('/requests', asyncHandler(AdminController.getAllRequests));
router.get('/requests/:type', asyncHandler(AdminController.getRequestsByType));
router.put('/requests/:id/status', asyncHandler(AdminController.updateRequestStatus));
router.delete('/requests/:id', asyncHandler(AdminController.deleteRequest));

// KYC modification requests
router.get('/kyc-modifications', asyncHandler(AdminController.getKycModifications));
router.put('/kyc-modifications/:id', asyncHandler(AdminController.processKycModification));

// System settings
router.get('/settings', asyncHandler(AdminController.getSettings));
router.put('/settings', asyncHandler(AdminController.updateSettings));

// Dashboard statistics
router.get('/dashboard/stats', asyncHandler(AdminController.getDashboardStats));

export default router;