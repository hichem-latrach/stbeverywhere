import { Response } from 'express';
import { TransactionService } from '@/services/transactionService';
import { AuthenticatedRequest } from '@/types';
import { paginationSchema } from '@/utils/validation';
import { createError } from '@/middlewares/errorHandler';

export class TransactionController {
  static async getTransactions(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const query = paginationSchema.parse(req.query);
    const result = await TransactionService.getTransactions(req.user.id, query);
    
    res.json({
      success: true,
      message: 'Transactions retrieved successfully',
      data: result.data,
      pagination: result.pagination
    });
  }

  static async getTransactionById(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { id } = req.params;
    const transaction = await TransactionService.getTransactionById(parseInt(id), req.user.id);
    
    res.json({
      success: true,
      message: 'Transaction retrieved successfully',
      data: transaction
    });
  }

  static async getTransactionsByAccount(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { accountId } = req.params;
    const query = paginationSchema.parse(req.query);
    
    const result = await TransactionService.getTransactionsByAccount(
      parseInt(accountId), 
      req.user.id, 
      query
    );
    
    res.json({
      success: true,
      message: 'Account transactions retrieved successfully',
      data: result.data,
      pagination: result.pagination
    });
  }
}