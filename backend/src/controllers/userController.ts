import { Response } from 'express';
import { UserService } from '@/services/userService';
import { AuthenticatedRequest } from '@/types';
import { createError } from '@/middlewares/errorHandler';

export class UserController {
  static async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const profile = await UserService.getProfile(req.user.id);
    
    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: profile
    });
  }

  static async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const updatedProfile = await UserService.updateProfile(req.user.id, req.body);
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile
    });
  }

  static async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      throw createError('Current password and new password are required', 400);
    }

    await UserService.changePassword(req.user.id, currentPassword, newPassword);
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  }

  static async getUserRequests(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const requests = await UserService.getUserRequests(req.user.id);
    
    res.json({
      success: true,
      message: 'Requests retrieved successfully',
      data: requests
    });
  }

  static async getUserTransactions(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { page = 1, limit = 10 } = req.query;
    const transactions = await UserService.getUserTransactions(
      req.user.id, 
      parseInt(page as string), 
      parseInt(limit as string)
    );
    
    res.json({
      success: true,
      message: 'Transactions retrieved successfully',
      data: transactions.data,
      pagination: transactions.pagination
    });
  }

  static async getUserAccounts(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const accounts = await UserService.getUserAccounts(req.user.id);
    
    res.json({
      success: true,
      message: 'Accounts retrieved successfully',
      data: accounts
    });
  }
}