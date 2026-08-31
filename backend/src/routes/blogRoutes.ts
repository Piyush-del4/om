import { Router } from 'express';
import {
  getBlogs,
  getBlogBySlug,
  getRelatedBlogs,
  getBlogCategories,
  triggerBlogGeneration,
} from '../controllers/blogController';

export const blogRouter = Router();

// Public endpoints
blogRouter.get('/', getBlogs);
blogRouter.get('/categories', getBlogCategories);
blogRouter.get('/related/:slug', getRelatedBlogs);
blogRouter.get('/:slug', getBlogBySlug);

// Admin-only endpoint
blogRouter.post('/generate', triggerBlogGeneration);
