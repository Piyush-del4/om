'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';

export function GlobalPreloader() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Consulting planetary positions...');
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only run on the client side and check session storage
    if (typeof window !== 'undefined') {
      const isShown = sessionStorage.getItem('astro-preloader-shown');
      if (!isShown) {
        setShow(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!show) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Allow full bar to be visible momentarily before exiting
          setTimeout(() => {
            setShow(false);
            sessionStorage.setItem('astro-preloader-shown', 'true');
          }, 400);
          return 100;
        }
        
        // Random incremental steps to feel dynamic
        const step = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(prev + step, 100);

        // Update status messages dynamically based on progress
        if (next < 25) {
          setStatusText('Consulting planetary positions...');
        } else if (next < 50) {
          setStatusText('Mapping acoustic name frequencies...');
        } else if (next < 75) {
          setStatusText('Shuffling tarot cards...');
        } else if (next < 95) {
          setStatusText('Calibrating motor-nervous signature slants...');
        } else {
          setStatusText('Energies aligned!');
        }

        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white select-none"
        >
          {/* Celestial background dots */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none radial-dots" />
          
          {/* Glowing auroral nebulas */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--gold)] blur-[130px] opacity-10 pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[var(--gold-light)] blur-[150px] opacity-10 pointer-events-none" />

          {/* Rotating Astrolabe/Zodiac Geometry in center */}
          <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center space-y-8">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Outer zodiac constellation ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border border-dashed border-[var(--gold-200)]/45 rounded-full flex items-center justify-center"
              >
                <div className="absolute top-0 w-2 h-2 bg-[var(--gold)] rounded-full -translate-y-1 animate-pulse" />
                <div className="absolute bottom-0 w-2 h-2 bg-[var(--gold-light)] rounded-full translate-y-1 animate-pulse" />
                <div className="absolute left-0 w-1.5 h-1.5 bg-white rounded-full -translate-x-0.75" />
                <div className="absolute right-0 w-1.5 h-1.5 bg-white rounded-full translate-x-0.75" />
              </motion.div>
              
              {/* Inner geometric heptagram */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute w-32 h-32 opacity-70 flex items-center justify-center"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--gold)] opacity-40">
                  <polygon points="50,5 93.3,30 93.3,80 50,95 6.7,80 6.7,30" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  <polygon points="50,5 93.3,80 6.7,80" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <polygon points="50,95 93.3,30 6.7,30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </motion.div>

              {/* Core golden compass astrolabe icon */}
              <motion.div 
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 p-5 rounded-full bg-black/60 border border-[var(--gold-300)] shadow-[0_0_30px_rgba(204,143,51,0.25)] flex items-center justify-center text-[var(--gold)]"
              >
                <Compass className="w-14 h-14 animate-[spin-slow_40s_linear_infinite]" />
              </motion.div>
            </div>

            {/* Brand Title */}
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-gray-500 font-bold block">
                Occult Science Portal
              </span>
              <h2 className="font-serif text-3xl font-bold text-white tracking-wider">
                OM <span className="gold-gradient-text">Astrology</span>
              </h2>
            </div>

            {/* Loader stats */}
            <div className="w-64 space-y-3">
              {/* Percentage */}
              <div className="flex justify-between items-baseline font-mono text-xs">
                <span className="text-gray-500 uppercase tracking-widest text-[9px] font-semibold">Aligning Energies</span>
                <span className="text-[var(--gold-light)] font-bold text-lg">{progress}%</span>
              </div>
              
              {/* Progress bar container */}
              <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden border border-neutral-950">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)] shadow-[0_0_8px_rgba(204,143,51,0.7)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              {/* Status Message */}
              <motion.p
                key={statusText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[10px] md:text-xs text-gray-400 font-light tracking-wide italic h-4 min-h-[16px] truncate"
              >
                {statusText}
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default GlobalPreloader;
