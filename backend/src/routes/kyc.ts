import { Router } from 'express';
import { KycController } from '@/controllers/kycController';
import { authenticateToken, requireClient } from '@/middlewares/auth';
import { asyncHandler } from '@/middlewares/errorHandler';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// KYC information
router.get('/', requireClient, asyncHandler(KycController.getKycInfo));
router.put('/', requireClient, asyncHandler(KycController.updateKycInfo));

// KYC modification requests
router.post('/modification-request', requireClient, asyncHandler(KycController.createModificationRequest));
router.get('/modification-requests', requireClient, asyncHandler(KycController.getModificationRequests));

export default router;