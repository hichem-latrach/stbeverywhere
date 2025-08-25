import { Response } from 'express';
import { AccountService } from '@/services/accountService';
import { AuthenticatedRequest } from '@/types';
import { createError } from '@/middlewares/errorHandler';

export class AccountController {
  static async getAccounts(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const accounts = await AccountService.getAccounts(req.user.id);
    
    res.json({
      success: true,
      message: 'Accounts retrieved successfully',
      data: accounts
    });
  }

  static async getAccountById(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { id } = req.params;
    const account = await AccountService.getAccountById(parseInt(id), req.user.id);
    
    res.json({
      success: true,
      message: 'Account retrieved successfully',
      data: account
    });
  }

  static async getAccountBalance(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { id } = req.params;
    const balance = await AccountService.getAccountBalance(parseInt(id), req.user.id);
    
    res.json({
      success: true,
      message: 'Account balance retrieved successfully',
      data: { balance }
    });
  }

  static async requestStatement(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { id } = req.params;
    const { startDate, endDate, format = 'pdf' } = req.body;
    
    const statement = await AccountService.generateStatement(
      parseInt(id), 
      req.user.id, 
      startDate, 
      endDate, 
      format
    );
    
    res.json({
      success: true,
      message: 'Account statement generated successfully',
      data: statement
    });
  }
}