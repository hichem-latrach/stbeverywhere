import { prisma } from '@/server';
import { createError } from '@/middlewares/errorHandler';
import { sendEmail } from '@/utils/email';

export class AccountService {
  static async getAccounts(userId: number) {
    const accounts = await prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return accounts;
  }

  static async getAccountById(accountId: number, userId: number) {
    const account = await prisma.account.findFirst({
      where: { id: accountId, userId },
      include: {
        transactions: {
          take: 10,
          orderBy: { transactionDate: 'desc' }
        }
      }
    });

    if (!account) {
      throw createError('Account not found or access denied', 404);
    }

    return account;
  }

  static async getAccountBalance(accountId: number, userId: number) {
    const account = await prisma.account.findFirst({
      where: { id: accountId, userId },
      select: { balance: true }
    });

    if (!account) {
      throw createError('Account not found or access denied', 404);
    }

    return account.balance;
  }

  static async generateStatement(
    accountId: number, 
    userId: number, 
    startDate?: string, 
    endDate?: string, 
    format: string = 'pdf'
  ) {
    const account = await prisma.account.findFirst({
      where: { id: accountId, userId },
      include: {
        user: {
          select: { email: true, fullName: true }
        },
        transactions: {
          where: {
            ...(startDate && { transactionDate: { gte: new Date(startDate) } }),
            ...(endDate && { transactionDate: { lte: new Date(endDate) } })
          },
          orderBy: { transactionDate: 'desc' }
        }
      }
    });

    if (!account) {
      throw createError('Account not found or access denied', 404);
    }

    // Generate statement (simplified - in production, you'd generate actual PDF/CSV)
    const statement = {
      accountNumber: account.number,
      accountType: account.type,
      balance: account.balance,
      statementPeriod: {
        from: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        to: endDate || new Date().toISOString()
      },
      transactions: account.transactions,
      generatedAt: new Date().toISOString(),
      format
    };

    // Send statement via email
    if (account.user.email) {
      await sendEmail({
        to: account.user.email,
        subject: 'STB Account Statement',
        html: `
          <h2>Account Statement</h2>
          <p>Dear ${account.user.fullName || 'Customer'},</p>
          <p>Please find your account statement attached.</p>
          <p>Account: ${account.number}</p>
          <p>Current Balance: ${account.balance} TND</p>
          <p>Statement Period: ${statement.statementPeriod.from} to ${statement.statementPeriod.to}</p>
          <p>Best regards,<br>STB Everywhere Team</p>
        `
      });
    }

    return statement;
  }
}