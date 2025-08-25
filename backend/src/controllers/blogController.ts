import { Request, Response } from 'express';
import { BlogService } from '@/services/blogService';
import { AuthenticatedRequest } from '@/types';
import { paginationSchema } from '@/utils/validation';
import { createError } from '@/middlewares/errorHandler';

export class BlogController {
  static async getPosts(req: Request, res: Response): Promise<void> {
    const query = paginationSchema.parse(req.query);
    const result = await BlogService.getPosts(query);
    
    res.json({
      success: true,
      message: 'Blog posts retrieved successfully',
      data: result.data,
      pagination: result.pagination
    });
  }

  static async getPostById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const post = await BlogService.getPostById(parseInt(id));
    
    res.json({
      success: true,
      message: 'Blog post retrieved successfully',
      data: post
    });
  }

  static async createPost(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }

    const { title, content, excerpt, category } = req.body;
    
    if (!title || !content) {
      throw createError('Title and content are required', 400);
    }
    
    const post = await BlogService.createPost({
      title,
      content,
      excerpt,
      category,
      author: req.user.fullName || req.user.email
    });
    
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: post
    });
  }

  static async updatePost(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const post = await BlogService.updatePost(parseInt(id), req.body);
    
    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
  }

  static async deletePost(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    await BlogService.deletePost(parseInt(id));
    
    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  }

  static async togglePublish(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const post = await BlogService.togglePublish(parseInt(id));
    
    res.json({
      success: true,
      message: `Blog post ${post.published ? 'published' : 'unpublished'} successfully`,
      data: post
    });
  }
}