'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowLeft, Star, Phone, Award, Loader2 } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { FormattedText } from '@/components/ui/FormattedText';

export default function RaajeshProfilePage() {
 const { data: team = [], isLoading } = useQuery({
 queryKey: ['team'],
 queryFn: async () => {
 const res = await client.get('/team');
 return res.data?.data || [];
 }
 });

 const member = team.find((m: any) => m.name.includes('Raajesh'));

 if (isLoading) {
 return (
 <div className="min-h-screen bg-white flex items-center justify-center">
 <Loader2 className="w-8 h-8 animate-spin text-[var(--gold)]" />
 </div>
 );
 }

 // Fallbacks if not seeded
 const specializations = member?.specializations || [
 { label: 'Vedic Astrology' },
 { label: 'Chaldean Numerology' },
 { label: 'Graphology & Handwriting Analysis' },
 { label: 'Signature Science' },
 { label: 'Career Guidance Coaching' },
 { label: 'Five Elements Balance' }
 ];
 const description = member?.description || "With decades of deep study and practice in ancient Indian sciences, Rajessh Paanday has guided thousands of individuals toward clarity, confidence, and lasting success. His holistic methodology uniquely blends Vedic Astrology, Numerology, Graphology, Signature Analysis, and Five Elements principles to offer a complete, personalized roadmap for each client. Whether you are navigating career transitions, relationship challenges, financial decisions, health concerns, or seeking deeper personal growth — Raajesh Ji's grounded wisdom helps you understand your true strengths, remove hidden blockages, and align with the universe's natural timing. He is known for his practical, compassionate, and results-driven approach that empowers clients with real, actionable guidance rather than vague predictions.";
 const experienceYears = member?.experienceYears || 25;
 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
 <div className="max-w-4xl mx-auto space-y-12 relative z-10">
 
 {/* Navigation */}
 <Link href="/appointments" className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-600 hover:text-[var(--gold)] transition-colors">
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
 Back to Services
 </Link>

 {/* Profile Content layout */}
 <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
 
 {/* Photo */}
 <div className="md:col-span-5 relative group">
 <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-yellow-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
 <GoldCard flush className="border border-amber-600/30 relative overflow-hidden bg-white">
 <div className="w-full aspect-square relative overflow-hidden bg-white flex items-end justify-center">
 <img 
 src={member?.image || '/images/team_raajesh.png'} 
 alt={member?.name || 'Rajessh Paanday'} 
 className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-102"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
 </div>
 </GoldCard>
 </div>

 {/* Details */}
 <div className="md:col-span-7 space-y-6">
 <div className="space-y-2">
 <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold font-mono block">
 Founder & Chief Consultant
 </span>
 <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
 Rajessh Paanday
 </h1>
 {/* Experience badge */}
 {experienceYears > 0 ? (
 <div className="inline-flex items-center gap-2 bg-[var(--gold-50)] border border-[var(--gold-200)] rounded-full px-5 py-2 mt-2">
 <Award className="w-5 h-5 text-[var(--gold)]" />
 <span className="text-[var(--gold)] text-base md:text-lg font-bold">{experienceYears}+ Years of Experience</span>
 </div>
 ) : null}
 <div className="flex gap-1 text-[var(--gold)] pt-1">
 {[...Array(5)].map((_, i) => (
 <Star key={i} className="w-4 h-4 fill-[var(--gold)]" stroke="none" />
 ))}
 </div>
 </div>

 <div className="text-gray-600 text-sm md:text-base leading-relaxed font-bold">
 <FormattedText text={description} />
 </div>


 <div className="space-y-3 pt-2">
 <h3 className="text-[var(--gold)] text-xs font-mono uppercase tracking-widest font-semibold">Specializations</h3>
 <div className="flex flex-wrap gap-2">
 {specializations.map((spec: any, i: number) => (
 <span key={i} className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold uppercase tracking-wider bg-white border border-[var(--gold)] text-[var(--gold)] px-4 py-1.5 rounded-full">
 {spec.label || spec}
 </span>
 ))}
 </div>
 </div>

 {/* Action Buttons */}
 <div className="pt-6 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-2 gap-4">
 <a href="tel:+919922352666" className="w-full">
 <button className="w-full py-3 text-xs flex items-center justify-center gap-2 font-bold bg-blue-600 hover:bg-blue-700 text-gray-900 rounded-lg transition-colors duration-300 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
 <Phone className="w-4 h-4" /> Call Now (+91 9922352666)
 </button>
 </a>
 <a href="https://wa.me/919922352666" target="_blank" rel="noopener noreferrer" className="w-full">
 <button className="w-full py-3 text-xs flex items-center justify-center gap-2 font-bold bg-[#25d366] hover:bg-[#20ba5a] text-gray-900 rounded-lg transition-colors duration-300 shadow-[0_0_15px_rgba(37,211,102,0.2)]">
 <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
 </button>
 </a>
 </div>

 </div>

 </div>

 </div>
 </div>
 );
}
