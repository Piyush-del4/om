import { Request, Response, NextFunction } from 'express';
import { TeamMember } from './team.model';

// ── Public Routes ────────────────────────────────────────────────────────────

/**
 * GET /api/v1/team
 * Returns all active team members sorted by order.
 */
export async function listTeamMembers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const members = await TeamMember.find({ isActive: true });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
}

// ── Admin Routes ─────────────────────────────────────────────────────────────

/**
 * POST /api/v1/team
 * Create a new team member (Admin only).
 */
export async function createTeamMember(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, role, image, imageFit, initials, specializations, description, accent, borderColor, order, experienceYears } = req.body;
    const member = await TeamMember.create({
      name, role, image, imageFit, initials, specializations, description, accent, borderColor, order, experienceYears,
    });
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/v1/team/:id
 * Update an existing team member (Admin only).
 */
export async function updateTeamMember(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const updates = req.body;

    const member = await TeamMember.findById(id);
    if (!member) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Team member not found' } });
      return;
    }

    Object.assign(member, updates);
    await member.save();

    res.status(200).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/v1/team/:id
 * Soft-delete a team member (Admin only).
 */
export async function deleteTeamMember(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const member = await TeamMember.findById(id);
    if (!member) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Team member not found' } });
      return;
    }

    member.isActive = false;
    await member.save();

    res.status(200).json({ success: true, data: { message: 'Team member removed successfully' } });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/team/seed
 * Seeds the initial team members if the collection is empty (Admin only).
 * Run once on deployment to populate the DB from the original hardcoded data.
 */
export async function seedTeamMembers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const count = await TeamMember.countDocuments();
    if (count > 0) {
      res.status(409).json({ success: false, error: { code: 'CONFLICT', message: 'Team data already seeded.' } });
      return;
    }

    const initialTeam = [
      {
        name: 'Raajesh S Panday',
        role: 'Founder & Chief Consultant',
        image: '/images/team_raajesh.png',
        imageFit: 'cover',
        initials: 'RP',
        specializations: [
          'Vedic Astrology',
          'Chaldean Numerology',
          'Graphology & Handwriting Analysis',
          'Signature Science',
          'Career Guidance Coaching',
          'Five Elements Balance'
        ],
        description: 'With decades of deep study and practice in ancient Indian sciences, Raajesh S Panday has guided thousands of individuals toward clarity, confidence, and lasting success. His holistic methodology uniquely blends Vedic Astrology, Numerology, Graphology, Signature Analysis, and Five Elements principles to offer a complete, personalized roadmap for each client. Whether you are navigating career transitions, relationship challenges, financial decisions, health concerns, or seeking deeper personal growth — Raajesh Ji\'s grounded wisdom helps you understand your true strengths, remove hidden blockages, and align with the universe\'s natural timing. He is known for his practical, compassionate, and results-driven approach that empowers clients with real, actionable guidance rather than vague predictions.',
        accent: 'from-amber-600/20 to-yellow-600/5',
        borderColor: 'border-amber-600/30',
        order: 1,
        experienceYears: 25,
      },
      {
        name: 'Kusum Panday',
        role: 'Tarot Card Reader & Wellness Coach',
        image: '/images/team_kusum.png',
        imageFit: 'contain',
        initials: 'KP',
        specializations: [
          'Tarot Card Reader',
          'Relationship Coach',
          'Yoga Teacher'
        ],
        description: 'Kusum Panday brings a deeply compassionate and nurturing energy to every session. As an experienced Tarot Card Reader, Relationship Coach, and certified Yoga Teacher, she creates a safe and non-judgmental space for clients to explore their emotions, heal old wounds, and rediscover their inner strength. Her tarot readings go beyond prediction — they act as a mirror, reflecting the subconscious patterns that influence your choices in love, relationships, and daily life. Combined with relationship coaching techniques and the mindful discipline of yoga, Kusum Ji helps clients find emotional balance, improve communication in relationships, overcome anxiety, and cultivate a deeper connection with themselves. Her warm and intuitive approach makes even the most complex life situations feel manageable and clear.',
        accent: 'from-rose-600/20 to-pink-600/5',
        borderColor: 'border-rose-600/30',
        order: 2,
        experienceYears: 15,
      },
      {
        name: 'Aayush Kumar',
        role: 'Social Media Manager',
        image: '/images/team_aayush.png',
        imageFit: 'contain',
        initials: 'AK',
        specializations: [
          'Social Media Strategy',
          'Content Creation',
          'Community Engagement',
          'Digital Branding'
        ],
        description: 'Aayush Kumar is the digital voice behind OM Astrology AMC\'s growing online presence. With a keen eye for compelling storytelling and a deep understanding of social media algorithms, he crafts content that resonates authentically with audiences seeking spiritual guidance and occult wisdom. From visually stunning posts and educational reels to community management and campaign strategy, Aayush ensures that the profound knowledge shared by the OM Astrology team reaches the right people at the right time. His work bridges the ancient with the modern — making astrology, numerology, and tarot accessible, relatable, and engaging for today\'s digital-first audience across Instagram, YouTube, and beyond.',
        accent: 'from-blue-600/20 to-cyan-600/5',
        borderColor: 'border-blue-600/30',
        order: 3,
        experienceYears: 5,
      },
    ];

    const seeded = await TeamMember.insertMany(initialTeam);
    res.status(201).json({ success: true, data: seeded, message: `Seeded ${seeded.length} team members.` });
  } catch (error) {
    next(error);
  }
}
