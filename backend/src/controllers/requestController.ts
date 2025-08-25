import { Response } from 'express';
import { RequestService } from '@/services/requestService';
import { AuthenticatedRequest } from '@/types';
import { checkbookRequestSchema, creditCardRequestSchema } from '@/utils/validation';
import { createError } from '@/middlewares/errorHandler';

export class RequestController {
  // Checkbook requests
  static async createCheckbookRequest(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const validatedData = checkbookRequestSchema.parse(req.body);
    const request = await RequestService.createCheckbookRequest(req.user.id, validatedData);
    
    res.status(201).json({
      success: true,
      message: 'Checkbook request created successfully',
      data: request
    });
  }

  static async getCheckbookRequests(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const requests = await RequestService.getCheckbookRequests(req.user.id);
    
    res.json({
      success: true,
      message: 'Checkbook requests retrieved successfully',
      data: requests
    });
  }

  static async updateCheckbookRequest(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { id } = req.params;
    const validatedData = checkbookRequestSchema.parse(req.body);
    
    const request = await RequestService.updateCheckbookRequest(
      parseInt(id), 
      req.user.id, 
      validatedData
    );
    
    res.json({
      success: true,
      message: 'Checkbook request updated successfully',
      data: request
    });
  }

  static async deleteCheckbookRequest(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { id } = req.params;
    await RequestService.deleteCheckbookRequest(parseInt(id), req.user.id);
    
    res.json({
      success: true,
      message: 'Checkbook request deleted successfully'
    });
  }

  // Credit card requests
  static async createCreditCardRequest(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const validatedData = creditCardRequestSchema.parse(req.body);
    const request = await RequestService.createCreditCardRequest(req.user.id, validatedData);
    
    res.status(201).json({
      success: true,
      message: 'Credit card request created successfully',
      data: request
    });
  }

  static async getCreditCardRequests(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const requests = await RequestService.getCreditCardRequests(req.user.id);
    
    res.json({
      success: true,
      message: 'Credit card requests retrieved successfully',
      data: requests
    });
  }

  static async updateCreditCardRequest(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { id } = req.params;
    const validatedData = creditCardRequestSchema.parse(req.body);
    
    const request = await RequestService.updateCreditCardRequest(
      parseInt(id), 
      req.user.id, 
      validatedData
    );
    
    res.json({
      success: true,
      message: 'Credit card request updated successfully',
      data: request
    });
  }

  static async deleteCreditCardRequest(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { id } = req.params;
    await RequestService.deleteCreditCardRequest(parseInt(id), req.user.id);
    
    res.json({
      success: true,
      message: 'Credit card request deleted successfully'
    });
  }

  // Account requests
  static async createAccountRequest(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { accountType, description } = req.body;
    const request = await RequestService.createAccountRequest(req.user.id, accountType, description);
    
    res.status(201).json({
      success: true,
      message: 'Account request created successfully',
      data: request
    });
  }

  static async getAccountRequests(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const requests = await RequestService.getAccountRequests(req.user.id);
    
    res.json({
      success: true,
      message: 'Account requests retrieved successfully',
      data: requests
    });
  }

  // TF Bank requests
  static async createTfBankRequest(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { packageType, description } = req.body;
    
    if (!packageType || !['student', 'elyssa'].includes(packageType)) {
      throw createError('Invalid package type. Must be "student" or "elyssa"', 400);
    }
    
    const request = await RequestService.createTfBankRequest(req.user.id, packageType, description);
    
    res.status(201).json({
      success: true,
      message: 'TF Bank request created successfully',
      data: request
    });
  }

  static async getTfBankRequests(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const requests = await RequestService.getTfBankRequests(req.user.id);
    
    res.json({
      success: true,
      message: 'TF Bank requests retrieved successfully',
      data: requests
    });
  }
}