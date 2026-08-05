'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
 expiresAt: string | Date;
 onExpire?: () => void;
}

export function CountdownTimer({ expiresAt, onExpire }: CountdownTimerProps) {
 const [timeLeft, setTimeLeft] = useState<string>('');
 const [isExpired, setIsExpired] = useState(false);

 useEffect(() => {
 const calculateTimeLeft = () => {
 const difference = +new Date(expiresAt) - +new Date();
 if (difference <= 0) {
 setIsExpired(true);
 setTimeLeft('EXPIRED');
 if (onExpire) onExpire();
 return;
 }

 const days = Math.floor(difference / (1000 * 60 * 60 * 24));
 const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
 const minutes = Math.floor((difference / 1000 / 60) % 60);
 const seconds = Math.floor((difference / 1000) % 60);

 const parts = [];
 if (days > 0) parts.push(`${days}d`);
 if (hours > 0 || days > 0) parts.push(`${String(hours).padStart(2, '0')}h`);
 parts.push(`${String(minutes).padStart(2, '0')}m`);
 parts.push(`${String(seconds).padStart(2, '0')}s`);

 setTimeLeft(parts.join(' '));
 };

 calculateTimeLeft();
 const interval = setInterval(calculateTimeLeft, 1000);

 return () => clearInterval(interval);
 }, [expiresAt, onExpire]);

 if (isExpired) return null;

 return (
 <div className="flex items-center gap-1.5 bg-white border border-red-500 text-red-600 px-3 py-1.5 rounded text-sm font-mono font-bold shadow-[0_0_8px_rgba(220,38,38,0.2)]">
 <Clock className="w-4 h-4 text-red-600 " />
 <span>ENDS IN: {timeLeft}</span>
 </div>
 );
}
