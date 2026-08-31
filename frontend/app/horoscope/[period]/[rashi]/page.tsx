import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import horoscopeData from '../../../../data/horoscope.json';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { HoroscopeDatabaseLinks } from '@/components/ui/astrology/HoroscopeDatabaseLinks';

export const dynamic = 'force-dynamic';

export default async function HoroscopePage({ params }: { params: Promise<{ period: string; rashi: string }> }) {
  const resolvedParams = await params;
  const { period, rashi } = resolvedParams;

  const validPeriod = horoscopeData.periods.find(p => p.id === period);
  const validZodiac = horoscopeData.zodiacs.find(z => z.id === rashi);

  if (!validPeriod || !validZodiac) {
    notFound();
  }

  // Check if live AI horoscopes exist via backend API
  let liveData = null;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api/v1';
    console.log(`Fetching from: ${apiUrl}/astrology/horoscope/latest`);
    const res = await fetch(`${apiUrl}/astrology/horoscope/latest`, { cache: 'no-store' });
    if (res.ok) {
      const parsedData = await res.json();
      if (parsedData.success && parsedData.data) {
        liveData = parsedData.data[rashi];
      }
    }
  } catch (err) {
    console.warn("Could not load latest horoscope from backend API", err);
  }

  // If live API data is missing or doesn't have predictions for this period, 
  // show preparation error state instead of incorrect/dummy fallback predictions.
  if (!liveData || !liveData[period]) {
    return (
      <div className="min-h-[60vh] bg-[#FFFDF7] font-sans flex items-center justify-center px-4">
        <div className="text-center max-w-2xl space-y-6">
          <div className="w-20 h-20 mx-auto bg-[#FCAF3E]/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl text-[#E38100]">✧</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#5A3815]">
            Reading the Stars...
          </h1>
          <p className="text-[#5A3815]/80 text-lg leading-relaxed">
            Our expert astrologers are currently preparing the precise {validZodiac.name} {period} horoscope for you. Please check back in just a few moments!
          </p>
          <div className="pt-8">
            <Link 
              href="/horoscope"
              className="inline-block bg-gradient-to-b from-[#FCAF3E] to-[#F5900F] text-black text-[15px] font-bold px-8 py-3 rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:brightness-105 transition-all border border-[#E38100]"
            >
              Go Back to Zodiac Signs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const predictionData = liveData;

  // Helper to format date and title based on period
  const today = new Date();
  let badgeText = '';
  let titleText: React.ReactNode = (
    <>{validZodiac.name} Horoscope <br/> Today</>
  );

  if (period === 'daily') {
    badgeText = today.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } else if (period === 'weekly') {
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 6);
    const startStr = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const endStr = nextWeek.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    badgeText = `${startStr} - ${endStr}`;
    titleText = <>{validZodiac.name} Weekly <br/> Horoscope</>;
  } else if (period === 'monthly') {
    const monthStr = today.toLocaleDateString('en-GB', { month: 'long' });
    badgeText = `${monthStr} Horoscope`;
    titleText = <>{validZodiac.name} Monthly <br/> Horoscope</>;
  } else if (period === 'yearly' || period === 'chinese') {
    badgeText = `2026 Horoscope`;
    titleText = <>{validZodiac.name} Yearly 2026</>;
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7] font-sans">
      {/* Top Banner Section (Image 1 Style) */}
      <div className="bg-[#B37B47] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Title */}
          <div className="flex-1 space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight tracking-tight">
              {titleText}
            </h1>
            <div className="inline-block relative bg-[#F7EBD3] p-1.5 shadow-xl">
              <div className="border-[3px] border-[#8C5D30] px-10 py-4 text-xl flex items-center justify-center relative">
                {/* Simulated inner border (double border effect) */}
                <div className="absolute inset-1 border border-[#8C5D30]/60 pointer-events-none"></div>
                
                {/* Little pseudo-elements for the chevron cutouts (visual approximation) */}
                <div className="absolute -top-[3.5px] left-1/2 -translate-x-1/2 w-8 h-2 bg-[#F7EBD3] border-b-[3px] border-b-[#8C5D30]"></div>
                <div className="absolute -bottom-[3.5px] left-1/2 -translate-x-1/2 w-8 h-2 bg-[#F7EBD3] border-t-[3px] border-t-[#8C5D30]"></div>
                
                <span className="text-[#8C5D30] font-bold font-serif tracking-wide relative z-10">{badgeText}</span>
              </div>
            </div>
          </div>

          {/* Right Zodiac Grid */}
          <div className="flex-1 max-w-2xl w-full">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-6 justify-items-center">
              {horoscopeData.zodiacs.map((z) => {
                const isActive = z.id === rashi;
                return (
                  <Link href={`/horoscope/${period}/${z.id}`} key={z.id} className="flex flex-col items-center gap-2 group">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden ${isActive ? 'ring-4 ring-white shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-110' : 'group-hover:scale-105'}`}>
                      <img 
                        src={`/images/${z.image}`} 
                        alt={z.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <span className={`text-xs md:text-sm font-medium ${isActive ? 'text-white' : 'text-[#F3DFCA]'}`}>
                      {z.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-20">
        
        {/* Explore Horoscope Prediction */}
        <div className="space-y-10">
          <h2 className="text-3xl md:text-4xl font-serif text-center text-[#5A3815]">
            Explore <span className="text-[#DAA520]">Horoscope Prediction</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {horoscopeData.periods.map((p) => {
              const isActive = p.id === period;
              return (
                <Link 
                  key={p.id} 
                  href={`/horoscope/${p.id}/${rashi}`}
                  className={`flex items-center gap-3 px-6 py-4 border ${isActive ? 'border-[#DAA520] shadow-md bg-white' : 'border-[#EAD5B8] bg-white/50 hover:bg-white hover:border-[#DAA520]'} transition-all`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#A5682A] flex items-center justify-center p-1">
                    {/* Placeholder icon pattern */}
                    <div className="w-full h-full border border-white/50 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">☀️</span>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-[#5A3815]">{p.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Detailed Content (Dynamic based on Period) */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {period === 'daily' && (
            <>
              <h2 className="text-4xl font-serif text-[#5A3815] mb-8">{validZodiac.name} Daily Horoscope</h2>
              <div className="space-y-6">
                {Object.entries(predictionData.daily || {}).map(([key, text]) => {
                  const title = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                  return (
                    <div key={key} className="space-y-2">
                      <h3 className="text-xl font-serif font-bold text-[#7A4B24]">{title}</h3>
                      <p className="text-[#5A3815]/80 text-base leading-relaxed">{text as string}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {period === 'weekly' && (
            <>
              <div className="space-y-6">
                {['education', 'career', 'family', 'finance', 'health'].map((key) => {
                  const title = key.charAt(0).toUpperCase() + key.slice(1);
                  return (
                    <div key={key} className="space-y-2">
                      <h3 className="text-xl font-serif font-bold text-[#7A4B24]">{validZodiac.name} {title} Horoscope:</h3>
                      <p className="text-[#5A3815]/80 text-base leading-relaxed">
                        {predictionData.weekly?.[key]}
                      </p>
                    </div>
                  );
                })}
                <div className="space-y-2 pt-4">
                  <h3 className="text-xl font-serif font-bold text-[#7A4B24]">{validZodiac.name} Lucky Colours Horoscope:</h3>
                  <p className="text-[#5A3815]/80 text-base leading-relaxed">{predictionData.weekly?.lucky_colours}</p>
                </div>
                <div className="space-y-2 pt-4">
                  <h3 className="text-xl font-serif font-bold text-[#7A4B24]">{validZodiac.name} Remedies Horoscope:</h3>
                  <p className="text-[#5A3815]/80 text-base leading-relaxed">{predictionData.weekly?.remedies}</p>
                </div>
                <div className="space-y-2 pt-4">
                  <p className="text-[#7A4B24] font-bold text-base leading-relaxed">
                    {predictionData.weekly?.conclusion?.replace('{Rashi}', validZodiac.name) || `Perform ${validZodiac.name} lagna puja.`}
                  </p>
                </div>
              </div>
            </>
          )}

          {period === 'monthly' && (
            <>
              <h2 className="text-4xl font-serif text-[#5A3815] mb-8">
                {validZodiac.name} Monthly Horoscope {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })} : Overview
              </h2>
              <div className="space-y-6">
                {(predictionData.monthly || []).map((paragraph: string, idx: number) => (
                  <p key={idx} className="text-[#5A3815]/80 text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </>
          )}

          {(period === 'yearly' || period === 'chinese') && (
            <>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-serif text-[#5A3815] mb-4">{validZodiac.name} 2026 Horoscope</h2>
                  <p className="text-[#5A3815]/80 text-base leading-relaxed">
                    {predictionData.yearly?.intro}
                  </p>
                </div>

                {['career', 'finance', 'health', 'family_life', 'love_and_relationship'].map((key) => {
                  const title = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                  const specificTitle = title.replace('Life', 'Life Horoscope').replace('Relationship', 'Relationship Horoscope');
                  const finalTitle = specificTitle.includes('Horoscope') ? specificTitle : `${title} Horoscope`;
                  
                  return (
                    <div key={key} className="space-y-4 pt-4">
                      <h3 className="text-3xl font-serif font-bold text-[#7A4B24]">{validZodiac.name} {finalTitle} 2026</h3>
                      <p className="text-[#5A3815]/80 text-base leading-relaxed">
                        {predictionData.yearly?.[key]}
                      </p>
                    </div>
                  );
                })}

                <div className="space-y-4 pt-8 border-t border-[#EAD5B8]/50">
                  <h3 className="text-3xl font-serif font-bold text-[#7A4B24]">Conclusion: {validZodiac.name} Horoscope 2026</h3>
                  <p className="text-[#5A3815]/80 text-base leading-relaxed">
                    {predictionData.yearly?.conclusion}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section (Image 3 Style) */}
        <div className="max-w-4xl mx-auto pt-10 border-t border-[#EAD5B8]">
           <h2 className="text-3xl font-serif text-[#5A3815] mb-6">Frequently Asked Questions</h2>
           <HoroscopeFAQ faqs={generateDynamicFAQs(validZodiac, period, predictionData)} />
        </div>

        {/* Database Links Section for Ebooks, Appointments, Shop Items & Batches */}
        <div className="max-w-6xl mx-auto">
          <HoroscopeDatabaseLinks rashiName={validZodiac.name} variant="full" />
        </div>

      </div>
    </div>
  );
}

// Client component for the FAQ accordion
function HoroscopeFAQ({ faqs }: { faqs: { q: string, a: string }[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <details key={idx} className="group border-b border-[#EAD5B8] pb-4 cursor-pointer">
          <summary className="flex justify-between items-center font-medium text-lg text-[#5A3815] list-none">
            {faq.q}
            <span className="transition group-open:rotate-180">
              <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
            </span>
          </summary>
          <p className="text-[#5A3815]/80 mt-4 group-open:animate-fadeIn">
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  );
}

// Helper to generate dynamic FAQs based on real search intent
function generateDynamicFAQs(validZodiac: any, period: string, predictionData: any) {
  const faqs = [];
  const name = validZodiac.name;

  if (period === 'daily' && predictionData.daily) {
    faqs.push({ q: `How will ${name}'s career progress today?`, a: predictionData.daily.career });
    faqs.push({ q: `What should ${name} expect in their love life today?`, a: predictionData.daily.love_life });
    faqs.push({ q: `Are there any financial opportunities for ${name} today?`, a: predictionData.daily.finances });
    faqs.push({ q: `What is the health prediction for ${name} today?`, a: predictionData.daily.health });
  } else if (period === 'weekly' && predictionData.weekly) {
    faqs.push({ q: `What are the lucky colors for ${name} this week?`, a: predictionData.weekly.lucky_colours });
    faqs.push({ q: `Which astrological remedy should ${name} perform to overcome obstacles this week?`, a: predictionData.weekly.remedies });
    faqs.push({ q: `How is ${name}'s health looking for this week?`, a: predictionData.weekly.health });
    faqs.push({ q: `Will ${name} see growth in their career this week?`, a: predictionData.weekly.career });
  } else if (period === 'monthly' && predictionData.monthly?.length > 0) {
    faqs.push({ q: `What is the overall monthly outlook for ${name}?`, a: predictionData.monthly[0] || "This month brings steady growth." });
    if (predictionData.monthly[1]) {
      faqs.push({ q: `How will ${name} perform professionally this month?`, a: predictionData.monthly[1] });
    }
    if (predictionData.monthly[2]) {
      faqs.push({ q: `What are the financial predictions for ${name} this month?`, a: predictionData.monthly[2] });
    }
  } else if ((period === 'yearly' || period === 'chinese') && predictionData.yearly) {
    faqs.push({ q: `Will ${name} find success in their career in 2026?`, a: predictionData.yearly.career });
    faqs.push({ q: `What does 2026 hold for ${name}'s family life?`, a: predictionData.yearly.family_life });
    faqs.push({ q: `How will ${name}'s financial situation be in 2026?`, a: predictionData.yearly.finance });
    faqs.push({ q: `What are the love and relationship predictions for ${name} in 2026?`, a: predictionData.yearly.love_and_relationship });
  }

  // Fallback if data is missing
  if (faqs.length === 0) {
    faqs.push({ q: `How accurate is the ${name} ${period} horoscope?`, a: `Our horoscopes are calculated using precise Vedic astrology algorithms specifically tailored for ${name} sun and moon signs.`});
  }

  return faqs;
}
