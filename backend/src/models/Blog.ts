import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogSection {
  heading: string;        // H2 subheading
  subheading?: string;    // Optional H3
  body: string[];         // Array of short paragraphs (2-3 sentences each)
  imageUrl?: string;      // Cloudinary URL
  imageAlt?: string;      // Alt text for SEO
  imageTitle?: string;    // Title attribute
  internalLinkText?: string;  // CTA link text
  internalLinkUrl?: string;   // Internal page link
}

export interface IBlogFAQ {
  question: string;
  answer: string;
}

export interface IBlogTOCEntry {
  anchor: string;   // e.g. "saturn-career-2026"
  label: string;    // e.g. "Saturn Effect on Career"
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  primaryKeyword: string;
  category: string;
  tags: string[];
  excerpt: string;
  readingTime: number;
  keyTakeaways: string[];
  tableOfContents: IBlogTOCEntry[];
  sections: IBlogSection[];
  faq: IBlogFAQ[];
  heroImageUrl?: string;
  heroImageAlt?: string;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSectionSchema = new Schema<IBlogSection>({
  heading: { type: String, required: true },
  subheading: { type: String },
  body: [{ type: String }],
  imageUrl: { type: String },
  imageAlt: { type: String },
  imageTitle: { type: String },
  internalLinkText: { type: String },
  internalLinkUrl: { type: String },
}, { _id: false });

const BlogFAQSchema = new Schema<IBlogFAQ>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { _id: false });

const BlogTOCSchema = new Schema<IBlogTOCEntry>({
  anchor: { type: String, required: true },
  label: { type: String, required: true },
}, { _id: false });

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    metaTitle: { type: String, required: true, maxlength: 70 },
    metaDescription: { type: String, required: true, maxlength: 165 },
    ogImage: { type: String },
    primaryKeyword: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Astrology', 'Numerology', 'Vedic', 'FEAN Method', 'Tarot', 'Graphology', 'Remedies', 'General'],
    },
    tags: [{ type: String }],
    excerpt: { type: String, required: true, maxlength: 300 },
    readingTime: { type: Number, default: 5 },
    keyTakeaways: [{ type: String }],
    tableOfContents: [BlogTOCSchema],
    sections: [BlogSectionSchema],
    faq: [BlogFAQSchema],
    heroImageUrl: { type: String },
    heroImageAlt: { type: String },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Indexes for efficient queries
BlogSchema.index({ category: 1, publishedAt: -1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ isPublished: 1, publishedAt: -1 });
BlogSchema.index({ primaryKeyword: 'text', title: 'text', tags: 'text' });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
