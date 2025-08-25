import { prisma } from '@/server';
import { PaginationQuery } from '@/types';
import { createError } from '@/middlewares/errorHandler';

export class AdminService {
  static async getUsers(query: PaginationQuery) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where = search ? {
      OR: [
        { email: { contains: search } },
        { fullName: { contains: search } },
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { cinNumber: { contains: search } }
      ]
    } : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
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
          lastLoginAt: true,
          createdAt: true
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit
      }),
      prisma.user.count({ where })
    ]);

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getUserById(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        kycInfo: true,
        accounts: true,
        checkbookRequests: true,
        creditCardRequests: true,
        accountRequests: true,
        tfBankRequests: true,
        contactInquiries: true,
        documents: {
          select: {
            id: true,
            filename: true,
            originalName: true,
            type: true,
            createdAt: true
          }
        }
      }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    return user;
  }

  static async updateUserStatus(userId: number, status: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { status: status as any },
      select: {
        id: true,
        email: true,
        fullName: true,
        status: true,
        updatedAt: true
      }
    });

    return user;
  }

  static async deleteUser(userId: number) {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    // Delete user (cascade will handle related records)
    await prisma.user.delete({
      where: { id: userId }
    });
  }

  static async getAllRequests(query: PaginationQuery) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    // Get all request types with user information
    const [checkbookRequests, creditCardRequests, accountRequests, tfBankRequests] = await Promise.all([
      prisma.checkbookRequest.findMany({
        include: {
          user: {
            select: { id: true, email: true, fullName: true, firstName: true }
          }
        },
        orderBy: { createdAt: sortOrder },
        skip,
        take: Math.ceil(limit / 4)
      }),
      prisma.creditCardRequest.findMany({
        include: {
          user: {
            select: { id: true, email: true, fullName: true, firstName: true }
          }
        },
        orderBy: { createdAt: sortOrder },
        skip,
        take: Math.ceil(limit / 4)
      }),
      prisma.accountRequest.findMany({
        include: {
          user: {
            select: { id: true, email: true, fullName: true, firstName: true }
          }
        },
        orderBy: { createdAt: sortOrder },
        skip,
        take: Math.ceil(limit / 4)
      }),
      prisma.tfBankRequest.findMany({
        include: {
          user: {
            select: { id: true, email: true, fullName: true, firstName: true }
          }
        },
        orderBy: { createdAt: sortOrder },
        skip,
        take: Math.ceil(limit / 4)
      })
    ]);

    // Combine and format all requests
    const allRequests = [
      ...checkbookRequests.map(req => ({ ...req, type: 'checkbook' })),
      ...creditCardRequests.map(req => ({ ...req, type: 'credit-card' })),
      ...accountRequests.map(req => ({ ...req, type: 'account' })),
      ...tfBankRequests.map(req => ({ ...req, type: 'tf-bank' }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return {
      data: allRequests,
      pagination: {
        page,
        limit,
        total: allRequests.length,
        totalPages: Math.ceil(allRequests.length / limit)
      }
    };
  }

  static async getRequestsByType(type: string, query: PaginationQuery) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    let requests: any[] = [];
    let total = 0;

    const userWhere = search ? {
      OR: [
        { email: { contains: search } },
        { fullName: { contains: search } },
        { firstName: { contains: search } }
      ]
    } : {};

    switch (type) {
      case 'checkbook':
        [requests, total] = await Promise.all([
          prisma.checkbookRequest.findMany({
            where: search ? { user: userWhere } : {},
            include: {
              user: {
                select: { id: true, email: true, fullName: true, firstName: true }
              }
            },
            orderBy: { [sortBy]: sortOrder },
            skip,
            take: limit
          }),
          prisma.checkbookRequest.count({
            where: search ? { user: userWhere } : {}
          })
        ]);
        break;
      case 'credit-card':
        [requests, total] = await Promise.all([
          prisma.creditCardRequest.findMany({
            where: search ? { user: userWhere } : {},
            include: {
              user: {
                select: { id: true, email: true, fullName: true, firstName: true }
              }
            },
            orderBy: { [sortBy]: sortOrder },
            skip,
            take: limit
          }),
          prisma.creditCardRequest.count({
            where: search ? { user: userWhere } : {}
          })
        ]);
        break;
      case 'account':
        [requests, total] = await Promise.all([
          prisma.accountRequest.findMany({
            where: search ? { user: userWhere } : {},
            include: {
              user: {
                select: { id: true, email: true, fullName: true, firstName: true }
              }
            },
            orderBy: { [sortBy]: sortOrder },
            skip,
            take: limit
          }),
          prisma.accountRequest.count({
            where: search ? { user: userWhere } : {}
          })
        ]);
        break;
      case 'tf-bank':
        [requests, total] = await Promise.all([
          prisma.tfBankRequest.findMany({
            where: search ? { user: userWhere } : {},
            include: {
              user: {
                select: { id: true, email: true, fullName: true, firstName: true }
              }
            },
            orderBy: { [sortBy]: sortOrder },
            skip,
            take: limit
          }),
          prisma.tfBankRequest.count({
            where: search ? { user: userWhere } : {}
          })
        ]);
        break;
      case 'contact':
        [requests, total] = await Promise.all([
          prisma.contactInquiry.findMany({
            where: search ? {
              OR: [
                { name: { contains: search } },
                { email: { contains: search } },
                { subject: { contains: search } }
              ]
            } : {},
            orderBy: { [sortBy]: sortOrder },
            skip,
            take: limit
          }),
          prisma.contactInquiry.count({
            where: search ? {
              OR: [
                { name: { contains: search } },
                { email: { contains: search } },
                { subject: { contains: search } }
              ]
            } : {}
          })
        ]);
        break;
      default:
        throw createError('Invalid request type', 400);
    }

    return {
      data: requests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async updateRequestStatus(requestId: number, status: string, type: string) {
    let request;

    switch (type) {
      case 'checkbook':
        request = await prisma.checkbookRequest.update({
          where: { id: requestId },
          data: { status: status as any },
          include: {
            user: {
              select: { email: true, fullName: true }
            }
          }
        });
        break;
      case 'credit-card':
        request = await prisma.creditCardRequest.update({
          where: { id: requestId },
          data: { status: status as any },
          include: {
            user: {
              select: { email: true, fullName: true }
            }
          }
        });
        break;
      case 'account':
        request = await prisma.accountRequest.update({
          where: { id: requestId },
          data: { status: status as any },
          include: {
            user: {
              select: { email: true, fullName: true }
            }
          }
        });
        break;
      case 'tf-bank':
        request = await prisma.tfBankRequest.update({
          where: { id: requestId },
          data: { status: status as any },
          include: {
            user: {
              select: { email: true, fullName: true }
            }
          }
        });
        break;
      default:
        throw createError('Invalid request type', 400);
    }

    // TODO: Send notification email to user about status change

    return request;
  }

  static async deleteRequest(requestId: number, type: string) {
    switch (type) {
      case 'checkbook':
        await prisma.checkbookRequest.delete({
          where: { id: requestId }
        });
        break;
      case 'credit-card':
        await prisma.creditCardRequest.delete({
          where: { id: requestId }
        });
        break;
      case 'account':
        await prisma.accountRequest.delete({
          where: { id: requestId }
        });
        break;
      case 'tf-bank':
        await prisma.tfBankRequest.delete({
          where: { id: requestId }
        });
        break;
      default:
        throw createError('Invalid request type', 400);
    }
  }

  static async getKycModifications(query: PaginationQuery) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where = search ? {
      user: {
        OR: [
          { email: { contains: search } },
          { fullName: { contains: search } },
          { firstName: { contains: search } }
        ]
      }
    } : {};

    const [modifications, total] = await Promise.all([
      prisma.kycModificationRequest.findMany({
        where,
        include: {
          user: {
            select: { id: true, email: true, fullName: true, firstName: true }
          }
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit
      }),
      prisma.kycModificationRequest.count({ where })
    ]);

    return {
      data: modifications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async processKycModification(
    modificationId: number, 
    status: string, 
    adminId: number, 
    adminNotes?: string
  ) {
    const modification = await prisma.kycModificationRequest.update({
      where: { id: modificationId },
      data: {
        status: status as any,
        adminId,
        decisionDate: new Date(),
        ...(adminNotes && { reason: adminNotes })
      },
      include: {
        user: {
          select: { email: true, fullName: true }
        }
      }
    });

    // If approved, update the actual KYC field
    if (status === 'APPROVED') {
      await prisma.kycInfo.update({
        where: { userId: modification.userId },
        data: {
          [modification.fieldName]: modification.newValue
        }
      });
    }

    return modification;
  }

  static async getSettings() {
    const settings = await prisma.systemSetting.findMany();
    
    // Convert to key-value object
    const settingsObj: Record<string, string> = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });

    return settingsObj;
  }

  static async updateSettings(settingsData: Record<string, string>) {
    const updates = Object.entries(settingsData).map(([key, value]) =>
      prisma.systemSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      })
    );

    await Promise.all(updates);
    
    return settingsData;
  }

  static async getDashboardStats() {
    const [
      totalUsers,
      activeUsers,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      totalTransactions,
      recentTransactions
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'ACTIVE' } }),
      prisma.$queryRaw`
        SELECT COUNT(*) as count FROM (
          SELECT id FROM checkbook_requests WHERE status = 'PENDING'
          UNION ALL
          SELECT id FROM credit_card_requests WHERE status = 'PENDING'
          UNION ALL
          SELECT id FROM account_requests WHERE status = 'PENDING'
          UNION ALL
          SELECT id FROM tf_bank_requests WHERE status = 'PENDING'
        ) as pending_requests
      `,
      prisma.$queryRaw`
        SELECT COUNT(*) as count FROM (
          SELECT id FROM checkbook_requests WHERE status = 'APPROVED'
          UNION ALL
          SELECT id FROM credit_card_requests WHERE status = 'APPROVED'
          UNION ALL
          SELECT id FROM account_requests WHERE status = 'APPROVED'
          UNION ALL
          SELECT id FROM tf_bank_requests WHERE status = 'APPROVED'
        ) as approved_requests
      `,
      prisma.$queryRaw`
        SELECT COUNT(*) as count FROM (
          SELECT id FROM checkbook_requests WHERE status = 'REJECTED'
          UNION ALL
          SELECT id FROM credit_card_requests WHERE status = 'REJECTED'
          UNION ALL
          SELECT id FROM account_requests WHERE status = 'REJECTED'
          UNION ALL
          SELECT id FROM tf_bank_requests WHERE status = 'REJECTED'
        ) as rejected_requests
      `,
      prisma.transaction.count(),
      prisma.transaction.findMany({
        take: 5,
        orderBy: { transactionDate: 'desc' },
        include: {
          account: {
            include: {
              user: {
                select: { fullName: true, firstName: true, email: true }
              }
            }
          }
        }
      })
    ]);

    return {
      totalUsers,
      activeUsers,
      pendingRequests: (pendingRequests as any)[0]?.count || 0,
      approvedRequests: (approvedRequests as any)[0]?.count || 0,
      rejectedRequests: (rejectedRequests as any)[0]?.count || 0,
      totalTransactions,
      recentTransactions
    };
  }
}