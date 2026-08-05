import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimePicker12HourProps {
 value: string; // HH:MM in 24hr format
 onChange: (time24: string) => void;
}

export function TimePicker12Hour({ value, onChange }: TimePicker12HourProps) {
 const [hour12, setHour12] = useState('12');
 const [minute, setMinute] = useState('00');
 const [ampm, setAmPm] = useState<'AM' | 'PM'>('AM');

 useEffect(() => {
 if (value) {
 const [hStr, mStr] = value.split(':');
 let h = parseInt(hStr || '0');
 const m = mStr || '00';
 const isPm = h >= 12;
 h = h % 12 || 12;
 setHour12(h.toString().padStart(2, '0'));
 setMinute(m);
 setAmPm(isPm ? 'PM' : 'AM');
 }
 }, [value]);

 const handleUpdate = (newH: string, newM: string, newAmPm: 'AM' | 'PM') => {
 setHour12(newH);
 setMinute(newM);
 setAmPm(newAmPm);

 let h = parseInt(newH);
 if (newAmPm === 'PM' && h < 12) h += 12;
 if (newAmPm === 'AM' && h === 12) h = 0;

 const time24 = `${h.toString().padStart(2, '0')}:${newM}`;
 onChange(time24);
 };

 const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
 const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

 return (
 <div className="flex items-center gap-2">
 {/* Hours Select */}
 <div className="relative flex-1">
 <select
 value={hour12}
 onChange={(e) => handleUpdate(e.target.value, minute, ampm)}
 className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)] transition-colors text-sm appearance-none cursor-pointer"
 >
 {hours.map((h) => (
 <option key={h} value={h} className="bg-gray-100 text-gray-900">
 {h} Hr
 </option>
 ))}
 </select>
 </div>

 <span className="text-gray-600 font-bold">:</span>

 {/* Minutes Select */}
 <div className="relative flex-1">
 <select
 value={minute}
 onChange={(e) => handleUpdate(hour12, e.target.value, ampm)}
 className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)] transition-colors text-sm appearance-none cursor-pointer"
 >
 {minutes.map((m) => (
 <option key={m} value={m} className="bg-gray-100 text-gray-900">
 {m} Min
 </option>
 ))}
 </select>
 </div>

 {/* AM / PM Toggle Buttons */}
 <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-gray-100 p-0.5">
 <button
 type="button"
 onClick={() => handleUpdate(hour12, minute, 'AM')}
 className={`px-3 py-2 text-xs font-bold rounded-md transition-all ${
 ampm === 'AM'
 ? 'bg-[var(--gold)] text-black shadow-md'
 : 'text-gray-600 hover:text-gray-900'
 }`}
 >
 AM
 </button>
 <button
 type="button"
 onClick={() => handleUpdate(hour12, minute, 'PM')}
 className={`px-3 py-2 text-xs font-bold rounded-md transition-all ${
 ampm === 'PM'
 ? 'bg-[var(--gold)] text-black shadow-md'
 : 'text-gray-600 hover:text-gray-900'
 }`}
 >
 PM
 </button>
 </div>
 </div>
 );
}
