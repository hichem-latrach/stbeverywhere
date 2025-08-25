import { Response } from 'express';
import { KycService } from '@/services/kycService';
import { AuthenticatedRequest } from '@/types';
import { kycModificationSchema } from '@/utils/validation';
import { createError } from '@/middlewares/errorHandler';

export class KycController {
  static async getKycInfo(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const kycInfo = await KycService.getKycInfo(req.user.id);
    
    res.json({
      success: true,
      message: 'KYC information retrieved successfully',
      data: kycInfo
    });
  }

  static async updateKycInfo(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const kycInfo = await KycService.updateKycInfo(req.user.id, req.body);
    
    res.json({
      success: true,
      message: 'KYC information updated successfully',
      data: kycInfo
    });
  }

  static async createModificationRequest(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const validatedData = kycModificationSchema.parse(req.body);
    const request = await KycService.createModificationRequest(req.user.id, validatedData);
    
    res.status(201).json({
      success: true,
      message: 'KYC modification request created successfully',
      data: request
    });
  }

  static async getModificationRequests(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const requests = await KycService.getModificationRequests(req.user.id);
    
    res.json({
      success: true,
      message: 'KYC modification requests retrieved successfully',
      data: requests
    });
  }
}