'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { Calendar, Clock, Plus, Compass, Star, ChevronRight, Phone, MessageSquare, AlertCircle, CheckCircle2, Award } from 'lucide-react';
import { env } from '@/lib/env';
import { FormattedText } from '@/components/ui/FormattedText';

export default function AppointmentsPage() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const bookingRef = useRef<HTMLDivElement>(null);

  // Booking states
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // No redirect — page is public. Login is only prompted on booking attempt.

  // Fetch booked user appointments
  const { data: appointments, isLoading: loadingAppts, refetch: refetchAppts } = useQuery({
    queryKey: ['my-appointments'],
    queryFn: async () => {
      const res = await client.get('/appointments/me');
      return res.data?.data || [];
    },
    enabled: isAuthenticated,
  });

  // Fetch all database appointment types
  const { data: appointmentTypes, isLoading: loadingTypes } = useQuery({
    queryKey: ['appointmentTypes'],
    queryFn: async () => {
      const res = await client.get('/appointments/types');
      return res.data?.data || [];
    },
  });

  // Fetch team members for the top catalog cards
  const { data: teamMembers = [], isLoading: loadingTeam } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const res = await client.get('/team');
      return res.data?.data || [];
    },
  });

  const selectedType = appointmentTypes?.find((t: any) => t._id === selectedTypeId);

  // Fetch available slots when date is selected
  const { data: availableSlots, isFetching: isFetchingSlots } = useQuery({
    queryKey: ['slots', selectedDate, selectedType?.duration],
    queryFn: async () => {
      if (!selectedDate || !selectedType) return [];
      const res = await client.get('/appointments/slots', {
        params: { date: selectedDate, duration: selectedType.duration },
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
      if (!selectedTypeId || !selectedTimeSlot) throw new Error('Please select a package, date and time slot');
      const res = await client.post('/appointments', {
        appointmentTypeId: selectedTypeId,
        scheduledAt: selectedTimeSlot,
      });
      return res.data?.data;
    },
    onSuccess: async (data: any) => {
      if (!data.paymentRequired) {
        setBookingSuccess(true);
        setSelectedDate('');
        setSelectedTimeSlot('');
        setSelectedTypeId('');
        refetchAppts();
        setTimeout(() => setBookingSuccess(false), 6000);
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
        description: `Consultation Slot: ${selectedType?.name || 'Appointment'}`,
        order_id: data.razorpayOrderId,
        handler: async (response: any) => {
          try {
            await client.post('/appointments/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            
            setBookingSuccess(true);
            setSelectedDate('');
            setSelectedTimeSlot('');
            setSelectedTypeId('');
            refetchAppts();
            setTimeout(() => setBookingSuccess(false), 6000);
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
    bookingMutation.mutate();
  };

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-black overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        
        {/* Header Block */}
        <div className="border-b border-[var(--gold-200)] pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold font-mono block">
              Direct Guidance Channels
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight flex items-center gap-3">
              <Compass className="w-7 h-7 text-[var(--gold)] animate-pulse" /> Consultation <span className="gold-gradient-text">Services</span>
            </h1>
          </div>
          <button onClick={scrollToBooking}>
            <GoldButton variant="filled" className="py-2 px-5 text-sm flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Book Quick Slot
            </GoldButton>
          </button>
        </div>

        {/* ── Section: Premium Consultants (Always on Top) ── */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-[var(--gold)]">Direct Consultations with the Founders</h2>
            <p className="text-gray-400 text-xs font-light">Book deep-dive personal guidance sessions directly with our master consultants.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loadingTeam ? (
              <p className="text-gray-400 text-sm animate-pulse font-light">Loading master guides...</p>
            ) : teamMembers.slice(0, 2).map((member: any) => {
              const link = `/appointments/team-${member.name.split(' ')[0].toLowerCase()}`;
              return (
                <div key={member._id} className="cursor-pointer" onClick={() => router.push(link)}>
                  <GoldCard theme="dark" flush className="border border-[var(--gold-100)] flex flex-col justify-between h-full hover:border-[var(--gold-300)] transition-all duration-300 group overflow-hidden">
                    <div className="flex flex-col sm:flex-row h-full">
                      {/* Left/Top image */}
                      <div className="w-full sm:w-1/3 aspect-square sm:aspect-auto bg-neutral-900 overflow-hidden relative flex items-end">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      {/* Right/Bottom content */}
                      <div className="w-full sm:w-2/3 p-6 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--gold)] uppercase font-mono">
                            <Star className="w-3 h-3 fill-[var(--gold)]" /> Master Guide
                          </div>
                          <h3 className="font-serif text-xl font-bold text-white group-hover:text-[var(--gold)] transition-colors">{member.name}</h3>
                          <p className="text-gray-400 text-[10px] uppercase font-mono tracking-wider">{member.role}</p>
                          
                          {member.experienceYears > 0 && (
                            <div className="pt-1">
                              <span className="text-sm font-bold text-[var(--gold)] bg-[var(--gold-50)] border border-[var(--gold-200)] px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                                <Award className="w-4 h-4" /> {member.experienceYears}+ Years of Experience
                              </span>
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-2 pt-1 pb-1">
                            {member.specializations?.slice(0,3).map((spec: any, i: number) => (
                              <span key={i} className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-white border border-[var(--gold)] text-[var(--gold)] px-2.5 py-1 rounded-full">
                                {spec.label || spec}
                              </span>
                            ))}
                            {member.specializations?.length > 3 && (
                              <span className="text-[10px] text-gray-500 self-center">+{member.specializations.length - 3}</span>
                            )}
                          </div>
  
                          <FormattedText text={member.description} className="text-gray-300 text-xs leading-relaxed line-clamp-2 font-bold" />
                        </div>
                        <div className="border-t border-neutral-800 pt-3 flex justify-between items-center">
                          <span className="text-[var(--gold)] text-xs font-bold uppercase font-mono">Premium Consultations</span>
                          <span className="text-[var(--gold)] font-medium text-xs flex items-center gap-1 group-hover:underline">
                            View Bio <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </GoldCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Section: Service Consultation Packages ── */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-white">Specialized Consultation Packages</h2>
            <p className="text-gray-400 text-xs font-light">Select from our mathematically-aligned planetary analysis and vibrational healing packages.</p>
          </div>

          {loadingTypes ? (
            <p className="text-gray-400 text-sm animate-pulse font-light">Loading available consultation packages...</p>
          ) : appointmentTypes && appointmentTypes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {appointmentTypes.map((type: any) => {
                const now = new Date();
                const hasActiveOffer = type.offerPrice !== undefined && type.offerPrice !== null &&
                  (!type.offerExpiresAt || now < new Date(type.offerExpiresAt));
                const priceVal = hasActiveOffer ? type.offerPrice : type.price;
                const originalPriceVal = type.price;

                return (
                  <div key={type._id} className="cursor-pointer" onClick={() => router.push(`/appointments/${type._id}`)}>
                    <GoldCard theme="dark" className="border border-neutral-800 hover:border-[var(--gold-200)] transition-all duration-300 flex flex-col justify-between h-full group">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="bg-neutral-900 border border-neutral-800 text-gray-400 text-[9px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full">
                            {type.category}
                          </span>
                          <span className="text-gray-300 text-xs font-sans flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[var(--gold)]" /> {type.duration} mins
                          </span>
                        </div>
                        <h3 className="font-sans text-[26px] font-bold text-white group-hover:text-[var(--gold)] transition-colors line-clamp-1">{type.name}</h3>
                        <FormattedText text={type.description || 'Consultation details and custom alchemical remedy selections.'} className="text-gray-400 text-xs line-clamp-3 leading-relaxed font-light" />
                      </div>
                      <div className="space-y-3 border-t border-neutral-900 pt-4 mt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1.5 flex-wrap font-sans">
                            <span className="text-[var(--gold)] font-bold text-[24px]">₹{(priceVal / 100).toLocaleString()}</span>
                            {hasActiveOffer && (
                              <span className="text-gray-500 line-through text-[20px]">₹{(originalPriceVal / 100).toLocaleString()}</span>
                            )}
                          </div>
                          <span className="text-[var(--gold)] font-medium text-xs flex items-center gap-0.5 group-hover:underline">
                            Details <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        {/* Book Now button — pre-selects this package in the inline form */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTypeId(type._id);
                            scrollToBooking();
                          }}
                          className="w-full py-2.5 text-[11px] font-bold bg-[var(--gold)] hover:bg-[var(--gold-300)] text-black rounded-lg transition-all duration-300 shadow-[0_0_12px_rgba(204,143,51,0.25)] flex items-center justify-center gap-1.5 hover:scale-[1.01]"
                        >
                          <Calendar className="w-3.5 h-3.5" /> Book Now
                        </button>
                      </div>
                    </GoldCard>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-xs">No active consultation packages found in this dimension.</p>
          )}
        </div>

        {/* ── Section: Inline Booking Form ── */}
        <div ref={bookingRef} id="book-slot" className="border-t border-[var(--gold-200)] pt-12 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left: Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold font-mono block">
                  Book Your Session
                </span>
                <h2 className="font-serif text-3xl font-bold text-white">
                  Reserve a <span className="gold-gradient-text">Consultation Slot</span>
                </h2>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  Choose a consultation package, pick a date and secure your personalized session directly here — no redirects, no delays.
                </p>
              </div>

              {/* Quick contacts */}
              <div className="space-y-3">
                <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">Or reach us directly</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:+919922352666" className="flex-1">
                    <button className="w-full py-3 text-xs flex items-center justify-center gap-2 font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                      <Phone className="w-4 h-4" /> Call Now (+91 9922352666)
                    </button>
                  </a>
                  <a href="https://wa.me/919922352666" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <button className="w-full py-3 text-xs flex items-center justify-center gap-2 font-bold bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-lg transition-colors duration-300 shadow-[0_0_15px_rgba(37,211,102,0.2)]">
                      <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                    </button>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <GoldCard theme="dark" className="border border-[var(--gold-300)] p-6 space-y-5">
              {bookingSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
                  <CheckCircle2 className="w-14 h-14 text-green-400" />
                  <h3 className="font-serif text-xl font-bold text-white">Slot Confirmed!</h3>
                  <p className="text-gray-400 text-xs font-light">Your consultation has been booked. A confirmation email & Google Calendar event have been sent.</p>
                </div>
              ) : (
                <form onSubmit={handleBookSubmit} className="space-y-5">
                  {/* Step 1: Select Package */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300">
                      1. Select Consultation Package
                    </label>
                    {loadingTypes ? (
                      <p className="text-gray-500 text-xs animate-pulse font-light">Loading packages...</p>
                    ) : (
                      <select
                        value={selectedTypeId}
                        onChange={(e) => {
                          setSelectedTypeId(e.target.value);
                          setSelectedDate('');
                          setSelectedTimeSlot('');
                        }}
                        required
                        className="w-full bg-black/60 border border-[var(--gold-200)] rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-transparent text-xs appearance-none"
                      >
                        <option value="">— Choose a package —</option>
                        {appointmentTypes?.map((type: any) => (
                          <option key={type._id} value={type._id}>
                            {type.name} ({type.duration} mins) — ₹{((type.offerPrice ?? type.price) / 100).toLocaleString()}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Step 2: Select Date */}
                  {selectedTypeId && (
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300">
                        2. Select Date
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
                        className="w-full bg-black/60 border border-[var(--gold-200)] rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-transparent text-xs"
                      />
                    </div>
                  )}

                  {/* Step 3: Select Time Slot */}
                  {selectedDate && (
                    <div className="space-y-2">
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300">
                        3. Available Time Slots (IST)
                      </label>
                      {isFetchingSlots ? (
                        <p className="text-gray-400 text-xs animate-pulse font-light">Finding available slots...</p>
                      ) : availableSlots && availableSlots.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {availableSlots.map((slot: string) => {
                            const dateObj = new Date(slot);
                            const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const isSelected = selectedTimeSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`py-2 px-2 text-[10px] border rounded-lg transition-all duration-300 font-medium ${
                                  isSelected
                                    ? 'bg-[var(--gold)] text-black border-transparent shadow-[0_0_10px_rgba(204,143,51,0.3)]'
                                    : 'bg-black/40 text-[var(--gold)] border-[var(--gold-200)] hover:bg-[var(--gold-50)]'
                                }`}
                              >
                                {timeStr}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-yellow-500 bg-yellow-950/20 border border-yellow-900/30 p-3 rounded-lg text-[10px]">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>No slots available for this date. Please try another date.</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Submit — show login prompt if not authenticated */}
                  {selectedTimeSlot && !isAuthenticated ? (
                    <div className="space-y-3 pt-1">
                      <div className="flex items-start gap-3 bg-[var(--gold-50)] border border-[var(--gold-200)] rounded-xl p-4">
                        <Calendar className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-[var(--gold)] text-xs font-bold">Almost there! Please log in to confirm your slot.</p>
                          <p className="text-gray-400 text-[10px] font-light leading-relaxed">Your selected slot is reserved. Create a free account or log in to complete your booking.</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link href={`/login?redirect=/appointments`} className="w-full">
                          <button className="w-full py-2.5 text-xs font-bold bg-[var(--gold)] hover:bg-[var(--gold-300)] text-black rounded-lg transition-colors duration-300 shadow-[0_0_12px_rgba(204,143,51,0.25)] flex items-center justify-center gap-1.5">
                            <Compass className="w-4 h-4" /> Log In
                          </button>
                        </Link>
                        <Link href={`/register?redirect=/appointments`} className="w-full">
                          <button className="w-full py-2.5 text-xs font-bold border border-[var(--gold-200)] text-[var(--gold)] hover:bg-[var(--gold-50)] rounded-lg transition-colors duration-300 flex items-center justify-center gap-1.5">
                            <Plus className="w-4 h-4" /> Sign Up Free
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={!selectedTimeSlot || bookingMutation.isPending}
                      className="w-full py-3 text-xs font-bold bg-[var(--gold)] hover:bg-[var(--gold-300)] disabled:opacity-40 disabled:cursor-not-allowed text-black rounded-lg transition-colors duration-300 shadow-[0_0_15px_rgba(204,143,51,0.3)] flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      {bookingMutation.isPending ? 'Confirming Slot...' : 'Confirm & Secure Slot'}
                    </button>
                  )}
                </form>
              )}
            </GoldCard>
          </div>
        </div>

        {/* ── Section: My Booked Appointments — only shown when logged in ── */}
        {isAuthenticated && (
          <div className="border-t border-neutral-900 pt-12 space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[var(--gold)]" /> My Booked Consultations
              </h2>
              <p className="text-gray-400 text-xs font-light">Track your active schedules, meeting links, and appointment timelines.</p>
            </div>

            {loadingAppts ? (
              <p className="text-gray-400 text-sm animate-pulse font-light">Decrypting calendars...</p>
            ) : appointments && appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((app: any) => {
                  const dateObj = new Date(app.scheduledAt);
                  const isPast = dateObj < new Date();
                  return (
                    <GoldCard key={app._id} theme="dark" className={`transition-all duration-300 ${isPast ? 'opacity-50 hover:opacity-80' : ''}`}>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                          <h3 className="font-serif text-lg font-bold text-white">{app.typeName}</h3>
                          <p className="text-gray-400 text-xs flex items-center gap-1.5 font-light font-mono">
                            <Clock className="w-3.5 h-3.5 text-[var(--gold)]" />
                            <span>{dateObj.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="text-[var(--gold)]">•</span>
                            <span>{dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </p>
                          {app.duration && <p className="text-gray-500 text-[10px] font-mono">Duration: {app.duration} mins</p>}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-full border ${
                          app.status === 'confirmed' ? 'bg-green-950/20 text-green-400 border-green-500/20' :
                          app.status === 'cancelled' ? 'bg-red-950/20 text-red-400 border-red-500/20' :
                          'bg-yellow-950/20 text-yellow-400 border-yellow-500/20'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </GoldCard>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 bg-neutral-900/10 rounded-xl border border-neutral-900 border-dashed">
                <p className="text-gray-400 text-xs font-light">You have no booked consultations yet.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
