'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DobGateProps {
  onUnlock: () => void;
}

export default function DobGate({ onUnlock }: DobGateProps) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  // Autofocus the first field
  useEffect(() => {
    dayRef.current?.focus();
  }, []);

  // Auto-tab logic when input matches length
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 2) {
      setDay(val);
      if (val.length === 2) {
        monthRef.current?.focus();
      }
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow text or numbers for month
    setMonth(val);
    // If it's a 2-digit number, auto tab
    if (/^\d{2}$/.test(val)) {
      yearRef.current?.focus();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 4) {
      setYear(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanDay = parseInt(day, 10);
    const cleanYear = parseInt(year, 10);
    const m = month.trim().toLowerCase();

    // Check valid month formats: "06", "6", "june"
    const isValidMonth = m === '06' || m === '6' || m === 'june';
    const isValidDay = cleanDay === 17;
    const isValidYear = cleanYear === 2001 || cleanYear === 1;

    if (isValidDay && isValidMonth && isValidYear) {
      // Correct DOB!
      onUnlock();
    } else {
      // Shake animation
      setIsShaking(true);
      setErrorMessage('Oops! That is not the birthday girl\'s DOB 🌸');
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  // Shake and initial animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' as any }
    },
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.5, ease: 'easeInOut' as any }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-md">
      {/* Background decoration in screenshot */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-10">
        <h1 className="text-[12vw] font-serif font-bold italic text-black">Azeezah</h1>
      </div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isShaking ? 'shake' : 'visible'}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
        className="relative w-full max-w-[400px] bg-[#f7f4eb] p-8 rounded-[24px] shadow-2xl border border-cream-300 mx-4"
      >
        {/* Trophy badge sticker in top-left */}
        <div className="absolute -top-6 -left-4 bg-[#ffd000] text-black font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md border-2 border-white transform -rotate-12 select-none">
          <span className="text-base">🏆</span>
          <span>#1</span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-sans tracking-tight text-charcoal-900 mb-1">
            Welcome my shaylaaa
          </h2>
          <p className="text-sm text-zinc-500 font-sans">
            Unlock website with your date of birth
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                ref={dayRef}
                type="text"
                placeholder="Date"
                value={day}
                onChange={handleDayChange}
                className="w-full bg-transparent border-b border-zinc-300 py-2 text-charcoal-900 font-sans placeholder-zinc-400 focus:outline-none focus:border-charcoal-900 transition-colors"
                required
              />
            </div>

            <div className="relative">
              <input
                ref={monthRef}
                type="text"
                placeholder="Month"
                value={month}
                onChange={handleMonthChange}
                className="w-full bg-transparent border-b border-zinc-300 py-2 text-charcoal-900 font-sans placeholder-zinc-400 focus:outline-none focus:border-charcoal-900 transition-colors"
                required
              />
            </div>

            <div className="relative">
              <input
                ref={yearRef}
                type="text"
                placeholder="Year"
                value={year}
                onChange={handleYearChange}
                className="w-full bg-transparent border-b border-zinc-300 py-2 text-charcoal-900 font-sans placeholder-zinc-400 focus:outline-none focus:border-charcoal-900 transition-colors"
                required
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-500 font-medium text-center">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black hover:bg-zinc-800 text-white font-sans py-3 rounded-full font-medium transition-all active:scale-[0.98] shadow-md"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
}
