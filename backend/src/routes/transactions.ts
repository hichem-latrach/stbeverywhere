import { Router } from 'express';
import { TransactionController } from '@/controllers/transactionController';
import { authenticateToken, requireClient } from '@/middlewares/auth';
import { asyncHandler } from '@/middlewares/errorHandler';

const router = Router();

// All routes require authentication
router.use(authenticateToken);
router.use(requireClient);

// Transaction management
router.get('/', asyncHandler(TransactionController.getTransactions));
router.get('/:id', asyncHandler(TransactionController.getTransactionById));
router.get('/account/:accountId', asyncHandler(TransactionController.getTransactionsByAccount));

export default router;