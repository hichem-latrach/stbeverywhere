import { Response } from 'express';
import { AdminService } from '@/services/adminService';
import { AuthenticatedRequest, PaginationQuery } from '@/types';
import { paginationSchema } from '@/utils/validation';
import { createError } from '@/middlewares/errorHandler';

export class AdminController {
  static async getUsers(req: AuthenticatedRequest, res: Response): Promise<void> {
    const query = paginationSchema.parse(req.query);
    const result = await AdminService.getUsers(query);
    
    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: result.data,
      pagination: result.pagination
    });
  }

  static async getUserById(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await AdminService.getUserById(parseInt(id));
    
    res.json({
      success: true,
      message: 'User retrieved successfully',
      data: user
    });
  }

  static async updateUserStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['ACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION'].includes(status)) {
      throw createError('Invalid status', 400);
    }
    
    const user = await AdminService.updateUserStatus(parseInt(id), status);
    
    res.json({
      success: true,
      message: 'User status updated successfully',
      data: user
    });
  }

  static async deleteUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    await AdminService.deleteUser(parseInt(id));
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  }

  static async getAllRequests(req: AuthenticatedRequest, res: Response): Promise<void> {
    const query = paginationSchema.parse(req.query);
    const result = await AdminService.getAllRequests(query);
    
    res.json({
      success: true,
      message: 'Requests retrieved successfully',
      data: result.data,
      pagination: result.pagination
    });
  }

  static async getRequestsByType(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { type } = req.params;
    const query = paginationSchema.parse(req.query);
    
    if (!['checkbook', 'credit-card', 'account', 'tf-bank', 'contact'].includes(type)) {
      throw createError('Invalid request type', 400);
    }
    
    const result = await AdminService.getRequestsByType(type, query);
    
    res.json({
      success: true,
      message: `${type} requests retrieved successfully`,
      data: result.data,
      pagination: result.pagination
    });
  }

  static async updateRequestStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, type } = req.body;
    
    if (!status || !['PENDING', 'APPROVED', 'REJECTED', 'PROCESSING'].includes(status)) {
      throw createError('Invalid status', 400);
    }
    
    if (!type || !['checkbook', 'credit-card', 'account', 'tf-bank'].includes(type)) {
      throw createError('Invalid request type', 400);
    }
    
    const request = await AdminService.updateRequestStatus(parseInt(id), status, type);
    
    res.json({
      success: true,
      message: 'Request status updated successfully',
      data: request
    });
  }

  static async deleteRequest(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { type } = req.body;
    
    if (!type || !['checkbook', 'credit-card', 'account', 'tf-bank'].includes(type)) {
      throw createError('Invalid request type', 400);
    }
    
    await AdminService.deleteRequest(parseInt(id), type);
    
    res.json({
      success: true,
      message: 'Request deleted successfully'
    });
  }

  static async getKycModifications(req: AuthenticatedRequest, res: Response): Promise<void> {
    const query = paginationSchema.parse(req.query);
    const result = await AdminService.getKycModifications(query);
    
    res.json({
      success: true,
      message: 'KYC modifications retrieved successfully',
      data: result.data,
      pagination: result.pagination
    });
  }

  static async processKycModification(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    
    if (!status || !['APPROVED', 'REJECTED'].includes(status)) {
      throw createError('Invalid status. Must be APPROVED or REJECTED', 400);
    }
    
    const modification = await AdminService.processKycModification(
      parseInt(id), 
      status, 
      req.user!.id,
      adminNotes
    );
    
    res.json({
      success: true,
      message: 'KYC modification processed successfully',
      data: modification
    });
  }

  static async getSettings(req: AuthenticatedRequest, res: Response): Promise<void> {
    const settings = await AdminService.getSettings();
    
    res.json({
      success: true,
      message: 'Settings retrieved successfully',
      data: settings
    });
  }

  static async updateSettings(req: AuthenticatedRequest, res: Response): Promise<void> {
    const settings = await AdminService.updateSettings(req.body);
    
    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  }

  static async getDashboardStats(req: AuthenticatedRequest, res: Response): Promise<void> {
    const stats = await AdminService.getDashboardStats();
    
    res.json({
      success: true,
      message: 'Dashboard statistics retrieved successfully',
      data: stats
    });
  }
}