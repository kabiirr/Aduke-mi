'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { sweetThings, SweetThing } from '@/data/storyData';
import { Heart, Sparkles, Wand2, Compass, RotateCcw, ArrowRight } from 'lucide-react';

export default function SweetThingsStack() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Motion values to track drag offset for rotating the top card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Dynamic rotate and opacity changes as the user drags the card
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 80;
    const isSwipe = Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > 400;

    if (isSwipe) {
      const dir = info.offset.x > 0 ? 1 : -1;
      // Throw card off screen, then advance the stack
      animate(x, dir * 650, { duration: 0.22, ease: [0.32, 0, 0.67, 0] as any });
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        x.set(0);
        y.set(0);
      }, 230);
    } else {
      // Not a swipe — spring back to center
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 28 } as any);
      animate(y, 0, { type: 'spring', stiffness: 300, damping: 28 } as any);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    x.set(0);
    y.set(0);
  };

  // Select icon based on sweet thing category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'smile':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'style':
        return <Wand2 className="w-5 h-5 text-indigo-500" />;
      case 'moments':
        return <Compass className="w-5 h-5 text-emerald-500" />;
      default:
        return <Heart className="w-5 h-5 text-rose-500" />;
    }
  };

  // Get background color class based on card index
  const getCardBg = (index: number) => {
    const bgs = [
      'bg-[#fffdf6] border-[#f3eee0]', // cream
      'bg-[#fbf7f0] border-[#efe5d5]', // light beige
      'bg-[#fffcf9] border-[#f7ede2]', // light peach
      'bg-[#fcf8ff] border-[#f0e6f7]', // lavender tint
      'bg-[#f6fbf9] border-[#e2efe9]'  // mint tint
    ];
    return bgs[index % bgs.length];
  };

  const isStackCompleted = currentIndex >= sweetThings.length;

  return (
    <section className="relative w-full min-h-screen py-24 px-4 paper-texture border-b border-cream-300 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Scrapbook Grids */}
      <div className="absolute inset-0 scrapbook-grid opacity-40 pointer-events-none" />

      {/* Decorative scrap lines */}
      <div className="absolute left-6 right-6 top-[15%] bottom-[15%] border border-dashed border-terracotta/10 pointer-events-none rounded-2xl" />

      <div className="text-center max-w-xl mb-12 relative z-10 px-4">
        <span className="font-mono text-terracotta text-sm font-bold tracking-widest uppercase">
          peeling back the pages
        </span>
        <h2 className="text-4xl md:text-5xl font-serif italic text-charcoal-900 mt-2 mb-4 leading-tight">
          25 Sweet Things About Azeezah
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 font-sans tracking-wide">
          A collection of small reasons why you are loved, celebrated, and deeply appreciated. Swipe or drag the cards to read them one by one.
        </p>
      </div>

      {/* Card Pile Frame */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[340px] sm:h-[380px] flex items-center justify-center">
        <AnimatePresence>
          {!isStackCompleted ? (
            // Render only top 3 cards for performance
            sweetThings.slice(currentIndex, currentIndex + 3).map((item, index) => {
              const isTopCard = index === 0;
              const cardOffset = index * 8; // Vertical translation
              const cardScale = 1 - index * 0.04; // Scale down lower cards
              const rotationOffset = isTopCard ? 0 : (item.id % 2 === 0 ? 3 : -3) + (index * 2);

              return (
                <motion.div
                  key={item.id}
                  style={
                    isTopCard
                      ? {
                          x,
                          y,
                          rotate,
                          opacity,
                          zIndex: 30 - index,
                        }
                      : {
                          y: cardOffset,
                          scale: cardScale,
                          rotate: rotationOffset,
                          zIndex: 30 - index,
                        }
                  }
                  drag={isTopCard}
                  dragMomentum={false}
                  onDragEnd={isTopCard ? handleDragEnd : undefined}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{
                    opacity: 1,
                    scale: isTopCard ? 1 : cardScale,
                    y: isTopCard ? 0 : cardOffset,
                    transition: {
                      type: 'spring' as any,
                      stiffness: 150,
                      damping: 18,
                      duration: 0.5,
                    },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  whileHover={isTopCard ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
                  className={`absolute w-full h-full p-6 sm:p-8 rounded-[20px] shadow-lg border flex flex-col justify-between cursor-grab active:cursor-grabbing select-none ${getCardBg(item.id)}`}
                >
                  {/* Decorative Washi Tape on top of card */}
                  {isTopCard && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 washi-tape-1 transform -rotate-1 pointer-events-none" />
                  )}

                  {/* Header: Category Badge and ID */}
                  <div className="flex justify-between items-center">
                    <span className="bg-[#f0ebd8] px-3 py-1 rounded-full text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 border border-zinc-200/50">
                      {getCategoryIcon(item.category)}
                      {item.category}
                    </span>
                    <span className="font-mono text-xs text-zinc-300 font-bold">
                      #{String(item.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Body: Main Text */}
                  <div className="my-auto py-4">
                    <p className="font-serif text-lg sm:text-xl md:text-2xl text-charcoal-900 leading-relaxed italic scrapbook-lined text-center">
                      "{item.text}"
                    </p>
                  </div>

                  {/* Footer: Progress and Drag Tips */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>PAGE {item.id} OF 25</span>
                    <span className="flex items-center gap-1">
                      Swipe to peel <ArrowRight className="w-3 h-3 text-terracotta" />
                    </span>
                  </div>
                </motion.div>
              );
            })
          ) : (
            // Stack Completed State
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' as any, stiffness: 100, damping: 15 }}
              className="absolute w-full h-full p-8 bg-[#fffdf6] border border-[#f3eee0] rounded-[20px] shadow-lg flex flex-col justify-between text-center"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 washi-tape-2 transform rotate-2 pointer-events-none opacity-60" />
              
              <div className="my-auto space-y-4">
                <div className="w-14 h-14 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto mb-2 text-rose-500 animate-pulse">
                  <Heart className="w-8 h-8 fill-current" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif italic text-charcoal-900">
                  Every Page Read 🌸
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-sans leading-relaxed px-2">
                  You have read all 25 sweet things. Every word is a reminder of how incredible you are, Azeezah.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="mx-auto flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 hover:border-charcoal-900 text-xs font-mono tracking-wider text-zinc-600 hover:text-charcoal-900 transition-all active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Read Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Swipe Progress Meter (Bottom) */}
      {!isStackCompleted && (
        <div className="mt-8 text-center">
          <div className="h-1.5 w-48 bg-zinc-200/50 rounded-full overflow-hidden mx-auto border border-zinc-200/20">
            <motion.div
              className="h-full bg-terracotta"
              animate={{ width: `${(currentIndex / sweetThings.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 mt-2 block uppercase">
            {currentIndex} of 25 things revealed
          </span>
        </div>
      )}
    </section>
  );
}
