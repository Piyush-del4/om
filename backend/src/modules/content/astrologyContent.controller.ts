import { Request, Response, NextFunction } from 'express';
import { House, Graha, FAQ } from './astrologyContent.model';

// ── Public Endpoints ─────────────────────────────────────────────────────────

export async function listHouses(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const houses = await House.find({}).sort({ order: 1 });
    res.status(200).json({ success: true, data: houses });
  } catch (error) {
    next(error);
  }
}

export async function listGrahas(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const grahas = await Graha.find({}).sort({ order: 1 });
    res.status(200).json({ success: true, data: grahas });
  } catch (error) {
    next(error);
  }
}

export async function listFAQs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category } = req.query;
    const filter = category ? { category: String(category) } : {};
    const faqs = await FAQ.find(filter).sort({ order: 1 });
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    next(error);
  }
}

// ── Seed Endpoints (Admin) ───────────────────────────────────────────────────

export async function seedAstrologyContent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const houseCount = await House.countDocuments();
    const grahaCount = await Graha.countDocuments();
    const faqCount = await FAQ.countDocuments();

    if (houseCount > 0 || grahaCount > 0 || faqCount > 0) {
      res.status(409).json({
        success: false,
        error: { code: 'CONFLICT', message: 'Astrology content already seeded.' },
      });
      return;
    }

    const houses = [
      { num: '1st', name: 'Lagna (Self)', desc: 'Physical appearance, health, personality, and life path.', order: 1 },
      { num: '2nd', name: 'Dhana (Wealth)', desc: 'Finances, family background, speech, and early childhood.', order: 2 },
      { num: '3rd', name: 'Sahaja (Courage)', desc: 'Siblings, communication, short journeys, and willpower.', order: 3 },
      { num: '4th', name: 'Bandhu (Happiness)', desc: 'Mother, home, properties, vehicles, and peace of mind.', order: 4 },
      { num: '5th', name: 'Putra (Intellect)', desc: 'Children, education, romance, creativity, and past karma.', order: 5 },
      { num: '6th', name: 'Ari (Obstacles)', desc: 'Health, enemies, daily routines, service, and debts.', order: 6 },
      { num: '7th', name: 'Yuvati (Partnership)', desc: 'Marriage, business partners, public life, and legal contracts.', order: 7 },
      { num: '8th', name: 'Randhra (Longevity)', desc: 'Unearned wealth, transformation, research, and occult sciences.', order: 8 },
      { num: '9th', name: 'Dharma (Luck)', desc: 'Spirituality, higher education, father, fortune, and travel.', order: 9 },
      { num: '10th', name: 'Karma (Career)', desc: 'Profession, public status, authority, and accomplishments.', order: 10 },
      { num: '11th', name: 'Labha (Gains)', desc: 'Income, elder siblings, social circle, and fulfilled desires.', order: 11 },
      { num: '12th', name: 'Vyaya (Losses)', desc: 'Subconscious, spirituality, isolation, foreign travels, and sleep.', order: 12 },
    ];

    const grahas = [
      { name: 'Surya (Sun)', sign: 'Soul & Authority', desc: 'Represents father, government relations, career status, vitality, and inner confidence.', order: 1 },
      { name: 'Chandra (Moon)', sign: 'Mind & Emotion', desc: 'Governs mother, emotional health, peace of mind, intuition, and memory capacity.', order: 2 },
      { name: 'Mangal (Mars)', sign: 'Energy & Drive', desc: 'Rules courage, physical strength, real estate, anger management, and action.', order: 3 },
      { name: 'Budha (Mercury)', sign: 'Intellect & Speech', desc: 'Controls logic, analytical abilities, business acumen, communication, and education.', order: 4 },
      { name: 'Guru (Jupiter)', sign: 'Wisdom & Expansion', desc: 'Governs luck, children, husband (for women), higher learning, wealth, and spirituality.', order: 5 },
      { name: 'Shukra (Venus)', sign: 'Love & Luxury', desc: 'Represents spouse (for men), vehicle purchase, arts, comfort, relationships, and refinement.', order: 6 },
      { name: 'Shani (Saturn)', sign: 'Karma & Discipline', desc: 'Rules structure, lifespan, delay, hard work, lessons, public service, and justice.', order: 7 },
      { name: 'Rahu (North Node)', sign: 'Obsession & Future', desc: 'Represents technology, foreign cultures, desires, illusions, and sudden progress.', order: 8 },
      { name: 'Ketu (South Node)', sign: 'Detachment & Past', desc: 'Represents spirituality, liberation (Moksha), deep research, isolation, and past life skills.', order: 9 },
    ];

    const faqs = [
      { category: 'Astrology', q: 'What information do I need for a reading?', a: 'You will need your exact date of birth, time of birth (with minute-level accuracy if possible), and place of birth.', order: 1 },
      { category: 'Astrology', q: 'How long does a consultation take?', a: 'Standard consultation slots range between 30 to 60 minutes, during which we discuss chart details and remedies.', order: 2 },
      { category: 'Astrology', q: 'Can I ask specific questions during the reading?', a: 'Yes! We encourage users to list their questions beforehand so we can dedicate appropriate focus to specific houses.', order: 3 },
      { category: 'Astrology', q: 'Are remedies suggested during the session?', a: 'Absolutely. We suggest practical, non-superstitious remedies such as mantras, specific lifestyle changes, and gemstones.', order: 4 },
      { category: 'Astrology', q: 'Is my birth information kept confidential?', a: 'Yes. All charts and data profiles are encrypted in our database and never shared with third parties.', order: 5 },
    ];

    await House.insertMany(houses);
    await Graha.insertMany(grahas);
    await FAQ.insertMany(faqs);

    res.status(201).json({ success: true, message: `Seeded ${houses.length} houses, ${grahas.length} grahas, ${faqs.length} FAQs.` });
  } catch (error) {
    next(error);
  }
}

// ── Admin CRUD ───────────────────────────────────────────────────────────────

export async function createFAQ(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
}

export async function updateFAQ(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByIdAndUpdate(id, req.body, { new: true });
    if (!faq) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'FAQ not found' } });
      return;
    }
    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
}

export async function deleteFAQ(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'FAQ not found' } });
      return;
    }
    res.status(200).json({ success: true, data: { message: 'FAQ deleted' } });
  } catch (error) {
    next(error);
  }
}
