import { Router } from 'express';
import { AccountController } from '@/controllers/accountController';
import { authenticateToken, requireClient } from '@/middlewares/auth';
import { asyncHandler } from '@/middlewares/errorHandler';

const router = Router();

// All routes require authentication
router.use(authenticateToken);
router.use(requireClient);

// Account management
router.get('/', asyncHandler(AccountController.getAccounts));
router.get('/:id', asyncHandler(AccountController.getAccountById));
router.get('/:id/balance', asyncHandler(AccountController.getAccountBalance));
router.post('/:id/statement', asyncHandler(AccountController.requestStatement));

export default router;