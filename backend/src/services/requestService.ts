import { prisma } from '@/server';
import { createError } from '@/middlewares/errorHandler';

export class RequestService {
  // Checkbook requests
  static async createCheckbookRequest(userId: number, data: any) {
    const request = await prisma.checkbookRequest.create({
      data: {
        userId,
        phoneNumber: data.phoneNumber,
        email: data.email,
        rib: data.rib,
        checkbookType: data.checkbookType,
        idType: data.idType,
        idNumber: data.idNumber,
        status: 'PENDING'
      }
    });

    return request;
  }

  static async getCheckbookRequests(userId: number) {
    const requests = await prisma.checkbookRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return requests;
  }

  static async updateCheckbookRequest(requestId: number, userId: number, data: any) {
    // Verify ownership
    const existingRequest = await prisma.checkbookRequest.findFirst({
      where: { id: requestId, userId }
    });

    if (!existingRequest) {
      throw createError('Request not found or access denied', 404);
    }

    if (existingRequest.status === 'APPROVED') {
      throw createError('Cannot modify approved requests', 400);
    }

    const request = await prisma.checkbookRequest.update({
      where: { id: requestId },
      data: {
        phoneNumber: data.phoneNumber,
        email: data.email,
        rib: data.rib,
        checkbookType: data.checkbookType,
        idType: data.idType,
        idNumber: data.idNumber
      }
    });

    return request;
  }

  static async deleteCheckbookRequest(requestId: number, userId: number) {
    // Verify ownership
    const existingRequest = await prisma.checkbookRequest.findFirst({
      where: { id: requestId, userId }
    });

    if (!existingRequest) {
      throw createError('Request not found or access denied', 404);
    }

    if (existingRequest.status === 'APPROVED') {
      throw createError('Cannot delete approved requests', 400);
    }

    await prisma.checkbookRequest.delete({
      where: { id: requestId }
    });
  }

  // Credit card requests
  static async createCreditCardRequest(userId: number, data: any) {
    const request = await prisma.creditCardRequest.create({
      data: {
        userId,
        phoneNumber: data.phoneNumber,
        cardType: data.cardType,
        email: data.email,
        rib: data.rib,
        maxTPE: data.maxTPE,
        idType: data.idType,
        idNumber: data.idNumber,
        status: 'PENDING'
      }
    });

    return request;
  }

  static async getCreditCardRequests(userId: number) {
    const requests = await prisma.creditCardRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return requests;
  }

  static async updateCreditCardRequest(requestId: number, userId: number, data: any) {
    // Verify ownership
    const existingRequest = await prisma.creditCardRequest.findFirst({
      where: { id: requestId, userId }
    });

    if (!existingRequest) {
      throw createError('Request not found or access denied', 404);
    }

    if (existingRequest.status === 'APPROVED') {
      throw createError('Cannot modify approved requests', 400);
    }

    const request = await prisma.creditCardRequest.update({
      where: { id: requestId },
      data: {
        phoneNumber: data.phoneNumber,
        cardType: data.cardType,
        email: data.email,
        rib: data.rib,
        maxTPE: data.maxTPE,
        idType: data.idType,
        idNumber: data.idNumber
      }
    });

    return request;
  }

  static async deleteCreditCardRequest(requestId: number, userId: number) {
    // Verify ownership
    const existingRequest = await prisma.creditCardRequest.findFirst({
      where: { id: requestId, userId }
    });

    if (!existingRequest) {
      throw createError('Request not found or access denied', 404);
    }

    if (existingRequest.status === 'APPROVED') {
      throw createError('Cannot delete approved requests', 400);
    }

    await prisma.creditCardRequest.delete({
      where: { id: requestId }
    });
  }

  // Account requests
  static async createAccountRequest(userId: number, accountType: string, description?: string) {
    const request = await prisma.accountRequest.create({
      data: {
        userId,
        accountType,
        description,
        status: 'PENDING'
      }
    });

    return request;
  }

  static async getAccountRequests(userId: number) {
    const requests = await prisma.accountRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return requests;
  }

  // TF Bank requests
  static async createTfBankRequest(userId: number, packageType: string, description?: string) {
    const request = await prisma.tfBankRequest.create({
      data: {
        userId,
        packageType,
        description,
        status: 'PENDING'
      }
    });

    return request;
  }

  static async getTfBankRequests(userId: number) {
    const requests = await prisma.tfBankRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return requests;
  }
}