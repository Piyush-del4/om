'use client';

import React, { useState, useEffect } from 'react';
import { GoldButton } from '../ui/GoldButton';
import { MapPin, User, Phone, Home, Building, Milestone, Hash, Landmark } from 'lucide-react';

export interface AddressFormValues {
 fullName: string;
 phone: string;
 flatHouse: string;
 areaStreet: string;
 landmark: string;
 pincode: string;
 townCity: string;
 state: string;
}

interface AddressFormProps {
 initialValues?: Partial<AddressFormValues>;
 onSubmit: (values: AddressFormValues) => void;
 isLoading?: boolean;
 buttonText?: string;
}

const STATES_AND_UTS = [
 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
 'Lakshadweep', 'Puducherry'
];

export function AddressForm({
 initialValues,
 onSubmit,
 isLoading = false,
 buttonText = 'Use this address',
}: AddressFormProps) {
 const [form, setForm] = useState<AddressFormValues>({
 fullName: '',
 phone: '',
 flatHouse: '',
 areaStreet: '',
 landmark: '',
 pincode: '',
 townCity: '',
 state: '',
 });

 useEffect(() => {
 if (initialValues) {
 setForm({
 fullName: initialValues.fullName || '',
 phone: initialValues.phone || '',
 flatHouse: initialValues.flatHouse || '',
 areaStreet: initialValues.areaStreet || '',
 landmark: initialValues.landmark || '',
 pincode: initialValues.pincode || '',
 townCity: initialValues.townCity || '',
 state: initialValues.state || '',
 });
 }
 }, [initialValues]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
 const { name, value, type } = e.target;
 const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
 setForm((prev) => ({
 ...prev,
 [name]: val,
 }));
 };

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 onSubmit(form);
 };

 return (
 <form onSubmit={handleSubmit} className="space-y-6 text-gray-900">
 {/* Full Name */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Full Name (First and Last name)
 </label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
 <User className="w-4 h-4" />
 </span>
 <input
 type="text"
 name="fullName"
 value={form.fullName}
 onChange={handleChange}
 required
 placeholder="e.g. John Doe"
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-sm placeholder-neutral-400 placeholder:opacity-60"
 />
 </div>
 </div>

 {/* Mobile Number */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Mobile Number
 </label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
 <Phone className="w-4 h-4" />
 </span>
 <input
 type="tel"
 name="phone"
 value={form.phone}
 onChange={handleChange}
 required
 placeholder="e.g. 9876543210"
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-sm placeholder-neutral-400 placeholder:opacity-60"
 />
 </div>
 <p className="text-[10px] text-gray-500 font-light">May be used to assist delivery</p>
 </div>

 <div className="h-px bg-gray-100 my-2"></div>

 {/* Address line 1: Flat/House/Building */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Flat, House no., Building, Company, Apartment
 </label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
 <Home className="w-4 h-4" />
 </span>
 <input
 type="text"
 name="flatHouse"
 value={form.flatHouse}
 onChange={handleChange}
 required
 placeholder="e.g. Building 7A, Block C-3, Vasant Kunj"
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-sm placeholder-neutral-400 placeholder:opacity-60"
 />
 </div>
 </div>

 {/* Address line 2: Area/Street/Village */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Area, Street, Sector, Village
 </label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
 <Building className="w-4 h-4" />
 </span>
 <input
 type="text"
 name="areaStreet"
 value={form.areaStreet}
 onChange={handleChange}
 required
 placeholder="e.g. Nelson Mandela Marg, Pocket 9"
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-sm placeholder-neutral-400 placeholder:opacity-60"
 />
 </div>
 </div>

 {/* Landmark */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Landmark
 </label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
 <Milestone className="w-4 h-4" />
 </span>
 <input
 type="text"
 name="landmark"
 value={form.landmark}
 onChange={handleChange}
 placeholder="e.g. Near Heritage Park"
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-sm placeholder-neutral-400 placeholder:opacity-60"
 />
 </div>
 </div>

 {/* Pincode & Town/City Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {/* Pincode */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Pincode
 </label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
 <Hash className="w-4 h-4" />
 </span>
 <input
 type="text"
 name="pincode"
 value={form.pincode}
 onChange={handleChange}
 required
 maxLength={6}
 placeholder="e.g. 110070"
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-sm placeholder-neutral-400 placeholder:opacity-60"
 />
 </div>
 </div>

 {/* Town/City */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Town/City
 </label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
 <Landmark className="w-4 h-4" />
 </span>
 <input
 type="text"
 name="townCity"
 value={form.townCity}
 onChange={handleChange}
 required
 placeholder="e.g. New Delhi"
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-sm placeholder-neutral-400 placeholder:opacity-60"
 />
 </div>
 </div>
 </div>

 {/* State Select */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 State
 </label>
 <div className="relative">
 <select
 name="state"
 value={form.state}
 onChange={handleChange}
 required
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-sm cursor-pointer appearance-none"
 >
 <option value="" disabled>Choose a state</option>
 {STATES_AND_UTS.map((st) => (
 <option key={st} value={st.toUpperCase()}>{st.toUpperCase()}</option>
 ))}
 </select>
 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
 <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
 </svg>
 </div>
 </div>
 </div>

 {/* Submit Button */}
 <div className="pt-4">
 <GoldButton
 type="submit"
 variant="filled"
 fullWidth
 isLoading={isLoading}
 className="py-3 text-sm font-semibold flex items-center justify-center gap-2"
 >
 <MapPin className="w-4 h-4 text-black" /> {buttonText}
 </GoldButton>
 </div>
 </form>
 );
}
