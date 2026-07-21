import { Router } from 'express';
import * as reviewController from './review.controller';

export const reviewRouter = Router();

// Public routes
reviewRouter.post('/', reviewController.submitReview);
reviewRouter.get('/success-stories', reviewController.getSuccessStories);
