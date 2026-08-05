import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';

export interface CityData {
 name: string;
 country: string;
 lat: number;
 lng: number;
 timezone: number;
}

const INDIAN_PRESETS: CityData[] = [
 { name: 'New Delhi', country: 'India', lat: 28.6139, lng: 77.2090, timezone: 5.5 },
 { name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, timezone: 5.5 },
 { name: 'Bengaluru / Bangalore', country: 'India', lat: 12.9716, lng: 77.5946, timezone: 5.5 },
 { name: 'Kolkata', country: 'India', lat: 22.5726, lng: 88.3639, timezone: 5.5 },
 { name: 'Chennai', country: 'India', lat: 13.0827, lng: 80.2707, timezone: 5.5 },
 { name: 'Hyderabad', country: 'India', lat: 17.3850, lng: 78.4867, timezone: 5.5 },
 { name: 'Ahmedabad', country: 'India', lat: 23.0225, lng: 72.5714, timezone: 5.5 },
 { name: 'Pune', country: 'India', lat: 18.5204, lng: 73.8567, timezone: 5.5 },
 { name: 'Jaipur', country: 'India', lat: 26.9124, lng: 75.7873, timezone: 5.5 },
 { name: 'Lucknow', country: 'India', lat: 26.8467, lng: 80.9462, timezone: 5.5 },
 { name: 'Varanasi', country: 'India', lat: 25.3176, lng: 82.9739, timezone: 5.5 },
 { name: 'Prayagraj / Allahabad', country: 'India', lat: 25.4358, lng: 81.8463, timezone: 5.5 },
 { name: 'Bhadohi', country: 'India', lat: 25.3800, lng: 82.5680, timezone: 5.5 },
 { name: 'Ayodhya', country: 'India', lat: 26.7922, lng: 82.1998, timezone: 5.5 },
 { name: 'Surat', country: 'India', lat: 21.1702, lng: 72.8311, timezone: 5.5 },
 { name: 'Chandigarh', country: 'India', lat: 30.7333, lng: 76.7794, timezone: 5.5 },
 { name: 'Indore', country: 'India', lat: 22.7196, lng: 75.8577, timezone: 5.5 },
 { name: 'Bhopal', country: 'India', lat: 23.2599, lng: 77.4126, timezone: 5.5 },
 { name: 'Nagpur', country: 'India', lat: 21.1458, lng: 79.0882, timezone: 5.5 },
 { name: 'Patna', country: 'India', lat: 25.5941, lng: 85.1376, timezone: 5.5 },
 { name: 'Agra', country: 'India', lat: 27.1767, lng: 78.0081, timezone: 5.5 },
 { name: 'Kanpur', country: 'India', lat: 26.4499, lng: 80.3319, timezone: 5.5 },
 { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 0 },
 { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, timezone: -5 }
];

interface CitySearchInputProps {
 value: string;
 onChange: (city: string, lat?: number, lng?: number, tz?: number) => void;
}

