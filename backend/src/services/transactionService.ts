import { prisma } from '@/server';
import { PaginationQuery } from '@/types';
import { createError } from '@/middlewares/errorHandler';

export class TransactionService {
  static async getTransactions(userId: number, query: PaginationQuery) {
    const { page = 1, limit = 10, search, sortBy = 'transactionDate', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where = {
      account: { userId },
      ...(search && {
        OR: [
          { label: { contains: search } },
          { description: { contains: search } }
        ]
      })
    };

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: {
          account: {
            select: { type: true, number: true }
          }
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit
      }),
      prisma.transaction.count({ where })
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

  static async getTransactionById(transactionId: number, userId: number) {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
        account: { userId }
      },
      include: {
        account: {
          select: { type: true, number: true, rib: true }
        }
      }
    });

    if (!transaction) {
      throw createError('Transaction not found or access denied', 404);
    }

    return transaction;
  }

  static async getTransactionsByAccount(accountId: number, userId: number, query: PaginationQuery) {
    const { page = 1, limit = 10, search, sortBy = 'transactionDate', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    // Verify account ownership
    const account = await prisma.account.findFirst({
      where: { id: accountId, userId }
    });

    if (!account) {
      throw createError('Account not found or access denied', 404);
    }

    const where = {
      accountId,
      ...(search && {
        OR: [
          { label: { contains: search } },
          { description: { contains: search } }
        ]
      })
    };

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit
      }),
      prisma.transaction.count({ where })
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

  static async createTransaction(accountId: number, data: any) {
    const { type, amount, label, description } = data;

    // Verify account exists
    const account = await prisma.account.findUnique({
      where: { id: accountId }
    });

    if (!account) {
      throw createError('Account not found', 404);
    }

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        accountId,
        type,
        amount,
        label,
        description,
        transactionDate: new Date()
      }
    });

    // Update account balance
    const newBalance = type === 'CREDIT' || type === 'TRANSFER_IN' 
      ? account.balance.toNumber() + amount
      : account.balance.toNumber() - amount;

    await prisma.account.update({
      where: { id: accountId },
      data: { balance: newBalance }
    });

    return transaction;
  }
}