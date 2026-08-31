import React from 'react';
import { HelpCircle } from 'lucide-react';

interface FAQ {
 q: string;
 a: string;
}

interface FAQSectionProps {
 faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
 if (!faqs || faqs.length === 0) return null;

 return (
 <div className="space-y-6">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3 flex items-center gap-2 text-neutral-900">
 <HelpCircle className="w-6 h-6 text-[var(--gold)]" /> Frequently Asked Questions
 </h2>
  <div className="space-y-4">
  {faqs.map((faq, idx) => (
  <details key={idx} className="group border-b border-[var(--gold-200)] pb-4 cursor-pointer">
    <summary className="flex justify-between items-center font-medium text-base text-neutral-900 list-none outline-none">
      <span className="font-bold">{faq.q}</span>
      <span className="transition-transform duration-300 group-open:rotate-180 text-[var(--gold)]">
        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
      </span>
    </summary>
    <p className="text-sm leading-relaxed text-neutral-600 mt-4 group-open:animate-fadeIn">
      {faq.a}
    </p>
  </details>
  ))}
  </div>
 </div>
 );
}
