import { Request, Response } from 'express';
import { ContactService } from '@/services/contactService';
import { AuthenticatedRequest } from '@/types';
import { contactInquirySchema, paginationSchema } from '@/utils/validation';
import { createError } from '@/middlewares/errorHandler';

export class ContactController {
  static async createInquiry(req: Request, res: Response): Promise<void> {
    const validatedData = contactInquirySchema.parse(req.body);
    const inquiry = await ContactService.createInquiry(validatedData);
    
    res.status(201).json({
      success: true,
      message: 'Contact inquiry submitted successfully',
      data: inquiry
    });
  }

  static async getInquiries(req: AuthenticatedRequest, res: Response): Promise<void> {
    const query = paginationSchema.parse(req.query);
    const result = await ContactService.getInquiries(query);
    
    res.json({
      success: true,
      message: 'Contact inquiries retrieved successfully',
      data: result.data,
      pagination: result.pagination
    });
  }

  static async getInquiryById(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const inquiry = await ContactService.getInquiryById(parseInt(id));
    
    res.json({
      success: true,
      message: 'Contact inquiry retrieved successfully',
      data: inquiry
    });
  }

  static async updateInquiryStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].includes(status)) {
      throw createError('Invalid status', 400);
    }
    
    const inquiry = await ContactService.updateInquiryStatus(
      parseInt(id), 
      status, 
      req.user!.id
    );
    
    res.json({
      success: true,
      message: 'Contact inquiry status updated successfully',
      data: inquiry
    });
  }

  static async replyToInquiry(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { message } = req.body;
    
    if (!message) {
      throw createError('Reply message is required', 400);
    }
    
    await ContactService.replyToInquiry(parseInt(id), message, req.user!.id);
    
    res.json({
      success: true,
      message: 'Reply sent successfully'
    });
  }
}