'use client';

import React, { useState } from 'react';
import { NorthIndianChart } from '@/components/ui/NorthIndianChart';
import { ZODIAC_SIGNS, ZODIAC_LORDS } from '@/lib/astrologyEngine';

interface Props {
 data: any;
 chartTitle?: string;
}

export function InteractiveChartViewer({ data, chartTitle = 'Lagna Chart (D-1)' }: Props) {
 const [zoomLevel, setZoomLevel] = useState<number>(1);
 const [selectedHouseDrawer, setSelectedHouseDrawer] = useState<number | null>(null);
 const [language, setLanguage] = useState<'en' | 'hi'>('en');
 const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
 const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

 if (!data || !data.output || !data.output[1]) return null;

 const rawPlanets = data.output[1];
 const house1Sign = rawPlanets[1]?.current_sign || rawPlanets['Ascendant']?.current_sign || 1;

 // Group planets by house
 const houseOccupants: Record<number, string[]> = {};
 for (let i = 1; i <= 12; i++) houseOccupants[i] = [];

 Object.entries(rawPlanets).forEach(([pName, pData]: any) => {
 if (pName !== 'ayanamsa' && pName !== 'debug' && pData.house_number) {
 houseOccupants[pData.house_number].push(pName);
 }
 });

 const handleSaveKundli = () => {
 try {
 const savedList = JSON.parse(localStorage.getItem('om_saved_kundlis') || '[]');
 savedList.push({
 id: Date.now(),
 date: new Date().toISOString(),
 title: chartTitle,
 data
 });
 localStorage.setItem('om_saved_kundlis', JSON.stringify(savedList));
 setSavedSuccess(true);
 setTimeout(() => setSavedSuccess(false), 3000);
 } catch (e) {
 console.error(e);
 }
 };

 const selectedSignNum = selectedHouseDrawer ? ((house1Sign - 1 + (selectedHouseDrawer - 1)) % 12) + 1 : 1;
 const selectedSignName = ZODIAC_SIGNS[selectedSignNum - 1];
 const selectedLord = ZODIAC_LORDS[selectedSignNum];
 const selectedOccupants = selectedHouseDrawer ? houseOccupants[selectedHouseDrawer] : [];

 return (
 <div className="bg-amber-50/60 border-2 border-amber-800/30 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
 
 {/* Chart Canvas Viewport */}
 <div className="w-full bg-white border border-amber-300 rounded-xl shadow-inner p-2">
 <NorthIndianChart data={data} title={chartTitle} />

 {/* Quick house selector drawer trigger */}
 <div className="pt-4 text-center">
 <div className="flex flex-wrap justify-center gap-1.5">
 {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
 <button
 key={h}
 onClick={() => setSelectedHouseDrawer(h)}
 className={`px-2.5 py-1 rounded text-xs font-bold transition ${
 selectedHouseDrawer === h ? 'bg-amber-600 text-gray-900' : 'bg-amber-100 text-amber-950 hover:bg-amber-200'
 }`}
 >
 H{h}
 </button>
 ))}
 </div>
 </div>
 </div>

 {/* House Drawer Interpretation Modal / Panel */}
 {selectedHouseDrawer && (
 <div className="bg-amber-100/70 border-2 border-amber-500 rounded-xl p-5 space-y-3 relative shadow-md">
 <button
 onClick={() => setSelectedHouseDrawer(null)}
 className="absolute top-3 right-3 text-amber-950 font-bold hover:text-rose-600 text-sm"
 >
 ✕ Close
 </button>

 <h4 className="font-serif font-bold text-lg text-amber-950 ">
 House {selectedHouseDrawer} Interpretation ({selectedSignName})
 </h4>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
 <div className="p-2.5 bg-white rounded border">
 <span className="text-gray-500 block">Zodiac Sign</span>
 <span className="font-bold text-amber-950 text-sm">{selectedSignName}</span>
 </div>

 <div className="p-2.5 bg-white rounded border">
 <span className="text-gray-500 block">House Lord</span>
 <span className="font-bold text-amber-950 text-sm">{selectedLord}</span>
 </div>

 <div className="p-2.5 bg-white rounded border">
 <span className="text-gray-500 block">Occupants</span>
 <span className="font-bold text-amber-950 text-sm">
 {selectedOccupants.length > 0 ? selectedOccupants.join(', ') : 'None'}
 </span>
 </div>
 </div>

 <p className="text-xs md:text-sm text-gray-800 pt-1">
 House {selectedHouseDrawer} influences your key life traits. {selectedOccupants.length > 0 ? `${selectedOccupants.join(' and ')} active in this house bring focused planetary energy.` : `Ruled by ${selectedLord}, guiding house themes smoothly.`}
 </p>
 </div>
 )}

 {/* Compare Two Charts Modal */}
 {showCompareModal && (
 <div className="fixed inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
 <div className="bg-white border-2 border-amber-500 rounded-2xl p-6 max-w-3xl w-full space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
 <button
 onClick={() => setShowCompareModal(false)}
 className="absolute top-4 right-4 text-amber-950 font-bold hover:text-rose-600 text-base"
 >
 ✕ Close
 </button>

 <h4 className="font-serif font-bold text-xl text-amber-950 ">
 Dual Chart Comparison (Synastry View)
 </h4>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="p-4 bg-amber-50 rounded-xl border border-amber-300">
 <h5 className="font-bold text-amber-950 text-sm mb-2">Primary Chart (Natal)</h5>
 <NorthIndianChart data={data} title="Natal Kundli" />
 </div>

 <div className="p-4 bg-blue-50 rounded-xl border border-blue-300">
 <h5 className="font-bold text-blue-950 text-sm mb-2">Partner / Transit Chart</h5>
 <NorthIndianChart data={data} title="Comparison Kundli" />
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
