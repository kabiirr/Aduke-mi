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
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isUnlocked, isMounted]);

  const handleUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem('birthday_unlocked', 'true');
  };

  if (!isMounted) return null;

  return (
    <main className="w-full relative min-h-screen">
      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <DobGate key="dob-gate" onUnlock={handleUnlock} />
        )}
      </AnimatePresence>

      {isUnlocked && (
        <SmoothScroll>
          <div className="relative w-full flex flex-col">
            <BackgroundMusic />
            <StorytellingSection />
            <SweetThingsStack />
            <CelebrationEnding />
          </div>
        </SmoothScroll>
      )}
    </main>
  );
}
