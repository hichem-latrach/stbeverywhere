import { Router } from 'express';
import { DocumentController } from '@/controllers/documentController';
import { authenticateToken } from '@/middlewares/auth';
import { uploadFields } from '@/middlewares/upload';
import { asyncHandler } from '@/middlewares/errorHandler';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Document upload routes
router.post('/upload', 
  uploadFields([
    { name: 'cinFront', maxCount: 1 },
    { name: 'cinBack', maxCount: 1 },
    { name: 'selfie', maxCount: 1 },
    { name: 'passport', maxCount: 1 },
    { name: 'proofOfAddress', maxCount: 1 },
    { name: 'proofOfIncome', maxCount: 1 },
    { name: 'studentVisa', maxCount: 1 },
    { name: 'enrollmentConfirmation', maxCount: 1 },
    { name: 'scholarshipProof', maxCount: 1 },
    { name: 'residencePermit', maxCount: 1 }
  ]),
  asyncHandler(DocumentController.uploadDocuments)
);

// Document management
router.get('/', asyncHandler(DocumentController.getUserDocuments));
router.get('/:id', asyncHandler(DocumentController.getDocument));
router.delete('/:id', asyncHandler(DocumentController.deleteDocument));

export default router;