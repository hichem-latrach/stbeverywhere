import { Response } from 'express';
import { DocumentService } from '@/services/documentService';
import { AuthenticatedRequest, FileUploadResult } from '@/types';
import { createError } from '@/middlewares/errorHandler';
import { cleanupFiles } from '@/middlewares/upload';

export class DocumentController {
  static async uploadDocuments(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      if (!files || Object.keys(files).length === 0) {
        throw createError('No files uploaded', 400);
      }

      const uploadResults: FileUploadResult[] = [];
      
      for (const [fieldName, fileArray] of Object.entries(files)) {
        for (const file of fileArray) {
          const result = await DocumentService.saveDocument(req.user.id, file, fieldName);
          uploadResults.push(result);
        }
      }
      
      res.status(201).json({
        success: true,
        message: 'Documents uploaded successfully',
        data: uploadResults
      });
    } catch (error) {
      // Clean up uploaded files on error
      if (req.files) {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const allFiles = Object.values(files).flat();
        cleanupFiles(allFiles);
      }
      throw error;
    }
  }

  static async getUserDocuments(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const documents = await DocumentService.getUserDocuments(req.user.id);
    
    res.json({
      success: true,
      message: 'Documents retrieved successfully',
      data: documents
    });
  }

  static async getDocument(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { id } = req.params;
    const document = await DocumentService.getDocument(parseInt(id), req.user.id);
    
    // Stream the file
    res.sendFile(document.path, { root: '.' });
  }

  static async deleteDocument(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { id } = req.params;
    await DocumentService.deleteDocument(parseInt(id), req.user.id);
    
    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  }
}