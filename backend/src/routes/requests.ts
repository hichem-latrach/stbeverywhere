import { Router } from 'express';
import { RequestController } from '@/controllers/requestController';
import { authenticateToken, requireClient } from '@/middlewares/auth';
import { asyncHandler } from '@/middlewares/errorHandler';

const router = Router();

// All routes require authentication
router.use(authenticateToken);
router.use(requireClient);

// Checkbook requests
router.post('/checkbook', asyncHandler(RequestController.createCheckbookRequest));
router.get('/checkbook', asyncHandler(RequestController.getCheckbookRequests));
router.put('/checkbook/:id', asyncHandler(RequestController.updateCheckbookRequest));
router.delete('/checkbook/:id', asyncHandler(RequestController.deleteCheckbookRequest));

// Credit card requests
router.post('/credit-card', asyncHandler(RequestController.createCreditCardRequest));
router.get('/credit-card', asyncHandler(RequestController.getCreditCardRequests));
router.put('/credit-card/:id', asyncHandler(RequestController.updateCreditCardRequest));
router.delete('/credit-card/:id', asyncHandler(RequestController.deleteCreditCardRequest));

// Account opening requests
router.post('/account', asyncHandler(RequestController.createAccountRequest));
router.get('/account', asyncHandler(RequestController.getAccountRequests));

// TF Bank account requests
router.post('/tf-bank', asyncHandler(RequestController.createTfBankRequest));
router.get('/tf-bank', asyncHandler(RequestController.getTfBankRequests));

export default router;