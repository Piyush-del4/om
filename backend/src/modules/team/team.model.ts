import { Schema, model, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  role: string;
  image: string;
  imageFit: 'cover' | 'contain';
  initials: string;
  specializations: string[];
  description: string;
  accent: string;
  borderColor: string;
  order: number;
  experienceYears: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    imageFit: { type: String, enum: ['cover', 'contain'], default: 'cover' },
    initials: { type: String, required: true, maxlength: 3 },
    specializations: { type: [String], default: [] },
    description: { type: String, default: '' },
    accent: { type: String, default: 'from-amber-600/20 to-yellow-600/5' },
    borderColor: { type: String, default: 'border-amber-600/30' },
    order: { type: Number, default: 0 },
    experienceYears: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Sort by order by default
TeamMemberSchema.pre(/^find/, function (this: any) {
  this.sort({ order: 1 });
});

export const TeamMember = model<ITeamMember>('TeamMember', TeamMemberSchema);
export default TeamMember;
