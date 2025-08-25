import { prisma } from '@/server';
import { hashPassword, comparePassword } from '@/utils/password';
import { createError } from '@/middlewares/errorHandler';
import { PaginationQuery } from '@/types';

export class UserService {
  static async getProfile(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        firstName: true,
        lastName: true,
        cinNumber: true,
        phoneNumber: true,
        role: true,
        status: true,
        isVerified: true,
        createdAt: true,
        kycInfo: true
      }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    return user;
  }

  static async updateProfile(userId: number, data: any) {
    const { email, fullName, firstName, lastName, phoneNumber } = data;
    
    // Check if email is already taken by another user
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id: userId }
        }
      });
      
      if (existingUser) {
        throw createError('Email already in use', 409);
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(email && { email }),
        ...(fullName && { fullName }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phoneNumber && { phoneNumber })
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        updatedAt: true
      }
    });

    return updatedUser;
  }

  static async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { passwordHash: true }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    // Verify current password
    const isValidPassword = await comparePassword(currentPassword, user.passwordHash);
    if (!isValidPassword) {
      throw createError('Current password is incorrect', 400);
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash }
    });
  }

  static async getUserRequests(userId: number) {
    const [checkbookRequests, creditCardRequests, accountRequests, tfBankRequests] = await Promise.all([
      prisma.checkbookRequest.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.creditCardRequest.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.accountRequest.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.tfBankRequest.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      })
    ]);

    return {
      checkbook: checkbookRequests,
      creditCard: creditCardRequests,
      account: accountRequests,
      tfBank: tfBankRequests
    };
  }

  static async getUserTransactions(userId: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: {
          account: { userId }
        },
        include: {
          account: {
            select: { type: true, number: true }
          }
        },
        orderBy: { transactionDate: 'desc' },
        skip,
        take: limit
      }),
      prisma.transaction.count({
        where: {
          account: { userId }
        }
      })
    ]);

    return {
      data: transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getUserAccounts(userId: number) {
    const accounts = await prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return accounts;
  }
}