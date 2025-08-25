import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  cinNumber: z.string().regex(/^\d{8}$/, 'CIN must be exactly 8 digits'),
  phoneNumber: z.string().regex(/^\+216\d{8}$/, 'Invalid Tunisian phone format'),
  dateOfBirth: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  }, 'Must be at least 18 years old')
});

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or CIN is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional()
});

export const passwordResetRequestSchema = z.object({
  identifier: z.string().min(1, 'Email or CIN is required')
});

export const passwordResetSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters')
});

export const otpVerificationSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'OTP must be 6 digits'),
  type: z.enum(['LOGIN_MFA', 'PASSWORD_RESET', 'PHONE_VERIFICATION', 'EMAIL_VERIFICATION'])
});

// Request validation schemas
export const checkbookRequestSchema = z.object({
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email format'),
  rib: z.string().regex(/^\d{20}$/, 'RIB must be exactly 20 digits'),
  checkbookType: z.string().min(1, 'Checkbook type is required'),
  idType: z.enum(['cin', 'passport']),
  idNumber: z.string().min(1, 'ID number is required')
});

export const creditCardRequestSchema = z.object({
  phoneNumber: z.string().min(1, 'Phone number is required'),
  cardType: z.string().min(1, 'Card type is required'),
  email: z.string().email('Invalid email format'),
  rib: z.string().regex(/^\d{20}$/, 'RIB must be exactly 20 digits'),
  maxTPE: z.string().min(1, 'Max TPE amount is required'),
  idType: z.enum(['cin', 'passport']),
  idNumber: z.string().min(1, 'ID number is required')
});

export const contactInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  category: z.enum(['GENERAL', 'TECHNICAL', 'BILLING', 'COMPLAINT', 'SUGGESTION']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional()
});

export const kycModificationSchema = z.object({
  fieldName: z.string().min(1, 'Field name is required'),
  fieldLabel: z.string().min(1, 'Field label is required'),
  newValue: z.string().min(1, 'New value is required'),
  reason: z.string().min(10, 'Reason must be at least 10 characters')
});

// Pagination validation
export const paginationSchema = z.object({
  page: z.string().optional().transform((val) => val ? parseInt(val) : 1),
  limit: z.string().optional().transform((val) => val ? parseInt(val) : 10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().optional()
});

// File validation
export const validateFileType = (mimetype: string): boolean => {
  const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,application/pdf').split(',');
  return allowedTypes.includes(mimetype);
};

export const validateFileSize = (size: number): boolean => {
  const maxSize = parseInt(process.env.MAX_FILE_SIZE || '5242880'); // 5MB default
  return size <= maxSize;
};