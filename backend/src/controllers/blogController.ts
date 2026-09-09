import { Request, Response, NextFunction } from 'express';
import Blog from '../models/Blog';
import { generateAndSaveBlog } from '../services/blogService';
import { SEED_BLOGS } from '../data/seedBlogs';
import { logger } from '../utils/logger';

// Auto-seed function to ensure cloud DB is never empty
async function ensureSeedBlogs() {
  try {
    const count = await Blog.countDocuments({ isPublished: true });
    if (count === 0) {
      logger.info('🌱 Empty blog collection detected on server. Seeding initial blogs...');
      await Blog.insertMany(SEED_BLOGS);
      logger.info(`✅ Seeded ${SEED_BLOGS.length} initial blogs into MongoDB.`);
    }
  } catch (err: any) {
    logger.error(`Failed to auto-seed blogs: ${err.message}`);
  }
}

// GET /api/v1/blogs — paginated listing with filters
export async function getBlogs(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const category = req.query.category as string;
    const tag = req.query.tag as string;
    const search = req.query.search as string;

    // Check & seed initial blogs if database is completely empty
    await ensureSeedBlogs();

    const filter: any = { isPublished: true };
    if (category && category !== 'All') filter.category = category;
    if (tag) filter.tags = { $in: [tag] };
    if (search) filter.$text = { $search: search };

    let total = await Blog.countDocuments(filter);

    if (total === 0 && !category && !tag && !search) {
      logger.info('⚠️ No published blogs found in DB. Triggering background blog generation...');
      generateAndSaveBlog().catch(err => logger.error(`Background blog gen error: ${err.message}`));
    }

    const blogs = await Blog.find(filter)
      .select('title slug metaDescription excerpt category tags readingTime heroImageUrl heroImageAlt publishedAt primaryKeyword')
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/blogs/:slug — single blog post
export async function getBlogBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    await ensureSeedBlogs();
    let blog = await Blog.findOne({ slug: req.params.slug, isPublished: true }).lean();
    
    // Fallback search in SEED_BLOGS if DB search missed
    if (!blog) {
      const seedMatch = SEED_BLOGS.find(b => b.slug === req.params.slug);
      if (seedMatch) {
        blog = seedMatch as any;
      }
    }

    if (!blog) {
      return res.status(404).json({ success: false, error: { message: 'Blog not found' } });
    }
    res.json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/blogs/related/:slug — 3 related posts by tags
export async function getRelatedBlogs(req: Request, res: Response, next: NextFunction) {
  try {
    const current = (await Blog.findOne({ slug: req.params.slug }).select('tags category _id').lean()) as any;
    if (!current) return res.json({ success: true, data: [] });

    const related = await Blog.find({
      _id: { $ne: current._id },
      isPublished: true,
      $or: [
        { tags: { $in: current.tags } },
        { category: current.category },
      ],
    })
      .select('title slug excerpt category readingTime heroImageUrl heroImageAlt publishedAt tags')
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean();

    res.json({ success: true, data: related });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/blogs/categories — all distinct categories + counts
export async function getBlogCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await Blog.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
}

// POST /api/v1/blogs/generate — admin manual trigger
export async function triggerBlogGeneration(req: Request, res: Response, next: NextFunction) {
  try {
    // Simple auth check — admin only (check for admin header or token in prod)
    const adminSecret = req.headers['x-admin-secret'];
    if (adminSecret !== process.env.ADMIN_SECRET && process.env.NODE_ENV === 'production') {
      return res.status(403).json({ success: false, error: { message: 'Forbidden' } });
    }

    logger.info('🔧 Manual blog generation triggered via API');
    // Run in background, respond immediately
    generateAndSaveBlog().catch(err => logger.error(`Background blog gen error: ${err.message}`));

    res.json({ success: true, message: 'Blog generation started in background. Check back in ~30 seconds.' });
  } catch (err) {
    next(err);
  }
}
