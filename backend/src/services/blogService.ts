import { prisma } from '@/server';
import { PaginationQuery } from '@/types';
import { createError } from '@/middlewares/errorHandler';

export class BlogService {
  static async getPosts(query: PaginationQuery) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where = {
      published: true,
      ...(search && {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } },
          { category: { contains: search } }
        ]
      })
    };

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        select: {
          id: true,
          title: true,
          excerpt: true,
          author: true,
          category: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit
      }),
      prisma.blogPost.count({ where })
    ]);

    return {
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getPostById(postId: number) {
    const post = await prisma.blogPost.findUnique({
      where: { id: postId, published: true }
    });

    if (!post) {
      throw createError('Blog post not found', 404);
    }

    return post;
  }

  static async createPost(data: any) {
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        author: data.author,
        category: data.category,
        published: false
      }
    });

    return post;
  }

  static async updatePost(postId: number, data: any) {
    const post = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.content && { content: data.content }),
        ...(data.excerpt && { excerpt: data.excerpt }),
        ...(data.category && { category: data.category }),
        ...(data.published !== undefined && { published: data.published })
      }
    });

    return post;
  }

  static async deletePost(postId: number) {
    await prisma.blogPost.delete({
      where: { id: postId }
    });
  }

  static async togglePublish(postId: number) {
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
      select: { published: true }
    });

    if (!post) {
      throw createError('Blog post not found', 404);
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id: postId },
      data: { published: !post.published }
    });

    return updatedPost;
  }
}