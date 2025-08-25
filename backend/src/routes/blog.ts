import { Router } from 'express';
import { BlogController } from '@/controllers/blogController';
import { authenticateToken, requireAdmin } from '@/middlewares/auth';
import { asyncHandler } from '@/middlewares/errorHandler';

const router = Router();

// Public routes
router.get('/', asyncHandler(BlogController.getPosts));
router.get('/:id', asyncHandler(BlogController.getPostById));

// Admin routes
router.use(authenticateToken);
router.use(requireAdmin);

router.post('/', asyncHandler(BlogController.createPost));
router.put('/:id', asyncHandler(BlogController.updatePost));
router.delete('/:id', asyncHandler(BlogController.deletePost));
router.put('/:id/publish', asyncHandler(BlogController.togglePublish));

export default router;