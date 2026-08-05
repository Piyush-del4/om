'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { client } from '@/lib/api/client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Calendar, AlertCircle } from 'lucide-react';
import { GoldButton } from './GoldButton';
import { GoldCard } from './GoldCard';

interface CategoryBookingWidgetProps {
 category: 'Astrology' | 'Numerology' | 'Tarot Card' | 'Graphology';
 serviceName?: string;
}

const loadRazorpayScript = () => {
 return new Promise((resolve) => {
 const script = document.createElement('script');
 script.src = 'https://checkout.razorpay.com/v1/checkout.js';
 script.onload = () => resolve(true);
 script.onerror = () => resolve(false);
 document.body.appendChild(script);
 });
};
 
export function CategoryBookingWidget({ category, serviceName }: CategoryBookingWidgetProps) {
 const router = useRouter();
 const { isAuthenticated, user } = useAuth();
 
 // Booking states
 const [selectedTypeId, setSelectedTypeId] = useState('');
 const [selectedDate, setSelectedDate] = useState('');
 const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
 const [bookingMessage, setBookingMessage] = useState('');


 // Fetch appointment types filtered by category and optionally by service name
 const { data: appointmentTypes, isLoading: isLoadingTypes } = useQuery({
 queryKey: ['appointmentTypes', category, serviceName],
 queryFn: async () => {
 const res = await client.get('/appointments/types', {
 params: { category },
 });
 let data = res.data?.data || [];
 if (serviceName) {
 data = data.filter((t: any) => t.name.toLowerCase().includes(serviceName.toLowerCase()));
 }
 return data;
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

 // Booking mutation
 const bookingMutation = useMutation({
 mutationFn: async () => {
 if (!selectedTypeId || !selectedTimeSlot) {
 throw new Error('Please select type and time slot');
 }
 const res = await client.post('/appointments', {
 appointmentTypeId: selectedTypeId,
 scheduledAt: selectedTimeSlot,
 message: bookingMessage,
 });
 return res.data?.data;
 },
 onSuccess: async (data: any) => {
 console.log('Booking mutation success data:', data);
 // Free appointment — confirmed immediately
 if (!data || !data.paymentRequired) {
 alert('🎉 Consultation booked successfully! A confirmation email and Google Calendar event have been created.');
 resetForm();
 return;
 }

 // Paid appointment — open Razorpay checkout
 const loaded = await loadRazorpayScript();
 if (!loaded) {
 alert('Failed to load payment gateway. Please check your connection.');
 return;
 }

 const options = {
 key: data.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
 amount: data.amount,
 currency: data.currency || 'INR',
 name: 'OM Astrology AMC',
 description: `Consultation: ${selectedType?.name || category + ' Consultation'}`,
 order_id: data.razorpayOrderId,
 handler: async (response: any) => {
 try {
 await client.post('/appointments/verify', {
 razorpayOrderId: response.razorpay_order_id,
 razorpayPaymentId: response.razorpay_payment_id,
 razorpaySignature: response.razorpay_signature,
 });
 resetForm();
 alert('🎉 Payment successful! Your consultation slot has been confirmed. Check your email for the Google Meet link.');
 } catch (err: any) {
 alert('Payment verification failed. Please contact support with your payment ID.');
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

 const resetForm = () => {
 setSelectedTypeId('');
 setSelectedDate('');
 setSelectedTimeSlot('');
 setBookingMessage('');
 };

 const handleBookSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 if (!isAuthenticated) {
 alert('Please login to book a consultation.');
 router.push('/login');
 return;
 }
 bookingMutation.mutate();
 };

 return (
 <GoldCard className="border border-[var(--gold-300)] p-6 md:p-8 w-full max-w-2xl mx-auto">
 <div className="text-center space-y-2 mb-6">
 <div className="inline-flex p-2.5 rounded-full bg-[var(--gold-50)] border border-[var(--gold-200)]">
 <Calendar className="w-6 h-6 text-[var(--gold)]" />
 </div>
 <h3 className="font-sans text-[30px] md:text-[34px] font-bold tracking-wide">Book {serviceName || `${category} Consultation`}</h3>
 <p className="text-gray-600 text-xs">
 Select your consultation type, date and preferred slot dynamically synced with Google Calendar.
 </p>
 </div>

 <form onSubmit={handleBookSubmit} className="space-y-4">
 {/* Consultation Type */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
 1. Select Consultation Type
 </label>
 {isLoadingTypes ? (
 <div className="h-10 bg-gray-100 border border-[var(--gold-200)] rounded-lg animate-pulse" />
 ) : appointmentTypes && appointmentTypes.length > 0 ? (
 <select
 value={selectedTypeId}
 onChange={(e) => {
 setSelectedTypeId(e.target.value);
 setSelectedDate('');
 setSelectedTimeSlot('');
 }}
 required
 className="w-full bg-white/60 border border-[var(--gold-200)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent text-xs"
 >
 <option value="">-- Choose a {category.toLowerCase()} service --</option>
 {appointmentTypes.map((type: any) => {
 const now = new Date();
 const hasActiveOffer = type.offerPrice !== undefined && type.offerPrice !== null &&
 (!type.offerExpiresAt || now < new Date(type.offerExpiresAt));
 const displayPrice = hasActiveOffer ? type.offerPrice : type.price;
 return (
 <option key={type._id} value={type._id}>
 {type.name} - {type.duration} mins (₹{(displayPrice / 100).toLocaleString()})
 </option>
 );
 })}
 </select>
 ) : (
 <p className="text-gray-500 text-xs py-2">No {category} consultations available at this moment.</p>
 )}
 </div>

 {selectedTypeId && (
 <>
 {/* Date Picker */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
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
 className="w-full bg-white/60 border border-[var(--gold-200)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent text-xs"
 />
 </div>

 {/* Available Hours Slots */}
 {selectedDate && (
 <div className="space-y-2">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
 3. Available Time Slots (IST Business Hours)
 </label>

 {isFetchingSlots ? (
 <p className="text-gray-600 text-[10px] animate-pulse">Calculating slot availability against Google Calendar...</p>
 ) : availableSlots && availableSlots.length > 0 ? (
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
 ? 'bg-[var(--gold)] text-black border-transparent shadow-[0_0_10px_rgba(204,143,51,0.5)]'
 : 'bg-white/40 text-[var(--gold)] border-[var(--gold-200)] hover:bg-[var(--gold-50)]'
 }`}
 >
 {timeStr}
 </button>
 );
 })}
 </div>
 ) : (
 <div className="flex items-center gap-2 text-yellow-500 bg-yellow-950/20 border border-yellow-900/30 p-3 rounded-lg text-xs">
 <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
 <span>No slots available for this date. Please select another date.</span>
 </div>
 )}
 </div>
 )}
 </>
 )}

 {/* Additional User notes */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
 Additional Details (Optional)
 </label>
 <textarea
 value={bookingMessage}
 onChange={(e) => setBookingMessage(e.target.value)}
 placeholder="Include questions you have, birth info, or particular issues..."
 rows={2}
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-transparent text-xs"
 />
 </div>

 {/* Submit */}
 <GoldButton
 type="submit"
 variant="filled"
 fullWidth
 disabled={!selectedTimeSlot || bookingMutation.isPending}
 isLoading={bookingMutation.isPending}
 className="py-2.5 text-xs font-semibold"
 >
 Confirm {category} Appointment
 </GoldButton>
 </form>
 </GoldCard>
 );
}
