import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { requireAuth } from '../../middleware/requireAuth';
import { requireAdmin } from '../../middleware/requireAdmin';
import { uploadToCloudinary } from '../../services/cloudinary.service';
import { logger } from '../../utils/logger';

export const uploadRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images, PDFs, and document files
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/x-pdf' ||
      file.originalname.match(/\.(pdf|doc|docx|png|jpg|jpeg|webp)$/i)
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed!') as any);
    }
  },
});

uploadRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  upload.single('file'),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'No file uploaded',
          },
        });
        return;
      }

      // Generate a unique clean filename
      const originalName = req.file.originalname;
      const parsedName = path.parse(originalName);
      const cleanName = parsedName.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      const uniqueName = `${cleanName}_${Date.now()}`;

      // Determine folder
      const folder = (req.body.folder as string) || 'uploads';

      logger.info(`Uploading file ${originalName} to Cloudinary folder "${folder}"...`);

      const result = await uploadToCloudinary(
        req.file.buffer,
        folder,
        uniqueName,
        { resource_type: 'auto' }
      );

      res.status(200).json({
        success: true,
        data: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      });
    } catch (error) {
      logger.error('Error uploading file to Cloudinary:', error);
      next(error);
    }
  }
);

export default uploadRouter;
