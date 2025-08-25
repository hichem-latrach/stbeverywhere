import { z } from 'zod';

// Auth validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  mfaCode: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// User validation schemas
export const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').optional(),
  phone: z.string().optional(),
  cin: z.string().optional(),
});

// KYC validation schemas
export const kycSchema = z.object({
  dateOfBirth: z.string().optional(),
  placeOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  maritalStatus: z.string().optional(),
  occupation: z.string().optional(),
  employer: z.string().optional(),
  monthlyIncome: z.number().positive().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  cinNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  iban: z.string().optional(),
});

// Request validation schemas
export const checkbookRequestSchema = z.object({
  accountNumber: z.string().min(1, 'Account number is required'),
  checkbookType: z.string().min(1, 'Checkbook type is required'),
  quantity: z.number().int().positive().default(1),
  deliveryAddress: z.string().optional(),
});

export const creditCardRequestSchema = z.object({
  cardType: z.string().min(1, 'Card type is required'),
  creditLimit: z.number().positive().optional(),
  monthlyIncome: z.number().positive().optional(),
  employmentStatus: z.string().optional(),
});

export const accountOpeningRequestSchema = z.object({
  accountType: z.string().min(1, 'Account type is required'),
  initialDeposit: z.number().positive().optional(),
  purpose: z.string().optional(),
});

export const tfAccountRequestSchema = z.object({
  accountType: z.string().min(1, 'Account type is required'),
  amount: z.number().positive('Amount must be positive'),
  duration: z.number().int().positive('Duration must be positive'),
});

// Contact validation schema
export const contactInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Blog validation schemas
export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  excerpt: z.string().optional(),
  coverImage: z.string().url().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
});

// Query validation schemas
export const querySchema = z.object({
  page: z.string().transform(Number).pipe(z.number().int().positive()).default('1'),
  limit: z.string().transform(Number).pipe(z.number().int().positive().max(100)).default('10'),
  search: z.string().optional(),
  status: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Transaction validation schemas
export const transactionSchema = z.object({
  accountId: z.string().min(1, 'Account ID is required'),
  type: z.enum(['DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT', 'FEE']),
  amount: z.number().positive('Amount must be positive'),
  description: z.string().optional(),
  toAccount: z.string().optional(),
});