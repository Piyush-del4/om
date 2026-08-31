'use client';

import React from 'react';
import { Shield, Sparkles, Heart, Activity } from 'lucide-react';

interface Props {
  data?: any;
  birthDateStr?: string; // YYYY-MM-DD passed from form state
}

export function PersonalizedRemediesCard({ birthDateStr }: Props) {
  // If date of birth is not present, return null
  if (!birthDateStr) return null;

  // Calculate Lo Shu Grid digits (exactly matching LoShuGrid calculation logic)
  const cleanDigits = birthDateStr.replace(/[^1-9]/g, '').split('');
  const parts = birthDateStr.split('-');
  const dayStr = parts[2] || '1';

  let driverSum = dayStr.split('').reduce((acc, curr) => acc + parseInt(curr || '0'), 0);
  while (driverSum > 9) {
    driverSum = driverSum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }

  let conductorSum = cleanDigits.reduce((acc, curr) => acc + parseInt(curr), 0);
  while (conductorSum > 9) {
    conductorSum = conductorSum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }

  const allDigits = [...cleanDigits, driverSum.toString(), conductorSum.toString()];
  
  // Set of numbers present in the Lo Shu Grid
  const presentNumbers = new Set(allDigits.map(d => parseInt(d)).filter(n => n >= 1 && n <= 9));

  // Determine missing numbers (1 to 9)
  const missingNumbers: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (!presentNumbers.has(i)) {
      missingNumbers.push(i);
    }
  }

  // All potential remedies mapped to missing numbers
  const allRemediesMap: Record<number, {
    mukhi: string;
    element: string;
    effect: string;
    image: string;
    color: string;
  }> = {
    1: {
      mukhi: "1 Mukhi",
      element: "Creates Fire Element (Missing Number 1)",
      effect: "Balances the effects of Surya (Sun)",
      image: "/images/rudraksha_1mukhi.png",
      color: "bg-orange-500/10 text-orange-600 border-orange-400/40"
    },
    2: {
      mukhi: "2 Mukhi",
      element: "Creates Earth Element (Missing Number 2)",
      effect: "Balances the effects of Chandra (Moon)",
      image: "/images/rudraksha_2mukhi.png",
      color: "bg-amber-500/10 text-amber-600 border-amber-400/40"
    },
    3: {
      mukhi: "5 Mukhi",
      element: "Creates Akash (Ether) Element (Missing Number 3)",
      effect: "Balances the effects of Guru (Jupiter)",
      image: "/images/rudraksha_5mukhi.png",
      color: "bg-yellow-500/10 text-yellow-600 border-yellow-400/40"
    },
    4: {
      mukhi: "8 Mukhi",
      element: "Creates Wood Element (Missing Number 4)",
      effect: "Balances the effects of Rahu",
      image: "/images/rudraksha_8mukhi.png",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-400/40"
    },
    5: {
      mukhi: "4 Mukhi",
      element: "Creates Air Element (Missing Number 5)",
      effect: "Balances the effects of Budh (Mercury)",
      image: "/images/rudraksha_4mukhi.png",
      color: "bg-green-500/10 text-green-600 border-green-400/40"
    },
    6: {
      mukhi: "6 Mukhi",
      element: "Creates Metal Element (Missing Number 6)",
      effect: "Balances the effects of Shukra (Venus)",
      image: "/images/rudraksha_6mukhi.png",
      color: "bg-pink-500/10 text-pink-600 border-pink-400/40"
    },
    7: {
      mukhi: "9 Mukhi",
      element: "Creates Metal Element (Missing Number 7)",
      effect: "Balances the effects of Ketu",
      image: "/images/rudraksha_9mukhi.png",
      color: "bg-purple-500/10 text-purple-600 border-purple-400/40"
    },
    8: {
      mukhi: "7 Mukhi",
      element: "Creates Water Element (Missing Number 8)",
      effect: "Balances the effects of Shani (Saturn)",
      image: "/images/rudraksha_7mukhi.png",
      color: "bg-blue-500/10 text-blue-600 border-blue-400/40"
    },
    9: {
      mukhi: "3 Mukhi",
      element: "Creates Fire Element (Missing Number 9)",
      effect: "Balances the effects of Mangal (Mars)",
      image: "/images/rudraksha_3mukhi.png",
      color: "bg-red-500/10 text-red-600 border-red-400/40"
    }
  };

  // Filter list of remedies to only those missing
  const activeRemedies = missingNumbers.map(num => allRemediesMap[num]).filter(Boolean);

  return (
    <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 md:p-8 w-full max-w-full mx-auto my-6 shadow-xl space-y-8 text-black">
      
      {/* Premium Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-gray-900 rounded-2xl p-6 md:p-8 shadow-md">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
            <polygon points="50,10 90,50 50,90 10,50" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <h3 className="font-sans font-bold text-2xl md:text-3xl text-[var(--gold)]">
            Why Rudraksha is Mandatory?
          </h3>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm font-medium text-amber-50">
            <li className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Naturally Creates Elements within the Body</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Protects the Aura from Negative Planetary Effects</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Attracts Positive Energy & Improves Mental Health</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Anyone can wear without Restrictions</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-sans font-bold text-lg md:text-xl text-amber-900">
          Recommended Rudraksha Remedies for Missing Numbers
        </h4>
        <p className="text-xs md:text-sm text-neutral-600">
          Based on your birth date, we identified the missing numbers in your Birth Lo Shu Grid and recommended the corresponding Rudraksha bead remedies to balance your cosmic vibrations.
        </p>
      </div>

      {/* Side-by-Side Rudrakshas Grid (Filtered Dynamically) */}
      {activeRemedies.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 pt-2">
          {activeRemedies.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-5 p-4 md:p-5 bg-white border-2 border-amber-200/80 rounded-2xl hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md group animate-fadeIn"
            >
              {/* Rudraksha Circle Image Container with Gold Halo Ring */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-amber-300 p-1 bg-gradient-to-tr from-amber-200 via-amber-100 to-amber-50 shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={item.image} 
                  alt={item.mukhi} 
                  className="w-full h-full object-contain rounded-full" 
                />
              </div>

              {/* Info Box Details on Right Side */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${item.color}`}>
                    {item.mukhi}
                  </span>
                </div>
                <h4 className="font-sans font-bold text-neutral-900 text-sm sm:text-base leading-tight">
                  {item.element}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                  {item.effect}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-300 p-6 rounded-2xl text-center space-y-2">
          <Sparkles className="w-8 h-8 text-[var(--gold)] mx-auto animate-pulse" />
          <h5 className="font-sans font-bold text-base text-amber-950">
            Perfect Lo Shu Grid!
          </h5>
          <p className="text-xs sm:text-sm text-neutral-650 max-w-lg mx-auto">
            Your birth date contains all numbers (1-9) in the Lo Shu Grid. No missing element Rudraksha remedies are required. For general aura protection and wellness, we recommend wearing a standard <strong>5 Mukhi Rudraksha</strong>.
          </p>
        </div>
      )}

      {/* Planetary Mantra Remedies Section */}
      <div className="pt-8 border-t border-amber-200/50 space-y-6">
        <div className="space-y-2">
          <h4 className="font-sans font-bold text-lg md:text-xl text-amber-900">
            ✦ वैदिक ग्रह मंत्र (Planetary Mantra Remedies) ✦
          </h4>
          <p className="text-xs md:text-sm text-neutral-600">
            वैदिक ज्योतिष में ग्रहों की अनुकूलता और उनके शुभ प्रभाव प्राप्त करने के लिए नियमित रूप से ग्रह मंत्रों का जाप करना सर्वश्रेष्ठ माना जाता है। (In Vedic astrology, chanting planet mantras regularly is considered the best way to harmonize planetary energies and receive positive outcomes.)
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[
            { 
              planet: 'सूर्य (रविवार)', 
              icon: '☀️', 
              sanskrit: 'ॐ घृणिः सूर्याय नमः / ॐ सूर्याय नम:', 
              english: 'Om Ghrini Suryaya Namah', 
              iconBg: 'bg-orange-100', 
              border: 'border-orange-400/30', 
              text: 'text-orange-950',
              noteBg: 'bg-amber-100/90 border-amber-400/80 text-amber-950',
              remedies: 'रोजाना सूर्य देव को जल देना, गेहूँ या दलिया का दान करना, तांबे का सिक्का जल प्रवाह करना, शक्कर चींटियों को डालना, ब्रह्मा देव की उपासना करना, माणिक जल प्रवाह करना।',
              note: 'पिता या पिता तुल्य व्यक्तियों से मधुर संबंध रखना।'
            },
            { 
              planet: 'चन्द्र (सोमवार)', 
              icon: '🌙', 
              sanskrit: 'ॐ सों सोमाय नमः', 
              english: 'Om Som Somaya Namah', 
              iconBg: 'bg-blue-100', 
              border: 'border-blue-400/30', 
              text: 'text-blue-950',
              noteBg: 'bg-sky-100/90 border-sky-400/80 text-sky-950',
              remedies: 'दूध दान करना, चावल दान करना, मिश्री दान करना, चीनी दान करना या चींटियों को डालना, श्वेत वस्तु (वस्त्र, फूल) दान करना, मोती दान या जल प्रवाह करना। सोमवार को दूध या जल शिवलिंग पर चढ़ायें और शिव जी की पूजा करें।',
              note: 'माता या माता तुल्य स्त्रियों से मधुर संबंध रखना, उनसे आशीर्वाद लेना, उनकी सेवा करने से चंद्र देव प्रसन्न होते हैं।'
            },
            { 
              planet: 'मंगल (मंगलवार)', 
              icon: '🔴', 
              sanskrit: 'ॐ अंग अंगारकाय नमः / ॐ भं भौमाय नमः', 
              english: 'Om Ang Angarkaya Namah', 
              iconBg: 'bg-red-100', 
              border: 'border-red-400/30', 
              text: 'text-red-950',
              noteBg: 'bg-red-100/90 border-red-400/80 text-red-950',
              remedies: 'हनुमान जी को सिन्दूर चढ़ाना, हनुमान जी को चोला चढ़ाना, लाल चीज का दान, टमाटर का दान, गाजर का दान, अनार का दान, शक्कर चींटियों को डालना, लाल सूखी मिर्च जल प्रवाह करना, मूँगा जल प्रवाह करना, हनुमान जी को पान के पत्ते चढ़ाना। (संकटमोचन नाम तिहारो...)',
              note: 'छोटे भाई या छोटे भाई तुल्य व्यक्ति से मधुर संबंध रखना, ख्याल रखने से मंगल देव प्रसन्न होते हैं।'
            },
            { 
              planet: 'बुध (बुधवार)', 
              icon: '💚', 
              sanskrit: 'ॐ बुं बुधाय नमः / ॐ गं गणपतये नम:', 
              english: 'Om Bum Budhaya Namah', 
              iconBg: 'bg-emerald-100', 
              border: 'border-emerald-400/30', 
              text: 'text-emerald-950',
              noteBg: 'bg-emerald-100/90 border-emerald-400/80 text-emerald-950',
              remedies: 'हरा चारा गाय को डालना, खीरा दान करना, पुदीना दान करना, पन्ना जल प्रवाह करना, बाजरा पंछियों को डालना, साबुत मूंगी का दान करना, हरी वस्तु (वस्त्र, चूड़ियाँ इत्यादि), तुलसी का दान और सेवा, किन्नरों को कुछ भी खाने को देना।',
              note: 'छोटी कन्या, मौसी, बुआ, बहन, भाभी, ताई, चाची, मामी से मधुर संबंध रखने से बुध देव प्रसन्न होते हैं।'
            },
            { 
              planet: 'गुरु/बृहस्पति (गुरुवार)', 
              icon: '🟡', 
              sanskrit: 'ॐ ब्रहम् वृहस्पतेय नमः / ॐ बृं बृहस्पतये नम:', 
              english: 'Om Braham Brihaspataye Namah', 
              iconBg: 'bg-yellow-100', 
              border: 'border-yellow-400/30', 
              text: 'text-yellow-950',
              noteBg: 'bg-yellow-100/90 border-yellow-400/80 text-yellow-950',
              remedies: 'शक्कर का दान या चींटियों को डालना, बेसन के लड्डू का दान करना, केले, हल्दी का दान करना, केले के पेड़ को जल देना और सेवा करना, चने की दाल का दान करना, गेंदे का फूल मन्दिर में चढ़ाना, धार्मिक और ज्ञानवर्धक पुस्तके बांटना, सुनेला जल प्रवाह करना, पपीता का दान करना। बृहस्पतिवार को हल्दी की पीली गाँठे जल प्रवाह करें।',
              note: 'बुजुर्गो की सेवा करना, गुरुजनो का सम्मान करना, पिता या पिता तुल्य व्यक्तियों से मधुर संबंध रखना।'
            },
            { 
              planet: 'शुक्र (शुक्रवार)', 
              icon: '⭐', 
              sanskrit: 'ॐ गुं शुक्राय नमः', 
              english: 'Om Shum Shukraya Namah', 
              iconBg: 'bg-teal-100', 
              border: 'border-teal-400/30', 
              text: 'text-teal-950',
              noteBg: 'bg-teal-100/90 border-teal-400/80 text-teal-950',
              remedies: 'चीनी दान करना, चावल दान करना, आटा दान करना, सफेद मिठाई (रसगुल्ला, छेना, बर्फी) दान करना, इत्र दान करना, जरकन (ओपल) दान करना, सौंदर्य प्रधान वस्तुओं का दान करना, मिश्री दान करना।',
              note: ''
            },
            { 
              planet: 'शनि (शनिवार)', 
              icon: '🪐', 
              sanskrit: 'ॐ शं शनैश्चराय नमः', 
              english: 'Om Shan Shanaishcharaya Namah', 
              iconBg: 'bg-slate-100', 
              border: 'border-slate-400/30', 
              text: 'text-slate-950',
              noteBg: 'bg-indigo-100/90 border-indigo-400/80 text-indigo-950',
              remedies: 'काले तिल दान करना, काले तिल चींटियों को डालना, सरसों के तेल का दान करना, काली जुराबें दान करना, पीपल के वृक्ष को जल देना, पीपल के वृक्ष के नीचे सरसों का दीपक जलाना, काला वस्त्र का दान करना, लोहे की वस्तुओं का दान करना (चिमटा, तवा), नीली जल प्रवाह करना, शनि चालीसा का दान करना, कोयला दान करना, कोयला जल प्रवाह करना, जूता, चप्पल दान करना। शनिवार को या रोजाना सूर्यास्त के बाद या सोते समय शनि देव के मंत्र का जाप करें।',
              note: 'निम्न स्तर का कर्मचारी (मजदूर, नौकर, कामवाली, भिखारी) के साथ सही व्यवहार रखने से शनिदेव प्रसन्न होते हैं।'
            },
            { 
              planet: 'राहु', 
              icon: '🌑', 
              sanskrit: 'ॐ रां राहवे नमः / ॐ राहवे नमः', 
              english: 'Om Ram Rahave Namah', 
              iconBg: 'bg-purple-100', 
              border: 'border-purple-400/30', 
              text: 'text-purple-950',
              noteBg: 'bg-purple-100/90 border-purple-400/80 text-purple-950',
              remedies: 'चाय की पत्ती दान करना, अगरबत्ती दान करना, सिक्का दान करना, बिजली की तार जल प्रवाह करना, गोमेद जल प्रवाह करना, सतनाजा चींटियों को डालना, काला सफेद कम्बल दान करना, विकलांगो की सहायता करना, कुष्ठश्रम में दान करना, नेत्रहीनों की सेवा करना। शनिवार को चाय की पत्ती व 4 अगरबत्ती का पैकेट शनि मंदिर के बाहर गरीबों को दान करें।',
              note: 'किसी भी प्रकार से शारीरिक असमर्थ लोगों का ख्याल रखने से राहु देव प्रसन्न होते हैं।'
            },
            { 
              planet: 'केतु', 
              icon: '☄️', 
              sanskrit: 'ॐ के केतवे नमः / ॐ केतवे नमः', 
              english: 'Om Kem Ketave Namah', 
              iconBg: 'bg-pink-100', 
              border: 'border-pink-400/30', 
              text: 'text-pink-950',
              noteBg: 'bg-pink-100/90 border-pink-400/80 text-pink-950',
              remedies: 'काला सफेद कपड़ा दान करना, नीम्बू दान करना, अमचूर दान करना, अचार दान करना, चाकू दान करना, कुत्ते की सेवा करना, कुत्ते को रोजाना रोटी, बिस्कुट आदि खिलाना, कुत्ते को कपड़ा पहनना। मंगलवार या बुधवार को सूर्यास्त के बाद केतु मंत्र का जाप करें।',
              note: 'नानका परिवार से मधुर संबंध रखने से केतु देव प्रसन्न होते हैं।'
            }
          ].map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 md:p-6 bg-white border-2 ${m.border} rounded-2xl hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md group`}
            >
              {/* Planet Icon Circle */}
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex-shrink-0 ${m.iconBg} border-2 ${m.border} flex items-center justify-center text-3xl sm:text-4xl shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                {m.icon}
              </div>
              {/* Info Container */}
              <div className="flex-1 min-w-0 w-full space-y-3">
                <div className="space-y-1">
                  <span className={`text-xs font-extrabold uppercase tracking-wide ${m.text} opacity-80 block`}>{m.planet}</span>
                  <p className={`text-base sm:text-lg font-bold font-sans leading-snug ${m.text}`}>{m.sanskrit}</p>
                  <p className="text-xs sm:text-sm font-semibold italic text-neutral-500 leading-tight">{m.english}</p>
                </div>
                
                {/* Divider */}
                <div className="h-px w-full bg-neutral-200 my-2"></div>
                
                <div className="space-y-2">
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    <span className="font-bold text-neutral-900">उपाय:</span> {m.remedies}
                  </p>
                  {m.note && (
                    <div className={`text-xs sm:text-sm p-3.5 rounded-xl border-2 ${m.noteBg} flex items-start gap-2.5 shadow-xs font-medium`}>
                      <span className="font-bold whitespace-nowrap px-2.5 py-0.5 rounded-md bg-white/80 border border-black/15 shadow-2xs text-xs">नोट:</span>
                      <span className="leading-relaxed">{m.note}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section: ग्रहों का बल बढ़ाने के अन्य विकल्प (Other Options to Enhance Planetary Strength) */}
      <div className="pt-8 border-t border-amber-200/50 space-y-6">
        <div className="space-y-2">
          <h4 className="font-sans font-bold text-lg md:text-xl text-amber-900">
            ✦ ग्रहों का बल बढ़ाने के अन्य विकल्प (Options to Enhance Planetary Strength) ✦
          </h4>
          <p className="text-xs md:text-sm text-neutral-600">
            दैनिक जीवनशैली, खान-पान, वस्त्र धारण एवं सरल तिलक विधान द्वारा ग्रहों की शुभता एवं ऊर्जा बढ़ाने के आसान उपाय:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: 1,
              planet: 'सूर्य ग्रह',
              icon: '☀️',
              iconBg: 'bg-orange-100',
              border: 'border-orange-300',
              text: 'text-orange-950',
              options: [
                'मैरून रंग के फलों का सेवन करना जैसे अनार, स्ट्रॉबेरी, चुकंदर आदि।',
                'मैरून रंग के वस्त्र धारण करना।'
              ]
            },
            {
              num: 2,
              planet: 'चंद्र ग्रह',
              icon: '🌙',
              iconBg: 'bg-blue-100',
              border: 'border-blue-300',
              text: 'text-blue-950',
              options: [
                'खाने वाले सफेद पदार्थ का सेवन करना जैसे पनीर, दूध, लस्सी, चावल, बर्फी आदि।',
                'सफेद रंग के वस्त्र धारण करना।'
              ]
            },
            {
              num: 3,
              planet: 'मंगल ग्रह',
              icon: '🔴',
              iconBg: 'bg-red-100',
              border: 'border-red-300',
              text: 'text-red-950',
              options: [
                'कलाई पर मौली बांधना।',
                'सिन्दूर या रोली का तिलक लगाना।',
                'लाल या सिन्दूरी वस्त्र धारण करना।',
                'खाने वाले लाल पदार्थ का सेवन करना जैसे सेब, टमाटर, गाजर आदि।'
              ]
            },
            {
              num: 4,
              planet: 'बृहस्पति ग्रह',
              icon: '🟡',
              iconBg: 'bg-yellow-100',
              border: 'border-yellow-300',
              text: 'text-yellow-950',
              options: [
                'पीले वस्त्र धारण करना।',
                'कलाई पर पीला धागा बांधना।',
                'केसर या हल्दी का तिलक लगाना।',
                'खाने वाले पीले पदार्थ का सेवन करना जैसे पपीता, आम, बेसन की कढ़ी, बेसन का लड्डू, शक्कर, चने की दाल आदि।'
              ]
            },
            {
              num: 5,
              planet: 'बुध ग्रह',
              icon: '💚',
              iconBg: 'bg-emerald-100',
              border: 'border-emerald-300',
              text: 'text-emerald-950',
              options: [
                'हरे वस्त्र धारण करना।',
                'हरे रंग की बोतल में पानी पीना।',
                'हरी सब्ज़ियों का सेवन करना जैसे - खीरा, ककड़ी, पालक, साग आदि।'
              ]
            },
            {
              num: 6,
              planet: 'शुक्र ग्रह',
              icon: '⭐',
              iconBg: 'bg-teal-100',
              border: 'border-teal-300',
              text: 'text-teal-950',
              options: [
                'सफेद रंग के वस्त्र धारण करना।',
                'चन्दन का तिलक लगाना।',
                'इत्र लगाना।',
                'खाने वाले सफेद पदार्थ का सेवन करना जैसे पनीर, खीर, दूध, लस्सी, चावल, बर्फी आदि।'
              ]
            },
            {
              num: 7,
              planet: 'शनि ग्रह',
              icon: '🪐',
              iconBg: 'bg-slate-100',
              border: 'border-slate-300',
              text: 'text-slate-950',
              options: [
                'काले वस्त्र धारण करना।',
                'काजल या सुरमा लगाना।',
                'खाने वाले काले पदार्थ का सेवन करना जैसे काले चने, काले अंगूर, काली उड़द दाल आदि।'
              ]
            }
          ].map((item) => (
            <div 
              key={item.num} 
              className={`p-4 sm:p-5 bg-white border-2 ${item.border} rounded-2xl shadow-xs hover:shadow-md transition-all space-y-3`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${item.iconBg} border ${item.border} flex items-center justify-center text-xl font-bold`}>
                  {item.icon}
                </div>
                <h5 className={`font-bold font-sans text-base sm:text-lg ${item.text}`}>
                  {item.num}. {item.planet} :
                </h5>
              </div>
              <ul className="space-y-1.5 pl-2 text-xs sm:text-sm text-neutral-700">
                {item.options.map((opt, oIdx) => (
                  <li key={oIdx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note Box for Rahu & Ketu */}
        <div className="bg-amber-50 border-2 border-amber-300/80 p-4 sm:p-5 rounded-2xl space-y-1 text-xs sm:text-sm text-amber-950 shadow-xs">
          <p className="font-bold text-amber-900 flex items-center gap-2">
            नोट :
          </p>
          <p className="leading-relaxed text-neutral-800">
            राहु और केतु ग्रह बीमारियों के कारक ग्रह हैं, इसलिए इनसे सम्बंधित वस्तुओं का सेवन हानिकारक है जैसे सिगरेट, बीड़ी, जर्दा, शराब, अफीम आदि सारी नशीली चीज़ें । ये चीज़ें एक अच्छे इंसान के लिए वर्जित मानी जाती हैं ।
          </p>
        </div>
      </div>

    </div>
  );
}
