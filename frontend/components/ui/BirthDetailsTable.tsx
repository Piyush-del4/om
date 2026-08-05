import React from 'react';

interface BirthDetailsProps {
 name: string;
 date: string; // YYYY-MM-DD
 time: string; // HH:MM
 location: string;
 lat: number;
 lng: number;
 timezone: number;
}

export function BirthDetailsTable({
 name,
 date,
 time,
 location,
 lat,
 lng,
 timezone
}: BirthDetailsProps) {
 const formatDate = (dateStr: string) => {
 if (!dateStr) return '-';
 const parts = dateStr.split('-');
 if (parts.length !== 3) return dateStr;
 const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
 const monthIndex = parseInt(parts[1]) - 1;
 const monthName = months[monthIndex] || parts[1];
 return `${parts[2]}-${monthName}-${parts[0]}`;
 };

 const formatTime = (timeStr: string) => {
 if (!timeStr) return '-';
 const [h, m] = timeStr.split(':');
 let hours = parseInt(h || '0');
 const minutes = m || '00';
 const ampm = hours >= 12 ? 'PM' : 'AM';
 hours = hours % 12 || 12;
 return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
 };

 const rows = [
 { label: 'Date of Birth:', value: formatDate(date) },
 { label: 'Birth Time:', value: formatTime(time) },
 { label: 'Birth Place:', value: (location || 'NEW DELHI, INDIA').toUpperCase() },
 { label: 'Latitude:', value: lat ? lat.toFixed(3) : '-' },
 { label: 'Longitude:', value: lng ? lng.toFixed(3) : '-' },
 { label: 'Time Zone:', value: timezone ? timezone.toString() : '5.5' }
 ];

 return (
 <div className="w-full max-w-full mx-auto my-4 border-2 border-amber-800/40 rounded-xl overflow-hidden shadow-md bg-white text-sm sm:text-base">
 {/* Header with Name */}
 <div className="bg-gradient-to-r from-amber-300 via-orange-200 to-amber-300 py-3 px-5 text-center border-b-2 border-amber-800/40">
 <h3 className="text-amber-950 font-serif font-black text-xl sm:text-2xl tracking-wider uppercase">
 {name || 'Astrological Details'}
 </h3>
 </div>

 {/* Details Table */}
 <div className="divide-y divide-amber-800/20 font-medium">
 {rows.map((r, i) => (
 <div key={i} className="grid grid-cols-5 text-neutral-900 hover:bg-amber-100/50 :bg-gray-200/50 transition-colors">
 <div className="col-span-2 p-3 font-bold text-amber-950 border-r border-amber-800/20 ">
 {r.label}
 </div>
 <div className="col-span-3 p-3 font-semibold text-neutral-800 ">
 {r.value}
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}
