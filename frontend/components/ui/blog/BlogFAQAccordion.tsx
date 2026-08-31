'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface BlogFAQAccordionProps {
  faqs: FAQItem[];
}

export function BlogFAQAccordion({ faqs }: BlogFAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="my-12 border-t-2 border-amber-200 pt-10" id="faq">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">?</span>
        Frequently Asked Questions
      </h2>

      {/* JSON-LD FAQ Schema — injected as script for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`border rounded-xl overflow-hidden transition-all duration-200 ${
              openIndex === i ? 'border-amber-400 shadow-md' : 'border-gray-200 hover:border-amber-300'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-4 text-left bg-white hover:bg-amber-50/40 transition-colors"
              aria-expanded={openIndex === i}
            >
              <span className="font-semibold text-gray-900 text-sm leading-snug">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-amber-600 flex-shrink-0 transition-transform duration-200 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 bg-amber-50/30 border-t border-amber-100">
                <p className="text-gray-700 text-sm leading-relaxed pt-3">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
