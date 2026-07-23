import { Request, Response } from 'express';
import { Review } from './review.model';

export const submitReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      res.status(400).json({ success: false, error: 'Name, rating, and comment are required' });
      return;
    }

    const newReview = await Review.create({
      name,
      rating: Number(rating),
      comment,
    });

    res.status(201).json({ success: true, data: newReview });
  } catch (error: any) {
    console.error('Error submitting review:', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
};

export const getSuccessStories = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all approved reviews with a rating > 4 (no limit)
    const reviews = await Review.find({ rating: { $gt: 4 }, isApproved: true })
      .sort({ createdAt: -1 })
      .select('name rating comment createdAt');

    res.status(200).json({ success: true, data: reviews });
  } catch (error: any) {
    console.error('Error fetching success stories:', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
};
