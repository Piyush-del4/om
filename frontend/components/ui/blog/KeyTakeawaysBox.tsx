import { Lightbulb } from 'lucide-react';

interface KeyTakeawaysBoxProps {
  points: string[];
}

export function KeyTakeawaysBox({ points }: KeyTakeawaysBoxProps) {
  if (!points || points.length === 0) return null;
  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 border-2 border-amber-300 rounded-2xl p-6 my-8 shadow-sm">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-4 h-4 text-white" />
        </div>
        <h2 className="font-serif font-bold text-gray-900 text-lg">Key Takeaways</h2>
      </div>
      <ul className="space-y-2.5">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5 text-gray-800 text-sm leading-relaxed">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
