import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { validateFileType, validateFileSize } from '@/utils/validation';

// Ensure upload directory exists
const uploadDir = process.env.STORAGE_PATH || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userDir = path.join(uploadDir, 'users', req.user?.id.toString() || 'temp');
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  }
});

// File filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (validateFileType(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and PDF files are allowed.'));
  }
};

// Configure multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
    files: 10 // Maximum 10 files per request
  }
});

// Middleware for single file upload
export const uploadSingle = (fieldName: string) => upload.single(fieldName);

// Middleware for multiple file upload
export const uploadMultiple = (fieldName: string, maxCount: number = 5) => 
  upload.array(fieldName, maxCount);

// Middleware for multiple fields
export const uploadFields = (fields: { name: string; maxCount?: number }[]) => 
  upload.fields(fields);

// Clean up temporary files on error
export const cleanupFiles = (files: Express.Multer.File[]) => {
  files.forEach(file => {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  });
};