export function CitySearchInput({ value, onChange }: CitySearchInputProps) {
 const [isOpen, setIsOpen] = useState(false);
 const [searchTerm, setSearchTerm] = useState(value);
 const [apiResults, setApiResults] = useState<CityData[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const containerRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 setSearchTerm(value);
 }, [value]);

 useEffect(() => {
 const handleClickOutside = (e: MouseEvent) => {
 if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
 setIsOpen(false);
 }
 };
 document.addEventListener('mousedown', handleClickOutside);
 return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 // Debounced search focusing on cities/towns with India prioritized
 useEffect(() => {
 if (!searchTerm || searchTerm.trim().length < 2) {
 setApiResults([]);
 setIsLoading(false);
 return;
 }

 const timer = setTimeout(async () => {
 setIsLoading(true);
 try {
 const response = await fetch(
 `https://photon.komoot.io/api/?q=${encodeURIComponent(searchTerm)}&limit=12`
 );
 const data = await response.json();

 if (data && data.features) {
 const mapped: CityData[] = data.features
 .filter((feat: any) => {
 const osmValue = feat.properties?.osm_value;
 // Filter out small rural villages/hamlets
 return osmValue !== 'village' && osmValue !== 'hamlet' && osmValue !== 'locality';
 })
 .map((feat: any) => {
 const props = feat.properties || {};
 const coords = feat.geometry?.coordinates || [77.209, 28.6139];
 const lng = coords[0];
 const lat = coords[1];

 const nameParts = [];
 if (props.name) nameParts.push(props.name);
 if (props.state) nameParts.push(props.state);

 const displayName = nameParts.length > 0 ? nameParts.join(', ') : props.name || searchTerm;
 const countryName = props.country || 'India';

 let tz = 5.5;
 if (countryName.toLowerCase() !== 'india') {
 tz = Math.round((lng / 15) * 2) / 2;
 }

 return {
 name: displayName,
 country: countryName,
 lat: parseFloat(lat.toFixed(4)),
 lng: parseFloat(lng.toFixed(4)),
 timezone: tz
 };
 });

 // Sort so Indian cities & towns ALWAYS appear FIRST
 mapped.sort((a, b) => {
 const aIsIndia = a.country.toLowerCase() === 'india' ? -1 : 1;
 const bIsIndia = b.country.toLowerCase() === 'india' ? -1 : 1;
 return aIsIndia - bIsIndia;
 });

 setApiResults(mapped);
 }
 } catch (err) {
 console.error('Geocoding search error:', err);
 } finally {
 setIsLoading(false);
 }
 }, 300);

 return () => clearTimeout(timer);
 }, [searchTerm]);

 const filteredLocal = INDIAN_PRESETS.filter(city =>
 city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 city.country.toLowerCase().includes(searchTerm.toLowerCase())
 );

 // Combine API results prioritizing Indian cities first
 const combinedResults = [...apiResults];
 filteredLocal.forEach(localItem => {
 if (!combinedResults.some(res => res.name.toLowerCase().includes(localItem.name.toLowerCase()))) {
 combinedResults.push(localItem);
 }
 });

 // Final sort to guarantee India locations sit at the top
 combinedResults.sort((a, b) => {
 const aIsIndia = a.country.toLowerCase() === 'india' ? -1 : 1;
 const bIsIndia = b.country.toLowerCase() === 'india' ? -1 : 1;
 return aIsIndia - bIsIndia;
 });

 const handleSelect = (city: CityData) => {
 const fullText = `${city.name}, ${city.country}`;
 setSearchTerm(fullText);
 onChange(fullText, city.lat, city.lng, city.timezone);
 setIsOpen(false);
 };

 const handleCustomSelect = () => {
 setSearchTerm(searchTerm);
 onChange(searchTerm);
 setIsOpen(false);
 };

 return (
 <div ref={containerRef} className="relative w-full">
 <div className="relative">
 <input
 type="text"
 required
 placeholder="Search Indian city or town e.g. New Delhi, Mumbai, Varanasi..."
 className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-10 pr-10 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)] transition-colors text-sm"
 value={searchTerm}
 onFocus={() => setIsOpen(true)}
 onChange={(e) => {
 setSearchTerm(e.target.value);
 onChange(e.target.value);
 setIsOpen(true);
 }}
 />
 <Search className="w-4 h-4 text-gray-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
 {isLoading && (
 <Loader2 className="w-4 h-4 text-[var(--gold)] animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
 )}
 </div>

 {isOpen && (
 <div className="absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-100">
 
 {/* Custom Typed Location */}
 {searchTerm.trim().length > 0 && (
 <div
 onClick={handleCustomSelect}
 className="p-3 bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 cursor-pointer transition-colors flex items-center justify-between text-left border-b border-amber-800/40"
 >
 <div className="flex items-center gap-2.5">
 <MapPin className="w-4 h-4 text-[var(--gold)] shrink-0" />
 <div>
 <span className="text-sm font-semibold text-amber-200 block">Use location: "{searchTerm}"</span>
 <span className="text-[11px] text-amber-400/80">Select to use your exact entered location</span>
 </div>
 </div>
 </div>
 )}

 {combinedResults.length > 0 ? (
 combinedResults.map((city, idx) => (
 <div
 key={idx}
 onClick={() => handleSelect(city)}
 className="p-3 hover:bg-gray-200 cursor-pointer transition-colors flex items-center justify-between text-left"
 >
 <div className="flex items-center gap-2.5">
 <MapPin className="w-4 h-4 text-[var(--gold)] shrink-0" />
 <div>
 <span className="text-sm font-semibold text-gray-900 block">{city.name}</span>
 <span className="text-xs text-gray-600">{city.country}</span>
 </div>
 </div>
 </div>
 ))
 ) : (
 <div className="p-3 text-xs text-gray-600 text-center">
 {isLoading ? 'Searching cities...' : 'Click above to set your location.'}
 </div>
 )}
 </div>
 )}
 </div>
 );
}
