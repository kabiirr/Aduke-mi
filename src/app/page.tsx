'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import DobGate from '@/components/DobGate';
import SmoothScroll from '@/components/SmoothScroll';
import BackgroundMusic from '@/components/BackgroundMusic';
import StorytellingSection from '@/components/StorytellingSection';
import SweetThingsStack from '@/components/SweetThingsStack';
import CelebrationEnding from '@/components/CelebrationEnding';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if previously unlocked in the session to prevent repeated prompts
    const unlocked = sessionStorage.getItem('birthday_unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  // Lock body scroll when locked behind DOB gate
  useEffect(() => {
    if (isMounted) {
      if (!isUnlocked) {
        document.body.style.overflow = 'hidden';
      } else if (!isFlipped) {
        document.body.style.overflow = '';
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isUnlocked, isFlipped, isMounted]);

  // Scroll to top and lock scroll when flipped
  useEffect(() => {
    if (isFlipped) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isFlipped]);

  const handleUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem('birthday_unlocked', 'true');
  };

  if (!isMounted) return null;

  return (
    <main className={`w-full relative min-h-screen transition-colors duration-1000 ${isFlipped ? 'bg-zinc-950 text-white' : ''}`}>
      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <DobGate key="dob-gate" onUnlock={handleUnlock} />
        )}
      </AnimatePresence>

      {isUnlocked && (
        <>
          {isFlipped ? (
            <div className="relative w-full flex flex-col min-h-screen justify-center items-center overflow-hidden">
              <BackgroundMusic />
              <CelebrationEnding isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
            </div>
          ) : (
            <SmoothScroll>
              <div className="relative w-full flex flex-col">
                <BackgroundMusic />
                <StorytellingSection />
                <SweetThingsStack />
                <CelebrationEnding isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
              </div>
            </SmoothScroll>
          )}
        </>
      )}
    </main>
  );
}
