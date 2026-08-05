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
 <div key={idx} className="border-l-2 border-[var(--gold)] pl-4 py-2 space-y-1 p-4 rounded-r-lg bg-neutral-50 border border-neutral-200">
 <h4 className="text-base font-bold text-neutral-900">{faq.q}</h4>
 <p className="text-sm leading-relaxed text-neutral-700">{faq.a}</p>
 </div>
 ))}
 </div>
 </div>
 );
}
