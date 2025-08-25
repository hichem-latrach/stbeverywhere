import { Request } from 'express';
import { User } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface FileUploadResult {
  filename: string;
  originalName: string;
  path: string;
  size: number;
  mimeType: string;
  url: string;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface OtpOptions {
  userId: number;
  type: 'LOGIN_MFA' | 'PASSWORD_RESET' | 'PHONE_VERIFICATION' | 'EMAIL_VERIFICATION';
  method: 'email' | 'sms';
}

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    fullName: string | null;
    role: string;
    status: string;
  };
  accessToken: string;
  refreshToken: string;
  requiresMfa: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  firstName: string;
  lastName: string;
  cinNumber: string;
  phoneNumber: string;
  dateOfBirth: string;
}

export interface KycData {
  title?: string;
  countryOfBirth?: string;
  dateOfBirth?: Date;
  address?: string;
  reason?: string;
  relationshipType?: string;
  status?: string;
  natureOfActivity?: string;
  primaryNationality?: string;
  otherNationality?: string;
  motherFullName?: string;
  fatherFullName?: string;
  maritalStatus?: string;
  residence?: string;
  cinNumber?: string;
  dateOfIssue?: Date;
  selectedAgencyNumber?: string;
  accountType?: string;
  accountCurrency?: string;
}