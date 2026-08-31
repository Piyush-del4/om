'use client';

import React from 'react';
import { EbookContents } from '@/components/ui/astrology/EbookContents';

export default function FEANEbookPage() {
  return (
    <>
      <style>{`
        @media print {
          .page-container.original-spacing p, .page-container.original-spacing li {
            line-height: 1.15 !important;
          }
          .page-container.original-spacing p {
            margin-bottom: 0.75rem !important;
            margin-top: 0 !important;
          }
          .page-container.original-spacing li {
            margin-bottom: 0.15rem !important;
            margin-top: 0.15rem !important;
          }
          .page-container.original-spacing ul, .page-container.original-spacing ol {
            margin-top: 0.25rem !important;
            margin-bottom: 1rem !important;
          }

          .page-container:not(.original-spacing) p {
            line-height: 1.5 !important;
            margin-bottom: 0.85rem !important;
            margin-top: 0 !important;
          }
          .page-container:not(.original-spacing) li {
            line-height: 1.25 !important;
            margin-bottom: 0.25rem !important;
            margin-top: 0.25rem !important;
          }
          .page-container:not(.original-spacing) ul, .page-container:not(.original-spacing) ol {
            margin-top: 0.35rem !important;
            margin-bottom: 1.1rem !important;
          }
          .page-container h4 {
            line-height: 1.3 !important;
            margin-top: 1.25rem !important;
            margin-bottom: 0.5rem !important;
          }
          .page-container h5 {
            line-height: 1.3 !important;
            margin-top: 1rem !important;
            margin-bottom: 0.25rem !important;
          }
          /* Override Tailwind's space-y utility and original compression classes */
          .page-container .space-y-1 > * + *,
          .page-container .space-y-2 > * + *,
          .page-container .space-y-4 > * + *,
          .page-container .space-y-6 > * + * {
            margin-top: 0.25rem !important;
          }
        }
      `}</style>
      <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0 print:px-0 relative">
        {/* Floating Download Button */}
        <a 
          href="/FEAN_Method_Astrology_Ebook.pdf"
          download="FEAN_Method_Astrology_Ebook.pdf"
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg print:hidden flex items-center gap-2 transition-transform transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </a>
        
        {/* Global Print Watermark (Fixed to center of every physical printed page) */}
        <div className="hidden print:flex fixed inset-0 z-[-1] justify-center items-center pointer-events-none opacity-[0.15]">
          <img src="/images/logo.png" alt="OM Astrology AMC Watermark" className="w-[60%] object-contain" />
        </div>
        
        <div className="page-container max-w-4xl mx-auto bg-white shadow-xl print:shadow-none print:max-w-none print:w-full relative">
        <EbookContents />
      </div>
    </div>
    </>
  );
}
