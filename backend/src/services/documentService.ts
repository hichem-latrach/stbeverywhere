import { prisma } from '@/server';
import { FileUploadResult } from '@/types';
import { createError } from '@/middlewares/errorHandler';
import fs from 'fs';
import path from 'path';

export class DocumentService {
  static async saveDocument(userId: number, file: Express.Multer.File, type: string): Promise<FileUploadResult> {
    // Map field names to document types
    const documentTypeMap: Record<string, string> = {
      'cinFront': 'CIN_FRONT',
      'cinBack': 'CIN_BACK',
      'selfie': 'SELFIE',
      'passport': 'PASSPORT',
      'proofOfAddress': 'PROOF_OF_ADDRESS',
      'proofOfIncome': 'PROOF_OF_INCOME',
      'studentVisa': 'STUDENT_VISA',
      'enrollmentConfirmation': 'ENROLLMENT_CONFIRMATION',
      'scholarshipProof': 'SCHOLARSHIP_PROOF',
      'residencePermit': 'RESIDENCE_PERMIT'
    };

    const documentType = documentTypeMap[type] || 'CIN_FRONT';

    // Save document record to database
    const document = await prisma.document.create({
      data: {
        userId,
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
        type: documentType as any
      }
    });

    // Generate secure URL
    const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
    const url = `${baseUrl}/api/documents/${document.id}`;

    return {
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size,
      mimeType: file.mimetype,
      url
    };
  }

  static async getUserDocuments(userId: number) {
    const documents = await prisma.document.findMany({
      where: { userId },
      select: {
        id: true,
        filename: true,
        originalName: true,
        mimeType: true,
        size: true,
        type: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Add URLs to documents
    const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
    return documents.map(doc => ({
      ...doc,
      url: `${baseUrl}/api/documents/${doc.id}`
    }));
  }

  static async getDocument(documentId: number, userId: number) {
    const document = await prisma.document.findFirst({
      where: { id: documentId, userId }
    });

    if (!document) {
      throw createError('Document not found or access denied', 404);
    }

    // Check if file exists
    if (!fs.existsSync(document.path)) {
      throw createError('File not found on disk', 404);
    }

    return document;
  }

  static async deleteDocument(documentId: number, userId: number) {
    const document = await prisma.document.findFirst({
      where: { id: documentId, userId }
    });

    if (!document) {
      throw createError('Document not found or access denied', 404);
    }

    // Delete file from disk
    if (fs.existsSync(document.path)) {
      fs.unlinkSync(document.path);
    }

    // Delete record from database
    await prisma.document.delete({
      where: { id: documentId }
    });
  }
}