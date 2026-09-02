'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
 Compass, Hash, Layers, PenTool, Heart, Shield, Users, Clock,
 Star, Award, Sparkles, Calendar, MessageSquare, ChevronRight,
 Briefcase, Flame, Leaf, Eye, Video, Loader2
} from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { FormattedText } from '@/components/ui/FormattedText';

// Map icon string names from the DB to actual Lucide components
const iconMap: Record<string, React.ReactNode> = {
 Compass: <Compass className="w-4 h-4" />,
 Hash: <Hash className="w-4 h-4" />,
 Layers: <Layers className="w-4 h-4" />,
 PenTool: <PenTool className="w-4 h-4" />,
 Heart: <Heart className="w-4 h-4" />,
 Users: <Users className="w-4 h-4" />,
 Briefcase: <Briefcase className="w-4 h-4" />,
 Flame: <Flame className="w-4 h-4" />,
 Leaf: <Leaf className="w-4 h-4" />,
 Eye: <Eye className="w-4 h-4" />,
 Video: <Video className="w-4 h-4" />,
 MessageSquare: <MessageSquare className="w-4 h-4" />,
};

const whyChooseUs = [
 {
 icon: <Award className="w-6 h-6" />,
 title: 'Decades of Expertise',
 desc: 'Our lead consultant brings years of dedicated study and real-world practice across astrology, numerology, graphology, and five elements — ensuring guidance rooted in genuine mastery.',
 },
 {
 icon: <Users className="w-6 h-6" />,
 title: 'Holistic & Personalized',
 desc: 'We never give generic advice. Every reading is individually prepared based on your unique birth data, name, handwriting, and life circumstances for truly tailored guidance.',
 },
 {
 icon: <Shield className="w-6 h-6" />,
 title: 'Complete Confidentiality',
 desc: 'Your personal information, birth details, and session discussions are kept strictly private. We maintain absolute discretion and respect for every client\'s privacy.',
 },
 {
 icon: <Sparkles className="w-6 h-6" />,
 title: 'Multi-Science Approach',
 desc: 'By combining astrology, numerology, tarot, graphology, and five elements, we provide a 360° view of your situation — far more powerful than any single discipline alone.',
 },
 {
 icon: <Clock className="w-6 h-6" />,
 title: 'Flexible Online Sessions',
 desc: 'All consultations happen conveniently via video call, available 7 days a week. Simply book your preferred slot and join from the comfort of your home, anywhere in the world.',
 },
 {
 icon: <Heart className="w-6 h-6" />,
 title: 'Client-Centered Support',
 desc: 'We listen first, advise second. Our consultants take time to understand your situation deeply, ensuring every session feels supportive, empowering, and genuinely helpful.',
 },
];

interface TeamMember {
 _id: string;
 name: string;
 role: string;
 image: string;
 imageFit: 'cover' | 'contain';
 initials: string;
 specializations: { icon: string; label: string }[];
 description: string;
 accent: string;
 borderColor: string;
 experienceYears?: number;
}

