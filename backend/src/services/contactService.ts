import { prisma } from '@/server';
import { PaginationQuery } from '@/types';
import { createError } from '@/middlewares/errorHandler';
import { sendEmail } from '@/utils/email';

export class ContactService {
  static async createInquiry(data: any) {
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        category: data.category || 'GENERAL',
        priority: data.priority || 'MEDIUM',
        status: 'PENDING'
      }
    });

    // Send confirmation email to user
    await sendEmail({
      to: data.email,
      subject: 'STB Everywhere - Contact Inquiry Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7C3AED;">STB Everywhere</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for contacting us. We have received your inquiry and will respond within 24 hours.</p>
          <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3>Your Inquiry Details:</h3>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong> ${data.message}</p>
            <p><strong>Reference ID:</strong> #${inquiry.id}</p>
          </div>
          <p>Best regards,<br>STB Customer Support Team</p>
        </div>
      `
    });

    return inquiry;
  }

  static async getInquiries(query: PaginationQuery) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where = search ? {
      OR: [
        { name: { contains: search } },
        { email: { contains: search } },
        { subject: { contains: search } },
        { message: { contains: search } }
      ]
    } : {};

    const [inquiries, total] = await Promise.all([
      prisma.contactInquiry.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit
      }),
      prisma.contactInquiry.count({ where })
    ]);

    return {
      data: inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getInquiryById(inquiryId: number) {
    const inquiry = await prisma.contactInquiry.findUnique({
      where: { id: inquiryId }
    });

    if (!inquiry) {
      throw createError('Contact inquiry not found', 404);
    }

    return inquiry;
  }

  static async updateInquiryStatus(inquiryId: number, status: string, adminId: number) {
    const inquiry = await prisma.contactInquiry.update({
      where: { id: inquiryId },
      data: {
        status: status as any,
        assignedTo: adminId,
        updatedAt: new Date()
      }
    });

    return inquiry;
  }

  static async replyToInquiry(inquiryId: number, message: string, adminId: number) {
    const inquiry = await prisma.contactInquiry.findUnique({
      where: { id: inquiryId }
    });

    if (!inquiry) {
      throw createError('Contact inquiry not found', 404);
    }

    // Get admin info
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
      select: { fullName: true, email: true }
    });

    // Send reply email
    await sendEmail({
      to: inquiry.email,
      subject: `Re: ${inquiry.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7C3AED;">STB Everywhere Support</h2>
          <p>Dear ${inquiry.name},</p>
          <p>Thank you for contacting STB Everywhere. Here's our response to your inquiry:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3>Your Original Message:</h3>
            <p><em>${inquiry.message}</em></p>
          </div>
          
          <div style="background-color: #e7f3ff; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3>Our Response:</h3>
            <p>${message}</p>
          </div>
          
          <p>If you have any additional questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>${admin?.fullName || 'STB Support Team'}</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">Reference ID: #${inquiry.id}</p>
        </div>
      `
    });

    // Update inquiry status to resolved
    await prisma.contactInquiry.update({
      where: { id: inquiryId },
      data: {
        status: 'RESOLVED',
        assignedTo: adminId,
        updatedAt: new Date()
      }
    });
  }
}