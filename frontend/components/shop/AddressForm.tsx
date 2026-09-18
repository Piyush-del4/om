'use client';

import React, { useState, useEffect } from 'react';
import { GoldButton } from '../ui/GoldButton';
import { Loader2 } from 'lucide-react';

export interface AddressFormValues {
  fullName: string;
  phone: string;
  email: string;
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
  userEmail?: string;
  userName?: string;
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
  buttonText,
  userEmail = '',
  userName = '',
}: AddressFormProps) {
  const [form, setForm] = useState<AddressFormValues>({
    fullName: initialValues?.fullName || userName || '',
    phone: initialValues?.phone || '',
    email: initialValues?.email || userEmail || '',
    flatHouse: initialValues?.flatHouse || '',
    areaStreet: initialValues?.areaStreet || '',
    landmark: initialValues?.landmark || '',
    pincode: initialValues?.pincode || '',
    townCity: initialValues?.townCity || '',
    state: initialValues?.state || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AddressFormValues, string>>>({});
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);
  const [pincodeHelperText, setPincodeHelperText] = useState('');

  useEffect(() => {
    if (initialValues) {
      setForm((prev) => ({
        fullName: initialValues.fullName || prev.fullName || userName || '',
        phone: initialValues.phone || prev.phone || '',
        email: initialValues.email || prev.email || userEmail || '',
        flatHouse: initialValues.flatHouse || prev.flatHouse || '',
        areaStreet: initialValues.areaStreet || prev.areaStreet || '',
        landmark: initialValues.landmark || prev.landmark || '',
        pincode: initialValues.pincode || prev.pincode || '',
        townCity: initialValues.townCity || prev.townCity || '',
        state: initialValues.state || prev.state || '',
      }));
    }
  }, [initialValues, userEmail, userName]);

  // Indian Pincode Auto-Lookup
  useEffect(() => {
    const cleanPin = form.pincode.trim();
    if (cleanPin.length === 6 && /^\d{6}$/.test(cleanPin)) {
      let isSubscribed = true;
      setIsPincodeLoading(true);
      setPincodeHelperText('Looking up city and state...');

      fetch(`https://api.postalpincode.in/pincode/${cleanPin}`)
        .then((res) => res.json())
        .then((data) => {
          if (!isSubscribed) return;
          setIsPincodeLoading(false);
          if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice?.length > 0) {
            const po = data[0].PostOffice[0];
            const fetchedCity = po.District || po.Block || po.Name || '';
            const fetchedState = po.State || '';

            setForm((prev) => ({
              ...prev,
              townCity: prev.townCity || fetchedCity,
              state: prev.state || STATES_AND_UTS.find(
                (s) => s.toLowerCase() === fetchedState.toLowerCase()
              )?.toUpperCase() || fetchedState.toUpperCase(),
            }));
            setPincodeHelperText(`Location found: ${fetchedCity}, ${fetchedState}`);
          } else {
            setPincodeHelperText('Pincode verified. Enter city and state manually if needed.');
          }
        })
        .catch(() => {
          if (!isSubscribed) return;
          setIsPincodeLoading(false);
          setPincodeHelperText('');
        });

      return () => {
        isSubscribed = false;
      };
    } else {
      setPincodeHelperText('');
    }
  }, [form.pincode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error on edit
    if (errors[name as keyof AddressFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AddressFormValues, string>> = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const cleanPhone = form.phone.replace(/[\s\-\+\(\)]/g, '');
    if (!form.phone.trim() || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!form.flatHouse.trim()) {
      newErrors.flatHouse = 'Please enter your address.';
    }

    if (!form.areaStreet.trim()) {
      newErrors.areaStreet = 'Please enter your area or street.';
    }

    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode.trim())) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode.';
    }

    if (!form.townCity.trim()) {
      newErrors.townCity = 'Please enter your city.';
    }

    if (!form.state.trim()) {
      newErrors.state = 'Please select your state.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  const getInputClass = (fieldName: keyof AddressFormValues) => {
    const hasError = !!errors[fieldName];
    return `w-full bg-white text-[#1D1C1A] border ${
      hasError ? 'border-red-400 focus:ring-red-400' : 'border-[#E7E0D4] focus:border-[#A78652] focus:ring-[#A78652]/30'
    } rounded-lg py-2.5 px-3.5 text-sm placeholder-[#77736D]/50 focus:outline-none focus:ring-1 transition-all duration-200 shadow-xs`;
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 text-[#1D1C1A]">
      {/* Header */}
      <div className="space-y-1 border-b border-[#E7E0D4] pb-4">
        <h2 className="font-serif text-2xl font-bold text-[#1D1C1A]">
          Delivery Information
        </h2>
        <p className="text-xs text-[#77736D] font-light">
          Enter your details so we can process your order.
        </p>
      </div>

      {/* Field 1: Full Name */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#1D1C1A]">
          Full name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="e.g. John Doe"
          className={getInputClass('fullName')}
        />
        {errors.fullName && <p className="text-[11px] text-red-500 font-medium">{errors.fullName}</p>}
      </div>

      {/* Row 2: Mobile & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1D1C1A]">
            Mobile number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className={getInputClass('phone')}
          />
          {errors.phone && <p className="text-[11px] text-red-500 font-medium">{errors.phone}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1D1C1A]">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={getInputClass('email')}
          />
          {errors.email && <p className="text-[11px] text-red-500 font-medium">{errors.email}</p>}
        </div>
      </div>

      {/* Field 4: Address */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#1D1C1A]">
          Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="flatHouse"
          value={form.flatHouse}
          onChange={handleChange}
          placeholder="e.g. Building 7A, Block C-3, Vasant Kunj"
          className={getInputClass('flatHouse')}
        />
        {errors.flatHouse && <p className="text-[11px] text-red-500 font-medium">{errors.flatHouse}</p>}
      </div>

      {/* Field 5: Area / Street / Sector */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#1D1C1A]">
          Area / Street / Sector <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="areaStreet"
          value={form.areaStreet}
          onChange={handleChange}
          placeholder="e.g. Nelson Mandela Marg, Pocket 9"
          className={getInputClass('areaStreet')}
        />
        {errors.areaStreet && <p className="text-[11px] text-red-500 font-medium">{errors.areaStreet}</p>}
      </div>

      {/* Field 6: Landmark (optional) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#1D1C1A]">
          Landmark <span className="text-[#77736D] font-normal">(optional)</span>
        </label>
        <input
          type="text"
          name="landmark"
          value={form.landmark}
          onChange={handleChange}
          placeholder="e.g. Near Heritage Park"
          className={getInputClass('landmark')}
        />
      </div>

      {/* Row 7: Pincode & City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 relative">
          <label className="block text-xs font-semibold text-[#1D1C1A]">
            Pincode <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              maxLength={6}
              placeholder="e.g. 110070"
              className={getInputClass('pincode')}
            />
            {isPincodeLoading && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A78652]">
                <Loader2 className="w-4 h-4 animate-spin" />
              </span>
            )}
          </div>
          {pincodeHelperText && !errors.pincode && (
            <p className="text-[11px] text-[#A78652] font-medium">{pincodeHelperText}</p>
          )}
          {errors.pincode && <p className="text-[11px] text-red-500 font-medium">{errors.pincode}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1D1C1A]">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="townCity"
            value={form.townCity}
            onChange={handleChange}
            placeholder="e.g. New Delhi"
            className={getInputClass('townCity')}
          />
          {errors.townCity && <p className="text-[11px] text-red-500 font-medium">{errors.townCity}</p>}
        </div>
      </div>

      {/* Field 8: State */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#1D1C1A]">
          State <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className={`${getInputClass('state')} appearance-none cursor-pointer pr-10`}
          >
            <option value="" disabled>Select your state</option>
            {STATES_AND_UTS.map((st) => (
              <option key={st} value={st.toUpperCase()}>{st}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#77736D]">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {errors.state && <p className="text-[11px] text-red-500 font-medium">{errors.state}</p>}
      </div>

      {/* Submit Button inside form if buttonText passed */}
      {buttonText && (
        <div className="pt-2">
          <GoldButton
            type="submit"
            variant="filled"
            fullWidth
            isLoading={isLoading}
            className="py-3 text-sm font-semibold"
          >
            {buttonText}
          </GoldButton>
        </div>
      )}
    </form>
  );
}