export default function AboutUsPage() {
 const { data: teamData, isLoading: loadingTeam } = useQuery<TeamMember[]>({
 queryKey: ['team-members'],
 queryFn: async () => {
 const res = await client.get('/team');
 return res.data?.data || [];
 },
 staleTime: 1000 * 60 * 10, // 10 min cache
 });

 const team = teamData ?? [];

 return (
 <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
 {/* SEO Meta */}
 <title>About Us — OM Astrology AMC | Meet Our Expert Team</title>

 {/* ── Hero Section ── */}
 <section className="relative py-28 px-4 sm:px-6 overflow-hidden bg-white ">
 {/* Background layers */}
 <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black z-0 hidden " />
 <div className="absolute inset-0 opacity-10 z-0 hidden "
 style={{
 backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(204,143,51,0.4) 0%, transparent 60%), radial-gradient(circle at 75% 65%, rgba(204,143,51,0.2) 0%, transparent 50%)',
 }}
 />
 {/* Rotating geometry */}
 <motion.div
 animate={{ rotate: 360 }}
 transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
 className="absolute top-10 right-10 opacity-5 w-96 h-96 pointer-events-none"
 >
 <svg viewBox="0 0 100 100" className="w-full h-full">
 <polygon points="50,5 93.3,80 6.7,80" fill="none" stroke="#cc8f33" strokeWidth="0.3" />
 <polygon points="50,95 93.3,20 6.7,20" fill="none" stroke="#cc8f33" strokeWidth="0.3" />
 <circle cx="50" cy="50" r="45" fill="none" stroke="#cc8f33" strokeWidth="0.2" />
 </svg>
 </motion.div>

 <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
 <motion.span
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold block"
 >
 The People Behind Your Journey
 </motion.span>
 <motion.h1
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7, delay: 0.1 }}
 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
 >
 Meet the Experts{' '}
 <span
 style={{
 background: 'linear-gradient(135deg, #f5d078 0%, #c8920a 50%, #f0c040 100%)',
 WebkitBackgroundClip: 'text',
 WebkitTextFillColor: 'transparent',
 backgroundClip: 'text',
 }}
 >
 Behind Your Journey
 </span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7, delay: 0.2 }}
 className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
 >
 At OM Astrology AMC, we are a dedicated team of specialists in ancient Indian occult sciences — united by a single mission: to help you live with clarity, purpose, and confidence.
 </motion.p>
 <motion.div
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ duration: 0.6, delay: 0.4 }}
 className="h-0.5 w-20 bg-[var(--gold)] mx-auto"
 />
 </div>
 </section>

 {/* ── Team Members Section (Detailed) ── */}
 <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
 {loadingTeam ? (
 <div className="flex items-center justify-center py-24">
 <Loader2 className="w-8 h-8 animate-spin text-[var(--gold)]" />
 </div>
 ) : team.map((member, idx) => (
 <motion.div
 key={member._id}
 initial={{ opacity: 0, y: 50 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 'some' }}
 transition={{ duration: 0.7, delay: 0.1 }}
 className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${idx % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
 >
 {/* Photo Card */}
 <div className="lg:col-span-4 lg:[direction:ltr]">
 <div className="relative group">
 <div className={`absolute inset-0 bg-gradient-to-br ${member.accent} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`} />
 <GoldCard flush className={`border ${member.borderColor} relative overflow-hidden bg-white`}>
 <div className="w-full aspect-square relative overflow-hidden bg-white flex items-end justify-center">
 <img
 src={member.image}
 alt={member.name}
 className={`w-full h-full group-hover:scale-105 transition-transform duration-700 ${
 member.imageFit === 'contain'
 ? 'object-contain object-bottom'
 : 'object-cover object-top'
 }`}
 />
 {member.imageFit !== 'contain' && (
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
 )}
 <div className="absolute bottom-0 inset-x-0 p-5 bg-[var(--gold)] bg-opacity-90">
 <h3
 className="font-serif text-2xl font-extrabold text-black tracking-tight leading-tight"
 >
 {member.name}
 </h3>
 <p className="text-black/70 text-xs font-bold tracking-widest uppercase mt-1">{member.role}</p>
 </div>
 </div>
 {/* Specialization badges */}
 <div className="p-4 flex flex-wrap gap-2 bg-white">
 {member.specializations.map((spec: any, i: number) => (
 <span
 key={i}
 className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold uppercase tracking-wider bg-white border border-[var(--gold)] text-[var(--gold)] px-4 py-1.5 rounded-full"
 >
 {spec.label || spec}
 </span>
 ))}
 </div>
 </GoldCard>
 </div>
 </div>

 {/* Bio Content */}
 <div className="lg:col-span-8 lg:[direction:ltr] space-y-5">
 <div className="space-y-1">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-[var(--gold-50)] border border-[var(--gold-200)] flex items-center justify-center text-[var(--gold)] font-bold text-sm font-serif">
 {member.initials}
 </div>
 <div>
 <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">{member.name}</h2>
 <p className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold">{member.role}</p>
 {/* Experience badge */}
 {member.experienceYears && member.experienceYears > 0 ? (
 <div className="inline-flex items-center gap-2 bg-[var(--gold-50)] border border-[var(--gold-200)] rounded-full px-5 py-2 mt-3">
 <Award className="w-5 h-5 text-[var(--gold)]" />
 <span className="text-[var(--gold)] text-base md:text-lg font-bold">{member.experienceYears}+ Years of Experience</span>
 </div>
 ) : null}
 </div>
 </div>
 </div>

 <div className="h-0.5 w-12 bg-[var(--gold)]" />

 <div className="text-gray-600 text-base leading-relaxed font-bold">
 <FormattedText text={member.description} />
 </div>


 {/* Rating stars */}
 <div className="flex gap-1">
 {[...Array(5)].map((_, i) => (
 <Star key={i} className="w-4 h-4 text-[var(--gold)] fill-[var(--gold)]" />
 ))}
 <span className="text-gray-600 text-xs ml-2 self-center">Trusted by thousands of clients worldwide</span>
 </div>

 {member.name !== 'Aayush Kumar' && (
 <Link href="/#book">
 <GoldButton variant="outlined" className="px-6 py-2.5 text-sm mt-2">
 Book a Session <ChevronRight className="w-4 h-4 ml-1" />
 </GoldButton>
 </Link>
 )}
 </div>
 </motion.div>
 ))}
 </section>

 {/* Divider */}
 <div className="max-w-6xl mx-auto px-8">
 <div className="border-t border-[var(--gold-100)]/30" />
 </div>

 {/* ── Why Choose Us ── */}
 <motion.section
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 'some' }}
 transition={{ duration: 0.7 }}
 className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12"
 >
 <div className="text-center space-y-3">
 <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold block">
 Our Promise to You
 </span>
 <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">Why Choose OM Astrology?</h2>
 <div className="h-0.5 w-20 bg-[var(--gold)] mx-auto" />
 <p className="text-gray-600 text-sm max-w-xl mx-auto pt-1">
 We combine ancient wisdom with genuine care — delivering insights that are practical, confidential, and truly life-changing.
 </p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {whyChooseUs.map((item, idx) => (
 <motion.div
 key={item.title}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: idx * 0.08 }}
 >
 <GoldCard
 className="border border-[var(--gold-100)] p-6 space-y-4 h-full hover:border-[var(--gold-300)] transition-all duration-300 group"
 >
 <div className="w-12 h-12 rounded-xl bg-[var(--gold-50)] border border-[var(--gold-200)] flex items-center justify-center text-[var(--gold)] group-hover:scale-110 transition-transform duration-300">
 {item.icon}
 </div>
 <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-[var(--gold)] transition-colors duration-300">
 {item.title}
 </h3>
 <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
 </GoldCard>
 </motion.div>
 ))}
 </div>
 </motion.section>

 {/* Divider */}
 <div className="max-w-6xl mx-auto px-8">
 <div className="border-t border-[var(--gold-100)]/30" />
 </div>

 {/* ── Call to Action ── */}
 <motion.section
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 'some' }}
 transition={{ duration: 0.7 }}
 className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6"
 >
 <div
 className="absolute inset-0 opacity-20 pointer-events-none"
 style={{
 backgroundImage: 'radial-gradient(ellipse at center, rgba(204,143,51,0.3) 0%, transparent 70%)',
 }}
 />
 <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold block relative z-10">
 Start Your Journey Today
 </span>
 <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 relative z-10">
 Ready for Clarity &amp; Direction?
 </h2>
 <p className="text-gray-600 text-base leading-relaxed max-w-xl mx-auto relative z-10">
 Take the first step toward a more aligned, purposeful life. Book a personalized consultation with our experts — and discover what the stars, numbers, and your own handwriting have been telling you all along.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
 <Link href="/#book">
 <GoldButton variant="filled" className="px-8 py-3 text-base flex items-center gap-2">
 <Calendar className="w-4 h-4" /> Book an Appointment
 </GoldButton>
 </Link>
 <Link href="/astrology">
 <GoldButton variant="outlined" className="px-8 py-3 text-base flex items-center gap-2">
 <Compass className="w-4 h-4" /> Explore Services
 </GoldButton>
 </Link>
 </div>
 </motion.section>
 </div>
 );
}
