import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { GoldButton } from './GoldButton';

interface DownloadPDFButtonProps {
 fullName: string;
 reportType?: string; // 'kundli' or 'birth-chart'
 targetId?: string;
 className?: string;
}

export function DownloadPDFButton({
 fullName,
 reportType = 'kundli',
 targetId = 'report-pdf-content',
 className = ''
}: DownloadPDFButtonProps) {
 const [isGenerating, setIsGenerating] = useState(false);

 const resetMouseAbility = () => {
 setIsGenerating(false);
 document.body.style.pointerEvents = 'auto';
 document.body.style.cursor = 'default';
 
 // Remove any leftover html2canvas/html2pdf iframe or canvas overlays
 document.querySelectorAll('.html2pdf__overlay, canvas').forEach(el => {
 if (el.parentNode && el.classList.contains('html2pdf__overlay')) {
 el.parentNode.removeChild(el);
 }
 });
 };

 const handleDownloadPDF = async () => {
 if (isGenerating) return;
 setIsGenerating(true);

 const element = document.getElementById(targetId) || document.body;

 try {
 // Add export mode class so hidden PDF content is rendered for html2pdf
 element.classList.add('pdf-export-mode');

 // Scroll page to top so html2canvas captures from y=0
 window.scrollTo(0, 0);

 // Load html2pdf script from CDN
 if (!(window as any).html2pdf) {
 await new Promise((resolve, reject) => {
 const script = document.createElement('script');
 script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
 script.onload = resolve;
 script.onerror = reject;
 document.head.appendChild(script);
 });
 }

 const formattedName = (fullName || 'user').trim().replace(/\s+/g, '-').toLowerCase();
 const fileName = `${formattedName}-${reportType}.pdf`;

 const opt = {
 margin: [6, 4, 6, 4],
 filename: fileName,
 image: { type: 'jpeg', quality: 0.85 },
 html2canvas: { 
 scale: 1.2, 
 useCORS: true, 
 logging: false,
 backgroundColor: '#ffffff',
 scrollY: 0,
 windowTop: 0
 },
 jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
 pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
 };

 await (window as any).html2pdf().set(opt).from(element).save();
 } catch (err) {
 console.error('PDF export fallback to browser print:', err);
 const originalTitle = document.title;
 document.title = '';
 window.print();
 setTimeout(() => {
 document.title = originalTitle;
 }, 1000);
 } finally {
 element.classList.remove('pdf-export-mode');
 resetMouseAbility();
 }
 };

 return (
 <div className={`flex justify-center print:hidden ${className}`}>
 <GoldButton 
 onClick={handleDownloadPDF} 
 variant="filled" 
 disabled={isGenerating}
 className="px-8 py-3.5 text-base flex items-center gap-2.5 shadow-xl hover:scale-105 transition-transform cursor-pointer"
 >
 {isGenerating ? (
 <>
 <Loader2 className="w-5 h-5 text-black animate-spin" />
 Downloading PDF...
 </>
 ) : (
 <>
 <Download className="w-5 h-5 text-black" />
 Download PDF Report
 </>
 )}
 </GoldButton>
 </div>
 );
}
