'use client';

import React, { use, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { ArrowLeft, Clock, Compass, Phone, MessageSquare, AlertCircle, Calendar, CheckSquare } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { env } from '@/lib/env';
import { FormattedText } from '@/components/ui/FormattedText';

export default function AppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
 const resolvedParams = use(params);
 const { id } = resolvedParams;
 const { isAuthenticated, isLoading: authLoading, user } = useAuth();
 const router = useRouter();
 const bookingCardRef = useRef<HTMLDivElement>(null);

 const scrollToBooking = () => {
 bookingCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
 };

 // Booking states
 const [selectedDate, setSelectedDate] = useState('');
 const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
 const [bookingMessage, setBookingMessage] = useState('');

 // Attendee details
 const [attendeeName, setAttendeeName] = useState('');
 const [attendeeDateOfBirth, setAttendeeDateOfBirth] = useState('');
 const [attendeeTimeOfBirth, setAttendeeTimeOfBirth] = useState('');

 useEffect(() => {
   if (user) {
     setAttendeeName(user.name || '');
     setAttendeeDateOfBirth(user.dateOfBirth || '');
     setAttendeeTimeOfBirth(user.birthTime || '');
   }
 }, [user]);

 // Fetch all types and find the one that matches our ID
 const { data: appointmentTypes, isLoading: typesLoading } = useQuery({
 queryKey: ['appointmentTypes'],
 queryFn: async () => {
 const res = await client.get('/appointments/types');
 return res.data?.data || [];
 },
 });

 const appType = appointmentTypes?.find((t: any) => t._id === id);

 // Fetch available slots when date is selected
 const { data: availableSlots, isFetching: isFetchingSlots } = useQuery({
 queryKey: ['slots', selectedDate, appType?.duration],
 queryFn: async () => {
 if (!selectedDate || !appType) return [];
 const res = await client.get('/appointments/slots', {
 params: {
 date: selectedDate,
 duration: appType.duration,
 },
 });
 return res.data?.data || [];
 },
 enabled: !!selectedDate && !!appType,
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
 if (!id || !selectedTimeSlot) {
 throw new Error('Please select a date and time slot');
 }
 const res = await client.post('/appointments', {
 appointmentTypeId: id,
 scheduledAt: selectedTimeSlot,
 attendeeName,
 attendeeDateOfBirth,
 attendeeBirthTime: attendeeTimeOfBirth
 });
 return res.data?.data;
 },
 onSuccess: async (data: any) => {
 if (!data.paymentRequired) {
 alert('🎉 Consultation booked successfully! A confirmation email and Google Calendar event have been created.');
 setSelectedDate('');
 setSelectedTimeSlot('');
 router.push('/appointments');
 return;
 }

 const loaded = await loadRazorpayScript();
 if (!loaded) {
 alert('Failed to load Razorpay SDK. Please check your connection.');
 return;
 }

 const options = {
 key: data.key || env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
 amount: data.amount,
 currency: data.currency || 'INR',
 name: 'OM Astrology AMC',
 description: `Consultation Slot: ${appType?.name || 'Appointment'}`,
 order_id: data.razorpayOrderId,
 handler: async (response: any) => {
 try {
 await client.post('/appointments/verify', {
 razorpayOrderId: response.razorpay_order_id,
 razorpayPaymentId: response.razorpay_payment_id,
 razorpaySignature: response.razorpay_signature,
 });
 
 setSelectedDate('');
 setSelectedTimeSlot('');
 alert('🎉 Payment successful! Your consultation slot has been confirmed.');
 router.push('/appointments');
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
 bookingMutation.mutate();
 };

 if (typesLoading || authLoading) {
 return (
 <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-600">
 <LoadingSpinner size="lg" />
 <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
 Loading Details...
 </p>
 </div>
 );
 }

 if (!appType) {
 return (
 <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-600 px-4 text-center">
 <Compass className="w-16 h-16 text-neutral-800 mb-4 animate-bounce" />
 <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Package Not Found</h2>
 <p className="text-sm max-w-md font-light mb-6 text-gray-500">The consultation package you are looking for does not exist or may have been updated.</p>
 <Link href="/appointments">
 <GoldButton variant="outlined" className="py-2.5 px-6 text-xs">
 <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
 </GoldButton>
 </Link>
 </div>
 );
 }

 const now = new Date();
 const hasActiveOffer = appType.offerPrice !== undefined && appType.offerPrice !== null &&
 (!appType.offerExpiresAt || now < new Date(appType.offerExpiresAt));
 const priceVal = hasActiveOffer ? appType.offerPrice : appType.price;

 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
 <div className="max-w-5xl mx-auto space-y-8 relative z-10">
 
 {/* Navigation */}
 <div className="flex justify-between items-center pb-4 border-b border-[var(--gold-200)]">
 <Link href="/appointments" className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-600 hover:text-[var(--gold)] transition-colors">
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
 Back to Services
 </Link>
 <span className="text-[var(--gold)] text-xs font-mono uppercase tracking-widest font-semibold">
 {appType.category} Consultation
 </span>
 </div>

 {/* Layout */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
 
 {/* Details Section */}
 <div className="lg:col-span-7 space-y-6">
 {appType.imageUrl && (
 <div className="w-full rounded-2xl overflow-hidden border border-gray-200/80 bg-gray-100/10">
 <img 
 src={appType.imageUrl} 
 alt={appType.name} 
 className="w-full h-auto max-h-[360px] object-cover object-center transition-all duration-700"
 />
 </div>
 )}

 <div className="space-y-2">
 <h1 className="font-sans text-[40px] sm:text-[46px] font-bold tracking-tight text-gray-900 leading-tight">
 {appType.name}
 </h1>
 <div className="flex items-center gap-2 pt-1">
 <span className="bg-[var(--gold-100)] border border-[var(--gold-200)] text-[var(--gold)] text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full">
 {appType.category}
 </span>
 <span className="text-gray-600 text-sm font-sans flex items-center gap-1.5">
 <Clock className="w-4 h-4 text-[var(--gold)]" /> {appType.duration} mins Session
 </span>
 </div>
 </div>

  {/* Price Card & Quick Contacts */}
  <div className="p-6 rounded-2xl bg-gray-100/30 border border-gray-200/60 space-y-6">
    <div className="flex justify-between items-center flex-wrap gap-4">
      <div className="space-y-1">
        <span className="text-gray-500 text-xs font-mono">Vibrational Exchange</span>
        <div className="flex items-baseline gap-3">
          <span className="text-[40px] sm:text-[46px] font-bold font-sans text-[var(--gold)]">
            ₹{(priceVal / 100).toLocaleString()}
          </span>
          {hasActiveOffer && (
            <span className="text-neutral-500 line-through text-[28px] font-sans">
              ₹{(appType.price / 100).toLocaleString()}
            </span>
          )}
        </div>
      </div>
      {appType.specialOfferTitle && (
        <span className="bg-red-600/90 text-gray-900 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-red-500/30">
          {appType.specialOfferTitle}
        </span>
      )}
    </div>

    {/* Communication Channel Buttons */}
    <div className="grid grid-cols-2 gap-4">
      <a href="tel:+919922352666" className="w-full">
        <button className="w-full py-2.5 text-xs flex items-center justify-center gap-2 font-bold bg-blue-600 hover:bg-blue-700 text-gray-900 rounded-lg transition-colors duration-300 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
          <Phone className="w-4 h-4" /> Call Now (+91 9922352666)
        </button>
      </a>
      <a href="https://wa.me/919922352666" target="_blank" rel="noopener noreferrer" className="w-full">
        <button className="w-full py-2.5 text-xs flex items-center justify-center gap-2 font-bold bg-[#25d366] hover:bg-[#20ba5a] text-gray-900 rounded-lg transition-colors duration-300 shadow-[0_0_15px_rgba(37,211,102,0.2)]">
          <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
        </button>
      </a>
    </div>
  </div>

  {/* Book Now CTA */}
  <button
    onClick={scrollToBooking}
    className="w-full py-3.5 text-sm font-bold bg-[var(--gold)] hover:bg-[var(--gold-300)] text-black rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(204,143,51,0.35)] flex items-center justify-center gap-2 hover:scale-[1.02]"
  >
    <CheckSquare className="w-5 h-5" /> Book Now — Select Your Slot
  </button>

  {/* Description */}
  <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-light pt-2">
    {appType.description ? (
      <FormattedText text={appType.description} />
    ) : (
      <p>Get deep, authentic clarity and direction with this personalized consultation session. Includes comprehensive planetary matching and alchemical remedies.</p>
    )}
  </div>
 </div>

 {/* Booking / Calendar Section */}
 <div className="lg:col-span-5 scroll-mt-24" ref={bookingCardRef} id="book-form">
 <GoldCard className="border border-[var(--gold-300)] p-6 space-y-6">
 <div className="text-center space-y-2 border-b border-gray-200 pb-4">
 <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center justify-center gap-2">
 <Calendar className="w-5 h-5 text-[var(--gold)]" /> Book This Session
 </h3>
 <p className="text-gray-600 text-[11px] font-light">Select a date and available time slot below to secure your consultation.</p>
 </div>

 <form onSubmit={handleBookSubmit} className="space-y-4">
 {/* Date Picker */}
 <div className="space-y-1.5">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
 1. Select Date
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
 className="w-full bg-white/60 border border-[var(--gold-200)] rounded-lg py-2.5 px-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-transparent text-xs"
 />
 </div>

 {/* Available Hours Slots */}
 {selectedDate && (
 <div className="space-y-2">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
 2. Available Time Slots (IST)
 </label>

 {isFetchingSlots ? (
 <p className="text-gray-600 text-xs animate-pulse font-light">Aligning slots...</p>
 ) : availableSlots && availableSlots.length > 0 ? (
 <div className="grid grid-cols-2 gap-2">
 {availableSlots.map((slot: string) => {
 const dateObj = new Date(slot);
 const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 const isSelected = selectedTimeSlot === slot;
 return (
 <button
 key={slot}
 type="button"
 onClick={() => setSelectedTimeSlot(slot)}
 className={`py-2 px-3 text-sm font-sans border rounded-lg transition-all duration-300 font-medium ${
 isSelected
 ? 'bg-[var(--gold)] text-black border-transparent shadow-[0_0_10px_rgba(204,143,51,0.3)]'
 : 'bg-white/40 text-[var(--gold)] border-[var(--gold-200)] hover:bg-[var(--gold-50)]'
 }`}
 >
 {timeStr}
 </button>
 );
 })}
 </div>
 ) : (
 <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-[10px]">
 <AlertCircle className="w-4 h-4 flex-shrink-0" />
 <span>No slots available for this date. Please select another date.</span>
 </div>
 )}
 </div>
 )}

 {/* 3. Attendee Details (Intake Form) */}
 {selectedTimeSlot && isAuthenticated && (
   <div className="space-y-4 pt-4 border-t border-[var(--gold-200)] mt-4">
     <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
       3. Attendee Details (For Kundli Generation)
     </label>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <div className="space-y-1.5">
         <label className="block text-[10px] text-gray-500">Full Name</label>
         <input
           type="text"
           value={attendeeName}
           onChange={(e) => setAttendeeName(e.target.value)}
           className="w-full bg-white border border-[var(--gold-200)] rounded-lg py-2.5 px-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs"
           placeholder="e.g. John Doe"
         />
       </div>
       <div className="space-y-1.5">
         <label className="block text-[10px] text-gray-500">Date of Birth</label>
         <input
           type="date"
           value={attendeeDateOfBirth}
           onChange={(e) => setAttendeeDateOfBirth(e.target.value)}
           className="w-full bg-white border border-[var(--gold-200)] rounded-lg py-2.5 px-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs"
         />
       </div>
       <div className="space-y-1.5 md:col-span-2">
         <label className="block text-[10px] text-gray-500">Time of Birth</label>
         <input
           type="time"
           value={attendeeTimeOfBirth}
           onChange={(e) => setAttendeeTimeOfBirth(e.target.value)}
           className="w-full bg-white border border-[var(--gold-200)] rounded-lg py-2.5 px-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs"
         />
       </div>
     </div>
   </div>
 )}

 {/* Submit — show inline login prompt if not authenticated */}
 {selectedTimeSlot && !isAuthenticated ? (
 <div className="space-y-3 mt-4">
 <div className="flex items-start gap-3 bg-[var(--gold-50)] border border-[var(--gold-200)] rounded-xl p-4">
 <Calendar className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
 <div className="space-y-1">
 <p className="text-[var(--gold)] text-xs font-bold">Almost there! Log in to confirm your slot.</p>
 <p className="text-gray-600 text-[10px] font-light leading-relaxed">Your selected time is reserved. Sign in or create a free account to complete your booking.</p>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-2">
 <Link href="/login?redirect=/appointments" className="w-full">
 <button className="w-full py-2.5 text-xs font-bold bg-[var(--gold)] hover:bg-[var(--gold-300)] text-black rounded-lg transition-colors duration-300 shadow-[0_0_12px_rgba(204,143,51,0.25)] flex items-center justify-center gap-1.5">
 Log In
 </button>
 </Link>
 <Link href="/register?redirect=/appointments" className="w-full">
 <button className="w-full py-2.5 text-xs font-bold border border-[var(--gold-200)] text-[var(--gold)] hover:bg-[var(--gold-50)] rounded-lg transition-colors duration-300 flex items-center justify-center gap-1.5">
 Sign Up Free
 </button>
 </Link>
 </div>
 </div>
 ) : (
 <button
 type="submit"
 disabled={!selectedTimeSlot || bookingMutation.isPending}
 className="w-full py-3 text-xs font-bold mt-4 bg-[var(--gold)] hover:bg-[var(--gold-300)] disabled:opacity-40 disabled:cursor-not-allowed text-black rounded-lg transition-colors duration-300 shadow-[0_0_15px_rgba(204,143,51,0.3)] flex items-center justify-center gap-2"
 >
 {bookingMutation.isPending ? 'Confirming Slot...' : 'Confirm & Secure Slot'}
 </button>
 )}
 </form>
 </GoldCard>
 </div>

 </div>

 </div>
 </div>
 );
}
