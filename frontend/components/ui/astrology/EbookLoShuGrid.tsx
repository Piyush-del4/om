import React from 'react';

type GridCellProps = {
 numberStr: React.ReactNode | string;
 elementLabel?: string;
 bgColor?: string;
 textColor?: string;
 isStandard?: boolean;
};

const GridCell = ({ numberStr, elementLabel, bgColor = 'bg-[#ffe4c4]', textColor = 'text-black', isStandard = false }: GridCellProps) => {
 return (
 <div className={`flex flex-col items-center justify-center border border-black p-2 min-h-[80px] ${bgColor}`}>
 <span className={`text-xl md:text-2xl font-bold ${textColor}`}>
 {numberStr}
 </span>
 {isStandard && elementLabel && (
 <span className="text-xs md:text-sm text-gray-800 mt-1">({elementLabel})</span>
 )}
 </div>
 );
};

export type EbookLoShuGridProps = {
 title?: string;
 cells: {
 n4: React.ReactNode; n9: React.ReactNode; n2: React.ReactNode;
 n3: React.ReactNode; n5: React.ReactNode; n7: React.ReactNode;
 n8: React.ReactNode; n1: React.ReactNode; n6: React.ReactNode;
 };
 isStandard?: boolean;
 highlightedTextColors?: Record<string, string>; // mapping e.g., 'n9': 'text-red-600'
};

export const EbookLoShuGrid: React.FC<EbookLoShuGridProps> = ({ title, cells, isStandard = false, highlightedTextColors = {} }) => {
 // Standard colors matching the user's images
 const colors = {
 n4: 'bg-[#f4b084]', // Orange/Wood
 n9: 'bg-[#ff9999]', // Red/Fire
 n2: 'bg-[#a9d18e]', // Green/Earth
 n3: 'bg-[#f4b084]', // Orange/Wood
 n5: 'bg-[#c6e0b4]', // Light Green/Earth
 n7: 'bg-[#d9d9d9]', // Gray/Metal
 n8: 'bg-[#a9d18e]', // Green/Earth
 n1: 'bg-[#9dc3e6]', // Blue/Water
 n6: 'bg-[#d9d9d9]', // Gray/Metal
 };

 const getBg = (key: keyof typeof colors) => {
 return isStandard ? colors[key] : 'bg-[#fff2cc]'; // Use standard colors or pale yellow for birth grids
 };

 const getTextColor = (key: string) => highlightedTextColors[key] || 'text-black';

 return (
 <div className="flex flex-col items-center my-6">
 {title && <h4 className="text-lg font-bold mb-4 font-serif text-center">{title}</h4>}
 <div className="grid grid-cols-3 w-64 md:w-80 border-2 border-black">
 <GridCell numberStr={cells.n4} elementLabel="Wood" bgColor={getBg('n4')} isStandard={isStandard} textColor={getTextColor('n4')} />
 <GridCell numberStr={cells.n9} elementLabel="Fire" bgColor={getBg('n9')} isStandard={isStandard} textColor={getTextColor('n9')} />
 <GridCell numberStr={cells.n2} elementLabel="Earth" bgColor={getBg('n2')} isStandard={isStandard} textColor={getTextColor('n2')} />
 
 <GridCell numberStr={cells.n3} elementLabel="Wood" bgColor={getBg('n3')} isStandard={isStandard} textColor={getTextColor('n3')} />
 <GridCell numberStr={cells.n5} elementLabel="Earth" bgColor={getBg('n5')} isStandard={isStandard} textColor={getTextColor('n5')} />
 <GridCell numberStr={cells.n7} elementLabel="White Metal" bgColor={getBg('n7')} isStandard={isStandard} textColor={getTextColor('n7')} />
 
 <GridCell numberStr={cells.n8} elementLabel="Earth" bgColor={getBg('n8')} isStandard={isStandard} textColor={getTextColor('n8')} />
 <GridCell numberStr={cells.n1} elementLabel="Water" bgColor={getBg('n1')} isStandard={isStandard} textColor={getTextColor('n1')} />
 <GridCell numberStr={cells.n6} elementLabel="Gold Metal" bgColor={getBg('n6')} isStandard={isStandard} textColor={getTextColor('n6')} />
 </div>
 </div>
 );
};
