import { z } from 'zod';

export const createLectureSchema = z.object({
  title: z
    .string({ required_error: 'Lecture title is required' })
    .min(1, { message: 'Lecture title cannot be empty' })
    .trim(),
  youtubeVideoId: z
    .string({ required_error: 'YouTube Video ID is required' })
    .min(1, { message: 'YouTube Video ID cannot be empty' })
    .trim(),
  order: z.number().optional().default(0),
});

export const updateLectureSchema = createLectureSchema.partial();


