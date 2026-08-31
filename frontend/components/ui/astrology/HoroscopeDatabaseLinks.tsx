'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { client } from '../../../lib/api/client';
import { BookOpen, Calendar, ShoppingBag, GraduationCap, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

interface HoroscopeDatabaseLinksProps {
  rashiName?: string;
  variant?: 'full' | 'pills';
  className?: string;
}

export function HoroscopeDatabaseLinks({ rashiName, variant = 'full', className = '' }: HoroscopeDatabaseLinksProps) {
  // Fetch Appointments from DB
  const { data: appointmentsRes, isLoading: loadingAppointments } = useQuery({
    queryKey: ['horoscope-appointments'],
    queryFn: async () => {
      const res = await client.get('/appointments/types');
      return res.data?.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  // Fetch Shop Products from DB
  const { data: shopRes, isLoading: loadingShop } = useQuery({
    queryKey: ['horoscope-shop'],
    queryFn: async () => {
      const res = await client.get('/shop');
      return res.data?.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  // Fetch Study Batches from DB
  const { data: batchesRes, isLoading: loadingBatches } = useQuery({
    queryKey: ['horoscope-batches'],
    queryFn: async () => {
      const res = await client.get('/batches');
      return res.data?.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const appointments = appointmentsRes || [];
  const shopItems = shopRes || [];
  const batches = batchesRes || [];

  if (variant === 'pills') {
    return (
      <div className={`mt-4 pt-4 border-t border-[#EAD5B8]/50 ${className}`}>
        <div className="flex flex-wrap gap-2 text-xs">
          {/* E-Book Pill */}
          <Link
            href="/fean-ebook"
            className="inline-flex items-center gap-1.5 bg-[#FFFDF9] hover:bg-[#FDF7EB] text-[#5A3815] font-semibold px-3 py-1.5 rounded border border-[#EAD5B8] transition shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#E38100]" />
            <span>FEAN E-Book</span>
          </Link>

          {/* Appointments Pills */}
          {appointments.length > 0 ? (
            appointments.slice(0, 2).map((a: any) => (
              <Link
                key={a._id}
                href={`/appointments/${a._id}`}
                className="inline-flex items-center gap-1.5 bg-[#FFFDF9] hover:bg-[#FDF7EB] text-[#5A3815] font-semibold px-3 py-1.5 rounded border border-[#EAD5B8] transition shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-[#8C5D30]" />
                <span className="max-w-[140px] truncate">{a.title || a.name || 'Appointment'}</span>
              </Link>
            ))
          ) : (
            <Link
              href="/appointments"
              className="inline-flex items-center gap-1.5 bg-[#FFFDF9] hover:bg-[#FDF7EB] text-[#5A3815] font-semibold px-3 py-1.5 rounded border border-[#EAD5B8] transition shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#8C5D30]" />
              <span>Book Appointment</span>
            </Link>
          )}

          {/* Shop Pills */}
          {shopItems.length > 0 ? (
            shopItems.slice(0, 2).map((s: any) => (
              <Link
                key={s._id}
                href={`/shop/${s._id}`}
                className="inline-flex items-center gap-1.5 bg-[#FFFDF9] hover:bg-[#FDF7EB] text-[#5A3815] font-semibold px-3 py-1.5 rounded border border-[#EAD5B8] transition shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#B37B47]" />
                <span className="max-w-[140px] truncate">{s.title || s.name || 'Shop Product'}</span>
              </Link>
            ))
          ) : (
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 bg-[#FFFDF9] hover:bg-[#FDF7EB] text-[#5A3815] font-semibold px-3 py-1.5 rounded border border-[#EAD5B8] transition shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#B37B47]" />
              <span>Occult Shop</span>
            </Link>
          )}

          {/* Batches Pills */}
          {batches.length > 0 ? (
            batches.slice(0, 2).map((b: any) => (
              <Link
                key={b._id}
                href={`/batches/${b._id}`}
                className="inline-flex items-center gap-1.5 bg-[#FFFDF9] hover:bg-[#FDF7EB] text-[#5A3815] font-semibold px-3 py-1.5 rounded border border-[#EAD5B8] transition shadow-xs"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#E38100]" />
                <span className="max-w-[140px] truncate">{b.title || b.name || 'Study Batch'}</span>
              </Link>
            ))
          ) : (
            <Link
              href="/batches"
              className="inline-flex items-center gap-1.5 bg-[#FFFDF9] hover:bg-[#FDF7EB] text-[#5A3815] font-semibold px-3 py-1.5 rounded border border-[#EAD5B8] transition shadow-xs"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#E38100]" />
              <span>Study Batches</span>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full mt-12 pt-8 border-t border-[#EAD5B8]/80 ${className}`}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCAF3E]/15 border border-[#E38100]/30 text-[#8C5D30] text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#E38100]" />
          <span>Occult Solutions & Services</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#5A3815]">
          {rashiName ? `Recommended Services & Products for ${rashiName}` : 'Explore Our Occult Services, Products & Courses'}
        </h3>
        <p className="text-sm text-[#5A3815]/75">
          Elevate your spiritual journey with personalized consultations, authentic remedies, e-books, and expert astrology courses.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: E-Books */}
        <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FDF7EB] border border-[#EAD5B8] rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#5A3815] text-[#FCAF3E] flex items-center justify-center font-bold shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#5A3815] text-lg leading-snug">Astrology E-Books</h4>
                <span className="text-[11px] text-[#8C5D30] font-medium font-mono uppercase tracking-wider">Direct Links</span>
              </div>
            </div>
            <p className="text-xs text-[#5A3815]/80 mb-4 leading-relaxed">
              In-depth Vedic astrology handbooks, calculation charts, and remedy guidebooks.
            </p>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E38100]"></span>
                <Link href="/fean-ebook" className="text-[#8C5D30] hover:text-[#5A3815] font-semibold hover:underline line-clamp-1">
                  FEAN Method Astrology E-Book
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E38100]"></span>
                <Link href="/fean-ebook" className="text-[#8C5D30] hover:text-[#5A3815] font-semibold hover:underline line-clamp-1">
                  Complete Astrological Remedies Guide
                </Link>
              </li>
            </ul>
          </div>
          <Link 
            href="/fean-ebook"
            className="mt-6 inline-flex items-center justify-between text-xs font-bold text-black bg-[#FCAF3E] hover:bg-[#F5900F] px-4 py-2 rounded-md transition-colors shadow-xs"
          >
            <span>Read E-Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Appointments from DB */}
        <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FDF7EB] border border-[#EAD5B8] rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#5A3815] text-[#FCAF3E] flex items-center justify-center font-bold shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#5A3815] text-lg leading-snug">Appointments</h4>
                <span className="text-[11px] text-[#8C5D30] font-medium font-mono uppercase tracking-wider">Direct Links</span>
              </div>
            </div>
            <p className="text-xs text-[#5A3815]/80 mb-4 leading-relaxed">
              Personalized 1-on-1 consultations with expert astrologers from DB.
            </p>
            <ul className="space-y-2 text-xs">
              {loadingAppointments ? (
                <li className="text-[#8C5D30]/60 italic">Loading appointments...</li>
              ) : appointments.length > 0 ? (
                appointments.slice(0, 4).map((item: any) => (
                  <li key={item._id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E38100]"></span>
                    <Link href={`/appointments/${item._id}`} className="text-[#8C5D30] hover:text-[#5A3815] font-semibold hover:underline line-clamp-1">
                      {item.title || item.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E38100]"></span>
                  <Link href="/appointments" className="text-[#8C5D30] hover:text-[#5A3815] font-semibold hover:underline">
                    Vedic Astrology Reading
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <Link 
            href="/appointments"
            className="mt-6 inline-flex items-center justify-between text-xs font-bold text-black bg-[#FCAF3E] hover:bg-[#F5900F] px-4 py-2 rounded-md transition-colors shadow-xs"
          >
            <span>View Appointments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 3: Shop Items from DB */}
        <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FDF7EB] border border-[#EAD5B8] rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#5A3815] text-[#FCAF3E] flex items-center justify-center font-bold shadow-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#5A3815] text-lg leading-snug">Occult Shop</h4>
                <span className="text-[11px] text-[#8C5D30] font-medium font-mono uppercase tracking-wider">Direct Links</span>
              </div>
            </div>
            <p className="text-xs text-[#5A3815]/80 mb-4 leading-relaxed">
              Authentic energised gemstones, rudrakshas, and spiritual products from DB.
            </p>
            <ul className="space-y-2 text-xs">
              {loadingShop ? (
                <li className="text-[#8C5D30]/60 italic">Loading shop items...</li>
              ) : shopItems.length > 0 ? (
                shopItems.slice(0, 4).map((item: any) => (
                  <li key={item._id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E38100]"></span>
                    <Link href={`/shop/${item._id}`} className="text-[#8C5D30] hover:text-[#5A3815] font-semibold hover:underline line-clamp-1">
                      {item.title || item.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E38100]"></span>
                  <Link href="/shop" className="text-[#8C5D30] hover:text-[#5A3815] font-semibold hover:underline">
                    Certified Gemstones
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <Link 
            href="/shop"
            className="mt-6 inline-flex items-center justify-between text-xs font-bold text-black bg-[#FCAF3E] hover:bg-[#F5900F] px-4 py-2 rounded-md transition-colors shadow-xs"
          >
            <span>Explore Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 4: Study Batches from DB */}
        <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FDF7EB] border border-[#EAD5B8] rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#5A3815] text-[#FCAF3E] flex items-center justify-center font-bold shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#5A3815] text-lg leading-snug">Study Batches</h4>
                <span className="text-[11px] text-[#8C5D30] font-medium font-mono uppercase tracking-wider">Direct Links</span>
              </div>
            </div>
            <p className="text-xs text-[#5A3815]/80 mb-4 leading-relaxed">
              Live & certified learning batches & courses from DB.
            </p>
            <ul className="space-y-2 text-xs">
              {loadingBatches ? (
                <li className="text-[#8C5D30]/60 italic">Loading batches...</li>
              ) : batches.length > 0 ? (
                batches.slice(0, 4).map((batch: any) => (
                  <li key={batch._id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E38100]"></span>
                    <Link href={`/batches/${batch._id}`} className="text-[#8C5D30] hover:text-[#5A3815] font-semibold hover:underline line-clamp-1">
                      {batch.title || batch.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E38100]"></span>
                  <Link href="/batches" className="text-[#8C5D30] hover:text-[#5A3815] font-semibold hover:underline">
                    Vedic Astrology Course
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <Link 
            href="/batches"
            className="mt-6 inline-flex items-center justify-between text-xs font-bold text-black bg-[#FCAF3E] hover:bg-[#F5900F] px-4 py-2 rounded-md transition-colors shadow-xs"
          >
            <span>View Batches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
