'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '../auth/AuthProvider';
import { client } from '../lib/api/client';
import { env } from '../lib/env';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Compass, Hash, Layers, PenTool, Calendar, Check, AlertCircle, ShoppingCart, Star, Quote, HelpCircle, Brain, Briefcase, PhoneCall, Building2, Heart, ArrowRight } from 'lucide-react';
import { GoldButton } from '../components/ui/GoldButton';
import { GoldCard } from '../components/ui/GoldCard';
import { CosmicHeroBackground } from '../components/ui/CosmicHeroBackground';
import { BatchCardSkeleton, ShopItemSkeleton } from '../components/ui/Skeleton';
import { FormattedText } from '../components/ui/FormattedText';

const testimonials = [
  {
    name: "Rohan Deshmukh",
    initials: "RD",
    role: "SaaS Founder, Mumbai",
    quote: "I was not sure about name spelling change at first. But after Numerology consultation and following the suggested business launch date from my birth chart, everything changed. We grew from 3 clients to 45 clients in just 8 months!"
  },
  {
    name: "Ananya Mehta",
    initials: "AM",
    role: "Creative Director, Delhi",
    quote: "Dr. Sen looked at my handwriting and found I had a self-doubt pattern. She gave me simple daily writing exercises. Within a few weeks, I felt much more focused and my anxiety reduced a lot."
  },
  {
    name: "Sarah Jenkins",
    initials: "SJ",
    role: "Jungian Analyst, London",
    quote: "My Tarot session with Sarah was very eye-opening. For 2 years I could not decide my next career step. After the reading, I clearly understood what was holding me back and finally had the confidence to make my move."
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    role: "Product Manager, Bengaluru",
    quote: "Unbelievably accurate! The Transit report predicted a career transition in September, and I received an unexpected job offer from Google exactly then. The remedies suggested were very practical."
  },
  {
    name: "Dr. Amit Patel",
    initials: "AP",
    role: "Cardiologist, Ahmedabad",
    quote: "As a doctor, I was skeptical. But the handwriting analysis session accurately pointed out my stress triggers. The recommended stroke corrections helped me regain calm during surgery hours."
  },
  {
    name: "Clara Dubois",
    initials: "CD",
    role: "Writer, Paris",
    quote: "The Tarot reading felt like therapy. It bypassed my intellectual defenses and got straight to the heart of my creative block. Highly recommend OM Astrology for authentic guidance."
  },
  {
    name: "Vikram Aditya Rao",
    initials: "VR",
    role: "Real Estate Developer, Hyderabad",
    quote: "The auspicious date (Muhurat) selected for our new project launch was a blessing. Despite market slowdowns, 90% of our units sold out in the first week. Astrological timing is real."
  },
  {
    name: "Sunita Krishnan",
    initials: "SK",
    role: "Teacher, Chennai",
    quote: "Tarot and Numerology reading helped me choose the right path during a very dark phase in my family. The guidance was incredibly accurate and compassionate."
  },
  {
    name: "Rajesh Nair",
    initials: "RN",
    role: "IT Director, Kochi",
    quote: "I was facing continuous delays in my visa approval. The astrologer suggested a simple daily mantra. Within 12 days, my passport arrived with the visa. Coincidence or cosmos, it worked."
  },
  {
    name: "Michael Vance",
    initials: "MV",
    role: "Startup Lead, San Francisco",
    quote: "Their holistic approach combining astrology with graphology is unique. It gave me both macro timing (when to scale) and micro tools (improving focus through writing). Incredible value."
  },
  {
    name: "Karan Johar",
    initials: "KJ",
    role: "Restaurateur, Chandigarh",
    quote: "The Gemstone recommendation for my career block worked wonders. I feel much more energetic and our restaurant business has seen a steady 30% month-on-month growth."
  },
  {
    name: "Divya Suryavanshi",
    initials: "DS",
    role: "Fashion Designer, Jaipur",
    quote: "Their tarot readings are magical! I got clear insight on which collections to launch. It saved me from a major financial mistake."
  }
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const bgParallaxY = useTransform(scrollY, [0, 800], [0, 120]);
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = 'OM Astrology AMC — Occult Science & Astrology Consultations';
  }, []);

  // Booking states
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [phone, setPhone] = useState('');

  // Fetch active batches
  const { data: batches, isLoading: isLoadingBatches } = useQuery({
    queryKey: ['public-batches'],
    queryFn: async () => {
      const res = await client.get('/batches');
      return res.data?.data || [];
    },
  });

  // Fetch team members
  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const res = await client.get('/team');
      return res.data?.data || [];
    },
  });

  // Fetch shop items
  const { data: shopItems, isLoading: isLoadingShopItems } = useQuery({
    queryKey: ['public-shop-items'],
    queryFn: async () => {
      const res = await client.get('/shop');
      return res.data?.data || [];
    },
  });
  // Fetch reviews (success stories)
  const { data: dynamicReviews = [] } = useQuery({
    queryKey: ['success-stories'],
    queryFn: async () => {
      const res = await client.get('/reviews/success-stories');
      return res.data?.data || [];
    },
  });

  // Submit review mutation
  const submitReviewMutation = useMutation({
    mutationFn: async (data: { name: string; rating: number; comment: string }) => {
      return client.post('/reviews', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['success-stories'] });
      alert('Thank you! Your review has been submitted successfully.');
      setReviewForm({ name: '', rating: 5, comment: '' });
    },
    onError: (err: any) => {
      alert(err.response?.data?.error || 'Failed to submit review. Please try again.');
    },
  });

  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return client.post('/shop/cart/items', { itemId, quantity: 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert('Item added to cart!');
      router.push('/shop/cart');
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Failed to add to cart');
    },
  });

  const handleAddToCart = (itemId: string) => {
    if (!isAuthenticated) {
      alert('Please login to add items to your cart.');
      router.push('/login');
      return;
    }
    addToCartMutation.mutate(itemId);
  };

  // Fetch appointment types
  const { data: appointmentTypes } = useQuery({
    queryKey: ['appointmentTypes'],
    queryFn: async () => {
      const res = await client.get('/appointments/types');
      return res.data?.data || [];
    },
  });

  const selectedType = appointmentTypes?.find((t: any) => t._id === selectedTypeId);

  // Fetch available slots when type and date are selected
  const { data: availableSlots, isFetching: isFetchingSlots } = useQuery({
    queryKey: ['slots', selectedDate, selectedType?.duration],
    queryFn: async () => {
      if (!selectedDate || !selectedType) return [];
      const res = await client.get('/appointments/slots', {
        params: {
          date: selectedDate,
          duration: selectedType.duration,
        },
      });
      return res.data?.data || [];
    },
    enabled: !!selectedDate && !!selectedType,
  });

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) { resolve(true); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Booking mutation
  const bookingMutation = useMutation({
    mutationFn: async () => {
      if (!selectedTypeId || !selectedTimeSlot) {
        throw new Error('Please select type and time slot');
      }
      const res = await client.post('/appointments', {
        appointmentTypeId: selectedTypeId,
        scheduledAt: selectedTimeSlot,
      });
      return res.data?.data;
    },
    onSuccess: async (data: any) => {
      // Free appointment — confirmed immediately
      if (!data.paymentRequired) {
        alert('🎉 Consultation booked successfully! A confirmation email and Google Calendar event have been created.');
        setSelectedTypeId('');
        setSelectedDate('');
        setSelectedTimeSlot('');
        return;
      }

      // Paid appointment — open Razorpay checkout
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert('Failed to load payment gateway. Please check your connection.');
        return;
      }

      const options = {
        key: data.key || env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'OM Astrology AMC',
        description: `Consultation: ${selectedType?.name || 'Appointment'}`,
        order_id: data.razorpayOrderId,
        handler: async (response: any) => {
          try {
            await client.post('/appointments/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            setSelectedTypeId('');
            setSelectedDate('');
            setSelectedTimeSlot('');
            alert('🎉 Payment successful! Your consultation slot has been confirmed.');
          } catch (err: any) {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || '',
        },
        theme: { color: '#cc8f33' },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    },
    onError: (err: any) => {
      const msg = err.response?.data?.error?.message || err.message || 'Booking failed';
      alert(`❌ Error: ${msg}`);
    },
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to book a consultation.');
      router.push('/login');
      return;
    }
    bookingMutation.mutate();
  };

  const services = [
    {
      title: 'Astrology Readings',
      id: 'astrology',
      desc: 'Know your life path, best career options, and important life timings from your birth chart and planetary positions.',
      icon: <Compass className="w-12 h-12 text-[var(--gold)] animate-spin-slow" />,
      link: '/astrology',
      image: '/images/astrology_zodiac_realistic.png',
      tagline: 'LIFE SET WHEN PLANETS CONNECT',
      taglineSize: '26px',
    },
    {
      title: 'Numerology Analysis',
      id: 'numerology',
      desc: 'Find your lucky numbers, check if your name spelling is correct, and know the best time for important decisions in life.',
      icon: <Hash className="w-12 h-12 text-[var(--gold)] hover:scale-110 transition-transform duration-300" />,
      link: '/numerology',
      image: '/images/numerology_brain.jpg',
      tagline: 'BORN WITH NUMBERS',
    },
    {
      title: 'Tarot Consultations',
      id: 'tarot',
      desc: 'Get clear answers about your relationship, job, or future plans through a simple and honest Tarot card reading.',
      icon: <Layers className="w-12 h-12 text-[var(--gold)] hover:-translate-y-2 transition-transform duration-300" />,
      link: '/tarot-card',
      image: '/images/tarot_card_hero.png',
      tagline: 'PREDICTION IN ONE MIN',
    },
    {
      title: 'Graphology & Handwriting',
      id: 'graphology',
      desc: 'Understand your personality and hidden strengths by analyzing your handwriting and signature.',
      icon: <PenTool className="w-12 h-12 text-[var(--gold)]" />,
      link: '/graphology',
      image: '/images/step_analyze_realistic.png',
      tagline: 'Sign करें ✍️ , Shine करें ✨...',
      taglineSize: '24px',
    },
    {
      title: 'Happy Profession & Career Guidance',
      id: 'profession-career',
      desc: 'Find the ideal career direction aligned with your 10th house and Amatyakaraka to achieve success and happiness.',
      icon: <Briefcase className="w-12 h-12 text-[var(--gold)] animate-pulse" />,
      link: '/profession-career',
      image: '/images/career_blueprint_realistic.png',
    },
    {
      title: 'Lucky Mobile Number Selection',
      id: 'lucky-mobile',
      desc: 'Align your digital communication vibration with your driver and conductor numbers to attract wealth.',
      icon: <PhoneCall className="w-12 h-12 text-[var(--gold)]" />,
      link: '/lucky-mobile',
      image: '/images/mobile_numerology_realistic.png',
    },
    {
      title: 'Corporate & Brand Numerology',
      id: 'corporate-numerology',
      desc: 'Optimize your business name spelling, logo design colors, and incorporation date to secure financial gains.',
      icon: <Building2 className="w-12 h-12 text-[var(--gold)]" />,
      link: '/corporate-numerology',
      image: '/images/corporate_numerology_realistic.png',
    },
    {
      title: 'Marriage Matching',
      id: 'marriage-matching',
      desc: ' deep analysis of 36 Gunas, Manglik Dosha, and 7th house compatibility for a lifelong happy union.',
      icon: <Heart className="w-12 h-12 text-red-500 fill-red-500" />,
      link: '/marriage-matching',
      image: '/images/marriage_matching_realistic.png',
    },
    {
      title: 'Name Correction',
      id: 'name-correction',
      desc: 'Align your name vibrations with your birth blueprint to remove life blockages and invite prosperity.',
      icon: <PenTool className="w-12 h-12 text-[var(--gold)]" />,
      link: '/name-correction',
      image: '/images/step_realign_realistic.png',
      tagline: 'नाम सही तो काम सही',
      taglineSize: '22px',
    },
  ];

  return (
    <div className="relative sacred-geometry-bg radial-mesh-bg min-h-screen bg-black overflow-hidden flex flex-col text-white">
      {/* SEO head tags */}
      {/* Background sacred geometry SVG lines */}
      <motion.div style={{ y: bgParallaxY }} className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-[80vw] h-[80vw] animate-spin-slow">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#cc8f33" strokeWidth="0.2" />
          <polygon points="50,5 93.3,30 93.3,80 50,95 6.7,80 6.7,30" fill="none" stroke="#cc8f33" strokeWidth="0.1" />
          <polygon points="50,5 93.3,80 6.7,80" fill="none" stroke="#cc8f33" strokeWidth="0.1" />
          <polygon points="50,95 93.3,30 6.7,30" fill="none" stroke="#cc8f33" strokeWidth="0.1" />
        </svg>
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 min-h-[85vh] overflow-hidden">
        {/* Background Animation */}
        <CosmicHeroBackground />

        {/* Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          <span className="text-[var(--gold)] text-sm uppercase tracking-widest font-semibold block font-mono">
            Life Set when Planet Connect
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Unlock the <span className="gold-gradient-text">Mysteries</span> <br /> of the Universe
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Get honest and helpful guidance in Astrology, Numerology, Tarot, and Graphology from our experienced consultants.
          </p>
        </motion.div>
      </section>



      {/* Categorized Services Grid */}
      <section className="relative z-10 py-16 px-4 bg-black/50">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Our <span className="text-[var(--gold)]">Services</span></h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto">Choose the service that fits your needs and start your journey toward clarity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Consultation Card */}
            <div className="bg-neutral-900 border border-neutral-800 hover:border-[var(--gold)]/50 rounded-2xl p-8 flex flex-col relative overflow-hidden group transition-colors text-left">
              <div className="absolute top-4 right-4 text-xs font-semibold bg-[var(--gold)]/20 text-[var(--gold)] px-2 py-1 rounded">1-on-1</div>
              <div className="w-16 h-16 rounded-full bg-black border border-[var(--gold)]/30 flex items-center justify-center mb-6">
                <PhoneCall className="w-8 h-8 text-[var(--gold)] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">Personal Consultation</h3>
              <p className="text-gray-400 text-sm mb-8 flex-grow">Get personalized guidance for clear life decisions from our expert astrologers.</p>
              <Link href="/appointments">
                <GoldButton variant="outlined" className="w-full">Book Now</GoldButton>
              </Link>
            </div>

            {/* Premium Kundli Card */}
            <div className="bg-neutral-900 border border-neutral-800 hover:border-[var(--gold)]/50 rounded-2xl p-8 flex flex-col relative overflow-hidden group transition-colors text-left">
              <div className="absolute top-4 right-4 text-xs font-semibold bg-[var(--gold)]/20 text-[var(--gold)] px-2 py-1 rounded">Premium</div>
              <div className="w-16 h-16 rounded-full bg-black border border-[var(--gold)]/30 flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-[var(--gold)] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">Premium Personalized Kundli</h3>
              <p className="text-gray-400 text-sm mb-8 flex-grow">Detailed life guidance through a deeply analyzed customized birth chart.</p>
              <Link href="/appointments">
                <GoldButton variant="outlined" className="w-full">Order Now</GoldButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Get Free Kundli Massive CTA */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative">
          {/* Background gradient & pattern */}
          <div className="absolute inset-0 bg-neutral-950 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-black border border-[var(--gold)]/20"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('/images/sacred-geometry.svg')] bg-cover bg-center"></div>
          
          <div className="relative p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-left max-w-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-[1px] bg-[var(--gold)]"></div>
                <span className="text-[var(--gold)] font-mono text-sm tracking-widest uppercase">Instantly Available</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                Get Your <span className="text-[var(--gold)]">Free Kundli</span>
              </h2>
              <p className="text-gray-300 text-lg font-light leading-relaxed">
                Get clear insights into your life, career, relationships, and future with your personalized, highly-accurate Vedic Kundli.
              </p>
              <div className="pt-4">
                <Link href="/free-tools/kundli-generator">
                  <button className="bg-gradient-to-r from-[var(--gold-300)] via-[var(--gold)] to-[var(--gold-600)] text-black font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform flex items-center gap-3">
                    Generate Report Now <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:flex w-1/3 justify-center">
              <div className="w-48 h-48 rounded-full border border-[var(--gold)]/30 flex items-center justify-center bg-black/50 relative">
                <div className="absolute inset-0 rounded-full border border-[var(--gold)]/10 animate-ping"></div>
                <Layers className="w-20 h-20 text-[var(--gold)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === PREMIUM PERSONALIZED KUNDLI SECTION === */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 w-full bg-gradient-to-br from-amber-950/20 via-black to-amber-950/10 border-y border-[var(--gold)]/20 py-20 px-4 overflow-hidden"
      >
        {/* Glow decorations */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-amber-700/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left — Book Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/40 border-2 border-[var(--gold)]/50 hover:scale-105 transition-transform duration-500">
              <img
                src="/images/premium-kundli-book.jpg"
                alt="Premium Personalized Kundli Book"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-[var(--gold)] text-black text-xs font-extrabold px-3 py-1 rounded-full shadow-lg">
                10K+ Done
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-bold flex items-center gap-2 justify-center md:justify-start">
                <span>✦</span> Exclusive Premium Service
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                PREMIUM PERSONALIZED
                <span className="gold-gradient-text block">KUNDLI</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
              Get a comprehensive 20+ section personalized Janam Kundli — crafted from your exact birth coordinates. Includes Lagna Chart, Chalit Chart, Dasha timeline, Yoga & Dosha analysis, Vedic Remedies, Numerology, and detailed life predictions.
            </p>

            {/* Feature list */}
            <div className="grid grid-cols-2 gap-2">
              {[
                '✦ Lagna & Chalit Charts', '✦ Vimshottari Dasha',
                '✦ Yoga & Dosha Analysis', '✦ Vedic Remedies & Mantras',
                '✦ Numerology Report', '✦ Life Predictions'
              ].map((f, i) => (
                <div key={i} className="text-xs text-amber-200/70 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full flex-shrink-0" />
                  {f.replace('✦ ', '')}
                </div>
              ))}
            </div>

            {/* Price row */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <span className="text-gray-500 line-through text-lg">₹199</span>
              <span className="text-3xl font-serif font-bold text-[var(--gold)]">₹50</span>
              <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-2 py-1 rounded-full font-bold">75% OFF</span>
            </div>

            {/* CTA */}
            <Link href="/free-tools/kundli-generator">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)] text-black font-bold text-base rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg shadow-amber-900/30 cursor-pointer">
                <span>✦</span>
                Get PREMIUM PERSONALIZED KUNDLI
                <span>✦</span>
              </button>
            </Link>
            <p className="text-xs text-gray-600">One-time payment · Instant report · No subscription</p>
          </div>
        </div>
      </motion.section>

      {/* Major Sections — Service Cards */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full space-y-16">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">Our Specialized Areas</h2>
          <div className="h-0.5 w-20 bg-[var(--gold)] mx-auto"></div>
          <p className="text-gray-400 max-w-lg mx-auto text-sm pt-2">
            Click on any card to explore deep readings or book specialized consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <motion.div
              key={svc.id}
              className="h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href={svc.link} className="block h-full">
                <GoldCard flush className="h-full flex flex-col items-center text-center justify-between min-h-[400px] border border-[var(--gold-100)] relative group">
                  <div className="w-full h-48 relative overflow-hidden">
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {/* Golden tagline overlay — only for cards that have one */}
                    {(svc as any).tagline && (
                      <div className="absolute top-0 inset-x-0 flex items-start justify-center pt-4 px-4 z-10">
                        <span
                          style={{
                            fontFamily: 'Georgia, serif',
                            letterSpacing: '0.1em',
                            fontSize: (svc as any).taglineSize || '36px',
                            color: '#ffffff',
                            textShadow: '0 2px 16px rgba(0,0,0,1), 0 0px 8px rgba(0,0,0,1)',
                          }}
                          className="font-extrabold uppercase text-center leading-tight drop-shadow-2xl"
                        >
                          {(svc as any).tagline}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 rounded-full bg-black/60 backdrop-blur-md border border-[var(--gold-200)] z-10">
                      {svc.icon}
                    </div>
                  </div>
                  <div className="p-6 pt-8 flex-1 flex flex-col items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-bold tracking-wider text-white group-hover:text-[var(--gold)] transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-gray-300 text-xs leading-relaxed max-w-sm">
                        {svc.desc}
                      </p>
                    </div>
                    <span className="text-[var(--gold)] font-medium text-xs tracking-wider uppercase mt-6 group-hover:underline inline-flex items-center gap-1">
                      Learn More &rarr;
                    </span>
                  </div>
                </GoldCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Section: Academy Batches Showcase ── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12 border-t border-[var(--gold-100)]/40">
        <div className="text-center space-y-2">
          <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold block">
            Learn Occult Science
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">Active Academy Batches</h2>
          <div className="h-0.5 w-20 bg-[var(--gold)] mx-auto"></div>
          <p className="text-gray-400 text-xs pt-2">
            Join our structured courses led by master consultants and unlock certified wisdom.
          </p>
        </div>

        {isLoadingBatches ? (
          <BatchCardSkeleton count={3} className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full" />
        ) : batches && batches.filter((b: any) => !b.isDeleted).length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {batches
                .filter((b: any) => !b.isDeleted)
                .slice(0, 3)
                .map((batch: any) => (
                  <GoldCard key={batch._id} theme="dark" flush className="border border-[var(--gold-100)] flex flex-col justify-between">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        {batch.coverImage?.url && (
                          <div className="w-full h-40 bg-neutral-900 overflow-hidden mb-4">
                            <img src={batch.coverImage.url} alt={batch.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="px-6 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-sans text-[26px] font-bold text-white truncate">{batch.title}</h3>
                            <span className="text-[9px] bg-neutral-800 text-[var(--gold)] border border-[var(--gold-100)] rounded-full px-1.5 py-0.5 whitespace-nowrap">
                              {batch.category || 'Astrology'}
                            </span>
                          </div>
                          <FormattedText text={batch.description} className="text-gray-400 text-xs leading-relaxed line-clamp-3" />
                        </div>
                      </div>

                      <div className="p-6 pt-0 mt-6 border-t border-neutral-800 space-y-3">
                        <div className="flex justify-between items-center pt-3">
                          <span className="text-gray-500 text-xs">Course Fee:</span>
                          <span className="text-[var(--gold)] font-bold text-[26px] font-sans">₹{(batch.price / 100).toLocaleString()}</span>
                        </div>
                        {isAuthenticated ? (
                          <Link href="/my-batches" className="block w-full">
                            <GoldButton variant="outlined" fullWidth className="py-2 text-xs">
                              View My Batches
                            </GoldButton>
                          </Link>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <Link href="/login" className="w-full">
                              <GoldButton variant="ghost" fullWidth className="py-2 text-[10px]">
                                Login to Unlock
                              </GoldButton>
                            </Link>
                            <Link href="/register" className="w-full">
                              <GoldButton variant="outlined" fullWidth className="py-2 text-[10px]">
                                Register to Enroll
                              </GoldButton>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </GoldCard>
                ))}
            </div>
            {batches.filter((b: any) => !b.isDeleted).length > 3 && (
              <div className="text-center pt-4">
                <Link href={isAuthenticated ? "/my-batches" : "/register"}>
                  <GoldButton variant="ghost" className="px-6 py-2 text-xs">
                    View All Batches &rarr;
                  </GoldButton>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-xs py-8">No live batches scheduled at this moment.</p>
        )}
      </motion.section>

      {/* ── Section: Curated Shop Showcase ── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12 border-t border-[var(--gold-100)]/40">
        <div className="text-center space-y-2">
          <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold block">
            Sourced Energies
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">Our Shop</h2>
          <div className="h-0.5 w-20 bg-[var(--gold)] mx-auto"></div>
          <p className="text-gray-400 text-xs pt-2">
            Acquire energized crystals, authentic gemstones, and personalized planetary remedies.
          </p>
        </div>

        {isLoadingShopItems ? (
          <ShopItemSkeleton count={3} className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full" />
        ) : shopItems && shopItems.filter((i: any) => !i.isDeleted).length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {shopItems
                .filter((i: any) => !i.isDeleted)
                .slice(0, 3)
                .map((item: any) => (
                  <GoldCard
                    key={item._id}
                    theme="dark"
                    flush
                    className="border border-[var(--gold-100)] flex flex-col justify-between cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
                    onClick={() => router.push(`/shop/${item._id}`)}
                  >
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        {item.imageUrl && (
                          <div className="w-full h-40 bg-neutral-900 overflow-hidden mb-4">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                        )}
                        <div className="px-6 space-y-2">
                          <h3 className="font-sans text-[26px] font-bold text-white group-hover:text-[var(--gold)] transition-colors truncate">{item.title}</h3>
                          <FormattedText text={item.description} className="text-gray-400 text-xs leading-relaxed line-clamp-3" />
                        </div>
                      </div>

                      <div className="p-6 pt-0 mt-6 border-t border-neutral-800 flex items-center justify-between pt-4" onClick={(e) => e.stopPropagation()}>
                        <span className="text-[var(--gold)] font-bold text-[26px] font-sans">₹{(item.price / 100).toLocaleString()}</span>
                        <GoldButton
                          variant="filled"
                          className="py-1.5 px-4 text-xs flex items-center gap-1.5"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(item._id);
                          }}
                          isLoading={addToCartMutation.isPending && addToCartMutation.variables === item._id}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                        </GoldButton>
                      </div>
                    </div>
                  </GoldCard>
                ))}
            </div>
            <div className="text-center pt-4">
              <Link href="/shop">
                <GoldButton variant="outlined" className="px-6 py-2 text-xs">
                  View Full Shop &rarr;
                </GoldButton>
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center text-xs py-8">No shop items available at the moment.</p>
        )}
      </motion.section>

      {/* ── Section: The Cosmic Synthesis ── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12 border-t border-[var(--gold-100)]/40 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold block">
              How We Help You
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              How All Four Sciences
              Work Together for
              <span className="gold-gradient-text">You</span>
            </h2>
            <div className="text-gray-300 text-sm md:text-base space-y-4 font-light leading-relaxed">
              <p>
                Your life problems often have patterns. We use four proven Indian sciences together to understand your situation completely and guide you in the right direction:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <li className="flex gap-2">
                  <Compass className="w-5 h-5 text-[var(--gold)] flex-shrink-0" />
                  <span><strong>Astrology</strong> — tells you the best and tough times in your life.</span>
                </li>
                <li className="flex gap-2">
                  <Hash className="w-5 h-5 text-[var(--gold)] flex-shrink-0" />
                  <span><strong>Numerology</strong> — checks if your name is lucky for you.</span>
                </li>
                <li className="flex gap-2">
                  <Layers className="w-5 h-5 text-[var(--gold)] flex-shrink-0" />
                  <span><strong>Tarot</strong> — gives a clear picture of your current situation.</span>
                </li>
                <li className="flex gap-2">
                  <PenTool className="w-5 h-5 text-[var(--gold)] flex-shrink-0" />
                  <span><strong>Graphology</strong> — reads your personality through your handwriting.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
            <GoldCard theme="dark" flush className="border border-[var(--gold-200)] flex flex-col justify-between h-full relative">
              <div>
                <div className="w-full h-56 relative">
                  <img src="/images/cosmic_synthesis_realistic.png" alt="Cosmic Synthesis" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                </div>
                <div className="p-6 space-y-3 text-center">
                  <h4 className="font-serif font-bold text-lg text-[var(--gold)]">Why Our Methodology?</h4>
                  <p className="text-xs text-gray-350 leading-relaxed">
                    We combine all four sciences — Astrology, Numerology, Tarot, and Graphology — to give you a complete, clear, and practical plan for your life.
                  </p>
                </div>
              </div>
            </GoldCard>
          </div>
        </div>
      </motion.section>

      {/* ── Section: Scientific Framework ── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12 border-t border-[var(--gold-100)]/40">
        <div className="text-center space-y-2">
          <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold block">
            Science Behind Our Work
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">Why These Sciences Actually Work</h2>
          <div className="h-0.5 w-20 bg-[var(--gold)] mx-auto"></div>
          <p className="text-gray-400 text-xs pt-2">
            These are ancient studies based on logical principles, not just random beliefs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GoldCard theme="dark" className="border border-[var(--gold-100)] flex flex-col justify-between p-6 hover:border-[var(--gold-300)] transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--gold-50)] border border-[var(--gold-200)] flex items-center justify-center text-[var(--gold)]">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Astrology & Solar Cycles</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Planets like Saturn, Jupiter, and Mars have real gravitational effects on Earth. These effects influence our mood, health, and energy levels. Your birth time determines which planet was most active, shaping your personality and life path.
              </p>
            </div>
          </GoldCard>

          <GoldCard theme="dark" className="border border-[var(--gold-100)] flex flex-col justify-between p-6 hover:border-[var(--gold-300)] transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--gold-50)] border border-[var(--gold-200)] flex items-center justify-center text-[var(--gold)]">
                <Hash className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Numerology & Resonance</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Every letter in your name has a number value. These numbers create a vibration or energy. When your name number matches your birth number, life flows easily. When it does not match, there can be struggle and delay.
              </p>
            </div>
          </GoldCard>

          <GoldCard theme="dark" className="border border-[var(--gold-100)] flex flex-col justify-between p-6 hover:border-[var(--gold-300)] transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--gold-50)] border border-[var(--gold-200)] flex items-center justify-center text-[var(--gold)]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Tarot & Archetypes</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Tarot cards work like a mirror. They reflect what is happening deep inside your mind. When you pick cards, your inner feelings guide the selection — helping you see your problems and fears more clearly so you can deal with them.
              </p>
            </div>
          </GoldCard>

          <GoldCard theme="dark" className="border border-[var(--gold-100)] flex flex-col justify-between p-6 hover:border-[var(--gold-300)] transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--gold-50)] border border-[var(--gold-200)] flex items-center justify-center text-[var(--gold)]">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Graphology & Neuromotor</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Your handwriting comes directly from your brain. The way you write — your letter slants, how hard you press, the shape of letters — reveals your habits, confidence, and thinking style. You can actually change bad habits by changing how you write.
              </p>
            </div>
          </GoldCard>
        </div>
      </motion.section>
      {/* ── Section: Our 3-Step Methodology ── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12 border-t border-[var(--gold-100)]/40">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">Our Alignment Process</h2>
          <div className="h-0.5 w-20 bg-[var(--gold)] mx-auto"></div>
          <p className="text-gray-400 text-xs pt-2">A simple 3-step process to understand your life and start making better decisions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GoldCard flush theme="dark" className="border border-neutral-800 flex flex-col justify-between h-full relative group">
            <div className="w-full h-40 relative">
              <img src="/images/step_analyze_realistic.png" alt="Map & Analyze" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent"></div>
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-[var(--gold-200)] z-10 flex items-center justify-center text-[var(--gold)] font-bold">1</div>
            </div>
            <div className="p-6 space-y-2 flex-1">
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[var(--gold)] transition-colors">1. Map & Analyze</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We collect your birth details, full name, and a handwriting sample. Using these, we prepare a complete report of your strengths, weak areas, and important life timings.
              </p>
            </div>
          </GoldCard>

          <GoldCard flush theme="dark" className="border border-neutral-800 flex flex-col justify-between h-full relative group">
            <div className="w-full h-40 relative">
              <img src="/images/step_realign_realistic.png" alt="Realign & Tune" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent"></div>
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-[var(--gold-200)] z-10 flex items-center justify-center text-[var(--gold)] font-bold">2</div>
            </div>
            <div className="p-6 space-y-2 flex-1">
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[var(--gold)] transition-colors">2. Realign & Tune</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Based on the report, we suggest simple corrections — like a name spelling change, writing practice exercises, or the best dates to take action — to remove obstacles from your path.
              </p>
            </div>
          </GoldCard>

          <GoldCard flush theme="dark" className="border border-neutral-800 flex flex-col justify-between h-full relative group">
            <div className="w-full h-40 relative">
              <img src="/images/step_thrive_realistic.png" alt="Schedule & Thrive" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent"></div>
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-[var(--gold-200)] z-10 flex items-center justify-center text-[var(--gold)] font-bold">3</div>
            </div>
            <div className="p-6 space-y-2 flex-1">
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[var(--gold)] transition-colors">3. Schedule & Thrive</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We help you find the best days (Muhuraat) for starting a business, signing agreements, moving house, or any important event — so your efforts get the best results.
              </p>
            </div>
          </GoldCard>
        </div>
      </motion.section>

      {/* ── Section: Client Success Stories ── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 py-16 w-full space-y-12 border-t border-[var(--gold-100)]/40 overflow-hidden">

        {/* Style Tag for Marquee keyframes */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            gap: 2rem;
            animation: marquee 50s linear infinite;
          }
        `}} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold block">
            Real Transformations
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">Client Success Stories</h2>
          <div className="h-0.5 w-20 bg-[var(--gold)] mx-auto"></div>
          <p className="text-gray-400 text-xs pt-2">
            See how real people solved their real problems with our guidance.
          </p>
        </div>

        {/* Carousel Outer Track Container with Fade Masks */}
        <div className="relative w-full overflow-hidden py-4 testimonial-marquee-fade">
          <div className="animate-marquee hover:[animation-play-state:paused] flex gap-8">
            {/* First Set of Cards */}
            {(() => {
              // Always show DB reviews if any exist (rating > 4); fall back to premade only if DB is empty
              const displayReviews = dynamicReviews.length > 0
                ? dynamicReviews.map((r: any) => ({
                    name: r.name,
                    initials: r.name.substring(0, 2).toUpperCase(),
                    role: 'Verified Client',
                    quote: r.comment,
                    rating: r.rating
                  }))
                : testimonials.map(t => ({ ...t, rating: 5 }));

              return displayReviews.map((test: any, index: number) => (
                <div key={`set1-${index}`} className="w-[350px] shrink-0 text-left">
                  <GoldCard theme="dark" className="border border-[var(--gold-100)]/40 p-6 flex flex-col justify-between h-full min-h-[260px] relative">
                    <div className="space-y-4">
                      <div className="flex gap-1 text-[var(--gold)]">
                        {[...Array(test.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[var(--gold)]" stroke="none" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-300 italic leading-relaxed">
                        "{test.quote}"
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] font-serif font-bold text-xs">
                        {test.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{test.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{test.role}</p>
                      </div>
                    </div>
                  </GoldCard>
                </div>
              ));
            })()}

            {/* Duplicate for infinite scroll effect */}
            {(() => {
              // Always show DB reviews if any exist (rating > 4); fall back to premade only if DB is empty
              const displayReviews = dynamicReviews.length > 0
                ? dynamicReviews.map((r: any) => ({
                    name: r.name,
                    initials: r.name.substring(0, 2).toUpperCase(),
                    role: 'Verified Client',
                    quote: r.comment,
                    rating: r.rating
                  }))
                : testimonials.map(t => ({ ...t, rating: 5 }));

              return displayReviews.map((test: any, index: number) => (
                <div key={`set2-${index}`} className="w-[350px] shrink-0 text-left">
                  <GoldCard theme="dark" className="border border-[var(--gold-100)]/40 p-6 flex flex-col justify-between h-full min-h-[260px] relative">
                    <div className="space-y-4">
                      <div className="flex gap-1 text-[var(--gold)]">
                        {[...Array(test.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[var(--gold)]" stroke="none" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-300 italic leading-relaxed">
                        "{test.quote}"
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] font-serif font-bold text-xs">
                        {test.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{test.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{test.role}</p>
                      </div>
                    </div>
                  </GoldCard>
                </div>
              ));
            })()}

          </div>
        </div>
      </motion.section>

      {/* ── Section: General FAQs ── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 w-full space-y-12 border-t border-[var(--gold-100)]/40">
        <div className="text-center space-y-2">
          <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold block">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold flex items-center justify-center gap-2">
            <HelpCircle className="w-7 h-7 text-[var(--gold)]" /> General FAQs
          </h2>
          <div className="h-0.5 w-20 bg-[var(--gold)] mx-auto"></div>
        </div>

        <div className="space-y-6">
          <div className="border-l-2 border-[var(--gold)] pl-4 py-2 space-y-1">
            <h4 className="text-white text-base font-bold">How do these four disciplines connect?</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              We combine all four sciences to give you a complete picture. Astrology tells your timing, Numerology checks your name, Tarot shows your current situation, and Graphology reads your habits. Together they give very clear and practical advice.
            </p>
          </div>

          <div className="border-l-2 border-[var(--gold)] pl-4 py-2 space-y-1">
            <h4 className="text-white text-base font-bold">Are consultations held online?</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Yes! All sessions happen online via video call (Zoom or Google Meet). After you book, you will get a meeting link on your email. You can join from home.
            </p>
          </div>

          <div className="border-l-2 border-[var(--gold)] pl-4 py-2 space-y-1">
            <h4 className="text-white text-base font-bold">What information must I provide beforehand?</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              For Astrology — your exact birth date, birth time (as accurate as possible), and birth place. For Numerology — your current full name. For Graphology — a photo or scan of your handwriting on plain white paper (no lines), sent before the call.
            </p>
          </div>

          <div className="border-l-2 border-[var(--gold)] pl-4 py-2 space-y-1">
            <h4 className="text-white text-base font-bold">How long does a graphotherapy course take?</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Graphotherapy (handwriting exercises) takes just 10–15 minutes every day for 21 days. It is simple to do at home. Many people notice a positive change in their thinking and confidence within 3 weeks.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Booking Consultation Widget */}
      <motion.section
        id="book"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-20 w-full">
        <GoldCard theme="dark" className="border border-[var(--gold-300)] p-8 md:p-12">
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex p-3 rounded-full bg-[var(--gold-50)] border border-[var(--gold-200)]">
              <Calendar className="w-8 h-8 text-[var(--gold)]" />
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-wide">Book Your Consultation</h2>
            <p className="text-gray-400 text-sm">
              Choose your consultation type and pick a date and time that works for you.
            </p>
          </div>

          <form onSubmit={handleBookSubmit} className="space-y-6">
            {/* Consultation Type */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                1. Select Consultation Type
              </label>
              <select
                value={selectedTypeId}
                onChange={(e) => {
                  setSelectedTypeId(e.target.value);
                  setSelectedDate('');
                  setSelectedTimeSlot('');
                }}
                required
                className="w-full bg-black/60 border border-[var(--gold-200)] rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent text-sm"
              >
                <option value="">-- Choose a consultation service --</option>
                {appointmentTypes?.map((type: any) => {
                  const now = new Date();
                  const hasActiveOffer = type.offerPrice !== undefined && type.offerPrice !== null &&
                    (!type.offerExpiresAt || now < new Date(type.offerExpiresAt));
                  const priceText = hasActiveOffer
                    ? `₹${(type.offerPrice / 100).toLocaleString()} (Special Offer! Original ₹${(type.price / 100).toLocaleString()})`
                    : `₹${(type.price / 100).toLocaleString()}`;
                  return (
                    <option key={type._id} value={type._id} className="bg-neutral-900">
                      {type.name} - {type.duration} mins ({priceText})
                    </option>
                  );
                })}
              </select>
            </div>

            {selectedTypeId && (
              <>
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                    2. Select Appointment Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTimeSlot('');
                    }}
                    required
                    className="w-full bg-black/60 border border-[var(--gold-200)] rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent text-sm"
                  />
                </div>

                {/* Available Hours Slots */}
                {selectedDate && (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                      3. Available Time Slots (IST Business Hours)
                    </label>

                    {isFetchingSlots ? (
                      <p className="text-gray-400 text-xs animate-pulse">Calculating slot availability against Google Calendar...</p>
                    ) : availableSlots && availableSlots.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableSlots.map((slot: string) => {
                          const dateObj = new Date(slot);
                          // Format to readable time in local browser timezone (representing IST)
                          const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                          const isSelected = selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2 px-3 text-xs border rounded-lg transition-all duration-300 font-medium ${isSelected
                                  ? 'bg-[var(--gold)] text-black border-transparent shadow-[0_0_10px_rgba(204,143,51,0.5)]'
                                  : 'bg-black/40 text-[var(--gold)] border-[var(--gold-200)] hover:bg-[var(--gold-50)]'
                                }`}
                            >
                              {timeStr}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-yellow-500 bg-yellow-950/20 border border-yellow-900/30 p-3 rounded-lg text-xs">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>No slots available for this date. Please select another date.</span>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Additional User notes */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Additional Details (Optional)
              </label>
              <textarea
                value={bookingMessage}
                onChange={(e) => setBookingMessage(e.target.value)}
                placeholder="Include questions you have, birth info, or particular issues..."
                rows={3}
                className="w-full bg-black/60 border border-[var(--gold-100)] rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-transparent text-sm"
              />
            </div>

            {/* Submit */}
            <GoldButton
              type="submit"
              variant="filled"
              fullWidth
              disabled={!selectedTimeSlot || bookingMutation.isPending}
              isLoading={bookingMutation.isPending}
              className="py-3 text-base"
            >
              Confirm Appointment Slot
            </GoldButton>
          </form>
        </GoldCard>
      </motion.section>

      {/* ── Section: Leave a Review ── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 py-16 w-full space-y-12 border-t border-[var(--gold-100)]/40"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold block">
              Share Your Experience
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold">Review Our Products & Services</h2>
            <div className="h-0.5 w-20 bg-[var(--gold)] mx-auto"></div>
            <p className="text-gray-400 text-xs pt-2">
              Have you received a product from our shop or completed a consultation? Share your feedback to help others!
            </p>
          </div>
          
          <GoldCard theme="dark" className="border border-[var(--gold-100)] p-6 md:p-10">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                submitReviewMutation.mutate(reviewForm);
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Your Name</label>
                <input 
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  placeholder="E.g. Rahul Sharma"
                  className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star className={`w-8 h-8 ${star <= reviewForm.rating ? 'fill-[var(--gold)] text-[var(--gold)]' : 'text-neutral-700'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Your Review</label>
                <textarea 
                  required
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="How was your experience? Did the product meet your expectations?"
                  className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors text-white min-h-[120px] resize-none"
                />
              </div>

              <GoldButton 
                type="submit" 
                variant="filled" 
                className="w-full py-4 font-bold tracking-widest"
                disabled={submitReviewMutation.isPending}
              >
                {submitReviewMutation.isPending ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
              </GoldButton>
            </form>
          </GoldCard>
        </div>
      </motion.section>

      {/* ── Section: About Our Team Preview ── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full border-t border-[var(--gold-100)]/40"
      >
        {/* Soft glow backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(204,143,51,0.25) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 text-center space-y-3 mb-12">
          <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold block">
            The People Behind Your Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">Meet Our Expert Team</h2>
          <div className="h-0.5 w-20 bg-[var(--gold)] mx-auto" />
          <p className="text-gray-400 text-sm max-w-2xl mx-auto pt-1 leading-relaxed">
            OM Astrology AMC is led by a passionate team of specialists in Astrology, Numerology, Tarot, Graphology, and Digital Outreach. Together, we bring you a holistic and deeply personalized approach to occult science guidance — combining ancient Indian wisdom with modern clarity, compassion, and confidentiality. Every consultation is crafted around <em>you</em>.
          </p>
        </div>

        {/* Team preview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {(teamMembers && teamMembers.length > 0
            ? teamMembers.slice(0, 3).map((m: any) => ({ name: m.name, role: m.role, img: m.image }))
            : [
                { name: 'Raajesh S Panday', role: 'Founder & Chief Consultant', img: '/images/team_raajesh.png' },
                { name: 'Kusum Panday', role: 'Tarot Reader & Wellness Coach', img: '/images/team_kusum.png' },
                { name: 'Aayush Kumar', role: 'Social Media Manager', img: '/images/team_aayush.png' },
              ]
          ).map((member: any, idx: number) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GoldCard theme="dark" flush className="border border-[var(--gold-100)] overflow-hidden group hover:border-[var(--gold-300)] transition-all duration-300">
                <div className="w-full h-52 relative overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <h3 className="font-serif text-xl font-bold" style={{ color: 'white', fontSize: '22px' }}>{member.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{member.role}</p>
                  </div>
                </div>
              </GoldCard>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/about-us">
            <GoldButton variant="filled" className="px-8 py-3 text-sm">
              Learn More About Our Team →
            </GoldButton>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
