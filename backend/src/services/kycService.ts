import { prisma } from '@/server';
import { KycData } from '@/types';
import { createError } from '@/middlewares/errorHandler';

export class KycService {
  static async getKycInfo(userId: number) {
    let kycInfo = await prisma.kycInfo.findUnique({
      where: { userId }
    });

    // Create default KYC info if it doesn't exist
    if (!kycInfo) {
      kycInfo = await prisma.kycInfo.create({
        data: {
          userId,
          primaryNationality: 'Tunisian',
          residence: 'Resident in Tunisia',
          accountCurrency: 'TND'
        }
      });
    }

    return kycInfo;
  }

  static async updateKycInfo(userId: number, data: KycData) {
    const kycInfo = await prisma.kycInfo.upsert({
      where: { userId },
      update: {
        ...data,
        updatedAt: new Date()
      },
      create: {
        userId,
        ...data
      }
    });

    return kycInfo;
  }

  static async createModificationRequest(userId: number, data: any) {
    const { fieldName, fieldLabel, newValue, reason } = data;

    // Get current KYC info to compare
    const currentKyc = await this.getKycInfo(userId);
    const oldValue = (currentKyc as any)[fieldName] || '';

    if (oldValue === newValue) {
      throw createError('New value is the same as current value', 400);
    }

    // Check if there's already a pending request for this field
    const existingRequest = await prisma.kycModificationRequest.findFirst({
      where: {
        userId,
        fieldName,
        status: 'PENDING'
      }
    });

    if (existingRequest) {
      throw createError('There is already a pending modification request for this field', 409);
    }

    const request = await prisma.kycModificationRequest.create({
      data: {
        userId,
        fieldName,
        fieldLabel,
        oldValue,
        newValue,
        reason,
        status: 'PENDING'
      }
    });

    return request;
  }

  static async getModificationRequests(userId: number) {
    const requests = await prisma.kycModificationRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return requests;
  }
}